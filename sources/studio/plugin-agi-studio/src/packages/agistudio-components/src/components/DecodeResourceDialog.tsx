import * as React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip
} from '@mui/material';
import { DialogContent } from '@mui/material';
import { useState, useEffect } from 'react';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded';
import AgiActiveGame from '../agibridge/AgiActiveGame';
import { CodeOffRounded } from '@mui/icons-material';
import AgiPicture from '../agibridge/AgiPicture';
import AgiResources from '../agibridge/AgiResources';
import { AgiLogic } from '../agibridge/AgiLogic';
import AgiView from '../agibridge/AgiView';
import AgiSound from '../agibridge/AgiSound';

export function DecodeResourceDialog(props) {
  const siteId = useActiveSiteId();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [resourceType, setResourceType] = React.useState(0);
  const [resourceList, setResourceList] = React.useState([]);
  const [resourceCode, setResourceCode] = React.useState('');

  const RESOURCE_TYPE_NONE = 0;
  const RESOURCE_TYPE_VIEW = 1;
  const RESOURCE_TYPE_PICTURE = 2;
  const RESOURCE_TYPE_LOGIC = 3;
  const RESOURCE_TYPE_WORDS = 4;
  const RESOURCE_TYPE_OBJECT = 5;
  const RESOURCE_TYPE_SOUND = 6;

  function lookupSounds() {
    let sounds = [];
    let Resources = AgiActiveGame.agiExecute('Get Resources', 'Resources');

    for (let i = 0; i < 1000; i++) {
      try {
        // @ts-ignore
        var sound = Resources.readAgiResource(Resources.AgiResource.Sound, i);

        // @ts-ignore
        if (sound) {
          sounds.push(i);
        }
      } catch (err) {}
    }

    return sounds;
  }

  function lookupRooms() {
    let rooms = [];
    let Resources = AgiActiveGame.agiExecute('Get Resources', 'Resources');

    for (let i = 0; i < 10000; i++) {
      try {
        // @ts-ignore
        let pic = Resources.readAgiResource(Resources.AgiResource.Pic, i);

        if (pic) {
          rooms.push(i);
        }
      } catch (err) {}
    }

    return rooms;
  }

  function handleTypeChange(event: SelectChangeEvent<number>, child: React.ReactNode): void {
    let type = Number(event.target.value);
    setResourceType(type);
    setResourceCode('');

    if (type == RESOURCE_TYPE_NONE) {
      // none
      setResourceList([]);
    } else if (type == RESOURCE_TYPE_VIEW) {
      // view
      let views = [];
      for (var i = 0; i < 200; i++) {
        views[views.length] = i;
      }
      setResourceList(views);
    } else if (type == RESOURCE_TYPE_PICTURE) {
      // picture
      let rooms = lookupRooms();
      setResourceList(rooms);
    } else if (type == RESOURCE_TYPE_LOGIC) {
      // logic
      let rooms = lookupRooms();
      setResourceList(rooms);
    } else if (type == RESOURCE_TYPE_WORDS) {
      // words
      setResourceList([0]);
    } else if (type == RESOURCE_TYPE_OBJECT) {
      // object
      setResourceList([]);
    } else if (type == RESOURCE_TYPE_SOUND) {
      // sound
      let sounds = [];
      for (var i = 0; i < 200; i++) {
        sounds[sounds.length] = i;
      }
      setResourceList(sounds);
    }
  }

  function handleResourceSelect(event: SelectChangeEvent<number>, child: React.ReactNode): void {
    let resourceId = Number(event.target.value);
    let type = resourceType;

    if (type == RESOURCE_TYPE_NONE) {
      // none
    } else if (type == RESOURCE_TYPE_VIEW) {
      // view
      let viewCode = JSON.stringify(AgiView.decodeView(resourceId));
      setResourceCode(viewCode);
    } else if (type == RESOURCE_TYPE_PICTURE) {
      // picture
      let pictureCommands = JSON.stringify(AgiPicture.getPictureCommands(resourceId));
      setResourceCode(pictureCommands);
    } else if (type == RESOURCE_TYPE_LOGIC) {
      // logic
      let Agi = AgiActiveGame.agiExecute('Get Logic Array', 'Agi');
      let code = new Agi.LogicParser(Agi.interpreter, resourceId);
      let codeData = AgiActiveGame.agiExecute(
        'Get Binary',
        'Resources.readAgiResource(Resources.AgiResource.Logic, ' + resourceId + ')'
      );
      let decompiledCode = AgiLogic.decompile(codeData, code);
      let prettyPrintedCode = AgiLogic.prettyPrintCode(decompiledCode);
      setResourceCode(prettyPrintedCode);
    } else if (type == RESOURCE_TYPE_WORDS) {
      // words
      let agiResources = new AgiResources();
      let wordsCode = agiResources.getWords();
      setResourceCode(wordsCode);
    } else if (type == RESOURCE_TYPE_OBJECT) {
      // object
    } else if (type == RESOURCE_TYPE_SOUND) {
      let soundCode = AgiSound.decodeSound(resourceId);
      setResourceCode(soundCode);
      AgiSound.playSound(JSON.parse(soundCode).soundData);
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDialogOpen(true);
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xl"
        sx={{ paddingLeft: '30px' }}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={dialogOpen}
      >
        <DialogTitle>Decode Resources</DialogTitle>

        <DialogActions></DialogActions>

        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Resource Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={resourceType}
              label="Resource Type"
              onChange={handleTypeChange}
            >
              <MenuItem value={RESOURCE_TYPE_NONE}>Select Resource Type</MenuItem>
              <MenuItem value={RESOURCE_TYPE_VIEW}>View</MenuItem>
              <MenuItem value={RESOURCE_TYPE_PICTURE}>Picture</MenuItem>
              <MenuItem value={RESOURCE_TYPE_LOGIC}>Logic</MenuItem>
              <MenuItem value={RESOURCE_TYPE_WORDS}>Words</MenuItem>
              <MenuItem value={RESOURCE_TYPE_OBJECT}>Object</MenuItem>
              <MenuItem value={RESOURCE_TYPE_SOUND}>Sound</MenuItem>
            </Select>
          </FormControl>

          {resourceList.length > 0 ? (
            <>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Resource</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Resource Type"
                  onChange={handleResourceSelect}
                >
                  {resourceList?.map((resource, idx) => (
                    <MenuItem value={idx}>{idx}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <></>
          )}
          <TextField id="outlined-textarea" sx={{ width: '100%' }} multiline rows={10} value={resourceCode} />
        </DialogContent>
      </Dialog>

      <Tooltip title={'Decode Resources'}>
        <IconButton
          disabled={!AgiActiveGame.gameIsLoaded()}
          size="medium"
          style={{ padding: 4 }}
          id="go-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <CodeOffRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default DecodeResourceDialog;
