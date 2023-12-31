import AgiActiveGame from './AgiActiveGame';

export class AgiSound {
  static decodeSound = (id) => {
    let soundStream = AgiActiveGame.agiExecute(
      'Get Sound Stream',
      'Resources.readAgiResource(Resources.AgiResource.Sound, ' + id + ')'
    );

    let decodedSound = '';
    if (soundStream) {
      decodedSound = AgiSound.decodeSoundStream(soundStream);
    }

    return decodedSound;
  };

  static encodeSoundData = (data) => {
    let encodedBuffer = new Uint8Array(100000);
    let position = 0;

    var soundData = data.soundData;

    // create the voice indexes
    // for now lets set all the voices to the same data
    var os = 4;
    encodedBuffer[position++] = os;
    encodedBuffer[position++] = os;
    encodedBuffer[position++] = os;
    encodedBuffer[position++] = os;

    for (var i = 0; i < soundData.length; i++) {
      var voiceData1 = soundData[i][0];
      var voiceData2 = soundData[i][0];
      var voiceData3 = soundData[i][0];
      var voiceData4 = soundData[i][0];

      // voice 1
      encodedBuffer[position++] = voiceData1.duration >> 8; // message index hi
      encodedBuffer[position++] = voiceData1.duration & (0xffff >> 8); // lo
      encodedBuffer[position++] = voiceData1.noteHi; // freq hi
      encodedBuffer[position++] = voiceData1.noteLow; // freq low
      encodedBuffer[position++] = voiceData1.maxNoteLow; // max note low
    }

    /* 0xFF 0xFF marks the end of the audio */
    encodedBuffer[position++] = 0xff;
    encodedBuffer[position++] = 0xff;
    encodedBuffer[position++] = 0xff;
    encodedBuffer[position++] = 0xff;

    // right size the buffer
    let rightsizedBuffer = new Uint8Array(position);
    for (var l = 0; l < position; l++) {
      rightsizedBuffer[l] = encodedBuffer[l];
    }

    return rightsizedBuffer;
  };

  static playSound = (soundData) => {
    var audioCtx = new AudioContext();
    var oscillator = audioCtx.createOscillator();

    oscillator.connect(audioCtx.destination);
    //@ts-ignore
    oscillator.type = 'sign';
    oscillator.start();

    for (var i = 0; i < soundData.length; i++) {
      try {
        var frame = soundData[i][0];

        var duration = frame.duration;

        if (duration == 65535) {
          break;
        }

        var frequency = 99320 / (((frame.noteHi & 0x3f) << 4) + (frame.noteLow & 0x0f));

        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // value in hertz
        var now = new Date().getTime();
        while (new Date().getTime() < now + duration / 10) {}
      } catch (err) {
        // usually this is caused by a frequency issue. Ignore it.
      }
    }
    oscillator.stop();
  };

  static decodeSoundStream = (data) => {
    var readNextFrame = true;
    var frame = -1;
    var position = 0;
    var soundObj = {};
    //@ts-ignore
    soundObj.soundData = [];

    var headerOffset = 0; //4;

    while (readNextFrame) {
      frame = frame + 1; // starts at -1 so first frame is 0

      var littleEndian = false;
      // read the header
      data.position = headerOffset;

      var v1Offest = data.readUint8();
      var v2Offest = data.readUint8();
      var v3Offest = data.readUint8();
      var v4Offest = data.readUint8();

      // VOICE 1
      // calculate the frame
      var frameffset = frame * 5;
      data.position = v1Offest + frameffset;

      // Get the frequency for the duration frame
      var duration1 = data.readUint16(littleEndian);
      var noteHigh1 = data.readUint8();
      var noteLow1 = data.readUint8();
      var maxNoteLow1 = data.readUint8();

      // decode the frequency
      // var frequency1 = 99320 / (((noteHigh1 & 0x3f) << 4) + (noteLow1 & 0x0f));

      // // VOICE 2
      // // calculate the frame
      // data.position = v2Offest + frame * 5;
      // // Get the frequency for the duration frame
      // var duration2 = data.readUint16(littleEndian);
      // var noteHigh2 = data.readUint8(littleEndian);
      // var noteLow2 = data.readUint8(littleEndian);
      // var maxNoteLow2 = data.readUint8(littleEndian);
      // // decode the frequency
      // var frequency2 = 99320 / (((noteHigh2 & 0x3f) << 4) + (noteLow2 & 0x0f));

      // VOICE 3
      // calculate the frame
      // data.position = v3Offest + frame * 5;
      // // Get the frequency for the duration frame
      // var duration3 = data.readUint16(littleEndian);
      // var noteHigh3 = data.readUint8(littleEndian);
      // var noteLow3 = data.readUint8(littleEndian);
      // var maxNoteLow3 = data.readUint8(littleEndian);
      // // decode the frequency
      // var frequency3 = 99320 / (((noteHigh3 & 0x3f) << 4) + (noteLow3 & 0x0f));

      // // VOICE 4
      // // calculate the frame
      // data.position = v4Offest + frame * 5;
      // // Get the frequency for the duration frame
      // var duration4 = data.readUint16(littleEndian);
      // var noteHigh4 = data.readUint8(littleEndian);
      // var noteLow4 = data.readUint8(littleEndian);
      // var maxNoteLow4 = data.readUint8(littleEndian);

      // decode the frequency
      // var frequency4 = 99320 / (((noteHigh4 & 0x3f) << 4) + (noteLow4 & 0x0f));

      //@ts-ignore
      soundObj.soundData.push([
        { duration: duration1, noteHi: noteHigh1, noteLow: noteLow1, maxNoteLow: maxNoteLow1 }
        //   { frequency: frequency2, duration: duration2, noteHi: noteHigh2, noteLow: noteLow2, maxNoteLow: maxNoteLow2 },
        //   { frequency: frequency3, duration: duration3, noteHi: noteHigh3, noteLow: noteLow3, maxNoteLow: maxNoteLow3 },
        //   { frequency: frequency4, duration: duration4, noteHi: noteHigh4, noteLow: noteLow4, maxNoteLow: maxNoteLow4 }
      ]);

      if (duration1 == 65535 /* 0xFF 0xFF */) {
        // marks the end of the audio
        readNextFrame = false;
      }
    }

    //@ts-ignore
    soundObj.soundData.push([
      { frequency: 0, duration: 65535, noteHi: 0, noteLow: 0, maxNoteLow: 0 }
      // { frequency: 0, duration: 65535, noteHi: 0, noteLow: 0, maxNoteLow: 0 },
      // { frequency: 0, duration: 65535, noteHi: 0, noteLow: 0, maxNoteLow: 0 },
      // { frequency: 0, duration: 65535, noteHi: 0, noteLow: 0, maxNoteLow: 0 }
    ]);

    return JSON.stringify(soundObj);
  };
}

export default AgiSound;
