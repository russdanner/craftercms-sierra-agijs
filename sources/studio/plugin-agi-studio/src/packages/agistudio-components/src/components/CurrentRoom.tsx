import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { Tooltip, Badge } from '@mui/material';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { usePreviewNavigation } from '@craftercms/studio-ui/hooks/usePreviewNavigation';
import  AgiActiveGame  from '../agibridge/AgiActiveGame';

export function CurrentRoom(props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentUrlPath = '' } = usePreviewNavigation();
  const [internalUrl, setInternalUrl] = useState(currentUrlPath);
  const [currentRoom, setCurrentRoom] = useState(-1);

  const loadRoomData = () => {
    let roomValue = AgiActiveGame.currentRoom()
    let roomInt = (parseInt(roomValue)) ? roomValue : -1

    setCurrentRoom(roomInt) 
  };

  useEffect(() => {
    setInterval(() => {
      loadRoomData();
    }, 3 * 1000);
  }, []);

  useEffect(() => {
    currentUrlPath && setInternalUrl(currentUrlPath);
    loadRoomData();
  }, [currentUrlPath]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    AgiActiveGame.agiExecute('Reload Current Room', 'Agi.interpreter.newroom = currentRoom');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={'Reload Current Room'}>

      <Badge
          badgeContent={currentRoom!=-1 ? currentRoom : null}
          color="success"
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
          <RoomRoundedIcon />
        </IconButton>

        </Badge>
      </Tooltip>
    </>
  );
}

export default CurrentRoom;
