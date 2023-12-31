import * as React from 'react';

import { Tooltip } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ControlCameraRoundedIcon from '@mui/icons-material/ControlCameraRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import AgiActiveGame from '../agibridge/AgiActiveGame';

export function SetEgoPosition(props) {
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);

    var x = prompt('X coordinate');
    var y = prompt('Y coordinate');

    if (x && y && x != '' && y != '') {
      AgiActiveGame.agiExecute('Set Ego X Coordinate', 'Agi.interpreter.gameObjects[0].x=' + x);
      AgiActiveGame.agiExecute('Set Ego Y Coordinate', 'Agi.interpreter.gameObjects[0].y=' + y);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={'Set Ego Position'}>
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
          <ControlCameraRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default SetEgoPosition;
