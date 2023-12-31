import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { Badge, CircularProgress, Tooltip } from '@mui/material';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { usePreviewNavigation } from '@craftercms/studio-ui/hooks/usePreviewNavigation';
import AgiActiveGame from '../agibridge/AgiActiveGame';
import { get } from '@craftercms/studio-ui/utils/ajax';
import AgiSound from '../agibridge/AgiSound';

export function SoundSelector(props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentUrlPath = '' } = usePreviewNavigation();
  const [internalUrl, setInternalUrl] = useState(currentUrlPath);

  const [isFetching, setIsFetching] = React.useState<Boolean>(false);
  const [soundCount, setSoundCount] = React.useState<number>(0);
  const [availableSounds, setAvailableSounds] = React.useState([]);
  const [soundData, setSoundData] = React.useState(null);

  const getSoundFilesForGame = () => {
    let gameId = AgiActiveGame.getActiveGameId();
    let serviceUrl = `/api/1/site/content_store/children.json?url=/static-assets/games/${gameId}/src/sound`;

    get(serviceUrl).subscribe({
      next: (response) => {
        //@ts-ignore
        var sounds: { url: string; name: string }[] = [];

        //@ts-ignore
        response.response.forEach(function (item) {
          sounds.push({ name: item.name, url: item.url });
        });

        setAvailableSounds(sounds);
        setSoundCount(sounds.length);
      },
      error(e) {}
    });
  };

  const getSoundFileForGame = (url) => {
    let serviceUrl = url;
    get(serviceUrl).subscribe({
      next: (response) => {
        playSound(response.response.soundData);
      },
      error(e) {}
    });
  };

  useEffect(() => {
    getSoundFilesForGame();
  }, []);

  useEffect(() => {
    getSoundFilesForGame();
  }, [currentUrlPath, AgiActiveGame.currentRoom()]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // open and close the menu
    setAnchorEl(event.currentTarget);
  };

  const handleClickPlaySound = (event) => {
    let gameId = AgiActiveGame.getActiveGameId();
    let sound = availableSounds[event.target.value];
    getSoundFileForGame(sound.url);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const playSound = (soundData) => {
    AgiSound.playSound(soundData);
  };

  return (
    <>
      <Tooltip title={'Sound Selector'}>
        <Badge
          badgeContent={soundCount > 0 ? soundCount : null}
          color="secondary"
          overlap="circular"
          style={{ position: 'relative' }}
        >
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
            <AudiotrackRoundedIcon />
          </IconButton>
          {isFetching && (
            <CircularProgress
              size={void 0}
              value={100}
              variant={'determinate'}
              style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            />
          )}
        </Badge>
      </Tooltip>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuList dense sx={{ width: 320 }}>
          {availableSounds?.map((sound, idx) => (
            <MenuItem onClick={handleClickPlaySound} value={idx}>
              {sound.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default SoundSelector;
