import * as React from 'react';
import {
  Alert,
  Backdrop,
  Button,
  ButtonGroup,
  CircularProgress,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import { DialogContent, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { get } from '@craftercms/studio-ui/utils/ajax';
import ColorPicker from './ColorPicker';
import AgiActiveGame from '../agibridge/AgiActiveGame';
import AgiView from '../agibridge/AgiView';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

export function EditViewDialog(props) {
  const siteId = useActiveSiteId();

  const [viewData, setViewData] = React.useState(null);
  const [rows, setRows] = React.useState([]);

  const [currentLoop, setCurrentLoop] = React.useState(0);
  const [currentCel, setCurrentCel] = React.useState(0);
  const [CelCount, setCelCount] = React.useState(0);
  const [loops, setLoops] = React.useState([]);
  const [availableViews, setAvailableViews] = React.useState([]);
  const [selectedViewFilename, setSelectedViewFilename] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);

  const [snackMessage, setSnackMessage] = React.useState('');
  const [snackSuccess, setSnackSuccess] = React.useState(true);
  const [snackShow, setSnackShow] = React.useState(false);
  const [progressShow, setProgressShow] = React.useState(false);

  const viewItemSort = (itemA, itemB) => {
    let fileA = itemA.name;
    let fileB = itemB.name;
    let orderA = fileA.substring(0, fileA.indexOf('-'));
    let orderB = fileB.substring(0, fileB.indexOf('-'));

    return Number(orderA) - Number(orderB);
  };

  const getViewFilesForGame = () => {
    let gameId = AgiActiveGame.getActiveGameId();
    let serviceUrl = `/api/1/site/content_store/children.json?url=/static-assets/games/${gameId}/src/view`;

    get(serviceUrl).subscribe({
      next: (response) => {
        //@ts-ignore
        var views: { url: string; name: string }[] = [];

        //@ts-ignore
        response.response.forEach(function (item) {
          views.push({ name: item.name, url: item.url });
        });

        views.sort(viewItemSort);
        setAvailableViews(views);
      },
      error(e) {}
    });
  };

  const getViewFileForGame = (url) => {
    let serviceUrl = url;
    get(serviceUrl).subscribe({
      next: (response) => {
        setViewData(response.response);
        //setCelCount(response.response.loops[0].cels.length);
        setCelCount(10);
        // populate loop descriptions
        var loops = Array(response.response.loops.length);

        for (var l = 0; l < response.response.loops.length; l++) {
          loops[l] = { id: l, description: 'Loop ' + l };
        }

        setLoops(loops);
        renderCel();
      },
      error(e) {}
    });
  };

  const renderCel = () => {
    try {
      if (
        viewData &&
        viewData.loops &&
        viewData.loops[currentLoop] &&
        viewData.loops[currentLoop].cels &&
        viewData.loops[currentLoop].cels[currentCel] &&
        viewData.loops[currentLoop].cels[currentCel].pixelData
      ) {
        // transform pixel data for cel into 16 color bitmap
        let cel = viewData.loops[currentLoop].cels[currentCel];
        let pixelData = cel.pixelData;

        var celMirrored = (cel.celMirrorTrans & 0x80) == 0x80;
        var celMirrorLoop = (cel.celMirrorTrans >>> 4) & 7;
        var celTransparentColor = cel.celMirrorTrans & 0x0f;

        // initialize the bitmap with trasparent color
        let bitmap = Array(cel.celHeight)
          //@ts-ignore
          .fill()
          .map(() => Array(cel.celWidth).fill(celTransparentColor));

        let row = 0;
        let col = 0;

        pixelData.forEach(function (chunkData) {
          if (chunkData == 0) {
            row++;
            col = 0;
          } else {
            var color = chunkData >>> 4;
            var numPixels = chunkData & 0x0f;

            for (var k = 0; k < numPixels; k++) {
              bitmap[row][col++] = color;
            }
          }

          setRows(bitmap);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bitmapToPixelData = (bitmap) => {
    // The actual image data for each cel is stored using RLE (run length encoding) compression. This means that instead of having one byte for each single pixel (or 1/2 byte as you would use for 16 colors), each byte specifies how many pixels there are to be in a row and what colour they are. I will refer to these groups of pixels as ``chunks''.
    // This method of compression is not very efficient if there is a lot of single pixels in the image (e.g. a view showing static on a TV screen), but in most cases it does save a fair amount of space.
    // Each line (not to be confused with a chunk) in the cel consists of several bytes of pixel data, then a 0 to end the line. Each byte of pixel data represents one chunk. The first four bits determine the colour, and the last four bits determine the number of pixels in the chunk.
    // Example: AX BY CZ 00

    // This line will have:
    // X pixels of colour A (AX)
    // Y pixels of colour B (BY)
    // Z pixels of colour C (CZ)
    // (then that will be the end of the line) (00)
    // If the color of the last chunk on the line is the transparent color, there is no need to store this.
    //For example, if C was the transparent color in the above example, you could just write AX BY 00. This also saves some space.

    var pixelData = [];

    for (var i = 0; i < bitmap.length; i++) {
      var colorRun = 1;

      for (var j = 0; j < bitmap[i].length; j++) {
        var color = bitmap[i][j];
        var nextColor = 0;

        if (j != bitmap[i].length) {
          // every other cell but the last
          nextColor = bitmap[i][j + 1];

          if (color == nextColor && colorRun < 14) {
            // if the next pixel is the same as the last keep looking
            colorRun++;
          } else {
            //var color = chunkData >>> 4;
            //var numPixels = chunkData & 0x0f;
            var chunkData = (color << 4) | (colorRun & 0x0f);

            // encode the last run.
            pixelData.push(chunkData);
            colorRun = 1;
          }
        } else {
          // last cell in the row
          var chunkData = (color << 4) | (colorRun & 0x0f);

          pixelData.push(chunkData);
        }
      }
      // terminate each line with a 0
      pixelData.push(0);
    }

    return pixelData;
  };

  const htmlColor = (colorNo): string => {
    let colors = [
      'black',
      'blue',
      'green',
      'teal',
      'red',
      'purple',
      'brown',
      'lightgray',
      'gray',
      'RoyalBlue',
      'lightgreen',
      'Aqua',
      'Salmon',
      'magenta',
      'yellow',
      'white'
    ];
    let colorName = colors[colorNo];
    return colorName;
  };

  const handleSaveAsNewView = () => {
    var gameId = AgiActiveGame.getActiveGameId();
    var currentViewSourceCount = availableViews.length;
    var label = prompt('View Label');
    let roomFilename = `view${currentViewSourceCount}-${label}.json`;
    let soureFilePath = `/static-assets/games/${gameId}/src/view/${roomFilename}`;

    // this can be moved to an in memory save
    let pixelData = bitmapToPixelData(rows);
    viewData.loops[currentLoop].cels[currentCel].pixelData = pixelData;

    AgiView.saveViewCommandsAsSource(siteId, gameId, soureFilePath, viewData);
    availableViews.push({ name: roomFilename, url: soureFilePath });
  };

  const handleSaveView = () => {
    let gameId = AgiActiveGame.getActiveGameId();
    let soureFilePath = `/static-assets/games/${gameId}/src/view/${selectedViewFilename}`;

    // this can be moved to an in memory save
    let pixelData = bitmapToPixelData(rows);
    viewData.loops[currentLoop].cels[currentCel].pixelData = pixelData;
    setProgressShow(true);

    AgiView.saveViewCommandsAsSource(siteId, gameId, soureFilePath, viewData);
    setSnackMessage('Save Complete');
    setSnackSuccess(true);
    setSnackShow(true);
  };

  const commitCelFrame = () => {
    const viewDataClone = structuredClone(viewData);
    let pixelData = bitmapToPixelData(rows);
    viewDataClone.loops[currentLoop].cels[currentCel].pixelData = pixelData;
    setViewData(viewDataClone);
  };

  const handleSetColor = (color: number) => {
    setSelectedColor(color);
  };

  function handleViewChange(event: SelectChangeEvent<number>, child: React.ReactNode): void {
    let gameId = AgiActiveGame.getActiveGameId();
    getViewFileForGame(`/static-assets/games/${gameId}/src/view/${event.target.value}`);
    setSelectedViewFilename(event.target.value);

    setCurrentLoop(0);
    setCurrentCel(0);
    setCelCount(viewData.loops[currentLoop].cels.length);
    renderCel();
  }

  function handleLoopChange(event: SelectChangeEvent<number>, child: React.ReactNode): void {
    setCurrentLoop(Number(event.target.value));
    commitCelFrame();
    setCurrentCel(0);
    setCelCount(viewData.loops[currentLoop].cels.length);
    renderCel();
  }

  const handleCelChange = (event: Event, newValue: number | number[]) => {
    let celNo = Number(newValue);
    setCurrentCel(celNo);
    commitCelFrame();
    renderCel();
  };

  useEffect(() => {
    getViewFilesForGame();
    renderCel();
  }, [CelCount, currentCel, currentLoop]);

  function setPixelColor(row: number, col: number): void {
    var newRows = Array.from(rows);
    newRows[row][col] = selectedColor;
    setRows(newRows);
  }

  function handleSnackClose(event: Event | React.SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void {
    setProgressShow(false);
    setSnackShow(false);
  }

  return (
    <>
      <DialogActions>
        <Button onClick={handleSaveView} variant="outlined" sx={{ mr: 1 }}>
          Save View
        </Button>

        <Button onClick={handleSaveAsNewView} variant="outlined" sx={{ mr: 1 }}>
          Add New View
        </Button>
      </DialogActions>

      <DialogContent>
        <Paper elevation={1} sx={{ padding: '1px' }}>
          <Table>
            <TableRow>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select a View</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="View"
                    onChange={handleViewChange}
                  >
                    {availableViews?.map((view) => (
                      <MenuItem value={view.name}>{view.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <p>Loops: {viewData ? viewData.numLoops : 0}</p>
                <br />
                <p>current loops cel count: {CelCount ? CelCount : 0}</p>

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Current Loop</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currentLoop}
                    label="Loop"
                    onChange={handleLoopChange}
                  >
                    {loops?.map((loop) => (
                      <MenuItem value={loop.id}>{loop.description}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Slider
                  defaultValue={0}
                  step={1}
                  min={0}
                  marks
                  max={CelCount}
                  onChange={handleCelChange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                />

                <ColorPicker props={undefined} handleSetColor={handleSetColor} />
              </TableCell>

              <TableCell>
                <Table aria-label="simple table">
                  <TableBody>
                    {rows.map((row, rowIdx) => (
                      <TableRow>
                        {row.map((value, colIdx) => (
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ padding: '10px', backgroundColor: htmlColor(value) }}
                            onClick={() => setPixelColor(rowIdx, colIdx)}
                            onMouseEnter={function (evt) {
                              if (evt.nativeEvent.buttons == 1) setPixelColor(rowIdx, colIdx);
                            }}
                            onMouseOver={function (evt) {
                              if (evt.nativeEvent.buttons == 1) setPixelColor(rowIdx, colIdx);
                            }}
                          ></TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          </Table>
        </Paper>
      </DialogContent>

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
export default EditViewDialog;
