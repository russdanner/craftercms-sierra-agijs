import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { Badge, CircularProgress, Tooltip } from '@mui/material';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { usePreviewNavigation } from '@craftercms/studio-ui/hooks/usePreviewNavigation';
import AgiActiveGame from '../agibridge/AgiActiveGame';

export function RoomSelector(props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentUrlPath = '' } = usePreviewNavigation();
  const [internalUrl, setInternalUrl] = useState(currentUrlPath);

  const [isFetching, setIsFetching] = React.useState<Boolean>(false);
  const [roomCount, setRoomCount] = React.useState<number>(0);
  const [rooms, setRooms] = useState<any>();

  const loadRoomData = () => {
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

    setRooms(rooms);
    setRoomCount(rooms.length);
    setIsFetching(false);
  };

  useEffect(() => {
    setInterval(() => {
      loadRoomData();
    }, 3 * 1000);
  }, []);

  useEffect(() => {
    loadRoomData();
  }, [currentUrlPath, AgiActiveGame.currentRoom()]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickNewRoom = (room) => {
    AgiActiveGame.agiExecute('New Room', 'Agi.interpreter.newroom = ' + room);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let curUri = window.location.href;

  return (
    <>
      <Tooltip title={'Room Selector'}>
        <Badge
          badgeContent={roomCount > 0 ? roomCount : null}
          color="primary"
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
            <AccountTreeRoundedIcon />
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
          {rooms?.map((room, idx) => (
            <>
              <MenuItem onClick={(event) => handleClickNewRoom(room)}>
                <strong>Room {room}</strong>
              </MenuItem>
            </>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default RoomSelector;
