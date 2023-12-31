import { post } from '@craftercms/studio-ui/utils/ajax';
import AgiActiveGame from './AgiActiveGame';
import AgiResources from './AgiResources';

export class AgiView {
  static API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';

  static saveViewCommandsAsSource(siteId, gameId, sourcePath, commands) {
    let path = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
    let filename = sourcePath.substring(sourcePath.lastIndexOf('/'));
    let serviceUrl =
      AgiView.API_WRITE_CONTENT +
      `?site=${siteId}&path=${path}&fileName=${filename}&contentType=application/json&createFolders=true&draft=false&duplicate=false&unlock=true`;

    let commandsAsJson = JSON.stringify(commands);

    post(serviceUrl, commandsAsJson).subscribe({
      next: (response) => {
        alert('Saved');
      },
      error(e) {}
    });
  }

  static decodeView = (id) => {
    let viewStream = AgiActiveGame.agiExecute(
      'Get View Stream',
      'Resources.readAgiResource(Resources.AgiResource.View, ' + id + ')'
    );

    let decodedView = AgiView.decodeViewStream(viewStream);

    return decodedView;
  };

  static encodeViewCommands = (data) => {
    let encodedBuffer = new Uint8Array(1000000);

    let position = 0;
    encodedBuffer[position++] = data.unk1; // unk1
    encodedBuffer[position++] = data.unk2; // unk2
    encodedBuffer[position++] = data.loops.length; // number loops
    encodedBuffer[position++] = 0; //data.descriptionOffset; // description offset
    encodedBuffer[position++] = 0; //data.descriptionOffset; // description offset

    var loopCount = data.loops.length;
    var loopHeadersPos = position;
    position += loopCount * 2;

    for (var i = 0; i < loopCount; i++) {
      var curLoop = data.loops[i];

      var loopPositon = position;
      var celCount = curLoop.cels.length;
      encodedBuffer[position++] = celCount; // cell count

      var celHeadersPos = position;
      position += 2 * celCount;

      for (var c = 0; c < celCount; c++) {
        var curCel = curLoop.cels[c];

        var celOffset = position - loopPositon; // cell offset (relative to start of loop)

        encodedBuffer[position] = curCel.celWidth;
        encodedBuffer[position + 1] = curCel.celHeight;
        encodedBuffer[position + 2] = curCel.celMirrorTrans;
        position += 3;

        for (var d = 0; d < curCel.pixelData.length; d++) {
          encodedBuffer[position + d] = curCel.pixelData[d];
        }
        position += curCel.pixelData.length;

        // (b2 << 8) + b1;
        // update the cell positions (relative to start of loop)
        var a1 = celOffset; // & (0xffff >> 8)
        var a2 = celOffset >> 8;
        encodedBuffer[celHeadersPos + c * 2] = a1;
        encodedBuffer[celHeadersPos + c * 2 + 1] = a2;
        //console.log(i + ':' + c + ' (' + a1 + ',' + a2 + ') setting loop cell record at:' + (a2 << 8) + a1);
      }

      // Update the loop headers for the current loop
      var b1 = loopPositon; // & (0xffff >> 8)
      var b2 = loopPositon >> 8;
      encodedBuffer[loopHeadersPos + i * 2] = b1;
      encodedBuffer[loopHeadersPos + i * 2 + 1] = b2;
      //console.log(i + ':  (' + b1 + ',' + b2 + ')  setting loop loop record at:' + (b2 << 8) + b1);
    }

    // set the actual offset (rather than the one in the json)
    //var viewDescOffset = bytesUsed;
    //encodedBuffer[3] = viewDescOffset;

    // set the description of the view
    encodedBuffer[++position] = 0;
    encodedBuffer[position] = 0;

    // right size the buffer
    let rightsizedBuffer = new Uint8Array(position);
    for (var l = 0; l < position; l++) {
      rightsizedBuffer[l] = encodedBuffer[l];
    }
    //console.log(rightsizedBuffer.join(', '));
    //console.log(JSON.stringify(this.decodeViewStream(AgiResources.uint8ArrayToByteStream(rightsizedBuffer))));

    return rightsizedBuffer;
  };

  static decodeViewStream = (data) => {
    var decodedView: any = {};

    decodedView.unk1 = data.readUint8();
    decodedView.unk2 = data.readUint8();
    decodedView.numLoops = data.readUint8();
    decodedView.descriptionOffset = data.readUint16();

    decodedView.loops = [];

    for (var i = 0; i < decodedView.numLoops; i++) {
      var loop: any = {};
      decodedView.loops.push(loop);

      // Loop header
      loop.loopOffset = data.readUint16();

      var streamPosLoop = data.position;
      data.position = loop.loopOffset;

      loop.numCels = data.readUint8();
      loop.cels = [];

      for (var j = 0; j < loop.numCels; j++) {
        var cel: any = {};
        loop.cels.push(cel);

        cel.celOffset = data.readUint16();

        var streamPosCel = data.position;
        data.position = loop.loopOffset + cel.celOffset;

        // Cel header
        cel.celWidth = data.readUint8();
        cel.celHeight = data.readUint8();
        cel.celMirrorTrans = data.readUint8();
        cel.pixelData = [];

        var celMirrored = (cel.celMirrorTrans & 0x80) == 0x80;
        var celMirrorLoop = (cel.celMirrorTrans >>> 4) & 7;
        if (celMirrorLoop == i) celMirrored = false;

        if (!celMirrored) {
          var celY = 0;
          var celX = 0;
          var chunkIdx = 0;

          while (true) {
            var chunkData = data.readUint8();
            cel.pixelData.push(chunkData);
            chunkIdx++;

            if (chunkData == 0) {
              celX = 0;
              celY++;
              if (celY >= cel.celHeight) break;
            }

            var numPixels = chunkData & 0x0f;
            celX += numPixels;
          }
        }

        data.position = streamPosCel;
      }

      data.position = streamPosLoop;
    }
    data.position = decodedView.descriptionOffset;

    while (true) {
      var chr = data.readUint8();
      if (chr == 0) break;
      //description += String.fromCharCode(chr);
    }

    return decodedView;
  };
}

export default AgiView;
