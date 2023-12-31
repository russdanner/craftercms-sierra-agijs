import * as React from 'react';
import {
  Button,
  ButtonGroup,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { DialogContent, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import AgiPicture from '../agibridge/AgiPicture';
import AgiResources from '../agibridge/AgiResources';
import AgiActiveGame from '../agibridge/AgiActiveGame';
import { get } from '@craftercms/studio-ui/utils/ajax';
import ColorPicker from './ColorPicker';

export function EditPictureDialog(props) {
  const siteId = useActiveSiteId();

  const [availablePictures, setAvailablePictures] = React.useState([]);
  const [commands, setCommands] = React.useState(null);
  const [mouseTrapped, setMouseTrapped] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(2);
  const [drawMode, setDrawMode] = useState('Abs');
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [selectedRoomFilename, setSelectedRoomFilename] = useState(null);

  useEffect(() => {
    getPictureFilesForGame();

    // load the current picture into the commands listing
    if (!mouseTrapped) {
      var handleMouseDown = function (event) {
        //@ts-ignore
        window.agistudioMouseDraw = true;
      };
      var handleMouseUp = function (event) {
        //@ts-ignore
        window.agistudioMouseDraw = false;
        mouseDraw(event.clientX, event.clientY);
      };
      var handleMouseMove = function (event) {
        //@ts-ignore
        if (window.agistudioMouseDraw === true) {
          mouseDraw(event.clientX, event.clientY);
        }
      };
      var handleMouseClick = function (event) {
        mouseDraw(event.clientX, event.clientY);
      };

      //@ts-ignore
      let previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
      let canvas = previewDocument.getElementById('canvas');
      canvas.addEventListener('click', handleMouseClick);
      canvas.addEventListener('mousedown', handleMouseDown);
      canvas.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('mousemove', handleMouseMove);

      setMouseTrapped(true);
    }

    let currentPictureCommands = AgiPicture.getCurrentPictureCommands();
    setSelectedRoom(AgiActiveGame.currentRoom);
    setCommands(currentPictureCommands);
    //@ts-ignore
    window.agistudioPicCommands = currentPictureCommands;
  }, []);

  const getPictureFilesForGame = () => {
    let gameId = AgiActiveGame.getActiveGameId();
    let serviceUrl = `/api/1/site/content_store/children.json?url=/static-assets/games/${gameId}/src/picture`;
    get(serviceUrl).subscribe({
      next: (response) => {
        //@ts-ignore
        var pictures: { url: string; name: string }[] = [];

        //@ts-ignore
        response.response.forEach(function (item) {
          pictures.push({ name: item.name, url: item.url });
        });

        setAvailablePictures(pictures);
      },
      error(e) {}
    });
  };

  const appendCommandAndRender = (command) => {
    //@ts-ignore
    if (command != window.agistudioLastCommand) {
      //@ts-ignore
      window.agistudioLastCommand = command;
      //@ts-ignore
      var existingCommands = window.agistudioPicCommands;

      var newCommands = AgiPicture.appendPictureCommandToTail(existingCommands, command);

      setCommands(newCommands);

      //@ts-ignore
      window.agistudioPicCommands = newCommands;

      AgiPicture.renderPictureCommands(newCommands);
    }
  };

  const mouseDraw = (clientX, clientY) => {
    // something is wrong with getting commands from inside this event :-/

    //@ts-ignore
    let previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
    let canvas = previewDocument.getElementById('canvas');
    let rect = canvas.getBoundingClientRect();

    // the bit map is 160 x 200 so we need to scale the mouse input
    let ratioOfX = clientX / rect.width;
    let ratioOfY = clientY / rect.height;
    let x = Math.round(160 * ratioOfX);
    let y = Math.round(200 * ratioOfY);
    let scale = scaleFactor;

    //@ts-ignore
    // var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;

    //@ts-ignore
    var existingDrawMode = window.agistudioDrawMode ? window.agistudioDrawMode : drawMode;

    var newCommand = AgiPicture.createPictureDrawCommand(existingDrawMode, x, y, scale);

    appendCommandAndRender(newCommand);
  };

  const handleUndoCommand = () => {
    //@ts-ignore
    var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;

    var newCommands = AgiPicture.undoPictureCommand(existingCommands);

    //@ts-ignore
    window.agistudioPicCommands = newCommands;
    setCommands(newCommands);

    AgiPicture.renderPictureCommands(newCommands);
  };

  function handlePictureChange(event: SelectChangeEvent<number>, child: React.ReactNode): void {
    let gameId = AgiActiveGame.getActiveGameId();
    getPictureFileForGame(`/static-assets/games/${gameId}/src/picture/${event.target.value}`);
    setSelectedRoomFilename(event.target.value);
  }

  const handleSwitchBuffer = () => {
    AgiActiveGame.switchPictureBuffer();
  };

  const getPictureFileForGame = (url) => {
    let serviceUrl = url;
    get(serviceUrl).subscribe({
      next: (response) => {
        var newCommands = response.response.vectorCommands;
        //@ts-ignore
        window.agistudioPicCommands = newCommands;
        setCommands(newCommands);
        AgiPicture.renderPictureCommands(newCommands);
      }
    });
  };

  const handleDrawModeUpdate = (mode) => {
    setDrawMode(mode);

    //@ts-ignore
    window.agistudioDrawMode = mode;

    var newCommand = AgiPicture.createPictureDrawModeCommand(mode);
    appendCommandAndRender(newCommand);
  };

  const handleSetColor = (color: number) => {
    var newCommand = AgiPicture.createPictureSetColorCommand(color);
    appendCommandAndRender(newCommand);
  };

  const handleSaveAsNewPicture = () => {
    var gameId = AgiActiveGame.getActiveGameId();
    var currentRoomSourceCount = availablePictures.length;
    var label = prompt('Room Label');
    let roomFilename = `room${currentRoomSourceCount}-${label}.json`;
    let soureFilePath = `/static-assets/games/${gameId}/src/picture/${roomFilename}`;
    AgiPicture.savePictureCommandsAsSource(siteId, gameId, soureFilePath, commands);
    availablePictures.push({ name: roomFilename, url: soureFilePath });
  };

  const handleSavePicture = () => {
    let gameId = AgiActiveGame.getActiveGameId();
    let soureFilePath = `/static-assets/games/${gameId}/src/picture/${selectedRoomFilename}`;

    AgiPicture.savePictureCommandsAsSource(siteId, gameId, soureFilePath, commands);
  };

  function handleScaleUpdate(scaleFactor: number) {
    setScaleFactor(scaleFactor);
  }

  return (
    <>
      <DialogActions>
        <Button onClick={handleSavePicture} variant="outlined" sx={{ mr: 1 }}>
          Save Picture
        </Button>

        <Button onClick={handleSaveAsNewPicture} variant="outlined" sx={{ mr: 1 }}>
          Add New Picture
        </Button>

        <Button onClick={handleSwitchBuffer} variant="outlined" sx={{ mr: 1 }}>
          Switch Buffer
        </Button>
      </DialogActions>

      <DialogContent>
        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <Button
            onClick={() => {
              handleUndoCommand();
            }}
          >
            Undo
          </Button>
        </Paper>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select a Picture</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Picture"
            onChange={handlePictureChange}
          >
            {availablePictures?.map((view) => (
              <MenuItem value={view.name}>{view.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField id="outlined-textarea" sx={{ display: 'none', width: '100%' }} multiline rows={5} value={commands} />

        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <TextField id="outlined-textarea" value={scaleFactor} />
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                handleScaleUpdate(1);
              }}
            >
              1
            </Button>
            <Button
              onClick={() => {
                handleScaleUpdate(2);
              }}
            >
              2
            </Button>
            <Button
              onClick={() => {
                handleScaleUpdate(5);
              }}
            >
              5
            </Button>
            <Button
              onClick={() => {
                handleScaleUpdate(10);
              }}
            >
              10
            </Button>
          </ButtonGroup>
          <TextField id="outlined-textarea" value={drawMode} />
        </Paper>
        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>Picture Mode</Button>
            <Button>Priorty Mode</Button>
          </ButtonGroup>
        </Paper>
        <Paper elevation={1} sx={{ width: '355px', padding: '15px' }}>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button
              onClick={() => {
                handleDrawModeUpdate('Rel');
              }}
            >
              Draw Relative
            </Button>
            <Button
              onClick={() => {
                handleDrawModeUpdate('Abs');
              }}
            >
              Draw Absolute
            </Button>
            <Button
              onClick={() => {
                handleDrawModeUpdate('Pen');
              }}
            >
              Draw Pen
            </Button>
            <Button
              onClick={() => {
                handleDrawModeUpdate('Fill');
              }}
            >
              Draw Fill
            </Button>
          </ButtonGroup>
        </Paper>

        <ColorPicker handleSetColor={handleSetColor} props={undefined} />
      </DialogContent>
    </>
  );
}
export default EditPictureDialog;
