import * as React from 'react';
import { useDispatch } from 'react-redux';
import { SwipeableDrawer, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import EditViewDialog from './EditViewDialog';
import AgiActiveGame from '../agibridge/AgiActiveGame';

export function OpenViewDialogButton(props) {
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleClick = () => {
    let drawerState = drawerOpen ? false : true;
    setDrawerOpen(drawerState);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <>
      <SwipeableDrawer
        anchor={'left'}
        variant="persistent"
        ModalProps={{
          keepMounted: false
        }}
        open={drawerOpen}
        onClose={function (event: React.SyntheticEvent<{}, Event>): void {
          toggleDrawer();
        }}
        onOpen={function (event: React.SyntheticEvent<{}, Event>): void {
          toggleDrawer();
        }}
      >
        {drawerOpen ? <><IconButton
          onClick={function (event: React.SyntheticEvent<{}, Event>): void {
            toggleDrawer();
          }}
        >
          X
        </IconButton><EditViewDialog props /></>: ''}
      </SwipeableDrawer>

      <Tooltip title={'Open View Editor'}>
        <IconButton
          disabled={!AgiActiveGame.gameIsLoaded()}
          size="medium"
          style={{ padding: 4 }}
          id="go-positioned-button"
          aria-controls={drawerOpen ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={drawerOpen ? 'true' : undefined}
          onClick={handleClick}
        >
          <TheatersRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default OpenViewDialogButton;
