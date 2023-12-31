import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CopyAllRoundedIcon from '@mui/icons-material/CopyAllRounded';
import AgiActiveGame from '../agibridge/AgiActiveGame';

export function ShowPriorityBuffer(props) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={'Show Priority Buffer'}>
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
          <CopyAllRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default ShowPriorityBuffer;
