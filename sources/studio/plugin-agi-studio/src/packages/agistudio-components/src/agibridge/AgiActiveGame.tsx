export class AgiActiveGame {
  static reload() {
    //@ts-ignore
    var game = document.getElementById('crafterCMSPreviewIframe').contentWindow.location.reload();
  }

  static getActiveGameId() {
    //@ts-ignore
    var game = document
      .getElementById('crafterCMSPreviewIframe')
      //@ts-ignore
      .contentWindow.location.pathname.replace('/games/', '');
    return game;
  }

  static gameIsLoaded() {
    let gameIsLoaded = false;

    let roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
    if (roomValue != undefined) {
      gameIsLoaded = true;
    }

    return gameIsLoaded;
  }

  static currentRoom = () => {
    let roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
    let roomInt = parseInt(roomValue) ? roomValue : -1;
    return roomValue;
  };

  static agiExecute(intent: string, command: string) {
    let frameElPath = "document.getElementById('crafterCMSPreviewIframe')";
    //@ts-ignore
    let previewFrameEl = eval(frameElPath);

    if (previewFrameEl) {
      const agiPath = frameElPath + '.contentWindow.Agi';
      const resourcesPath = frameElPath + '.contentWindow.Resources';
      const fsPath = frameElPath + '.contentWindow.Fs';

      //@ts-ignore
      let agiBooted = eval(agiPath);

      if (agiBooted) {
        try {
          var commandToSend = command;

          if (command.startsWith('Agi')) {
            commandToSend = command.replaceAll('Agi', agiPath);
          } else if (command.startsWith('Resources')) {
            commandToSend = commandToSend.replaceAll('Resources', resourcesPath);
          } else if (command.startsWith('Fs')) {
            commandToSend = commandToSend.replaceAll('Fs', fsPath);
          }

          //          console.log('Sending Command :' + intent);
          //          console.log('Command :' + command);
          //          console.log('Sending Command :' + commandToSend);

          // Can the rollup message be disabled?
          //@ts-ignore
          let result = eval(commandToSend);

          return result;
        } catch (err) {
          console.log('Failed to send command with intent: ' + intent);
          console.log('Command: ' + command);
          console.log('Error: ' + err);
        }
      } else {
        console.log('Bridge: AGI not available');
      }
    }
  }

  static switchPictureBuffer = () => {
    AgiActiveGame.agiExecute(
      'Get buffer mode',
      'Agi.interpreter.gbm = (Agi.interpreter.gbm && Agi.interpreter.gbm==1) ? 0 : 1'
    );
    AgiActiveGame.agiExecute(
      'Keep Orig Visual Buffer',
      'Agi.interpreter.gvb = (!Agi.interpreter.gvb) ? Agi.interpreter.visualBuffer : Agi.interpreter.gvb'
    );
    AgiActiveGame.agiExecute(
      'Set Visual Buffer',
      'Agi.interpreter.visualBuffer = (Agi.interpreter.gbm==1) ? Agi.interpreter.priorityBuffer : Agi.interpreter.gvb'
    );
    AgiActiveGame.agiExecute('Re-Render the room', 'Agi.interpreter.newroom = Agi.interpreter.variables[0]');
  };
}

export default AgiActiveGame;
