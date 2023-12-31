import { get, post } from '@craftercms/studio-ui/utils/ajax';
import AgiActiveGame from './AgiActiveGame';
import AgiPicture from './AgiPicture';
import AgiLogic from './AgiLogic';
import AgiView from './AgiView';
import AgiSound from './AgiSound';

// Notes:
// https://www.youtube.com/watch?v=ZusiKXcz_ac&list=PLUl4u3cNGP63VIBQVWguXxZZi0566y7Wf&index=3

enum AgiResource {
  Logic,
  Pic,
  View,
  Sound
}

interface IDirectoryEntry {
  volNo: number;
  volOffset: number;
}

class ByteStream {
  position: number = 0;
  length: number = 0;
  constructor(public buffer: Uint8Array, private startPosition: number = 0, private end: number = 0) {
    if (end == 0) this.end = this.buffer.byteLength;
    this.length = this.end - this.startPosition;
  }

  readUint8(): number {
    return this.buffer[this.startPosition + this.position++];
  }

  readUint16(littleEndian: boolean = true): number {
    var b1: number = this.buffer[this.startPosition + this.position++];
    var b2: number = this.buffer[this.startPosition + this.position++];
    if (littleEndian) {
      return (b2 << 8) + b1;
    }
    return (b1 << 8) + b2;
  }

  readInt16(littleEndian: boolean = true): number {
    var b1: number = this.buffer[this.startPosition + this.position++];
    var b2: number = this.buffer[this.startPosition + this.position++];
    if (littleEndian) {
      return (((b2 << 8) | b1) << 16) >> 16;
    }
    return (((b1 << 8) | b2) << 16) >> 16;
  }
}

interface IByteStreamDict {
  [index: string]: ByteStream;
}

export class AgiResources {
  static VOLUMERECORD_HEADER_SIZE = 5;

  logdirRecords: Array<IDirectoryEntry> = [];
  picdirRecords: Array<IDirectoryEntry> = [];
  viewdirRecords: Array<IDirectoryEntry> = [];
  snddirRecords: Array<IDirectoryEntry> = [];
  volBuffers: Array<ByteStream> = [];
  availableVols: Array<Boolean> = [];

  AgiResources = () => {};

  readAgiResource = (type: AgiResource, num: number): ByteStream => {
    var record = null;
    switch (type) {
      case AgiResource.Logic:
        record = this.logdirRecords[num];
        break;
      case AgiResource.Pic:
        record = this.picdirRecords[num];
        break;
      case AgiResource.View:
        record = this.viewdirRecords[num];
        break;
      case AgiResource.Sound:
        record = this.snddirRecords[num];
        break;
      default:
        throw 'Undefined resource type: ' + type;
    }

    var volstream = new ByteStream(this.volBuffers[record.volNo].buffer, record.volOffset);

    var sig: number = volstream.readUint16();
    var volNo: number = volstream.readUint8();
    var resLength = volstream.readUint16();

    var volPart = new ByteStream(volstream.buffer, record.volOffset + 5, record.volOffset + 5 + resLength);

    return volPart;
  };

