import { post } from '@craftercms/studio-ui/utils/ajax';
import AgiActiveGame from './AgiActiveGame';
import AgiResources from './AgiResources';

export class AgiPicture {
  static API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';

  static savePictureCommandsAsSource(siteId, gameId, sourcePath, commands) {
    let path = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
    let filename = sourcePath.substring(sourcePath.lastIndexOf('/'));
    let serviceUrl =
      AgiPicture.API_WRITE_CONTENT +
      `?site=${siteId}&path=${path}&fileName=${filename}&contentType=application/json&createFolders=true&draft=false&duplicate=false&unlock=true`;

    let newCommands = AgiPicture.optimizePicture(commands);
    let commandsAsJson = JSON.stringify({ vectorCommands: newCommands });

    post(serviceUrl, commandsAsJson).subscribe({
      next: (response) => {
        alert('Saved');
      },
      error(e) {}
    });
  }

  static optimizePicture(commands) {
    var optimizedCommands = [];

    for (var i = 0; i < commands.length; i++) {
      let command = commands[i];
      let nextCommand = commands[i + 1];

      if (nextCommand) {
        var commandStr = JSON.stringify(command);
        var nextCommandStr = JSON.stringify(nextCommand);

        if (commandStr != nextCommandStr) {
          optimizedCommands.push(command);
        }
      } else {
        optimizedCommands.push(command);
      }
    }

    return optimizedCommands;
  }

  static encodePictureCommands = (commandsToEncode) => {
    var vectorCommands = commandsToEncode;

    let encodedBuffer = new Uint8Array(100000);

    let i = 0;
    var skip = false;

    vectorCommands.forEach(function (vectorCommand) {
      var opCode = 0; // End
      var args = vectorCommand.args;

      var commandName = vectorCommand.command;

      if (!skip) {
        switch (commandName) {
          case 'PicSetColor':
            opCode = 240;
            break;
          case 'PicDisable':
            opCode = 241;
            break;
          case 'PriSetcolor':
            opCode = 242;
            break;
          case 'PriDisable':
            opCode = 243;
            break;
          case 'DrawYCorner':
            opCode = 244;
            break;
          case 'DrawXCorner':
            opCode = 245;
            break;
          case 'DrawAbs':
            opCode = 246;
            break;
          case 'DrawRel':
            opCode = 247;
            break;
          case 'DrawFill':
            opCode = 248;
            break;
          case 'SetPen':
            opCode = 249;
            break;
          case 'DrawPen':
            opCode = 250;
            break;
          case 'End':
            opCode = 255;
            break;
        }

        if (opCode != 0) {
          encodedBuffer[i] = opCode;

          {
            i++;
            if (opCode != 255)
              for (var a = 0; a < vectorCommand.args.length; a++) {
                var value = args[a];
                encodedBuffer[i] = parseInt(value);
                i++;
              }
          }
        }
      }
    });

    let rightsizedBuffer = new Uint8Array(i);
    for (var l = 0; l < i; l++) {
      rightsizedBuffer[l] = encodedBuffer[l];
    }

    return rightsizedBuffer;
  };

  static getFunctionArgsFromPictureStream = (stream: any) => {
    var args = [];

    while (true) {
      var arg = stream.readUint8();
      if (arg >= 0xf0) break;
      args.push(arg);
    }

    stream.position--;

    return args;
  };

  static decodePictureStream = (stream: any) => {
    var pics = [];

    var decodedCommands = [];
    stream.position = 0;
    var processing = true;

    while (processing) {
      var opCode = stream.readUint8();

      if (opCode >= 0xf0) {
        switch (opCode) {
          case 240: // PicSetColor
            let picColor = stream.readUint8();
            pics.push({ command: 'PicSetColor', args: [picColor] });
            break;
          case 241: // PicDisable
            pics.push({ command: 'PicDisable', args: [] });
            break;
          case 242: // PriSetcolorhsonneborniii@gmail.com
            let priColor = stream.readUint8();
            pics.push({ command: 'PriSetcolor', args: [priColor] });
            break;
          case 243: // PriDisable
            pics.push({ command: 'PriDisable', args: [] });
            break;
          case 244: // DrawYCorner
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            pics.push({ command: 'DrawYCorner', args: args });
            break;
          case 245: // DrawXCorner
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            pics.push({ command: 'DrawXCorner', args: args });
            break;
          case 246: // DrawAbs
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            pics.push({ command: 'DrawAbs', args: args });
            break;
          case 247: // DrawRel
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            pics.push({ command: 'DrawRel', args: args });
            break;
          case 248: // DrawFill
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            pics.push({ command: 'DrawFill', args: args });
            break;
          case 249: // SetPen
            var value = stream.readUint8();
            pics.push({ command: 'SetPen', args: [value] });
            break;
          case 250: // DrawPen
            var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
            pics.push({ command: 'DrawPen', args: args });
            break;
          case 255: // End
            pics.push({ command: 'End', args: [] });
            processing = false;
            break;
        }
      }
    }

    return pics;
  };

  static renderPictureCommands = (commandsToRender) => {
    let encodedBuffer = AgiPicture.encodePictureCommands(commandsToRender);

    let agiInterpreter = AgiActiveGame.agiExecute('Get interpreter', 'Agi.interpreter');
    let AgiPic = AgiActiveGame.agiExecute('Get Agi.Pic', 'Agi.Pic');
    let FsByteStream = AgiActiveGame.agiExecute('Get Fs', 'Fs.ByteStream');

    let picNo = agiInterpreter.variables[0];
    agiInterpreter.loadedPics[picNo] = new AgiPic(new FsByteStream(encodedBuffer));
    agiInterpreter.agi_draw_pic(0);
    agiInterpreter.agi_show_pic(0);
  };

  static createPictureDrawModeCommand = (mode) => {
    var value = 1 & 0x10 & 0x07;

    return { command: 'PicSetPen', args: [value] };
  };

  static createPictureDrawCommand = (mode, x, y, scale) => {
    var newCommand;

    if (mode == 'Abs') {
      newCommand = { command: 'DrawAbs', args: [x, y, x + 1, y] };
    } else if (mode == 'Pen') {
      newCommand = { command: 'DrawPen', args: [x, y, x + scale, y, x, y + scale] };
    } else if (mode == 'Fill') {
      newCommand = { command: 'DrawFill', args: [x, y] };
    } else {
      console.log('unknown tool -> ' + mode);
    }

    return newCommand;
  };

  static createPictureSetColorCommand = (color: number) => {
    return { command: 'PicSetColor', args: [color] };
  };

  static getCurrentPictureCommands = () => {
    let roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
    return this.getPictureCommands(roomValue);
  };

  static getPictureCommands = (id) => {
    try {
      let currentPictureStream = AgiActiveGame.agiExecute(
        'Get Pic Stream',
        'Resources.readAgiResource(Resources.AgiResource.Pic, ' + id + ')'
      );

      let decodedPictureCommands = AgiPicture.decodePictureStream(currentPictureStream);

      return decodedPictureCommands;
    } catch (err) {}
  };

  static undoPictureCommand = (commands) => {
    var vectorCommands = commands;

    vectorCommands.pop();
    vectorCommands.pop();
    vectorCommands[vectorCommands.length] = { command: 'End', args: [] };

    return vectorCommands;
  };

  static appendPictureCommandToTail = (commands, command) => {
    var vectorCommands = commands;

    vectorCommands.pop(); // remove previous end
    vectorCommands[vectorCommands.length] = command;
    vectorCommands[vectorCommands.length] = { command: 'End', args: [] };

    return vectorCommands;
  };
}

export default AgiPicture;
