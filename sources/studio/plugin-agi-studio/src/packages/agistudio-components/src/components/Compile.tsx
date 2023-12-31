import * as React from 'react';
import { Alert, Backdrop, CircularProgress, IconButton, Tooltip } from '@mui/material';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { usePreviewNavigation } from '@craftercms/studio-ui/hooks/usePreviewNavigation';
import AgiActiveGame from '../agibridge/AgiActiveGame';
import AgiBuild from '../agibridge/AgiBuild';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

export function Compile(props) {
  const siteId = useActiveSiteId();

  const [snackMessage, setSnackMessage] = React.useState('');
  const [snackSuccess, setSnackSuccess] = React.useState(true);
  const [snackShow, setSnackShow] = React.useState(false);
  const [progressShow, setProgressShow] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { currentUrlPath = '' } = usePreviewNavigation();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    let agiBuild = new AgiBuild();
    setProgressShow(true);

    agiBuild.compile(siteId, AgiActiveGame.getActiveGameId(), {
      next: function () {
        setSnackMessage('Build Complete');
        setSnackSuccess(true);
        setSnackShow(true);
      }
    });
  };

  function handleSnackClose(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void {
    setProgressShow(false);
    setSnackShow(false);
  }

  return (
    <>
      <Tooltip title={'Compile'}>
        <IconButton
          disabled={false}
          size="medium"
          style={{ padding: 4 }}
          id="go-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <FlashOnRoundedIcon />
        </IconButton>
      </Tooltip>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={progressShow}>
        <CircularProgress color="inherit" />

        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackShow}
          autoHideDuration={1000}
          onClose={handleSnackClose}
        >
          <Alert severity={snackSuccess ? `success` : `error`} sx={{ width: '100%' }}>
            {snackMessage}
          </Alert>
        </Snackbar>
      </Backdrop>
    </>
  );
}

export default Compile;
