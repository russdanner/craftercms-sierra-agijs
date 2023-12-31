import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, TextField, Button,  DialogActions, FormControl} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { dispatchDOMEvent, batchActions } from '@craftercms/studio-ui/state/actions/misc';
import { createCustomDocumentEventListener } from '@craftercms/studio-ui/utils/dom';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { post } from '@craftercms/studio-ui/utils/ajax';

import {
  showUploadDialog,
  closeUploadDialog,
} from '@craftercms/studio-ui/state/actions/dialogs';

export function AddGame(props) {
  const dispatch = useDispatch();
  const siteId = useActiveSiteId();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [gameId, setGameId] = React.useState("");
  const [gameTitle, setGameTitle] = React.useState("");

  const API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setDialogOpen(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameId(event.target.value as string);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameTitle(event.target.value as string);
  };

  const handleAdd = () => {
    handleUploadAsset()
  };

  const cancelClick =  (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setDialogOpen(false)
  };

  const handleUploadAsset = () => {
    createCustomDocumentEventListener('AGISTUDIO_UPLOAD_GAME', (response) => {
      console.log('Game files uploaded. Add the game page to the library');
      console.log(response);

      let NowDate = new Date().toISOString();
      let objectId = generateUUID();
      let objectGroupId = objectId.substring(0, 4)

      let gameContent =
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
      "<page>\n" +
        "\t<content-type>/page/gametitle</content-type>\n" +
        "\t<display-template>/templates/web/Game.ftl</display-template>\n" +
        "\t<no-template-required>true</no-template-required>\n" +
        "\t<merge-strategy>inherit-levels</merge-strategy>\n" +
        "\t<file-name>index.xml</file-name>\n" +
        "\t<orderDefault_f>4000</orderDefault_f>\n" +
        "\t<placeInNav>true</placeInNav>\n" +

        "\t<game_s>" + gameId + "</game_s>\n" +
        "\t<folder-name>" + gameId + "</folder-name>\n" +
        "\t<navLabel>" + gameTitle + "</navLabel>\n" +
        "\t<internal-name>" + gameTitle + "</internal-name>\n" +
        
        "\t<objectGroupId>" + objectGroupId + "</objectGroupId>\n" +
        "\t<objectId>" + objectId + "</objectId>\n" +
        "\t<createdDate>" + NowDate + "</createdDate>\n" +
        "\t<createdDate_dt>" + NowDate + "</createdDate_dt>\n" +
        "\t<lastModifiedDate>" + NowDate + "</lastModifiedDate>\n" +
        "\t<lastModifiedDate_dt>" + NowDate + "</lastModifiedDate_dt>\n" +
      "</page>"
      
      let gameContentPath = "/site/website/games/" + gameId
      let serviceUrl = API_WRITE_CONTENT + `?site=${siteId}&path=${gameContentPath}&fileName=index.xml&contentType=gametitle&createFolders=true&draft=false&duplicate=false&unlock=true`

      post(serviceUrl, gameContent).subscribe({
        next: (response) => {
          console.log("content created")
          setDialogOpen(false)  
        },
        error(e) {}
      });

    });

    let gamePath = "/static-assets/games/" + gameId + "/"

    dispatch(      
      showUploadDialog({
        path: gamePath,
        site: siteId,
        onClose: batchActions([
          closeUploadDialog(),
          dispatchDOMEvent({
            id: 'AGISTUDIO_UPLOAD_GAME'
          })
        ])
      })
    );
  };

  const generateUUID = () => { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
  
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
        <DialogTitle>Add Game</DialogTitle>
        <DialogContent>
        <FormControl margin="normal" fullWidth>
          <TextField
            defaultValue=""
            id="gameId"
            label="Game ID"
            variant="outlined"
            onChange={handleIdChange}
          />
        </FormControl>
        <FormControl margin="normal" fullWidth>
        <TextField
            defaultValue=""
            id="gameTitle"
            label="Game Title"
            variant="outlined"
            onChange={handleTitleChange}
          />
        </FormControl>



        </DialogContent>
        <DialogActions>
        <Button onClick={cancelClick} variant="outlined" sx={{ mr: 1 }}>
            Cancel
          </Button>

          <Button onClick={handleAdd} variant="outlined" sx={{ mr: 1 }}>
            Upload Game Files & Save
          </Button>
        </DialogActions>

      </Dialog>

      <Tooltip title={'Add Game'}>
        <IconButton
          size="medium"
          style={{ padding: 4 }}
          id="go-positioned-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <AddRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default AddGame;