  downloadAllFiles = (path: string, files: string[], done: (buffers: IByteStreamDict) => void) => {
    var buffers: IByteStreamDict = {};
    var leftToDownload: number = files.length;

    for (var i = 0; i < files.length; i++) {
      handleFile(i);
    }

    function getBinary(url: string, success: (data: ArrayBuffer) => void): void {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', url + '?crafterSite=agi-crafter', true);

      xhr.responseType = 'arraybuffer';

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.response === null) {
            throw "Fatal error downloading '" + url + "'";
          } else {
            console.log("Successfully downloaded '" + url + "'");
            success(xhr.response);
          }
        }
      };
      xhr.send();
    }

    function handleFile(num: number) {
      getBinary(path + files[num], (buffer: ArrayBuffer) => {
        buffers[files[num]] = new ByteStream(new Uint8Array(buffer));
        leftToDownload--;

        if (leftToDownload === 0) {
          done(buffers);
        }
      });
    }
  };

  getWords = () => {
    let words = AgiActiveGame.agiExecute('Get Words', 'Resources.words');

    var wrdTxt = '{';
    words.forEach(function (wrds, idx) {
      wrdTxt += '"' + idx + '": ["' + wrds.join('", "') + '"],';
    });
    wrdTxt += '}';

    return wrdTxt;
  };

  downloadGameData = (path, files, onDone) => {
    var leftToDownload: number = files.length;

    let gameResources = {
      pictures: [],
      logics: [],
      views: [],
      sounds: [],
      words: undefined,
      objects: []
    };

    for (var i = 0; i < files.length; i++) {
      handleFile(i);
    }

    function getSourceObject(url: string, success: (data) => void): void {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', url + '?crafterSite=agi-crafter', true);
      xhr.responseType = 'json';

      if (url.indexOf('/logic/') != -1) {
        xhr.responseType = 'text';
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.response === null) {
            throw "Fatal error downloading '" + url + "'";
          } else {
            console.log("Successfully downloaded '" + url + "' as '" + xhr.responseType + "'");
            success(xhr.response);
          }
        }
      };
      xhr.send();
    }

    function handleFile(num: number) {
      getSourceObject(path + files[num], (buffer) => {
        if (files[num].indexOf('/picture/') != -1) {
          gameResources.pictures.push({
            url: files[num],
            data: buffer
          });
        } else if (files[num].indexOf('/logic/') != -1) {
          gameResources.logics.push({
            url: files[num],
            data: buffer
          });
        } else if (files[num].indexOf('/view/') != -1) {
          gameResources.views.push({
            url: files[num],
            data: buffer
          });
        } else if (files[num].indexOf('/sound/') != -1) {
          gameResources.sounds.push({
            url: files[num],
            data: buffer
          });
        } else if (files[num].indexOf('/words.json') != -1) {
          //@ts-ignore
          gameResources.words = { url: files[num], data: buffer };
        } else if (files[num].indexOf('/object.json') != -1) {
          //@ts-ignore
          gameResources.objects = { url: files[num], data: buffer };
        } else {
          // ignore these other files for now
          // words: [],
          // objects: []
        }

        leftToDownload--;

        if (leftToDownload === 0) {
          onDone(gameResources);
        }
      });
    }
  };

  updateVolumeHeader(volumeBuffer, volumeId, positionInVolume) {
    let endMarkerPosition = positionInVolume + AgiResources.VOLUMERECORD_HEADER_SIZE + volumeBuffer.length;
    // ----- -----------------------------------------------------------
    //  0-1  Signature (0x12--0x34)
    //   2   Vol number that the resource is contained in
    //  3-4  Length of the resource taken from after the header
    // ----- -----------------------------------------------------------
    volumeBuffer[positionInVolume + 0] = 0x12; // signature
    volumeBuffer[positionInVolume + 1] = 0x34; // signature
    volumeBuffer[positionInVolume + 2] = volumeId; // volume
    volumeBuffer[positionInVolume + 3] = endMarkerPosition & (0xffff >> 8); // resource len LO
    volumeBuffer[positionInVolume + 4] = endMarkerPosition >> 8; // resource len HI
  }

  copyResourceBufferToVolume(volumeBuffer, bufferToCopy, positionInVolume) {
    for (var b = 0; b < bufferToCopy.length; b++) {
      volumeBuffer[positionInVolume + b] = bufferToCopy[b];
    }
  }

  createDirectoryEntry(volumeId, positionOffset) {
    return {
      volumeId: volumeId,
      positionOffset: positionOffset
    };
  }

  encodeResourceDirectory(directoryEntries) {
    // Each directory file is of the same format.
    // They contain a finite number of three byte entries, no more than 256.
    // The size will vary depending on the number of files of the type that the directory file is pointing to.
    // Dividing the filesize by three gives the maximum file number of that type of data file.
    // Each entry is of the following format:
    //    Byte 1           Byte 2           Byte 3
    // 7 6 5 4 3 2 1 0  7 6 5 4 3 2 1 0  7 6 5 4 3 2 1 0
    // V V V V P P P P  P P P P P P P P  P P P P P P P P
    // where V = VOL number and P = position (offset into VOL file).
    // The entry number itself gives the number of the data file that it is pointing to.
    // For example, if the following three byte entry is entry number 45 in the SOUND directory file,
    // 12 3D FE
    // then sound.45 is located at position 0x23DFE in the vol.1 file. The first entry number is entry 0.
    // If the three bytes contain the value 0xFFFFFF, then the resource does not exist.

    if (directoryEntries.length > 0) {
      let directoryBuffer = new Uint8Array(directoryEntries.length * 3);
      let position = 0;
      for (var i = 0; i < directoryEntries.length; i++) {
        let entry = directoryEntries[i];
        var a = entry.volumeId   
        var b = entry.positionOffset >> 16;
        var b1 = (a << 4) + b
        console.log("encoding vol: "+entry.volumeId + " : "+ b1)


        //b1 = entry.positionOffset >> 16;
        var b2 = entry.positionOffset >> 8;
        var b3 = entry.positionOffset & (0xffff >> 8);
        // (a << 16) + (b << 8) + c
        // var volNo = val >>> 20;
        var val = (b1 << 16) + (b2 << 8) + b3;
        console.log('(' + b1 + ', ' + b2 + ', ' + b3 + ') = ' + val + ' : ' + entry.positionOffset);

        directoryBuffer[position] = b1;
        directoryBuffer[position + 1] = b2;
        directoryBuffer[position + 2] = b3;

        position = i * 3;
      }

      return directoryBuffer;
    } else {
      return new Uint8Array(0);
    }
  }

  gameResourceItemSort(itemA, itemB) {
    let pathA = itemA.url;
    let pathB = itemB.url;
    let fileA = pathA.substring(pathA.lastIndexOf('/') + 1);
    let orderA = fileA.substring(0, fileA.indexOf('-'));
    let fileB = pathB.substring(pathB.lastIndexOf('/') + 1);
    let orderB = fileB.substring(0, fileB.indexOf('-'));

    return Number(orderA) - Number(orderB);
  }

  // Volume Spec version 2
  saveGame(siteId, gameId, gameData, callback) {
    let volumeSize = 0;
    let gamePath = `/static-assets/games/${gameId}`;

    console.log('Building Game :' + gameId);
    gameData.picturesDirectoryEntries = [];
    gameData.viewDirectoryEntries = [];
    gameData.logicDirectoryEntries = [];
    gameData.soundDirectoryEntries = [];

    // sort these alphabetical so that naming convention controls order
    gameData.pictures.sort(this.gameResourceItemSort);
    gameData.logics.sort(this.gameResourceItemSort);
    gameData.views.sort(this.gameResourceItemSort);
    gameData.sounds.sort(this.gameResourceItemSort);

    // encode pictures
    for (var i = 0; i < gameData.pictures.length; i++) {
      let picture = gameData.pictures[i];
      console.log('  Encoding picture :' + picture.url);
      let encodedPicture = AgiPicture.encodePictureCommands(picture.data.vectorCommands);
      gameData.pictures[i] = { url: picture.url, buffer: encodedPicture };

      volumeSize += 5; // header
      volumeSize += encodedPicture.length;
    }

    // encode logic
    // we don't have logic files yet so for each picture encode the default logic
    for (var i = 0; i < gameData.logics.length; i++) {
      let logic = gameData.logics[i];

      console.log('  Encoding logic :' + logic.url);
      let encodedLogic = AgiLogic.compile(logic.data, gameData.words.data, gameData.logics[0].data);
      let encodedMessages = AgiLogic.encodeMessages(logic.data, logic.data.length);

      gameData.logics[i] = {
        url: logic.url,
        logicBuffer: encodedLogic.buffer,
        messageBuffer: encodedMessages.buffer,
        data: logic.data
      };

      volumeSize += 5; // header
      volumeSize += encodedLogic.length;
    }

    // encode views
    for (var i = 0; i < gameData.views.length; i++) {
      let view = gameData.views[i];
      console.log('  Encoding view :' + view.url);
      let encodedView = AgiView.encodeViewCommands(view.data);
      gameData.views[i] = { url: view.url, buffer: encodedView };

      volumeSize += 5; // header
      volumeSize += encodedView.length;
    }

    // encode sounds
    for (var i = 0; i < gameData.sounds.length; i++) {
      let sound = gameData.sounds[i];
      console.log('  Encoding sound :' + sound.url);
      let encodedSound = AgiSound.encodeSoundData(sound.data);
      gameData.sounds[i] = { url: sound.url, buffer: encodedSound };

      volumeSize += 5; // header
      volumeSize += encodedSound.length;
    }

    // encode words
    if (gameData.words) {
      console.log('  Encoding Words :' + gameData.words.url);
      let wordsBuffer = AgiLogic.encodeWords(gameData.words.data);
      gameData.words.buffer = wordsBuffer;
    } else {
      console.log('  Warning! No WORDS source ');
    }

    // encode objects
    if (gameData.objects) {
      console.log('  Encoding Objects :' + gameData.objects.url);
      let objectsBuffer = AgiLogic.encodeObjects(gameData.objects.data);
      gameData.objects.buffer = objectsBuffer;
    } else {
      console.log('  Warning! No OBJECTS source ');
    }

    // =====================================================================
    // build the volume file
    // ====================================================================

    // build the volume file
    let volumeId0 = 0; // for now we only suppoer a single volume
    let volumeBuffer0 = new Uint8Array(volumeSize);
    let positionInVolume0 = 0;

    // pictures
    for (var i = 0; i < 10; i++) { //gameData.pictures.length; i++) {
      let picture = gameData.pictures[i];
      console.log('  Adding picture: ' + picture.url);
      console.log('    Adding picture directory entry at position: ' + positionInVolume0);
      gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId0, positionInVolume0);

      console.log('    Adding picture to volume');
      this.updateVolumeHeader(volumeBuffer0, volumeId0, positionInVolume0);
      positionInVolume0 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      this.copyResourceBufferToVolume(volumeBuffer0, picture.buffer, positionInVolume0);
      positionInVolume0 += picture.buffer.length;
      positionInVolume0 += 1;
    }

    // build the volume file
    let volumeId1 = 1; // for now we only suppoer a single volume
    let volumeBuffer1 = new Uint8Array(volumeSize);
    let positionInVolume1 = 0;

    // pictures
    for (var i = 10; i < 20; i++) {
      let picture = gameData.pictures[i];
      console.log('  Adding picture: ' + picture.url);
      console.log('    Adding picture directory entry at position: ' + positionInVolume1);
      gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId1, positionInVolume1);

      console.log('    Adding picture to volume');
      this.updateVolumeHeader(volumeBuffer1, volumeId1, positionInVolume1);
      positionInVolume1 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      this.copyResourceBufferToVolume(volumeBuffer1, picture.buffer, positionInVolume1);
      positionInVolume1 += picture.buffer.length;
      positionInVolume1 += 1;
    }
    
    // build the volume file
    let volumeId2 = 2; // for now we only suppoer a single volume
    let volumeBuffer2 = new Uint8Array(volumeSize);
    let positionInVolume2 = 0;

    // pictures
    for (var i = 20; i < 30; i++) {
      let picture = gameData.pictures[i];
      console.log('  Adding picture: ' + picture.url);
      console.log('    Adding picture directory entry at position: ' + positionInVolume2);
      gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId2, positionInVolume2);

      console.log('    Adding picture to volume');
      this.updateVolumeHeader(volumeBuffer2, volumeId2, positionInVolume2);
      positionInVolume2 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      this.copyResourceBufferToVolume(volumeBuffer2, picture.buffer, positionInVolume2);
      positionInVolume2 += picture.buffer.length;
      positionInVolume2 += 1;
    }
 

    // build the volume file
    let volumeId3 = 3; // for now we only suppoer a single volume
    let volumeBuffer3 = new Uint8Array(volumeSize);
    let positionInVolume3 = 0;

    // pictures
    for (var i = 30; i < 40; i++) {
      let picture = gameData.pictures[i];
      console.log('  Adding picture: ' + picture.url);
      console.log('    Adding picture directory entry at position: ' + positionInVolume3);
      gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId3, positionInVolume3);

      console.log('    Adding picture to volume');
      this.updateVolumeHeader(volumeBuffer3, volumeId3, positionInVolume3);
      positionInVolume3 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      this.copyResourceBufferToVolume(volumeBuffer3, picture.buffer, positionInVolume3);
      positionInVolume3 += picture.buffer.length;
      positionInVolume3 += 1;
    }
    
    // build the volume file
    let volumeId4 = 4; // for now we only suppoer a single volume
    let volumeBuffer4 = new Uint8Array(volumeSize);
    let positionInVolume4 = 0;

    // pictures
    for (var i = 40; i < gameData.pictures.length; i++) {
      let picture = gameData.pictures[i];
      console.log('  Adding picture: ' + picture.url);
      console.log('    Adding picture directory entry at position: ' + positionInVolume4);
      gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId4, positionInVolume4);

      console.log('    Adding picture to volume');
      this.updateVolumeHeader(volumeBuffer4, volumeId4, positionInVolume4);
      positionInVolume4 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      this.copyResourceBufferToVolume(volumeBuffer4, picture.buffer, positionInVolume4);
      positionInVolume4 += picture.buffer.length;
      positionInVolume4 += 1;
    }
    
    
    // logic
    let volumeId5 = 5; 
    let volumeBuffer5 = new Uint8Array(volumeSize);
    let positionInVolume5 = 0;

    for (var i = 0; i < 40; i++) {
      let logic = gameData.logics[i];
      console.log('  Adding logic: ' + logic.url);
      console.log('    Adding logic directory entry at position: ' + positionInVolume5);
      gameData.logicDirectoryEntries[i] = this.createDirectoryEntry(volumeId5, positionInVolume5);

      console.log('    Adding logic to volume');
      // ----- -----------------------------------------------------------
      //  0-1  0x1234: signature for the start of a file in the VOL block
      //   2   Vol file number
      //  3-4  Length of the logic script
      //  5-6  Offset of logic code end and text begin
      // ----- -----------------------------------------------------------
      this.updateVolumeHeader(volumeBuffer5, volumeId5, positionInVolume5);
      positionInVolume5 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      var messagesOffsetRecordPosition = positionInVolume5 - 2;
      volumeBuffer5[positionInVolume5++];
      volumeBuffer5[positionInVolume5++];

      this.copyResourceBufferToVolume(volumeBuffer5, logic.logicBuffer, positionInVolume5);
      positionInVolume5 += logic.logicBuffer.length;

      this.copyResourceBufferToVolume(volumeBuffer5, logic.messageBuffer, positionInVolume5);
      positionInVolume5 += logic.messageBuffer.length;

      var scriptLength = logic.logicBuffer.length + logic.messageBuffer.length;
      var msgOffset = logic.logicBuffer.length;

      volumeBuffer5[messagesOffsetRecordPosition] = scriptLength & (0xffff >> 8); // lo
      volumeBuffer5[messagesOffsetRecordPosition + 1] = scriptLength >> 8; // message index hi

      volumeBuffer5[messagesOffsetRecordPosition + 2] = msgOffset & (0xffff >> 8); // lo
      volumeBuffer5[messagesOffsetRecordPosition + 3] = msgOffset >> 8; // message index hi

      positionInVolume5 += 1;
    }

    let volumeId6 = 6; 
    let volumeBuffer6 = new Uint8Array(volumeSize);
    let positionInVolume6 = 0;

    for (var i = 40; i < gameData.logics.length; i++) {
      let logic = gameData.logics[i];
      console.log('  Adding logic: ' + logic.url);
      console.log('    Adding logic directory entry at position: ' + positionInVolume6);
      gameData.logicDirectoryEntries[i] = this.createDirectoryEntry(volumeId6, positionInVolume6);

      console.log('    Adding logic to volume');
      // ----- -----------------------------------------------------------
      //  0-1  0x1234: signature for the start of a file in the VOL block
      //   2   Vol file number
      //  3-4  Length of the logic script
      //  5-6  Offset of logic code end and text begin
      // ----- -----------------------------------------------------------
      this.updateVolumeHeader(volumeBuffer6, volumeId6, positionInVolume6);
      positionInVolume6 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      var messagesOffsetRecordPosition = positionInVolume6 - 2;
      volumeBuffer6[positionInVolume6++];
      volumeBuffer6[positionInVolume6++];

      this.copyResourceBufferToVolume(volumeBuffer6, logic.logicBuffer, positionInVolume6);
      positionInVolume6 += logic.logicBuffer.length;

      this.copyResourceBufferToVolume(volumeBuffer6, logic.messageBuffer, positionInVolume6);
      positionInVolume6 += logic.messageBuffer.length;

      var scriptLength = logic.logicBuffer.length + logic.messageBuffer.length;
      var msgOffset = logic.logicBuffer.length;

      volumeBuffer6[messagesOffsetRecordPosition] = scriptLength & (0xffff >> 8); // lo
      volumeBuffer6[messagesOffsetRecordPosition + 1] = scriptLength >> 8; // message index hi

      volumeBuffer6[messagesOffsetRecordPosition + 2] = msgOffset & (0xffff >> 8); // lo
      volumeBuffer6[messagesOffsetRecordPosition + 3] = msgOffset >> 8; // message index hi

      positionInVolume6 += 1;
    }

    // views
    let volumeId7 = 7; 
    let volumeBuffer7 = new Uint8Array(volumeSize);
    let positionInVolume7 = 0;
    for (var i = 0; i < 50; i++) {
      let view = gameData.views[i];
      console.log('  Adding view: ' + view.url);
      console.log('    Adding view directory entry at position: ' + positionInVolume7);
      gameData.viewDirectoryEntries.push(this.createDirectoryEntry(volumeId7, positionInVolume7));

      console.log('    Adding view to volume');
      this.updateVolumeHeader(volumeBuffer7, volumeId7, positionInVolume7);
      positionInVolume7 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      this.copyResourceBufferToVolume(volumeBuffer7, view.buffer, positionInVolume7);
      positionInVolume7 += view.buffer.length;
      positionInVolume7 += 1;
    }

    // views
    let volumeId8 = 8; 
    let volumeBuffer8 = new Uint8Array(volumeSize);
    let positionInVolume8 = 0;
    for (var i = 50; i < gameData.views.length; i++) {
      let view = gameData.views[i];
      console.log('  Adding view: ' + view.url);
      console.log('    Adding view directory entry at position: ' + positionInVolume8);
      gameData.viewDirectoryEntries.push(this.createDirectoryEntry(volumeId8, positionInVolume8));

      console.log('    Adding view to volume');
      this.updateVolumeHeader(volumeBuffer8, volumeId8, positionInVolume8);
      positionInVolume8 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      this.copyResourceBufferToVolume(volumeBuffer8, view.buffer, positionInVolume8);
      positionInVolume8 += view.buffer.length;
      positionInVolume8 += 1;
    }
    
    // sound
    let volumeId9 = 9; 
    let volumeBuffer9 = new Uint8Array(volumeSize);
    let positionInVolume9 = 0;
    for (var i = 0; i < gameData.sounds.length; i++) {
      let sound = gameData.sounds[i];
      console.log('  Adding sound: ' + sound.url);
      console.log('    Adding sound directory entry at position: ' + positionInVolume9);
      gameData.soundDirectoryEntries.push(this.createDirectoryEntry(volumeId9, positionInVolume9));

      console.log('    Adding sound to volume');
      this.updateVolumeHeader(volumeBuffer9, volumeId9, positionInVolume9);
      positionInVolume9 += AgiResources.VOLUMERECORD_HEADER_SIZE;
      this.copyResourceBufferToVolume(volumeBuffer9, sound.buffer, positionInVolume9);
      positionInVolume9 += sound.buffer.length;
      positionInVolume9 += 1;
    }

    // write volume file
    console.log('  Writing VOLs');
    AgiResources.saveFile(siteId, gamePath, 'vol.0', volumeBuffer0);
    AgiResources.saveFile(siteId, gamePath, 'vol.1', volumeBuffer1);
    AgiResources.saveFile(siteId, gamePath, 'vol.2', volumeBuffer2);
    AgiResources.saveFile(siteId, gamePath, 'vol.3', volumeBuffer3);
    AgiResources.saveFile(siteId, gamePath, 'vol.4', volumeBuffer4);
    AgiResources.saveFile(siteId, gamePath, 'vol.5', volumeBuffer5);
    AgiResources.saveFile(siteId, gamePath, 'vol.6', volumeBuffer6);
    AgiResources.saveFile(siteId, gamePath, 'vol.7', volumeBuffer7);
    AgiResources.saveFile(siteId, gamePath, 'vol.8', volumeBuffer8);
    AgiResources.saveFile(siteId, gamePath, 'vol.9', volumeBuffer9);

    // write directory files
    console.log('  Writing PICDIR');
    var encodedPictureDirectory = this.encodeResourceDirectory(gameData.picturesDirectoryEntries);
    AgiResources.saveFile(siteId, gamePath, 'PICDIR', encodedPictureDirectory);

    console.log('  Writing LOGDIR');
    var encodedLogicDirectory = this.encodeResourceDirectory(gameData.logicDirectoryEntries);
    AgiResources.saveFile(siteId, gamePath, 'LOGDIR', encodedLogicDirectory);

    console.log('  Writing VIEWDIR');
    var encodedViewDirectory = this.encodeResourceDirectory(gameData.viewDirectoryEntries);
    AgiResources.saveFile(siteId, gamePath, 'VIEWDIR', encodedViewDirectory);

    console.log('  Writing SNDDIR');
    var encodedSoundDirectory = this.encodeResourceDirectory(gameData.soundDirectoryEntries);
    AgiResources.saveFile(siteId, gamePath, 'SNDDIR', encodedSoundDirectory);

    console.log('  Writing WORDS.TOK');
    AgiResources.saveFile(siteId, gamePath, 'WORDS.TOK', gameData.words.buffer);

    console.log('  Writing OBJECT');
    AgiResources.saveFile(siteId, gamePath, 'OBJECT', gameData.objects.buffer);

    callback.next();
  }

  // saveLogic = (siteId, game, roomValue, buffer) => {
  // };

  savePicture = (siteId, game, roomId, commands) => {
    roomId = roomId;
    var nextRoomId = roomId + 1;

    this.downloadAllFiles(
      '/static-assets/games/' + game + '/',
      ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'],
      (buffers: IByteStreamDict) => {
        console.log('Directory files downloaded.');
        this.parseDirfile(buffers['LOGDIR'], this.logdirRecords);
        this.parseDirfile(buffers['PICDIR'], this.picdirRecords);
        this.parseDirfile(buffers['VIEWDIR'], this.viewdirRecords);
        this.parseDirfile(buffers['SNDDIR'], this.snddirRecords);
        var volNames: string[] = [];
        for (var i = 0; i < this.availableVols.length; i++) {
          if (this.availableVols[i] === true) {
            volNames.push('VOL.' + i);
          }
        }

        this.downloadAllFiles('/static-assets/games/' + game + '/', volNames, (buffers: IByteStreamDict) => {
          console.log('Resource volumes downloaded.');
          for (var j: number = 0; j < volNames.length; j++) {
            this.volBuffers[j] = buffers[volNames[j]];
          }

          let newPicData = AgiPicture.encodePictureCommands(commands);
          newPicData = AgiResources.addVolumeHeader(newPicData, 0);

          let picRecord = this.picdirRecords[roomId];
          let nextPicRecord = this.picdirRecords[nextRoomId]; // assuption: not the last picture

          let picsStream = this.volBuffers[picRecord.volNo].buffer;

          let lengthOfOldPic = 0;
          if (nextPicRecord) {
            lengthOfOldPic = nextPicRecord.volOffset - picRecord.volOffset;
          }

          let newPicSizeDiff = newPicData.length - lengthOfOldPic; //+ 2; // last command + 255 end marker

          // now that we know how the new picture relates to the old one we can re-size the stream
          // up or down accordingly.
          let newStreamLength = picsStream.length + newPicSizeDiff;

          let newStream = new Uint8Array(newStreamLength);
          for (var n = 0; n < newStream.length; n++) {
            if (n < picRecord.volOffset || n > picRecord.volOffset + (newPicData.length - 1)) {
              // copy the original buffer to the new buffer
              if (n < picRecord.volOffset) {
                // before the new resource
                newStream[n] = picsStream[n];
              } else {
                // after our resource, we have to account for 'overlap'
                newStream[n] = picsStream[n - newPicSizeDiff];
              }
            } else {
              // copy the new picture into the new stream
              newStream[n] = newPicData[n - picRecord.volOffset];
            }
          }

          let newPicDirEncoded = AgiResources.updateDirectoryOffsets(
            'P',
            this.picdirRecords,
            picRecord.volOffset,
            newPicSizeDiff
          );
          let newLogDirEncoded = AgiResources.updateDirectoryOffsets(
            'L',
            this.logdirRecords,
            picRecord.volOffset,
            newPicSizeDiff
          );
          let newViewDirEncoded = AgiResources.updateDirectoryOffsets(
            'V',
            this.viewdirRecords,
            picRecord.volOffset,
            newPicSizeDiff
          );
          let newSndDirEncoded = AgiResources.updateDirectoryOffsets(
            'S',
            this.snddirRecords,
            picRecord.volOffset,
            newPicSizeDiff
          );

          let gamePath = '/static-assets/games/' + game + '/';
          AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
          AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
          AgiResources.saveFile(siteId, gamePath, 'VIEWDIR', newViewDirEncoded);
          AgiResources.saveFile(siteId, gamePath, 'SNDDIR', newSndDirEncoded);

          // save updated volume file
          AgiResources.saveFile(siteId, gamePath, 'VOL.0', newStream);
        });
      }
    );
  };

  saveAsNewPicture = (siteId, game) => {
    this.downloadAllFiles(
      '/static-assets/games/' + game + '/',
      ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'],
      (buffers: IByteStreamDict) => {
        console.log('Directory files downloaded.');
        this.parseDirfile(buffers['LOGDIR'], this.logdirRecords);
        this.parseDirfile(buffers['PICDIR'], this.picdirRecords);
        this.parseDirfile(buffers['VIEWDIR'], this.viewdirRecords);
        this.parseDirfile(buffers['SNDDIR'], this.snddirRecords);
        var volNames: string[] = [];

        for (var i = 0; i < this.availableVols.length; i++) {
          if (this.availableVols[i] === true) {
            volNames.push('VOL.' + i);
          }
        }

        this.downloadAllFiles('/static-assets/games/' + game + '/', volNames, (buffers: IByteStreamDict) => {
          console.log('Resource volumes downloaded.');
          for (var j: number = 0; j < volNames.length; j++) {
            this.volBuffers[j] = buffers[volNames[j]];
          }

          let newPicData = new Uint8Array(6);
          newPicData[0] = 240; // set pic color
          newPicData[1] = 0; // ard: black
          newPicData[2] = 0; // draw fill
          newPicData[3] = 10; // arg: x
          newPicData[4] = 0; // arg: y
          newPicData[5] = 255; // end

          newPicData = AgiResources.addVolumeHeader(newPicData, 0);

          let volNum = 0;
          let picsStream = this.volBuffers[0].buffer;
          let offset = picsStream.length;
          let roomValue = this.picdirRecords.length;
          let picRecord = (this.picdirRecords[roomValue] = { volNo: volNum, volOffset: offset });
          let newStreamLength = picsStream.length + newPicData.length;

          let newStream = new Uint8Array(newStreamLength);

          for (var n = 0; n < newStreamLength; n++) {
            if (n < picsStream.length) {
              // copy in the existing resources
              newStream[n] = picsStream[n];
            } else {
              // copy in new resource
              newStream[n] = newPicData[n - picsStream.length];
            }
          }

          let newPicDirEncoded = AgiResources.updateDirectoryOffsets('P', this.picdirRecords, picRecord.volOffset, 0);

          // Every room has a logic file. Add logic file
          let roomLogic = AgiResources.DEFAULT_ROOM_LOGIC;
          let volStream = new Uint8Array(newStreamLength + 117);

          for (var n = 0; n < volStream.length; n++) {
            if (n < newStream.length) {
              // copy in the existing resources
              volStream[n] = newStream[n];
            } else {
              // copy in new resource
              volStream[n] = roomLogic[n - newStream.length];
            }
          }

          let logRecord = (this.logdirRecords[roomValue] = { volNo: volNum, volOffset: newStream.length });
          let newLogDirEncoded = AgiResources.updateDirectoryOffsets('L', this.logdirRecords, logRecord.volOffset, 0);

          //@ts-ignore
          let gamePath = '/static-assets/games/' + game + '/';
          AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
          AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);

          // save updated volume file
          AgiResources.saveFile(siteId, gamePath, 'VOL.0', volStream);
        });
      }
    );
  };

  static addVolumeHeader = (picData, volume) => {
    let endMarkerPosition = picData.length; //indexOf(255) + 1
    let sizeOfNewData = endMarkerPosition + 5;
    let dataWithHeader = new Uint8Array(sizeOfNewData);

    dataWithHeader[0] = 0x12; // signature
    dataWithHeader[1] = 0x34; // signature
    dataWithHeader[2] = volume; // volume
    dataWithHeader[3] = endMarkerPosition & (0xffff >> 8); // resource len LO
    dataWithHeader[4] = endMarkerPosition >> 8; // resource len HI
    // dataWithHeader[5] = 0    // compressed resource len LO
    // dataWithHeader[6] = 0    // compressed resource len HI

    for (var i = 0; i < picData.length; i++) {
      dataWithHeader[i + 5] = picData[i];
    }

    return dataWithHeader;
  };

  static updateDirectoryOffsets = (dirname, dirRecords, startOffset, adjustBy) => {
    // now modify the directory
    let position = 0;
    let recordCount = dirRecords.length;
    let newDirEncoded = new Uint8Array(recordCount * 3);

    for (var d = 0; d < recordCount; d++) {
      if (dirRecords[d]) {
        var offset = dirRecords[d].volOffset;
        var volume = dirRecords[d].volNo;

        if (offset > startOffset) {
          offset = dirRecords[d].volOffset + adjustBy;
        }

        newDirEncoded[position] = volume;
        newDirEncoded[position + 1] = offset >> 8;
        newDirEncoded[position + 2] = offset & (0xffff >> 8);
      } else {
        newDirEncoded[position] = 255;
        newDirEncoded[position + 1] = 255;
        newDirEncoded[position + 2] = 255;
      }

      position = position + 3;
    }

    return newDirEncoded;
  };

  static saveFile = (siteId, path, filename, data) => {
    const API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';

    // write the volume file
    let gameContentPath = path;
    let uploadFilename = filename;
    let serviceUrl =
      API_WRITE_CONTENT +
      `?site=${siteId}&path=${path}&contentType=folder&createFolders=true&draft=false&duplicate=false&unlock=true`;

    let body = new FormData();
    body.append('site', siteId);
    body.append('relativePath', 'null');
    body.append('validating', 'false');
    body.append('path', path);
    body.append('name', filename);

    body.append('type', 'application/octet-stream');
    body.append('allowed', 'true');
    body.append('file', new Blob([data]), filename);

    post(serviceUrl, body).subscribe({
      next: (response) => {
        // alert('File Saved: ' + filename);
      },
      error(e) {
        alert('File Failed :' + filename);
      }
    });
  };

  parseDirfile(buffer: ByteStream, records: IDirectoryEntry[]): void {
    var length: number = buffer.length / 3;
    for (var i: number = 0; i < length; i++) {
      var val: number = (buffer.readUint8() << 16) + (buffer.readUint8() << 8) + buffer.readUint8();
      var volNo: number = val >>> 20;
      var volOffset: number = val & 0xfffff;
      if (val >>> 16 == 0xff) continue;
      records[i] = { volNo: volNo, volOffset: volOffset };

      if (this.availableVols[volNo] === undefined) this.availableVols[volNo] = true;
    }
  }

  static uint8ArrayToByteStream = (buffer) => {
    return new ByteStream(buffer);
  };

  static DEFAULT_ROOM_LOGIC = [
    12,
    34, // signature
    0, // volume
    112, // length
    84, // message start offset

    82,
    0,
    255,
    7,
    5,
    255,
    29,
    0,
    24,
    0,
    25,
    0,
    27,
    0,
    63,
    50,
    255,
    252,
    1,
    1,
    1,
    1,
    1,
    0,
    252,
    255,
    6,
    0,
    37,
    0,
    120,
    140,
    112,
    120,
    35,
    0,
    26,
    255,
    14,
    1,
    20,
    0,
    255,
    2,
    0,
    101,
    1,
    255,
    1,
    2,
    1,
    255,
    2,
    0,
    18,
    99,
    255,
    1,
    2,
    2,
    255,
    2,
    0,
    18,
    99,
    255,
    1,
    2,
    3,
    255,
    2,
    0,
    18,
    2,
    255,
    1,
    2,
    4,
    255,
    2,
    0,
    18,
    99,
    0,
    1,
    27,
    0,
    4,
    0,
    21,
    30,
    0,
    0,
    0,
    45,
    6,
    82,
    6,
    15,
    78,
    36,
    27,
    25,
    7,
    89,
    100,
    7,
    29,
    8,
    12,
    64,
    65
  ];
}

export default AgiResources;
