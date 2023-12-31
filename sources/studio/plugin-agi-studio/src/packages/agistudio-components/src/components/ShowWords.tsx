import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import AgiActiveGame  from '../agibridge/AgiActiveGame';

export function ShowWords(props) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [words, setWords] = React.useState([]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    let words = AgiActiveGame.agiExecute('Get Words', 'Resources.words');

    var wrdTxt = "{"
    words.forEach( function(wrds, idx) {
      wrdTxt += "\""+idx+"\": [\""+ wrds.join("\", \"")+"\"],"
    })
    wrdTxt += "}"

    console.log(wrdTxt)
    setWords(words);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <DialogTitle>Words</DialogTitle>
        <DialogContent>
          <table style={{ width: '100%' }}>
            <th>Word Group</th>
            <th>Words</th>
          {words
            .map((words, i) => (
              <>
              <tr style={{ width: '100%' }}>
                <td>
                  <h1>{i}</h1>
                </td>
                <td style={{ width: '100%' }}>
                <TextField
                  id="outlined-textarea"
                  sx={{ width: '100%' }}
                  multiline
                  rows={10}
                  defaultValue={words.join("\n")}
                />
                </td>
              </tr>
              </>
            ))}
            </table>
        </DialogContent>
      </Dialog>

      <Tooltip title={'Show Words'}>
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
          <SpeakerNotesRoundedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default ShowWords;
