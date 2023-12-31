import * as React from 'react';
import { useEffect, useState, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import { Tooltip } from '@mui/material';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { usePreviewNavigation } from '@craftercms/studio-ui/hooks/usePreviewNavigation';
import AgiActiveGame from '../agibridge/AgiActiveGame';

export function AllowInput(props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentUrlPath = '' } = usePreviewNavigation();
  const [internalUrl, setInternalUrl] = useState(currentUrlPath);

  const loadRoomData = () => {};

  useEffect(() => {
    loadRoomData();
  }, []);

  useEffect(() => {
    currentUrlPath && setInternalUrl(currentUrlPath);
    loadRoomData();
  }, [currentUrlPath]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    AgiActiveGame.agiExecute('Enable Input', 'Agi.interpreter.agi_accept_input()');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={'Allow Input'}>
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
          <DirectionsRunRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default AllowInput;
