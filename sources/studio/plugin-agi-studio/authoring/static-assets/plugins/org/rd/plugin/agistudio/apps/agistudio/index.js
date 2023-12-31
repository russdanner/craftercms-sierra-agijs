const React = craftercms.libs.React;
const { useState, useEffect } = craftercms.libs.React;
const { useSelector, useDispatch } = craftercms.libs.ReactRedux;
const { Tooltip, Badge, CircularProgress, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, Paper, ButtonGroup, InputLabel, Select, MenuItem: MenuItem$1, SwipeableDrawer, Table, TableRow, TableCell, Slider, TableBody, Backdrop, Alert, IconButton: IconButton$1 } = craftercms.libs.MaterialUI;
const IconButton = craftercms.libs.MaterialUI.IconButton && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.IconButton, 'default') ? craftercms.libs.MaterialUI.IconButton['default'] : craftercms.libs.MaterialUI.IconButton;
const DirectionsRunRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DirectionsRunRounded');
const AccountTreeRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AccountTreeRounded');
const MenuList = craftercms.libs.MaterialUI.MenuList && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuList, 'default') ? craftercms.libs.MaterialUI.MenuList['default'] : craftercms.libs.MaterialUI.MenuList;
const MenuItem = craftercms.libs.MaterialUI.MenuItem && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.MenuItem, 'default') ? craftercms.libs.MaterialUI.MenuItem['default'] : craftercms.libs.MaterialUI.MenuItem;
const Menu = craftercms.libs.MaterialUI.Menu && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Menu, 'default') ? craftercms.libs.MaterialUI.Menu['default'] : craftercms.libs.MaterialUI.Menu;
const AudiotrackRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AudiotrackRounded');
const { get, post } = craftercms.utils.ajax;
const ControlCameraRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ControlCameraRounded');
const CopyAllRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CopyAllRounded');
const SpeakerNotesRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/SpeakerNotesRounded');
const RoomRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/RoomRounded');
const DataObjectRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/DataObjectRounded');
const AddRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/AddRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/AddRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/AddRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/AddRounded');
const { createAction } = craftercms.libs.ReduxToolkit;
const { createCustomDocumentEventListener } = craftercms.utils.dom;
const ImageAspectRatioRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/ImageAspectRatioRounded');
const Snackbar = craftercms.libs.MaterialUI.Snackbar && Object.prototype.hasOwnProperty.call(craftercms.libs.MaterialUI.Snackbar, 'default') ? craftercms.libs.MaterialUI.Snackbar['default'] : craftercms.libs.MaterialUI.Snackbar;
const TheatersRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/TheatersRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/TheatersRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/TheatersRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/TheatersRounded');
const CodeOffRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/CodeOffRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/CodeOffRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/CodeOffRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/CodeOffRounded');
const FlashOnRoundedIcon = craftercms.utils.constants.components.get('@mui/icons-material/FlashOnRounded') && Object.prototype.hasOwnProperty.call(craftercms.utils.constants.components.get('@mui/icons-material/FlashOnRounded'), 'default') ? craftercms.utils.constants.components.get('@mui/icons-material/FlashOnRounded')['default'] : craftercms.utils.constants.components.get('@mui/icons-material/FlashOnRounded');

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function useActiveSiteId() {
  return useSelector((state) => state.sites.active);
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function usePreviewNavigation() {
  return useSelector((state) => state.previewNavigation);
}

var AgiActiveGame = /** @class */ (function () {
    function AgiActiveGame() {
    }
    AgiActiveGame.reload = function () {
        //@ts-ignore
        document.getElementById('crafterCMSPreviewIframe').contentWindow.location.reload();
    };
    AgiActiveGame.getActiveGameId = function () {
        //@ts-ignore
        var game = document
            .getElementById('crafterCMSPreviewIframe')
            //@ts-ignore
            .contentWindow.location.pathname.replace('/games/', '');
        return game;
    };
    AgiActiveGame.gameIsLoaded = function () {
        var gameIsLoaded = false;
        var roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
        if (roomValue != undefined) {
            gameIsLoaded = true;
        }
        return gameIsLoaded;
    };
    AgiActiveGame.agiExecute = function (intent, command) {
        var frameElPath = "document.getElementById('crafterCMSPreviewIframe')";
        //@ts-ignore
        var previewFrameEl = eval(frameElPath);
        if (previewFrameEl) {
            var agiPath = frameElPath + '.contentWindow.Agi';
            var resourcesPath = frameElPath + '.contentWindow.Resources';
            var fsPath = frameElPath + '.contentWindow.Fs';
            //@ts-ignore
            var agiBooted = eval(agiPath);
            if (agiBooted) {
                try {
                    var commandToSend = command;
                    if (command.startsWith('Agi')) {
                        commandToSend = command.replaceAll('Agi', agiPath);
                    }
                    else if (command.startsWith('Resources')) {
                        commandToSend = commandToSend.replaceAll('Resources', resourcesPath);
                    }
                    else if (command.startsWith('Fs')) {
                        commandToSend = commandToSend.replaceAll('Fs', fsPath);
                    }
                    //          console.log('Sending Command :' + intent);
                    //          console.log('Command :' + command);
                    //          console.log('Sending Command :' + commandToSend);
                    // Can the rollup message be disabled?
                    //@ts-ignore
                    var result = eval(commandToSend);
                    return result;
                }
                catch (err) {
                    console.log('Failed to send command with intent: ' + intent);
                    console.log('Command: ' + command);
                    console.log('Error: ' + err);
                }
            }
            else {
                console.log('Bridge: AGI not available');
            }
        }
    };
    AgiActiveGame.currentRoom = function () {
        var roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
        return roomValue;
    };
    AgiActiveGame.switchPictureBuffer = function () {
        AgiActiveGame.agiExecute('Get buffer mode', 'Agi.interpreter.gbm = (Agi.interpreter.gbm && Agi.interpreter.gbm==1) ? 0 : 1');
        AgiActiveGame.agiExecute('Keep Orig Visual Buffer', 'Agi.interpreter.gvb = (!Agi.interpreter.gvb) ? Agi.interpreter.visualBuffer : Agi.interpreter.gvb');
        AgiActiveGame.agiExecute('Set Visual Buffer', 'Agi.interpreter.visualBuffer = (Agi.interpreter.gbm==1) ? Agi.interpreter.priorityBuffer : Agi.interpreter.gvb');
        AgiActiveGame.agiExecute('Re-Render the room', 'Agi.interpreter.newroom = Agi.interpreter.variables[0]');
    };
    return AgiActiveGame;
}());

function AllowInput(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; var setInternalUrl = _c[1];
    useEffect(function () {
    }, []);
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
    }, [currentUrlPath]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        AgiActiveGame.agiExecute('Enable Input', 'Agi.interpreter.agi_accept_input()');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Allow Input' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(DirectionsRunRoundedIcon, null)))));
}

function RoomSelector(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; _c[1];
    var _d = React.useState(false), isFetching = _d[0], setIsFetching = _d[1];
    var _e = React.useState(0), roomCount = _e[0], setRoomCount = _e[1];
    var _f = useState(), rooms = _f[0], setRooms = _f[1];
    var loadRoomData = function () {
        var rooms = [];
        var Resources = AgiActiveGame.agiExecute('Get Resources', 'Resources');
        for (var i = 0; i < 10000; i++) {
            try {
                // @ts-ignore
                var pic = Resources.readAgiResource(Resources.AgiResource.Pic, i);
                if (pic) {
                    rooms.push(i);
                }
            }
            catch (err) { }
        }
        setRooms(rooms);
        setRoomCount(rooms.length);
        setIsFetching(false);
    };
    useEffect(function () {
        setInterval(function () {
            loadRoomData();
        }, 3 * 1000);
    }, []);
    useEffect(function () {
        loadRoomData();
    }, [currentUrlPath, AgiActiveGame.currentRoom()]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClickNewRoom = function (room) {
        AgiActiveGame.agiExecute('New Room', 'Agi.interpreter.newroom = ' + room);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Room Selector' },
            React.createElement(Badge, { badgeContent: roomCount > 0 ? roomCount : null, color: "primary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                    React.createElement(AccountTreeRoundedIcon, null)),
                isFetching && (React.createElement(CircularProgress, { size: void 0, value: 100, variant: 'determinate', style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none' } })))),
        React.createElement(Menu, { id: "demo-positioned-menu", "aria-labelledby": "demo-positioned-button", anchorEl: anchorEl, open: open, onClose: handleClose, anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
            } },
            React.createElement(MenuList, { dense: true, sx: { width: 320 } }, rooms === null || rooms === void 0 ? void 0 : rooms.map(function (room, idx) { return (React.createElement(React.Fragment, null,
                React.createElement(MenuItem, { onClick: function (event) { return handleClickNewRoom(room); } },
                    React.createElement("strong", null,
                        "Room ",
                        room)))); })))));
}

var AgiSound = /** @class */ (function () {
    function AgiSound() {
    }
    AgiSound.decodeSound = function (id) {
        var soundStream = AgiActiveGame.agiExecute('Get Sound Stream', 'Resources.readAgiResource(Resources.AgiResource.Sound, ' + id + ')');
        var decodedSound = '';
        if (soundStream) {
            decodedSound = AgiSound.decodeSoundStream(soundStream);
        }
        return decodedSound;
    };
    AgiSound.encodeSoundData = function (data) {
        var encodedBuffer = new Uint8Array(100000);
        var position = 0;
        var soundData = data.soundData;
        // create the voice indexes
        // for now lets set all the voices to the same data
        var os = 4;
        encodedBuffer[position++] = os;
        encodedBuffer[position++] = os;
        encodedBuffer[position++] = os;
        encodedBuffer[position++] = os;
        for (var i = 0; i < soundData.length; i++) {
            var voiceData1 = soundData[i][0];
            soundData[i][0];
            soundData[i][0];
            soundData[i][0];
            // voice 1
            encodedBuffer[position++] = voiceData1.duration >> 8; // message index hi
            encodedBuffer[position++] = voiceData1.duration & (0xffff >> 8); // lo
            encodedBuffer[position++] = voiceData1.noteHi; // freq hi
            encodedBuffer[position++] = voiceData1.noteLow; // freq low
            encodedBuffer[position++] = voiceData1.maxNoteLow; // max note low
        }
        /* 0xFF 0xFF marks the end of the audio */
        encodedBuffer[position++] = 0xff;
        encodedBuffer[position++] = 0xff;
        encodedBuffer[position++] = 0xff;
        encodedBuffer[position++] = 0xff;
        // right size the buffer
        var rightsizedBuffer = new Uint8Array(position);
        for (var l = 0; l < position; l++) {
            rightsizedBuffer[l] = encodedBuffer[l];
        }
        return rightsizedBuffer;
    };
    AgiSound.playSound = function (soundData) {
        var audioCtx = new AudioContext();
        var oscillator = audioCtx.createOscillator();
        oscillator.connect(audioCtx.destination);
        //@ts-ignore
        oscillator.type = 'sign';
        oscillator.start();
        for (var i = 0; i < soundData.length; i++) {
            try {
                var frame = soundData[i][0];
                var duration = frame.duration;
                if (duration == 65535) {
                    break;
                }
                var frequency = 99320 / (((frame.noteHi & 0x3f) << 4) + (frame.noteLow & 0x0f));
                oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // value in hertz
                var now = new Date().getTime();
                while (new Date().getTime() < now + duration / 10) { }
            }
            catch (err) {
                // usually this is caused by a frequency issue. Ignore it.
            }
        }
        oscillator.stop();
    };
    AgiSound.decodeSoundStream = function (data) {
        var readNextFrame = true;
        var frame = -1;
        var soundObj = {};
        //@ts-ignore
        soundObj.soundData = [];
        var headerOffset = 0; //4;
        while (readNextFrame) {
            frame = frame + 1; // starts at -1 so first frame is 0
            var littleEndian = false;
            // read the header
            data.position = headerOffset;
            var v1Offest = data.readUint8();
            data.readUint8();
            data.readUint8();
            data.readUint8();
            // VOICE 1
            // calculate the frame
            var frameffset = frame * 5;
            data.position = v1Offest + frameffset;
            // Get the frequency for the duration frame
            var duration1 = data.readUint16(littleEndian);
            var noteHigh1 = data.readUint8();
            var noteLow1 = data.readUint8();
            var maxNoteLow1 = data.readUint8();
            // decode the frequency
            // var frequency1 = 99320 / (((noteHigh1 & 0x3f) << 4) + (noteLow1 & 0x0f));
            // // VOICE 2
            // // calculate the frame
            // data.position = v2Offest + frame * 5;
            // // Get the frequency for the duration frame
            // var duration2 = data.readUint16(littleEndian);
            // var noteHigh2 = data.readUint8(littleEndian);
            // var noteLow2 = data.readUint8(littleEndian);
            // var maxNoteLow2 = data.readUint8(littleEndian);
            // // decode the frequency
            // var frequency2 = 99320 / (((noteHigh2 & 0x3f) << 4) + (noteLow2 & 0x0f));
            // VOICE 3
            // calculate the frame
            // data.position = v3Offest + frame * 5;
            // // Get the frequency for the duration frame
            // var duration3 = data.readUint16(littleEndian);
            // var noteHigh3 = data.readUint8(littleEndian);
            // var noteLow3 = data.readUint8(littleEndian);
            // var maxNoteLow3 = data.readUint8(littleEndian);
            // // decode the frequency
            // var frequency3 = 99320 / (((noteHigh3 & 0x3f) << 4) + (noteLow3 & 0x0f));
            // // VOICE 4
            // // calculate the frame
            // data.position = v4Offest + frame * 5;
            // // Get the frequency for the duration frame
            // var duration4 = data.readUint16(littleEndian);
            // var noteHigh4 = data.readUint8(littleEndian);
            // var noteLow4 = data.readUint8(littleEndian);
            // var maxNoteLow4 = data.readUint8(littleEndian);
            // decode the frequency
            // var frequency4 = 99320 / (((noteHigh4 & 0x3f) << 4) + (noteLow4 & 0x0f));
            //@ts-ignore
            soundObj.soundData.push([
                { duration: duration1, noteHi: noteHigh1, noteLow: noteLow1, maxNoteLow: maxNoteLow1 }
                //   { frequency: frequency2, duration: duration2, noteHi: noteHigh2, noteLow: noteLow2, maxNoteLow: maxNoteLow2 },
                //   { frequency: frequency3, duration: duration3, noteHi: noteHigh3, noteLow: noteLow3, maxNoteLow: maxNoteLow3 },
                //   { frequency: frequency4, duration: duration4, noteHi: noteHigh4, noteLow: noteLow4, maxNoteLow: maxNoteLow4 }
            ]);
            if (duration1 == 65535 /* 0xFF 0xFF */) {
                // marks the end of the audio
                readNextFrame = false;
            }
        }
        //@ts-ignore
        soundObj.soundData.push([
            { frequency: 0, duration: 65535, noteHi: 0, noteLow: 0, maxNoteLow: 0 }
            // { frequency: 0, duration: 65535, noteHi: 0, noteLow: 0, maxNoteLow: 0 },
            // { frequency: 0, duration: 65535, noteHi: 0, noteLow: 0, maxNoteLow: 0 },
            // { frequency: 0, duration: 65535, noteHi: 0, noteLow: 0, maxNoteLow: 0 }
        ]);
        return JSON.stringify(soundObj);
    };
    return AgiSound;
}());

function SoundSelector(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; _c[1];
    var _d = React.useState(false), isFetching = _d[0]; _d[1];
    var _e = React.useState(0), soundCount = _e[0], setSoundCount = _e[1];
    var _f = React.useState([]), availableSounds = _f[0], setAvailableSounds = _f[1];
    var _g = React.useState(null); _g[0]; _g[1];
    var getSoundFilesForGame = function () {
        var gameId = AgiActiveGame.getActiveGameId();
        var serviceUrl = "/api/1/site/content_store/children.json?url=/static-assets/games/".concat(gameId, "/src/sound");
        get(serviceUrl).subscribe({
            next: function (response) {
                //@ts-ignore
                var sounds = [];
                //@ts-ignore
                response.response.forEach(function (item) {
                    sounds.push({ name: item.name, url: item.url });
                });
                setAvailableSounds(sounds);
                setSoundCount(sounds.length);
            },
            error: function (e) { }
        });
    };
    var getSoundFileForGame = function (url) {
        var serviceUrl = url;
        get(serviceUrl).subscribe({
            next: function (response) {
                playSound(response.response.soundData);
            },
            error: function (e) { }
        });
    };
    useEffect(function () {
        getSoundFilesForGame();
    }, []);
    useEffect(function () {
        getSoundFilesForGame();
    }, [currentUrlPath, AgiActiveGame.currentRoom()]);
    var handleClick = function (event) {
        // open and close the menu
        setAnchorEl(event.currentTarget);
    };
    var handleClickPlaySound = function (event) {
        AgiActiveGame.getActiveGameId();
        var sound = availableSounds[event.target.value];
        getSoundFileForGame(sound.url);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var playSound = function (soundData) {
        AgiSound.playSound(soundData);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Sound Selector' },
            React.createElement(Badge, { badgeContent: soundCount > 0 ? soundCount : null, color: "secondary", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                    React.createElement(AudiotrackRoundedIcon, null)),
                isFetching && (React.createElement(CircularProgress, { size: void 0, value: 100, variant: 'determinate', style: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none' } })))),
        React.createElement(Menu, { id: "demo-positioned-menu", "aria-labelledby": "demo-positioned-button", anchorEl: anchorEl, open: open, onClose: handleClose, anchorOrigin: {
                vertical: 'top',
                horizontal: 'left'
            }, transformOrigin: {
                vertical: 'top',
                horizontal: 'left'
            } },
            React.createElement(MenuList, { dense: true, sx: { width: 320 } }, availableSounds === null || availableSounds === void 0 ? void 0 : availableSounds.map(function (sound, idx) { return (React.createElement(MenuItem, { onClick: handleClickPlaySound, value: idx }, sound.name)); })))));
}

function SetEgoPosition(props) {
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var x = prompt('X coordinate');
        var y = prompt('Y coordinate');
        if (x && y && x != '' && y != '') {
            AgiActiveGame.agiExecute('Set Ego X Coordinate', 'Agi.interpreter.gameObjects[0].x=' + x);
            AgiActiveGame.agiExecute('Set Ego Y Coordinate', 'Agi.interpreter.gameObjects[0].y=' + y);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Set Ego Position' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(ControlCameraRoundedIcon, null)))));
}

function ShowPriorityBuffer(props) {
    useDispatch();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        AgiActiveGame.agiExecute('Get buffer mode', 'Agi.interpreter.gbm = (Agi.interpreter.gbm && Agi.interpreter.gbm==1) ? 0 : 1');
        AgiActiveGame.agiExecute('Keep Orig Visual Buffer', 'Agi.interpreter.gvb = (!Agi.interpreter.gvb) ? Agi.interpreter.visualBuffer : Agi.interpreter.gvb');
        AgiActiveGame.agiExecute('Set Visual Buffer', 'Agi.interpreter.visualBuffer = (Agi.interpreter.gbm==1) ? Agi.interpreter.priorityBuffer : Agi.interpreter.gvb');
        AgiActiveGame.agiExecute('Re-Render the room', 'Agi.interpreter.newroom = Agi.interpreter.variables[0]');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Show Priority Buffer' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(CopyAllRoundedIcon, null)))));
}

function ShowWords(props) {
    useDispatch();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState([]), words = _c[0], setWords = _c[1];
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var words = AgiActiveGame.agiExecute('Get Words', 'Resources.words');
        var wrdTxt = "{";
        words.forEach(function (wrds, idx) {
            wrdTxt += "\"" + idx + "\": [\"" + wrds.join("\", \"") + "\"],";
        });
        wrdTxt += "}";
        console.log(wrdTxt);
        setWords(words);
        setDialogOpen(true);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Words"),
            React.createElement(DialogContent, null,
                React.createElement("table", { style: { width: '100%' } },
                    React.createElement("th", null, "Word Group"),
                    React.createElement("th", null, "Words"),
                    words
                        .map(function (words, i) { return (React.createElement(React.Fragment, null,
                        React.createElement("tr", { style: { width: '100%' } },
                            React.createElement("td", null,
                                React.createElement("h1", null, i)),
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 10, defaultValue: words.join("\n") }))))); })))),
        React.createElement(Tooltip, { title: 'Show Words' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(SpeakerNotesRoundedIcon, null)))));
}

function CurrentRoom(props) {
    useDispatch();
    useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = usePreviewNavigation().currentUrlPath, currentUrlPath = _b === void 0 ? '' : _b;
    var _c = useState(currentUrlPath); _c[0]; var setInternalUrl = _c[1];
    var _d = useState(-1), currentRoom = _d[0], setCurrentRoom = _d[1];
    var loadRoomData = function () {
        var roomValue = AgiActiveGame.currentRoom();
        var roomInt = (parseInt(roomValue)) ? roomValue : -1;
        setCurrentRoom(roomInt);
    };
    useEffect(function () {
        setInterval(function () {
            loadRoomData();
        }, 3 * 1000);
    }, []);
    useEffect(function () {
        currentUrlPath && setInternalUrl(currentUrlPath);
        loadRoomData();
    }, [currentUrlPath]);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        AgiActiveGame.agiExecute('Reload Current Room', 'Agi.interpreter.newroom = currentRoom');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Reload Current Room' },
            React.createElement(Badge, { badgeContent: currentRoom != -1 ? currentRoom : null, color: "success", overlap: "circular", style: { position: 'relative' } },
                React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                    React.createElement(RoomRoundedIcon, null))))));
}

var AgiLogic = /** @class */ (function () {
    function AgiLogic() {
    }
    AgiLogic.lookupSaidWordId = function (word, words) {
        var wordId = 1;
        word = word.substring(word.indexOf('"'), word.lastIndexOf('"') + 1).replaceAll('"', '');
        var wordKeys = Object.keys(words);
        wordKeys.forEach(function (wordKey) {
            var wordArray = words[wordKey];
            if (wordArray && wordArray.indexOf(word) != -1) {
                wordId = parseInt(wordKey);
            }
        });
        return wordId;
    };
    AgiLogic.testFunctions = [
        'equaln',
        'equalv',
        'lessn',
        'lessv',
        'greatern',
        'greaterv',
        'isset',
        'issetv',
        'has',
        'obj_in_room',
        'posn',
        'controller',
        'have_key',
        'said',
        'compare_strings',
        'obj_in_box',
        'center_posn',
        'right_posn'
    ];
    AgiLogic.statementFunctions = [
        'return',
        'increment',
        'decrement',
        'assignn',
        'assignv',
        'addn',
        'addv',
        'subn',
        'subv',
        'lindirectv',
        'rindirect',
        'lindirectn',
        'set',
        'reset',
        'toggle',
        'set_v',
        'reset_v',
        'toggle_v',
        'new_room',
        'new_room_v',
        'load_logic',
        'load_logic_v',
        'call',
        'call_v',
        'load_pic',
        'draw_pic',
        'show_pic',
        'discard_pic',
        'overlay_pic',
        'show_pri_screen',
        'load_view',
        'load_view_v',
        'discard_view',
        'animate_obj',
        'unanimate_all',
        'draw',
        'erase',
        'position',
        'position_v',
        'get_posn',
        'reposition',
        'set_view',
        'set_view_v',
        'set_loop',
        'set_loop_v',
        'fix_loop',
        'release_loop',
        'set_cel',
        'set_cel_v',
        'last_cel',
        'current_cel',
        'current_loop',
        'current_view',
        'number_of_loops',
        'set_priority',
        'set_priority_v',
        'release_priority',
        'get_priority',
        'stop_update',
        'start_update',
        'force_update',
        'ignore_horizon',
        'observe_horizon',
        'set_horizon',
        'object_on_water',
        'object_on_land',
        'object_on_anything',
        'ignore_objs',
        'observe_objs',
        'distance',
        'stop_cycling',
        'start_cycling',
        'normal_cycle',
        'end_of_loop',
        'reverse_cycle',
        'reverse_loop',
        'cycle_time',
        'stop_motion',
        'start_motion',
        'step_size',
        'step_time',
        'move_obj',
        'move_obj_v',
        'follow_ego',
        'wander',
        'normal_motion',
        'set_dir',
        'get_dir',
        'ignore_blocks',
        'observe_blocks',
        'block',
        'unblock',
        'get',
        'get_v',
        'drop',
        'put',
        'put_v',
        'get_room_v',
        'load_sound',
        'sound',
        'stop_sound',
        'print',
        'print_v',
        'display',
        'display_v',
        'clear_lines',
        'text_screen',
        'graphics',
        'set_cursor_char',
        'set_text_attribute',
        'shake_screen',
        'configure_screen',
        'status_line_on',
        'status_line_off',
        'set_string',
        'get_string',
        'word_to_string',
        'parse',
        'get_num',
        'prevent_input',
        'accept_input',
        'set_key',
        'add_to_pic',
        'add_to_pic_v',
        'status',
        'save_game',
        'restore_game',
        'init_disk',
        'restart_game',
        'show_obj',
        'random',
        'program_control',
        'player_control',
        'obj_status_v',
        'quit',
        'show_mem',
        'pause',
        'echo_line',
        'cancel_line',
        'init_joy',
        'toggle_monitor',
        'version',
        'script_size',
        'set_game_id',
        'log',
        'set_scan_start',
        'reset_scan_start',
        'reposition_to',
        'reposition_to_v',
        'trace_on',
        'trace_info',
        'print_at',
        'print_at_v',
        'discard_view_v',
        'clear_text_rect',
        'set_upper_left',
        'set_menu',
        'set_menu_member',
        'submit_menu',
        'enable_member',
        'disable_member',
        'menu_input',
        'show_obj_v',
        'open_dialogue',
        'close_dialogue',
        'mul_n',
        'mul_v',
        'div_n',
        'div_v',
        'close_window',
        'set_simple',
        'push_script',
        'pop_script',
        'hold_key',
        'set_pri_base',
        'discard_sound',
        'hide_mouse',
        'allow_menu',
        'show_mouse',
        'fence_mouse',
        'mouse_posn',
        'release_key',
        'adj_ego_move_to_xy'
    ];
    AgiLogic.prettyPrintCode = function (lines) {
        var code = '';
        lines.forEach(function (line) {
            if (line == '{') {
                code += ' ';
            }
            else {
                code += '\n';
            }
            code += line;
        });
        return code;
    };
    AgiLogic.newLogicFromBuffer = function (buffer) {
        var Agi = AgiActiveGame.agiExecute('Get Agi', 'Agi');
        // load room 1 logic and manipulate it into a "new" logic
        var logic = new Agi.LogicParser(Agi.interpreter, 1);
        var Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
        new Fs.ByteStream(buffer, 0);
        logic.logic.data = buffer; //bStreamBuffer
        logic.messages = [];
        logic.logic.messages = [];
        logic.messagesStartOffset = buffer.buffer[1];
        logic.logic.data.position = 0;
        // create the message array
        var numMessages = buffer.buffer[logic.messagesStartOffset];
        buffer.buffer[logic.messagesStartOffset + 1];
        for (var i = 0; i < numMessages; i++) {
            var msgPtr = buffer.buffer[logic.messagesStartOffset + 2 + i];
            var msgByte = -1;
            var msg = '';
            var msgByteIdx = 0;
            while (msgByte != 0) {
                msgByte = buffer.buffer[msgPtr + msgByteIdx++];
                if (msgByte != 0)
                    msg += String.fromCharCode(msgByte);
            }
            logic.logic.messages[logic.logic.messages.length] = msg;
            logic.messages[logic.messages.length] = msg;
        }
        logic.decompile();
        return logic;
    };
    AgiLogic.decompile = function (binary, logic) {
        var lines = [];
        if (logic) {
            var program = logic.decompile();
            AgiLogic.decompileScope(binary, logic.logic.messages, program, lines, 0);
            var m = 1;
            logic.logic.messages.forEach(function (msg) {
                lines.push('#message ' + m + ' "' + msg + '"');
                m++;
            });
        }
        return lines;
    };
    AgiLogic.decompileScope = function (binary, messages, scope, lines, depth) {
        scope.body.forEach(function (node) {
            lines.push('\t'.repeat(depth) + AgiLogic.decompileNode(binary, messages, node));
            if (node.then) {
                lines.push('{');
                AgiLogic.decompileScope(binary, messages, node.then, lines, depth + 1);
                lines.push('\t'.repeat(depth) + '}');
            }
            if (node.else) {
                lines.push('\t'.repeat(depth) + 'else {');
                AgiLogic.decompileScope(binary, messages, node.else, lines, depth + 1);
                lines.push('\t'.repeat(depth) + '}');
            }
        });
        return lines;
    };
    AgiLogic.decompileExpression = function (expression) {
        var line = '';
        var opCode = expression.opcode;
        var args = expression.args;
        var negate = expression.negate;
        var right = expression.right;
        var left = expression.left;
        //} else if (opCode == 0xfd) { //line += '!';
        if (left && right) {
            line += AgiLogic.decompileExpression(left);
            line += left.constructor.name == 'AndNode' ? ' && ' : ' || ';
            line += AgiLogic.decompileExpression(right);
        }
        else {
            var funcName = AgiLogic.testFunctions[opCode - 1];
            line = (negate ? '!' : '') + funcName + '(';
            if (opCode === 13) {
                line += expression.byteOffset;
            }
            else {
                if (args) {
                    var testVars = AgiLogic.processArgNames(funcName, true, args, []);
                    for (var a = 0; a < testVars.length; a++) {
                        var arg = testVars[a];
                        if (a > 0)
                            line += ', ';
                        line += arg;
                    }
                }
            }
            line += ')';
        }
        return line;
    };
    AgiLogic.processArgNames = function (funcName, isTest, args, messages) {
        var values = [];
        for (var i = 0; i < args.length; i++) {
            var value = args[i];
            if (i == 0) {
                if (isTest == true) {
                    if (funcName.startsWith('isset'))
                        value = 'f' + value;
                    else
                        value = 'v' + value;
                }
                else {
                    if (funcName === 'print')
                        value = '"' + messages[parseInt(value) - 1] + '"';
                    else if (funcName.startsWith('set_menu'))
                        value = '"' + messages[parseInt(value) - 1] + '"';
                    else if (funcName.startsWith('set'))
                        value = 'f' + value;
                    else if (funcName.startsWith('assign'))
                        value = 'v' + value;
                }
            }
            else {
                if (!isTest) {
                    if (!funcName.startsWith('assign')) {
                        if (funcName.endsWith('v'))
                            value = 'v' + value;
                        else if (funcName == 'set_menu_member')
                            value = 'c' + value;
                    }
                }
            }
            values.push(value);
        }
        return values;
    };
    AgiLogic.decompileNode = function (binary, messages, node) {
        var line = '';
        var opCode = node.opcode;
        var byteOffset = node.byteOffset; // ast node
        var statement = node.statement; // statement
        var args = node.args; // test and statement
        var expression = node.expression; // if
        if (opCode == 0x00) {
            line = 'return;';
        }
        else if (opCode == 0xff) {
            line = 'if(';
            line += AgiLogic.decompileExpression(expression);
            line += ')';
        }
        else if (opCode == 0xfe) {
            if (node.expression) {
                line = 'else (';
                line += AgiLogic.decompileExpression(expression);
                line += ')';
            }
            else {
                line += 'goto';
            }
        }
        else if (opCode == 0x0e) {
            line = 'said';
            // this does not seem to get called because
            // it's getting addressed in the if logic
        }
        else {
            var funcName = AgiLogic.statementFunctions[opCode];
            line += funcName;
            line += '(';
            if (args) {
                line += args;
            }
            else {
                var statementArgs = [];
                for (var i = 0; i < statement.length; i++) {
                    statementArgs.push(AgiLogic.getValueAtOffset(binary, byteOffset - statement.length + i));
                }
                var statementArgsx = AgiLogic.processArgNames(funcName, false, statementArgs, messages);
                for (var a = 0; a < statementArgsx.length; a++) {
                    var arg = statementArgsx[a];
                    if (a > 0)
                        line += ', ';
                    line += arg;
                }
            }
            line += ');';
        }
        return line;
    };
    AgiLogic.getValueAtOffset = function (binary, offset) {
        binary.position = offset;
        return binary.readUint8();
    };
    AgiLogic.prepareCodeForCompile = function (logicCode, include) {
        logicCode - logicCode.replace('#include "0-defines.aqi"', include);
        logicCode = logicCode.replaceAll('\t', '');
        var finalLines = [];
        var lines = logicCode.split(/\r?\n/);
        for (var i = 0; i < lines.length; i++) {
            var codeLine = lines[i];
            codeLine = codeLine.replace(/\s+(?=([^"]*"[^"]*")*[^"]*$)/g, '');
            if (!codeLine.startsWith('//') && !codeLine.startsWith('#') && codeLine != '') {
                finalLines.push(codeLine);
            }
        }
        return finalLines;
    };
    AgiLogic.prepareMessageTableForCompile = function (logicCode) {
        var messageTable = [];
        var lines = logicCode.split(/\r?\n/);
        lines.forEach(function (lineToParse) {
            if (lineToParse.indexOf('#message') != -1 || lineToParse.indexOf('print(') != -1) {
                var msg = lineToParse.substring(lineToParse.indexOf('"'), lineToParse.lastIndexOf('"') + 1).replaceAll('"', '');
                messageTable[messageTable.length] = msg;
            }
        });
        return messageTable;
    };
    AgiLogic.prepareDefineTableForCompile = function (logicCode, include) {
        var defineMap = [];
        var defineTableStr = include + '\n' + logicCode;
        var defineLines = defineTableStr.split(/\r?\n/);
        defineLines.forEach(function (lineToParse) {
            if (lineToParse.indexOf('#define') != -1) {
                var defineLine = lineToParse.replaceAll('#define ', '');
                var defineParts = defineLine.split(' ');
                defineMap[defineParts[0]] = defineParts[1];
            }
        });
        return defineMap;
    };
    AgiLogic.encodeLogic = function (lines, buffer, position, messageTable, defineMap, words) {
        var scopeStack = [];
        lines.forEach(function (line) {
            var lineToParse = line;
            lineToParse = lineToParse.replaceAll('\t', '');
            var command = '';
            try {
                if (lineToParse.indexOf('(') != -1) {
                    // function or if statement
                    command = lineToParse.substring(0, lineToParse.indexOf('('));
                    command = command.toLowerCase();
                }
                else {
                    // other
                    command = lineToParse;
                }
                var opCode = -1;
                var args_1 = [];
                if (command === 'return') {
                    opCode = 0x00;
                }
                else if (command === 'if') {
                    //console.log('DOING AN IF');
                    opCode = 0xff;
                    var testStr = lineToParse.replace('if(', '').replace('){', '');
                    var testStrArray = testStr.split(/\|\||\&\&/);
                    testStrArray.forEach(function (testStr) {
                        // 0xFC OR
                        // 0xFD AND
                        // NEGATED?
                        var negated = false;
                        var compareCommand = testStr.substring(0, testStr.indexOf('('));
                        if (compareCommand.substring(0, 1) == '!') {
                            negated = true;
                            compareCommand = compareCommand.substring(1);
                            args_1[args_1.length] = 0xfd; // negated
                        }
                        var compOpCode = AgiLogic.testFunctions.indexOf(compareCommand.replaceAll('.', '_')) + 1;
                        var compareArgsStr = testStr.substring(testStr.indexOf('(') + 1, testStr.indexOf(')'));
                        var compareArgs = compareArgsStr.split(',');
                        if (compOpCode === 14) {
                            // Said is treated differently because its args are are variable and 16-byte
                            args_1[args_1.length] = 14; //0x0e; // op code for said
                            args_1[args_1.length] = compareArgs.length; // number of params
                            compareArgs.forEach(function (arg) {
                                var wordId = AgiLogic.lookupSaidWordId(arg, words);
                                args_1[args_1.length] = wordId & (0xffff >> 8); // hi param
                                args_1[args_1.length] = wordId >> 8; // lo param
                            });
                        }
                        else {
                            args_1[args_1.length] = compOpCode;
                            compareArgs.forEach(function (arg) {
                                var defineHit = defineMap[arg];
                                var argAsNum = defineHit ? parseInt(defineHit) : parseInt(arg);
                                if (arg != "") {
                                    if (isNaN(argAsNum)) {
                                        alert("Build failed due to bad symbol: '" + arg + "'");
                                        throw new DOMException("Build failed due to bad symbol: '" + arg + "'");
                                    }
                                    else {
                                        args_1[args_1.length] = isNaN(argAsNum) ? arg : argAsNum;
                                    }
                                }
                            });
                        }
                    });
                    args_1[args_1.length] = 0xff; // close the if clause if(....)
                    args_1[args_1.length] = 0x00; // length of scope
                    args_1[args_1.length] = 0x00; // length of scope
                    scopeStack.push(position + 1 + args_1.length);
                }
                else if (lineToParse.indexOf('else{') != -1) {
                    opCode = 0xfe;
                    // else increases the if open scope by 3 bytes
                    scopeStack[scopeStack.length - 1] += 3;
                    // now open the next scope
                    args_1[args_1.length] = 0x00; // length of scope
                    args_1[args_1.length] = 0x00; // length of scope
                    scopeStack.push(position + 1);
                    //console.log('DOING ELSE');
                }
                else if (command === '}') {
                    // close of scope, nothng to do
                    var curOpenScopePosition = scopeStack.pop();
                    var byteCount = position - curOpenScopePosition;
                    buffer[curOpenScopePosition - 2] = byteCount;
                    //console.log('CLOSING A SCOPE');
                }
                else if (command.indexOf('#message') != -1) {
                    // messages and defines handled before this processing
                }
                else {
                    opCode = AgiLogic.statementFunctions.indexOf(command.replaceAll('.', '_'));
                    var argsStr = lineToParse.replaceAll(command, '');
                    argsStr = argsStr.replace('(', '').replace(')', '');
                    args_1 = argsStr != '' ? argsStr.split(',') : [];
                    // convert argments that are strings to ID in message tabel
                    var argIdx_1 = 0;
                    args_1.forEach(function (arg) {
                        if (arg.indexOf('"') != -1) {
                            var msg = arg.replaceAll('"', '');
                            var msgId = messageTable.indexOf(msg) + 1;
                            if (msgId != -1) {
                                args_1[argIdx_1++] = msgId;
                            }
                        }
                        else {
                            var defineHit = defineMap[arg];
                            var argAsNum = defineHit ? parseInt(defineHit) : parseInt(arg);
                            if (isNaN(argAsNum)) {
                                alert("Build failed due to bad symbol: '" + arg + "'");
                                throw new DOMException("Build failed due to bad symbol: '" + arg + "'");
                            }
                            else {
                                args_1[argIdx_1++] = isNaN(argAsNum) ? arg : argAsNum;
                            }
                        }
                    });
                }
                if (opCode != -1) {
                    buffer[position] = opCode;
                    position++;
                    args_1.forEach(function (arg) {
                        buffer[position] = arg;
                        position++;
                    });
                    //console.log('opcode :' + command + ' => ' + opCode + ' | ' + args);
                }
            }
            catch (err) {
                console.log('err parsing command :' + line + ' => ' + command);
            }
        });
        return position;
    };
    AgiLogic.compile = function (logicCode, words, include) {
        // for now, no need to support multiple includes
        // prepare code
        var lines = AgiLogic.prepareCodeForCompile(logicCode, include);
        var messageTable = AgiLogic.prepareMessageTableForCompile(logicCode);
        var defineMap = AgiLogic.prepareDefineTableForCompile(logicCode, include);
        var buffer = new Uint8Array(80000);
        var position = 0;
        // Encode messages
        position = AgiLogic.encodeLogic(lines, buffer, position, messageTable, defineMap, words);
        // create a final buffer of the correct size and populate it
        var rightSizedBuffer = new Uint8Array(position);
        for (var i = 0; i < position; i++) {
            rightSizedBuffer[i] = buffer[i];
        }
        var Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
        var bStreamBuffer = new Fs.ByteStream(rightSizedBuffer, 0);
        return bStreamBuffer;
    };
    AgiLogic.encodeMessages = function (logicCode, startPos) {
        // Byte  Meaning
        // ----- -----------------------------------------------------------
        //   0   Number of messages
        //  1-2  Pointer to end of messages
        //  3-4  A list of offsets which point to each of the messages. The
        //       first offset naturally enough points to the start of the
        //       textual data
        //  ...
        //   ?   Start of the text data. From this point the messages are
        //       encrypted with Avis Durgan (in their unencrypted form, each
        //       message is separated by a 0x00 value)
        // ----- -----------------------------------------------------------
        var messageTable = AgiLogic.prepareMessageTableForCompile(logicCode);
        var decryptionKey = 'Avis Durgan';
        var position = 0;
        var buffer = new Uint8Array(8000);
        buffer[position++] = messageTable.length;
        buffer[position++] = 0;
        buffer[position++] = 0;
        var messageOffsetSectionStartPos = position; // capture where message pointer table begins
        position += 2 * messageTable.length; // make space for message pointres
        // now add the messages to the buffer
        var decryptionIndex = 0;
        for (var k = 0; k < messageTable.length; k++) {
            var message = messageTable[k];
            var mssageStartPos = position - 1;
            buffer[messageOffsetSectionStartPos + k * 2] = mssageStartPos & (0xffff >> 8); // message index lo
            buffer[messageOffsetSectionStartPos + k * 2 + 1] = mssageStartPos >> 8; // message index hi
            for (var j = 0; j < message.length; j++) {
                var encryptedChar = decryptionKey[decryptionIndex].charCodeAt(0) ^ message[j].charCodeAt(0);
                buffer[position++] = encryptedChar;
                decryptionIndex = decryptionIndex + 1;
                if (decryptionIndex == decryptionKey.length) {
                    decryptionIndex = 0;
                }
            }
            buffer[position++] = decryptionKey[decryptionIndex].charCodeAt(0) ^ '\0'.charCodeAt(0); // mark the end of the message
            decryptionIndex = decryptionIndex + 1;
            if (decryptionIndex == decryptionKey.length) {
                decryptionIndex = 0;
            }
        }
        // note where message structure ends
        buffer[1] = position & (0xffff >> 8); // lo
        buffer[2] = position >> 8; // hi
        // create a final buffer of the correct size and populate it
        var rightSizedBuffer = new Uint8Array(position);
        for (var i = 0; i < position; i++) {
            rightSizedBuffer[i] = buffer[i];
        }
        var Fs = AgiActiveGame.agiExecute('Get Fs', 'Fs');
        var bStreamBuffer = new Fs.ByteStream(rightSizedBuffer, 0);
        return bStreamBuffer;
    };
    AgiLogic.encodeWords = function (data) {
        var wordGroups = Object.keys(data);
        var wordsBuffer = new Uint8Array(10000);
        // Byte  Meaning
        // ----- -----------------------------------------------------------
        //  0-1  Hi and then Lo byte for 'A' offset
        //  ...
        // 50-51 Hi and then Lo byte for 'Z' offset
        //  52   Words section
        // ----- -----------------------------------------------------------
        var position = 52; // make room for index
        // Byte  Meaning
        // ----- -----------------------------------------------------------
        //   0   Number of characters to include from start of prevous word
        //   1   Char 1 (xor 0x7F gives the ASCII code for the character)
        //   2   Char 2
        //  ...
        //   n   Last char
        //  n+1  Wordnum (LO-HI) -- see below
        // ----- -----------------------------------------------------------
        wordGroups.forEach(function (wordKey) {
            var wordArray = data[wordKey];
            if (wordArray) {
                for (var i = 0; i < wordArray.length; i++) {
                    var curWord = wordArray[i];
                    wordsBuffer[position++] = 0;
                    for (var j = 0; j < curWord.length; j++) {
                        var curChar = curWord[j].charCodeAt(0);
                        var encChar = curChar;
                        if (j == curWord.length - 1) {
                            encChar = (curChar + 128) ^ 127;
                        }
                        else {
                            encChar = curChar ^ 127;
                        }
                        wordsBuffer[position++] = encChar;
                    }
                    var wordKeyNum = parseInt(wordKey);
                    var wordKeyNumLE = wordKeyNum;
                    wordsBuffer[position++] = wordKeyNumLE >> 8;
                    wordsBuffer[position++] = wordKeyNumLE & (0xffff >> 8);
                }
            }
        });
        var rightSizedBuffer = new Uint8Array(position);
        for (var i = 0; i < position; i++) {
            rightSizedBuffer[i] = wordsBuffer[i];
        }
        return rightSizedBuffer;
    };
    AgiLogic.encodeObjects = function (data) {
        var objectsBuffer = new Uint8Array(10000);
        var position = 0;
        // Byte  Meaning
        // ----- -----------------------------------------------------------
        //  0-1  Offset of the start of inventory item names
        //   2   Maximum number of animated objects
        // ----- -----------------------------------------------------------
        // Following the first three bytes as a section containing a three byte entry for each inventory
        // item all of which conform to the following format:
        var namesPos = data.objects.length * 3 + 3;
        objectsBuffer[position++] = namesPos >> 8;
        objectsBuffer[position++] = namesPos & (0xffff >> 8);
        objectsBuffer[position++] = 15;
        var decryptionIndex = 0;
        var decryptionKey = 'Avis Durgan';
        // Byte  Meaning
        // ----- -----------------------------------------------------------
        //  0-1  Offset of inventory item name i
        //   2   Starting room number for inventory item i or 255 carried
        // ----- -----------------------------------------------------------
        // where i is the entry number starting at 0. All offsets are taken from the start of entry for inventory item 0
        // (not the start of the file).
        // Then comes the textual names themselves. This is simply a list of NULL terminated strings.
        // The offsets mentioned in the above section point to the first character in the string and the last character is the
        // one before the 0x00.
        position = namesPos; // make room for header
        // now encode the names
        for (var i = 0; i < data.objects.length; i++) {
            var obj = data.objects[i];
            // console.log("Adding Inv object :"+obj.name)
            for (var j = 0; j < obj.name.length; j++) {
                var encryptedChar = decryptionKey[decryptionIndex++].charCodeAt(0) ^ obj.name[j].charCodeAt(0);
                objectsBuffer[position++] = encryptedChar;
                if (decryptionIndex == decryptionKey.length) {
                    decryptionIndex = 0;
                }
            }
            objectsBuffer[position++] = '\0'.charCodeAt(0);
            // update header records
            // var recordPos = i * 3;
            // objectsBuffer[recordPos] = offset >> 8;
            // objectsBuffer[recordPos + 1] = offset & (0xffff >> 8);
            // objectsBuffer[recordPos + 2] = obj.startingRoom;
        }
        var rightSizedBuffer = new Uint8Array(position);
        for (var i_1 = 0; i_1 < position; i_1++) {
            rightSizedBuffer[i_1] = objectsBuffer[i_1];
        }
        return rightSizedBuffer;
    };
    return AgiLogic;
}());

function ShowCode(props) {
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState(null), roomCode = _c[0], setRoomCode = _c[1];
    var _d = React.useState(""), compiledCode = _d[0], setCompiledCode = _d[1];
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var currentRoom = AgiActiveGame.currentRoom();
        var Agi = AgiActiveGame.agiExecute('Get Logic Array', 'Agi');
        var code = new Agi.LogicParser(Agi.interpreter, currentRoom);
        var codeData = AgiActiveGame.agiExecute('Get Binary', 'Resources.readAgiResource(Resources.AgiResource.Logic, ' + currentRoom + ')');
        var decompiledCode = AgiLogic.decompile(codeData, code);
        var prettyPrintedCode = AgiLogic.prettyPrintCode(decompiledCode);
        setRoomCode(prettyPrintedCode);
        setDialogOpen(true);
    };
    var handleSaveClick = function (event) {
        setAnchorEl(event.currentTarget);
        //let currentRoom = AgiLogic.compile(roomCode);
    };
    var handleCompileClick = function (event) {
        try {
            // let compiledCode = AgiLogic.compile(roomCode)
            var codeAsLogic = AgiLogic.newLogicFromBuffer(compiledCode);
            var reDecompiledForCheck = AgiLogic.decompile(compiledCode, codeAsLogic);
            var prettyPrinted = AgiLogic.prettyPrintCode(reDecompiledForCheck);
            setCompiledCode(prettyPrinted);
        }
        catch (err) {
            setCompiledCode("Error compiling and re-decompiling for check failed :" + err);
            console.log(err);
        }
    };
    var handleCommandUpdate = function (event) {
        setRoomCode(event.target.value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Logic Listing"),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: handleSaveClick }, "Compile and Save"),
                React.createElement(Button, { onClick: handleCompileClick }, "Compile and then Decompile")),
            React.createElement(DialogContent, null,
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 10, value: roomCode }),
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 1, onChange: handleCommandUpdate }),
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 10, defaultValue: compiledCode }))),
        React.createElement(Tooltip, { title: 'Show Code' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(DataObjectRoundedIcon, null)))));
}

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// region Batch Actions
const batchActions = /*#__PURE__*/ createAction('BATCH_ACTIONS');
// endregion
// region dispatch DOM Event
const dispatchDOMEvent = /*#__PURE__*/ createAction('DISPATCH_DOM_EVENT');
// endregion

/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// endregion
// region Upload Dialog
const showUploadDialog = /*#__PURE__*/ createAction('SHOW_UPLOAD_DIALOG');
const closeUploadDialog = /*#__PURE__*/ createAction('CLOSE_UPLOAD_DIALOG');
// endregion

function AddGame(props) {
    var dispatch = useDispatch();
    var siteId = useActiveSiteId();
    var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var open = Boolean(anchorEl);
    var _b = React.useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = React.useState(""), gameId = _c[0], setGameId = _c[1];
    var _d = React.useState(""), gameTitle = _d[0], setGameTitle = _d[1];
    var API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        setDialogOpen(true);
    };
    var handleIdChange = function (event) {
        setGameId(event.target.value);
    };
    var handleTitleChange = function (event) {
        setGameTitle(event.target.value);
    };
    var handleAdd = function () {
        handleUploadAsset();
    };
    var cancelClick = function (event) {
        setAnchorEl(event.currentTarget);
        setDialogOpen(false);
    };
    var handleUploadAsset = function () {
        createCustomDocumentEventListener('AGISTUDIO_UPLOAD_GAME', function (response) {
            console.log('Game files uploaded. Add the game page to the library');
            console.log(response);
            var NowDate = new Date().toISOString();
            var objectId = generateUUID();
            var objectGroupId = objectId.substring(0, 4);
            var gameContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
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
                "</page>";
            var gameContentPath = "/site/website/games/" + gameId;
            var serviceUrl = API_WRITE_CONTENT + "?site=".concat(siteId, "&path=").concat(gameContentPath, "&fileName=index.xml&contentType=gametitle&createFolders=true&draft=false&duplicate=false&unlock=true");
            post(serviceUrl, gameContent).subscribe({
                next: function (response) {
                    console.log("content created");
                    setDialogOpen(false);
                },
                error: function (e) { }
            });
        });
        var gamePath = "/static-assets/games/" + gameId + "/";
        dispatch(showUploadDialog({
            path: gamePath,
            site: siteId,
            onClose: batchActions([
                closeUploadDialog(),
                dispatchDOMEvent({
                    id: 'AGISTUDIO_UPLOAD_GAME'
                })
            ])
        }));
    };
    var generateUUID = function () {
        var d = new Date().getTime(); //Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16; //random number between 0 and 16
            if (d > 0) { //Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            }
            else { //Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Add Game"),
            React.createElement(DialogContent, null,
                React.createElement(FormControl, { margin: "normal", fullWidth: true },
                    React.createElement(TextField, { defaultValue: "", id: "gameId", label: "Game ID", variant: "outlined", onChange: handleIdChange })),
                React.createElement(FormControl, { margin: "normal", fullWidth: true },
                    React.createElement(TextField, { defaultValue: "", id: "gameTitle", label: "Game Title", variant: "outlined", onChange: handleTitleChange }))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: cancelClick, variant: "outlined", sx: { mr: 1 } }, "Cancel"),
                React.createElement(Button, { onClick: handleAdd, variant: "outlined", sx: { mr: 1 } }, "Upload Game Files & Save"))),
        React.createElement(Tooltip, { title: 'Add Game' },
            React.createElement(IconButton, { size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(AddRoundedIcon, null)))));
}

var AgiPicture = /** @class */ (function () {
    function AgiPicture() {
    }
    AgiPicture.savePictureCommandsAsSource = function (siteId, gameId, sourcePath, commands) {
        var path = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
        var filename = sourcePath.substring(sourcePath.lastIndexOf('/'));
        var serviceUrl = AgiPicture.API_WRITE_CONTENT +
            "?site=".concat(siteId, "&path=").concat(path, "&fileName=").concat(filename, "&contentType=application/json&createFolders=true&draft=false&duplicate=false&unlock=true");
        var newCommands = AgiPicture.optimizePicture(commands);
        var commandsAsJson = JSON.stringify({ vectorCommands: newCommands });
        post(serviceUrl, commandsAsJson).subscribe({
            next: function (response) {
                alert('Saved');
            },
            error: function (e) { }
        });
    };
    AgiPicture.optimizePicture = function (commands) {
        var optimizedCommands = [];
        for (var i = 0; i < commands.length; i++) {
            var command = commands[i];
            var nextCommand = commands[i + 1];
            if (nextCommand) {
                var commandStr = JSON.stringify(command);
                var nextCommandStr = JSON.stringify(nextCommand);
                if (commandStr != nextCommandStr) {
                    optimizedCommands.push(command);
                }
            }
            else {
                optimizedCommands.push(command);
            }
        }
        return optimizedCommands;
    };
    var _a;
    _a = AgiPicture;
    AgiPicture.API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';
    AgiPicture.encodePictureCommands = function (commandsToEncode) {
        var vectorCommands = commandsToEncode;
        var encodedBuffer = new Uint8Array(100000);
        var i = 0;
        vectorCommands.forEach(function (vectorCommand) {
            var opCode = 0; // End
            var args = vectorCommand.args;
            var commandName = vectorCommand.command;
            {
                switch (commandName) {
                    case 'PicSetColor':
                        opCode = 240;
                        break;
                    case 'PicDisable':
                        opCode = 241;
                        break;
                    case 'PriSetcolor':
                        opCode = 242;
                        break;
                    case 'PriDisable':
                        opCode = 243;
                        break;
                    case 'DrawYCorner':
                        opCode = 244;
                        break;
                    case 'DrawXCorner':
                        opCode = 245;
                        break;
                    case 'DrawAbs':
                        opCode = 246;
                        break;
                    case 'DrawRel':
                        opCode = 247;
                        break;
                    case 'DrawFill':
                        opCode = 248;
                        break;
                    case 'SetPen':
                        opCode = 249;
                        break;
                    case 'DrawPen':
                        opCode = 250;
                        break;
                    case 'End':
                        opCode = 255;
                        break;
                }
                if (opCode != 0) {
                    encodedBuffer[i] = opCode;
                    {
                        i++;
                        if (opCode != 255)
                            for (var a = 0; a < vectorCommand.args.length; a++) {
                                var value = args[a];
                                encodedBuffer[i] = parseInt(value);
                                i++;
                            }
                    }
                }
            }
        });
        var rightsizedBuffer = new Uint8Array(i);
        for (var l = 0; l < i; l++) {
            rightsizedBuffer[l] = encodedBuffer[l];
        }
        return rightsizedBuffer;
    };
    AgiPicture.getFunctionArgsFromPictureStream = function (stream) {
        var args = [];
        while (true) {
            var arg = stream.readUint8();
            if (arg >= 0xf0)
                break;
            args.push(arg);
        }
        stream.position--;
        return args;
    };
    AgiPicture.decodePictureStream = function (stream) {
        var pics = [];
        stream.position = 0;
        var processing = true;
        while (processing) {
            var opCode = stream.readUint8();
            if (opCode >= 0xf0) {
                switch (opCode) {
                    case 240: // PicSetColor
                        var picColor = stream.readUint8();
                        pics.push({ command: 'PicSetColor', args: [picColor] });
                        break;
                    case 241: // PicDisable
                        pics.push({ command: 'PicDisable', args: [] });
                        break;
                    case 242: // PriSetcolorhsonneborniii@gmail.com
                        var priColor = stream.readUint8();
                        pics.push({ command: 'PriSetcolor', args: [priColor] });
                        break;
                    case 243: // PriDisable
                        pics.push({ command: 'PriDisable', args: [] });
                        break;
                    case 244: // DrawYCorner
                        var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
                        pics.push({ command: 'DrawYCorner', args: args });
                        break;
                    case 245: // DrawXCorner
                        var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
                        pics.push({ command: 'DrawXCorner', args: args });
                        break;
                    case 246: // DrawAbs
                        var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
                        pics.push({ command: 'DrawAbs', args: args });
                        break;
                    case 247: // DrawRel
                        var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
                        pics.push({ command: 'DrawRel', args: args });
                        break;
                    case 248: // DrawFill
                        var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
                        pics.push({ command: 'DrawFill', args: args });
                        break;
                    case 249: // SetPen
                        var value = stream.readUint8();
                        pics.push({ command: 'SetPen', args: [value] });
                        break;
                    case 250: // DrawPen
                        var args = AgiPicture.getFunctionArgsFromPictureStream(stream);
                        pics.push({ command: 'DrawPen', args: args });
                        break;
                    case 255: // End
                        pics.push({ command: 'End', args: [] });
                        processing = false;
                        break;
                }
            }
        }
        return pics;
    };
    AgiPicture.renderPictureCommands = function (commandsToRender) {
        var encodedBuffer = AgiPicture.encodePictureCommands(commandsToRender);
        var agiInterpreter = AgiActiveGame.agiExecute('Get interpreter', 'Agi.interpreter');
        var AgiPic = AgiActiveGame.agiExecute('Get Agi.Pic', 'Agi.Pic');
        var FsByteStream = AgiActiveGame.agiExecute('Get Fs', 'Fs.ByteStream');
        var picNo = agiInterpreter.variables[0];
        agiInterpreter.loadedPics[picNo] = new AgiPic(new FsByteStream(encodedBuffer));
        agiInterpreter.agi_draw_pic(0);
        agiInterpreter.agi_show_pic(0);
    };
    AgiPicture.createPictureDrawModeCommand = function (mode) {
        var value = 1 & 0x10 & 0x07;
        return { command: 'PicSetPen', args: [value] };
    };
    AgiPicture.createPictureDrawCommand = function (mode, x, y, scale) {
        var newCommand;
        if (mode == 'Abs') {
            newCommand = { command: 'DrawAbs', args: [x, y, x + 1, y] };
        }
        else if (mode == 'Pen') {
            newCommand = { command: 'DrawPen', args: [x, y, x + scale, y, x, y + scale] };
        }
        else if (mode == 'Fill') {
            newCommand = { command: 'DrawFill', args: [x, y] };
        }
        else {
            console.log('unknown tool -> ' + mode);
        }
        return newCommand;
    };
    AgiPicture.createPictureSetColorCommand = function (color) {
        return { command: 'PicSetColor', args: [color] };
    };
    AgiPicture.getCurrentPictureCommands = function () {
        var roomValue = AgiActiveGame.agiExecute('Get CurrentRoom', 'Agi.interpreter.variables[0]');
        return _a.getPictureCommands(roomValue);
    };
    AgiPicture.getPictureCommands = function (id) {
        try {
            var currentPictureStream = AgiActiveGame.agiExecute('Get Pic Stream', 'Resources.readAgiResource(Resources.AgiResource.Pic, ' + id + ')');
            var decodedPictureCommands = AgiPicture.decodePictureStream(currentPictureStream);
            return decodedPictureCommands;
        }
        catch (err) { }
    };
    AgiPicture.undoPictureCommand = function (commands) {
        var vectorCommands = commands;
        vectorCommands.pop();
        vectorCommands.pop();
        vectorCommands[vectorCommands.length] = { command: 'End', args: [] };
        return vectorCommands;
    };
    AgiPicture.appendPictureCommandToTail = function (commands, command) {
        var vectorCommands = commands;
        vectorCommands.pop(); // remove previous end
        vectorCommands[vectorCommands.length] = command;
        vectorCommands[vectorCommands.length] = { command: 'End', args: [] };
        return vectorCommands;
    };
    return AgiPicture;
}());

function ColorPicker(_a) {
    _a.props; var handleSetColor = _a.handleSetColor;
    return (React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
        React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
            React.createElement(Button, { onClick: function () {
                    handleSetColor(0);
                }, sx: { height: '35px', 'background-color': 'black' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(1);
                }, sx: { height: '35px', 'background-color': 'blue' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(2);
                }, sx: { height: '35px', 'background-color': 'green' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(3);
                }, sx: { height: '35px', 'background-color': 'Teal' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(4);
                }, sx: { height: '35px', 'background-color': 'red' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(5);
                }, sx: { height: '35px', 'background-color': 'purple' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(6);
                }, sx: { height: '35px', 'background-color': 'brown' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(7);
                }, sx: { height: '35px', 'background-color': 'lightgray' } })),
        React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
            React.createElement(Button, { onClick: function () {
                    handleSetColor(8);
                }, sx: { height: '35px', 'background-color': 'gray' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(9);
                }, sx: { height: '35px', 'background-color': 'RoyalBlue' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(10);
                }, sx: { height: '35px', 'background-color': 'lightgreen' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(11);
                }, sx: { height: '35px', 'background-color': 'Aqua' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(12);
                }, sx: { height: '35px', 'background-color': 'Salmon' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(13);
                }, sx: { height: '35px', 'background-color': 'magenta' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(14);
                }, sx: { height: '35px', 'background-color': 'yellow', color: 'black' } }),
            React.createElement(Button, { onClick: function () {
                    handleSetColor(15);
                }, sx: { height: '35px', 'background-color': 'white', color: 'black' } }))));
}

function EditPictureDialog(props) {
    var siteId = useActiveSiteId();
    var _a = React.useState([]), availablePictures = _a[0], setAvailablePictures = _a[1];
    var _b = React.useState(null), commands = _b[0], setCommands = _b[1];
    var _c = useState(false), mouseTrapped = _c[0], setMouseTrapped = _c[1];
    var _d = useState(2), scaleFactor = _d[0], setScaleFactor = _d[1];
    var _e = useState('Abs'), drawMode = _e[0], setDrawMode = _e[1];
    var _f = useState(0); _f[0]; var setSelectedRoom = _f[1];
    var _g = useState(null), selectedRoomFilename = _g[0], setSelectedRoomFilename = _g[1];
    useEffect(function () {
        getPictureFilesForGame();
        // load the current picture into the commands listing
        if (!mouseTrapped) {
            var handleMouseDown = function (event) {
                //@ts-ignore
                window.agistudioMouseDraw = true;
            };
            var handleMouseUp = function (event) {
                //@ts-ignore
                window.agistudioMouseDraw = false;
                mouseDraw(event.clientX, event.clientY);
            };
            var handleMouseMove = function (event) {
                //@ts-ignore
                if (window.agistudioMouseDraw === true) {
                    mouseDraw(event.clientX, event.clientY);
                }
            };
            var handleMouseClick = function (event) {
                mouseDraw(event.clientX, event.clientY);
            };
            //@ts-ignore
            var previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
            var canvas = previewDocument.getElementById('canvas');
            canvas.addEventListener('click', handleMouseClick);
            canvas.addEventListener('mousedown', handleMouseDown);
            canvas.addEventListener('mouseup', handleMouseUp);
            canvas.addEventListener('mousemove', handleMouseMove);
            setMouseTrapped(true);
        }
        var currentPictureCommands = AgiPicture.getCurrentPictureCommands();
        setSelectedRoom(AgiActiveGame.currentRoom);
        setCommands(currentPictureCommands);
        //@ts-ignore
        window.agistudioPicCommands = currentPictureCommands;
    }, []);
    var getPictureFilesForGame = function () {
        var gameId = AgiActiveGame.getActiveGameId();
        var serviceUrl = "/api/1/site/content_store/children.json?url=/static-assets/games/".concat(gameId, "/src/picture");
        get(serviceUrl).subscribe({
            next: function (response) {
                //@ts-ignore
                var pictures = [];
                //@ts-ignore
                response.response.forEach(function (item) {
                    pictures.push({ name: item.name, url: item.url });
                });
                setAvailablePictures(pictures);
            },
            error: function (e) { }
        });
    };
    var appendCommandAndRender = function (command) {
        //@ts-ignore
        if (command != window.agistudioLastCommand) {
            //@ts-ignore
            window.agistudioLastCommand = command;
            //@ts-ignore
            var existingCommands = window.agistudioPicCommands;
            var newCommands = AgiPicture.appendPictureCommandToTail(existingCommands, command);
            setCommands(newCommands);
            //@ts-ignore
            window.agistudioPicCommands = newCommands;
            AgiPicture.renderPictureCommands(newCommands);
        }
    };
    var mouseDraw = function (clientX, clientY) {
        // something is wrong with getting commands from inside this event :-/
        //@ts-ignore
        var previewDocument = document.getElementById('crafterCMSPreviewIframe').contentWindow.document;
        var canvas = previewDocument.getElementById('canvas');
        var rect = canvas.getBoundingClientRect();
        // the bit map is 160 x 200 so we need to scale the mouse input
        var ratioOfX = clientX / rect.width;
        var ratioOfY = clientY / rect.height;
        var x = Math.round(160 * ratioOfX);
        var y = Math.round(200 * ratioOfY);
        var scale = scaleFactor;
        //@ts-ignore
        // var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;
        //@ts-ignore
        var existingDrawMode = window.agistudioDrawMode ? window.agistudioDrawMode : drawMode;
        var newCommand = AgiPicture.createPictureDrawCommand(existingDrawMode, x, y, scale);
        appendCommandAndRender(newCommand);
    };
    var handleUndoCommand = function () {
        //@ts-ignore
        var existingCommands = window.agistudioPicCommands ? window.agistudioPicCommands : commands;
        var newCommands = AgiPicture.undoPictureCommand(existingCommands);
        //@ts-ignore
        window.agistudioPicCommands = newCommands;
        setCommands(newCommands);
        AgiPicture.renderPictureCommands(newCommands);
    };
    function handlePictureChange(event, child) {
        var gameId = AgiActiveGame.getActiveGameId();
        getPictureFileForGame("/static-assets/games/".concat(gameId, "/src/picture/").concat(event.target.value));
        setSelectedRoomFilename(event.target.value);
    }
    var handleSwitchBuffer = function () {
        AgiActiveGame.switchPictureBuffer();
    };
    var getPictureFileForGame = function (url) {
        var serviceUrl = url;
        get(serviceUrl).subscribe({
            next: function (response) {
                var newCommands = response.response.vectorCommands;
                //@ts-ignore
                window.agistudioPicCommands = newCommands;
                setCommands(newCommands);
                AgiPicture.renderPictureCommands(newCommands);
            }
        });
    };
    var handleDrawModeUpdate = function (mode) {
        setDrawMode(mode);
        //@ts-ignore
        window.agistudioDrawMode = mode;
        var newCommand = AgiPicture.createPictureDrawModeCommand(mode);
        appendCommandAndRender(newCommand);
    };
    var handleSetColor = function (color) {
        var newCommand = AgiPicture.createPictureSetColorCommand(color);
        appendCommandAndRender(newCommand);
    };
    var handleSaveAsNewPicture = function () {
        var gameId = AgiActiveGame.getActiveGameId();
        var currentRoomSourceCount = availablePictures.length;
        var label = prompt('Room Label');
        var roomFilename = "room".concat(currentRoomSourceCount, "-").concat(label, ".json");
        var soureFilePath = "/static-assets/games/".concat(gameId, "/src/picture/").concat(roomFilename);
        AgiPicture.savePictureCommandsAsSource(siteId, gameId, soureFilePath, commands);
        availablePictures.push({ name: roomFilename, url: soureFilePath });
    };
    var handleSavePicture = function () {
        var gameId = AgiActiveGame.getActiveGameId();
        var soureFilePath = "/static-assets/games/".concat(gameId, "/src/picture/").concat(selectedRoomFilename);
        AgiPicture.savePictureCommandsAsSource(siteId, gameId, soureFilePath, commands);
    };
    function handleScaleUpdate(scaleFactor) {
        setScaleFactor(scaleFactor);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: handleSavePicture, variant: "outlined", sx: { mr: 1 } }, "Save Picture"),
            React.createElement(Button, { onClick: handleSaveAsNewPicture, variant: "outlined", sx: { mr: 1 } }, "Add New Picture"),
            React.createElement(Button, { onClick: handleSwitchBuffer, variant: "outlined", sx: { mr: 1 } }, "Switch Buffer")),
        React.createElement(DialogContent, null,
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(Button, { onClick: function () {
                        handleUndoCommand();
                    } }, "Undo")),
            React.createElement(FormControl, { fullWidth: true },
                React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Select a Picture"),
                React.createElement(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", label: "Picture", onChange: handlePictureChange }, availablePictures === null || availablePictures === void 0 ? void 0 : availablePictures.map(function (view) { return (React.createElement(MenuItem$1, { value: view.name }, view.name)); }))),
            React.createElement(TextField, { id: "outlined-textarea", sx: { display: 'none', width: '100%' }, multiline: true, rows: 5, value: commands }),
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(TextField, { id: "outlined-textarea", value: scaleFactor }),
                React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
                    React.createElement(Button, { onClick: function () {
                            handleScaleUpdate(1);
                        } }, "1"),
                    React.createElement(Button, { onClick: function () {
                            handleScaleUpdate(2);
                        } }, "2"),
                    React.createElement(Button, { onClick: function () {
                            handleScaleUpdate(5);
                        } }, "5"),
                    React.createElement(Button, { onClick: function () {
                            handleScaleUpdate(10);
                        } }, "10")),
                React.createElement(TextField, { id: "outlined-textarea", value: drawMode })),
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
                    React.createElement(Button, null, "Picture Mode"),
                    React.createElement(Button, null, "Priorty Mode"))),
            React.createElement(Paper, { elevation: 1, sx: { width: '355px', padding: '15px' } },
                React.createElement(ButtonGroup, { variant: "contained", "aria-label": "outlined primary button group" },
                    React.createElement(Button, { onClick: function () {
                            handleDrawModeUpdate('Rel');
                        } }, "Draw Relative"),
                    React.createElement(Button, { onClick: function () {
                            handleDrawModeUpdate('Abs');
                        } }, "Draw Absolute"),
                    React.createElement(Button, { onClick: function () {
                            handleDrawModeUpdate('Pen');
                        } }, "Draw Pen"),
                    React.createElement(Button, { onClick: function () {
                            handleDrawModeUpdate('Fill');
                        } }, "Draw Fill"))),
            React.createElement(ColorPicker, { handleSetColor: handleSetColor, props: undefined }))));
}

function OpenPicDialogButton(props) {
    useDispatch();
    var _a = React.useState(false), drawerOpen = _a[0], setDrawerOpen = _a[1];
    var handleClick = function () {
        var drawerState = drawerOpen ? false : true;
        setDrawerOpen(drawerState);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(SwipeableDrawer, { anchor: 'left', variant: "persistent", ModalProps: {
                keepMounted: false
            }, open: drawerOpen, onClose: function (event) { }, onOpen: function (event) { } }, drawerOpen ? (React.createElement(EditPictureDialog, { props: true })) : ""),
        React.createElement(Tooltip, { title: 'Edit Current Room Picture' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": drawerOpen ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": drawerOpen ? 'true' : undefined, onClick: handleClick },
                React.createElement(ImageAspectRatioRoundedIcon, null)))));
}

var AgiView = /** @class */ (function () {
    function AgiView() {
    }
    AgiView.saveViewCommandsAsSource = function (siteId, gameId, sourcePath, commands) {
        var path = sourcePath.substring(0, sourcePath.lastIndexOf('/'));
        var filename = sourcePath.substring(sourcePath.lastIndexOf('/'));
        var serviceUrl = AgiView.API_WRITE_CONTENT +
            "?site=".concat(siteId, "&path=").concat(path, "&fileName=").concat(filename, "&contentType=application/json&createFolders=true&draft=false&duplicate=false&unlock=true");
        var commandsAsJson = JSON.stringify(commands);
        post(serviceUrl, commandsAsJson).subscribe({
            next: function (response) {
                alert('Saved');
            },
            error: function (e) { }
        });
    };
    AgiView.API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';
    AgiView.decodeView = function (id) {
        var viewStream = AgiActiveGame.agiExecute('Get View Stream', 'Resources.readAgiResource(Resources.AgiResource.View, ' + id + ')');
        var decodedView = AgiView.decodeViewStream(viewStream);
        return decodedView;
    };
    AgiView.encodeViewCommands = function (data) {
        var encodedBuffer = new Uint8Array(1000000);
        var position = 0;
        encodedBuffer[position++] = data.unk1; // unk1
        encodedBuffer[position++] = data.unk2; // unk2
        encodedBuffer[position++] = data.loops.length; // number loops
        encodedBuffer[position++] = 0; //data.descriptionOffset; // description offset
        encodedBuffer[position++] = 0; //data.descriptionOffset; // description offset
        var loopCount = data.loops.length;
        var loopHeadersPos = position;
        position += loopCount * 2;
        for (var i = 0; i < loopCount; i++) {
            var curLoop = data.loops[i];
            var loopPositon = position;
            var celCount = curLoop.cels.length;
            encodedBuffer[position++] = celCount; // cell count
            var celHeadersPos = position;
            position += 2 * celCount;
            for (var c = 0; c < celCount; c++) {
                var curCel = curLoop.cels[c];
                var celOffset = position - loopPositon; // cell offset (relative to start of loop)
                encodedBuffer[position] = curCel.celWidth;
                encodedBuffer[position + 1] = curCel.celHeight;
                encodedBuffer[position + 2] = curCel.celMirrorTrans;
                position += 3;
                for (var d = 0; d < curCel.pixelData.length; d++) {
                    encodedBuffer[position + d] = curCel.pixelData[d];
                }
                position += curCel.pixelData.length;
                // (b2 << 8) + b1;
                // update the cell positions (relative to start of loop)
                var a1 = celOffset; // & (0xffff >> 8)
                var a2 = celOffset >> 8;
                encodedBuffer[celHeadersPos + c * 2] = a1;
                encodedBuffer[celHeadersPos + c * 2 + 1] = a2;
                //console.log(i + ':' + c + ' (' + a1 + ',' + a2 + ') setting loop cell record at:' + (a2 << 8) + a1);
            }
            // Update the loop headers for the current loop
            var b1 = loopPositon; // & (0xffff >> 8)
            var b2 = loopPositon >> 8;
            encodedBuffer[loopHeadersPos + i * 2] = b1;
            encodedBuffer[loopHeadersPos + i * 2 + 1] = b2;
            //console.log(i + ':  (' + b1 + ',' + b2 + ')  setting loop loop record at:' + (b2 << 8) + b1);
        }
        // set the actual offset (rather than the one in the json)
        //var viewDescOffset = bytesUsed;
        //encodedBuffer[3] = viewDescOffset;
        // set the description of the view
        encodedBuffer[++position] = 0;
        encodedBuffer[position] = 0;
        // right size the buffer
        var rightsizedBuffer = new Uint8Array(position);
        for (var l = 0; l < position; l++) {
            rightsizedBuffer[l] = encodedBuffer[l];
        }
        //console.log(rightsizedBuffer.join(', '));
        //console.log(JSON.stringify(this.decodeViewStream(AgiResources.uint8ArrayToByteStream(rightsizedBuffer))));
        return rightsizedBuffer;
    };
    AgiView.decodeViewStream = function (data) {
        var decodedView = {};
        decodedView.unk1 = data.readUint8();
        decodedView.unk2 = data.readUint8();
        decodedView.numLoops = data.readUint8();
        decodedView.descriptionOffset = data.readUint16();
        decodedView.loops = [];
        for (var i = 0; i < decodedView.numLoops; i++) {
            var loop = {};
            decodedView.loops.push(loop);
            // Loop header
            loop.loopOffset = data.readUint16();
            var streamPosLoop = data.position;
            data.position = loop.loopOffset;
            loop.numCels = data.readUint8();
            loop.cels = [];
            for (var j = 0; j < loop.numCels; j++) {
                var cel = {};
                loop.cels.push(cel);
                cel.celOffset = data.readUint16();
                var streamPosCel = data.position;
                data.position = loop.loopOffset + cel.celOffset;
                // Cel header
                cel.celWidth = data.readUint8();
                cel.celHeight = data.readUint8();
                cel.celMirrorTrans = data.readUint8();
                cel.pixelData = [];
                var celMirrored = (cel.celMirrorTrans & 0x80) == 0x80;
                var celMirrorLoop = (cel.celMirrorTrans >>> 4) & 7;
                if (celMirrorLoop == i)
                    celMirrored = false;
                if (!celMirrored) {
                    var celY = 0;
                    while (true) {
                        var chunkData = data.readUint8();
                        cel.pixelData.push(chunkData);
                        if (chunkData == 0) {
                            celY++;
                            if (celY >= cel.celHeight)
                                break;
                        }
                    }
                }
                data.position = streamPosCel;
            }
            data.position = streamPosLoop;
        }
        data.position = decodedView.descriptionOffset;
        while (true) {
            var chr = data.readUint8();
            if (chr == 0)
                break;
            //description += String.fromCharCode(chr);
        }
        return decodedView;
    };
    return AgiView;
}());

function EditViewDialog(props) {
    var siteId = useActiveSiteId();
    var _a = React.useState(null), viewData = _a[0], setViewData = _a[1];
    var _b = React.useState([]), rows = _b[0], setRows = _b[1];
    var _c = React.useState(0), currentLoop = _c[0], setCurrentLoop = _c[1];
    var _d = React.useState(0), currentCel = _d[0], setCurrentCel = _d[1];
    var _e = React.useState(0), CelCount = _e[0], setCelCount = _e[1];
    var _f = React.useState([]), loops = _f[0], setLoops = _f[1];
    var _g = React.useState([]), availableViews = _g[0], setAvailableViews = _g[1];
    var _h = useState(null), selectedViewFilename = _h[0], setSelectedViewFilename = _h[1];
    var _j = useState(0), selectedColor = _j[0], setSelectedColor = _j[1];
    var _k = React.useState(''), snackMessage = _k[0], setSnackMessage = _k[1];
    var _l = React.useState(true), snackSuccess = _l[0], setSnackSuccess = _l[1];
    var _m = React.useState(false), snackShow = _m[0], setSnackShow = _m[1];
    var _o = React.useState(false), progressShow = _o[0], setProgressShow = _o[1];
    var viewItemSort = function (itemA, itemB) {
        var fileA = itemA.name;
        var fileB = itemB.name;
        var orderA = fileA.substring(0, fileA.indexOf('-'));
        var orderB = fileB.substring(0, fileB.indexOf('-'));
        return Number(orderA) - Number(orderB);
    };
    var getViewFilesForGame = function () {
        var gameId = AgiActiveGame.getActiveGameId();
        var serviceUrl = "/api/1/site/content_store/children.json?url=/static-assets/games/".concat(gameId, "/src/view");
        get(serviceUrl).subscribe({
            next: function (response) {
                //@ts-ignore
                var views = [];
                //@ts-ignore
                response.response.forEach(function (item) {
                    views.push({ name: item.name, url: item.url });
                });
                views.sort(viewItemSort);
                setAvailableViews(views);
            },
            error: function (e) { }
        });
    };
    var getViewFileForGame = function (url) {
        var serviceUrl = url;
        get(serviceUrl).subscribe({
            next: function (response) {
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
            error: function (e) { }
        });
    };
    var renderCel = function () {
        try {
            if (viewData &&
                viewData.loops &&
                viewData.loops[currentLoop] &&
                viewData.loops[currentLoop].cels &&
                viewData.loops[currentLoop].cels[currentCel] &&
                viewData.loops[currentLoop].cels[currentCel].pixelData) {
                // transform pixel data for cel into 16 color bitmap
                var cel_1 = viewData.loops[currentLoop].cels[currentCel];
                var pixelData = cel_1.pixelData;
                var celMirrored = (cel_1.celMirrorTrans & 0x80) == 0x80;
                var celMirrorLoop = (cel_1.celMirrorTrans >>> 4) & 7;
                var celTransparentColor = cel_1.celMirrorTrans & 0x0f;
                // initialize the bitmap with trasparent color
                var bitmap_1 = Array(cel_1.celHeight)
                    //@ts-ignore
                    .fill()
                    .map(function () { return Array(cel_1.celWidth).fill(celTransparentColor); });
                var row_1 = 0;
                var col_1 = 0;
                pixelData.forEach(function (chunkData) {
                    if (chunkData == 0) {
                        row_1++;
                        col_1 = 0;
                    }
                    else {
                        var color = chunkData >>> 4;
                        var numPixels = chunkData & 0x0f;
                        for (var k = 0; k < numPixels; k++) {
                            bitmap_1[row_1][col_1++] = color;
                        }
                    }
                    setRows(bitmap_1);
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    };
    var bitmapToPixelData = function (bitmap) {
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
                    }
                    else {
                        //var color = chunkData >>> 4;
                        //var numPixels = chunkData & 0x0f;
                        var chunkData = (color << 4) | (colorRun & 0x0f);
                        // encode the last run.
                        pixelData.push(chunkData);
                        colorRun = 1;
                    }
                }
                else {
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
    var htmlColor = function (colorNo) {
        var colors = [
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
        var colorName = colors[colorNo];
        return colorName;
    };
    var handleSaveAsNewView = function () {
        var gameId = AgiActiveGame.getActiveGameId();
        var currentViewSourceCount = availableViews.length;
        var label = prompt('View Label');
        var roomFilename = "view".concat(currentViewSourceCount, "-").concat(label, ".json");
        var soureFilePath = "/static-assets/games/".concat(gameId, "/src/view/").concat(roomFilename);
        // this can be moved to an in memory save
        var pixelData = bitmapToPixelData(rows);
        viewData.loops[currentLoop].cels[currentCel].pixelData = pixelData;
        AgiView.saveViewCommandsAsSource(siteId, gameId, soureFilePath, viewData);
        availableViews.push({ name: roomFilename, url: soureFilePath });
    };
    var handleSaveView = function () {
        var gameId = AgiActiveGame.getActiveGameId();
        var soureFilePath = "/static-assets/games/".concat(gameId, "/src/view/").concat(selectedViewFilename);
        // this can be moved to an in memory save
        var pixelData = bitmapToPixelData(rows);
        viewData.loops[currentLoop].cels[currentCel].pixelData = pixelData;
        setProgressShow(true);
        AgiView.saveViewCommandsAsSource(siteId, gameId, soureFilePath, viewData);
        setSnackMessage('Save Complete');
        setSnackSuccess(true);
        setSnackShow(true);
    };
    var commitCelFrame = function () {
        var viewDataClone = structuredClone(viewData);
        var pixelData = bitmapToPixelData(rows);
        viewDataClone.loops[currentLoop].cels[currentCel].pixelData = pixelData;
        setViewData(viewDataClone);
    };
    var handleSetColor = function (color) {
        setSelectedColor(color);
    };
    function handleViewChange(event, child) {
        var gameId = AgiActiveGame.getActiveGameId();
        getViewFileForGame("/static-assets/games/".concat(gameId, "/src/view/").concat(event.target.value));
        setSelectedViewFilename(event.target.value);
        setCurrentLoop(0);
        setCurrentCel(0);
        setCelCount(viewData.loops[currentLoop].cels.length);
        renderCel();
    }
    function handleLoopChange(event, child) {
        setCurrentLoop(Number(event.target.value));
        commitCelFrame();
        setCurrentCel(0);
        setCelCount(viewData.loops[currentLoop].cels.length);
        renderCel();
    }
    var handleCelChange = function (event, newValue) {
        var celNo = Number(newValue);
        setCurrentCel(celNo);
        commitCelFrame();
        renderCel();
    };
    useEffect(function () {
        getViewFilesForGame();
        renderCel();
    }, [CelCount, currentCel, currentLoop]);
    function setPixelColor(row, col) {
        var newRows = Array.from(rows);
        newRows[row][col] = selectedColor;
        setRows(newRows);
    }
    function handleSnackClose(event, reason) {
        setProgressShow(false);
        setSnackShow(false);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(DialogActions, null,
            React.createElement(Button, { onClick: handleSaveView, variant: "outlined", sx: { mr: 1 } }, "Save View"),
            React.createElement(Button, { onClick: handleSaveAsNewView, variant: "outlined", sx: { mr: 1 } }, "Add New View")),
        React.createElement(DialogContent, null,
            React.createElement(Paper, { elevation: 1, sx: { padding: '1px' } },
                React.createElement(Table, null,
                    React.createElement(TableRow, null,
                        React.createElement(TableCell, null,
                            React.createElement(FormControl, { fullWidth: true },
                                React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Select a View"),
                                React.createElement(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", label: "View", onChange: handleViewChange }, availableViews === null || availableViews === void 0 ? void 0 : availableViews.map(function (view) { return (React.createElement(MenuItem$1, { value: view.name }, view.name)); }))),
                            React.createElement("p", null,
                                "Loops: ",
                                viewData ? viewData.numLoops : 0),
                            React.createElement("br", null),
                            React.createElement("p", null,
                                "current loops cel count: ",
                                CelCount ? CelCount : 0),
                            React.createElement(FormControl, { fullWidth: true },
                                React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Current Loop"),
                                React.createElement(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", value: currentLoop, label: "Loop", onChange: handleLoopChange }, loops === null || loops === void 0 ? void 0 : loops.map(function (loop) { return (React.createElement(MenuItem$1, { value: loop.id }, loop.description)); }))),
                            React.createElement(Slider, { defaultValue: 0, step: 1, min: 0, marks: true, max: CelCount, onChange: handleCelChange, "aria-label": "Default", valueLabelDisplay: "auto" }),
                            React.createElement(ColorPicker, { props: undefined, handleSetColor: handleSetColor })),
                        React.createElement(TableCell, null,
                            React.createElement(Table, { "aria-label": "simple table" },
                                React.createElement(TableBody, null, rows.map(function (row, rowIdx) { return (React.createElement(TableRow, null, row.map(function (value, colIdx) { return (React.createElement(TableCell, { component: "th", scope: "row", style: { padding: '10px', backgroundColor: htmlColor(value) }, onClick: function () { return setPixelColor(rowIdx, colIdx); }, onMouseEnter: function (evt) {
                                        if (evt.nativeEvent.buttons == 1)
                                            setPixelColor(rowIdx, colIdx);
                                    }, onMouseOver: function (evt) {
                                        if (evt.nativeEvent.buttons == 1)
                                            setPixelColor(rowIdx, colIdx);
                                    } })); }))); })))))))),
        React.createElement(Backdrop, { sx: { color: '#fff', zIndex: function (theme) { return theme.zIndex.drawer + 1; } }, open: progressShow },
            React.createElement(CircularProgress, { color: "inherit" }),
            React.createElement(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: snackShow, autoHideDuration: 1000, onClose: handleSnackClose },
                React.createElement(Alert, { severity: snackSuccess ? "success" : "error", sx: { width: '100%' } }, snackMessage)))));
}

function OpenViewDialogButton(props) {
    useDispatch();
    var _a = React.useState(false), drawerOpen = _a[0], setDrawerOpen = _a[1];
    var handleClick = function () {
        var drawerState = drawerOpen ? false : true;
        setDrawerOpen(drawerState);
    };
    var toggleDrawer = function () {
        setDrawerOpen(!drawerOpen);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(SwipeableDrawer, { anchor: 'left', variant: "persistent", ModalProps: {
                keepMounted: false
            }, open: drawerOpen, onClose: function (event) {
                toggleDrawer();
            }, onOpen: function (event) {
                toggleDrawer();
            } }, drawerOpen ? React.createElement(React.Fragment, null,
            React.createElement(IconButton, { onClick: function (event) {
                    toggleDrawer();
                } }, "X"),
            React.createElement(EditViewDialog, { props: true })) : ''),
        React.createElement(Tooltip, { title: 'Open View Editor' },
            React.createElement(IconButton, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": drawerOpen ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": drawerOpen ? 'true' : undefined, onClick: handleClick },
                React.createElement(TheatersRoundedIcon, null)))));
}

// Notes:
// https://www.youtube.com/watch?v=ZusiKXcz_ac&list=PLUl4u3cNGP63VIBQVWguXxZZi0566y7Wf&index=3
var AgiResource;
(function (AgiResource) {
    AgiResource[AgiResource["Logic"] = 0] = "Logic";
    AgiResource[AgiResource["Pic"] = 1] = "Pic";
    AgiResource[AgiResource["View"] = 2] = "View";
    AgiResource[AgiResource["Sound"] = 3] = "Sound";
})(AgiResource || (AgiResource = {}));
var ByteStream = /** @class */ (function () {
    function ByteStream(buffer, startPosition, end) {
        if (startPosition === void 0) { startPosition = 0; }
        if (end === void 0) { end = 0; }
        this.buffer = buffer;
        this.startPosition = startPosition;
        this.end = end;
        this.position = 0;
        this.length = 0;
        if (end == 0)
            this.end = this.buffer.byteLength;
        this.length = this.end - this.startPosition;
    }
    ByteStream.prototype.readUint8 = function () {
        return this.buffer[this.startPosition + this.position++];
    };
    ByteStream.prototype.readUint16 = function (littleEndian) {
        if (littleEndian === void 0) { littleEndian = true; }
        var b1 = this.buffer[this.startPosition + this.position++];
        var b2 = this.buffer[this.startPosition + this.position++];
        if (littleEndian) {
            return (b2 << 8) + b1;
        }
        return (b1 << 8) + b2;
    };
    ByteStream.prototype.readInt16 = function (littleEndian) {
        if (littleEndian === void 0) { littleEndian = true; }
        var b1 = this.buffer[this.startPosition + this.position++];
        var b2 = this.buffer[this.startPosition + this.position++];
        if (littleEndian) {
            return (((b2 << 8) | b1) << 16) >> 16;
        }
        return (((b1 << 8) | b2) << 16) >> 16;
    };
    return ByteStream;
}());
var AgiResources = /** @class */ (function () {
    function AgiResources() {
        var _this = this;
        this.logdirRecords = [];
        this.picdirRecords = [];
        this.viewdirRecords = [];
        this.snddirRecords = [];
        this.volBuffers = [];
        this.availableVols = [];
        this.AgiResources = function () { };
        this.readAgiResource = function (type, num) {
            var record = null;
            switch (type) {
                case AgiResource.Logic:
                    record = _this.logdirRecords[num];
                    break;
                case AgiResource.Pic:
                    record = _this.picdirRecords[num];
                    break;
                case AgiResource.View:
                    record = _this.viewdirRecords[num];
                    break;
                case AgiResource.Sound:
                    record = _this.snddirRecords[num];
                    break;
                default:
                    throw 'Undefined resource type: ' + type;
            }
            var volstream = new ByteStream(_this.volBuffers[record.volNo].buffer, record.volOffset);
            volstream.readUint16();
            volstream.readUint8();
            var resLength = volstream.readUint16();
            var volPart = new ByteStream(volstream.buffer, record.volOffset + 5, record.volOffset + 5 + resLength);
            return volPart;
        };
        this.downloadAllFiles = function (path, files, done) {
            var buffers = {};
            var leftToDownload = files.length;
            for (var i = 0; i < files.length; i++) {
                handleFile(i);
            }
            function getBinary(url, success) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url + '?crafterSite=agi-crafter', true);
                xhr.responseType = 'arraybuffer';
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.response === null) {
                            throw "Fatal error downloading '" + url + "'";
                        }
                        else {
                            console.log("Successfully downloaded '" + url + "'");
                            success(xhr.response);
                        }
                    }
                };
                xhr.send();
            }
            function handleFile(num) {
                getBinary(path + files[num], function (buffer) {
                    buffers[files[num]] = new ByteStream(new Uint8Array(buffer));
                    leftToDownload--;
                    if (leftToDownload === 0) {
                        done(buffers);
                    }
                });
            }
        };
        this.getWords = function () {
            var words = AgiActiveGame.agiExecute('Get Words', 'Resources.words');
            var wrdTxt = '{';
            words.forEach(function (wrds, idx) {
                wrdTxt += '"' + idx + '": ["' + wrds.join('", "') + '"],';
            });
            wrdTxt += '}';
            return wrdTxt;
        };
        this.downloadGameData = function (path, files, onDone) {
            var leftToDownload = files.length;
            var gameResources = {
                pictures: [],
                logics: [],
                views: [],
                sounds: [],
                words: undefined,
                objects: []
            };
            for (var i = 0; i < files.length; i++) {
                handleFile(i);
            }
            function getSourceObject(url, success) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url + '?crafterSite=agi-crafter', true);
                xhr.responseType = 'json';
                if (url.indexOf('/logic/') != -1) {
                    xhr.responseType = 'text';
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.response === null) {
                            throw "Fatal error downloading '" + url + "'";
                        }
                        else {
                            console.log("Successfully downloaded '" + url + "' as '" + xhr.responseType + "'");
                            success(xhr.response);
                        }
                    }
                };
                xhr.send();
            }
            function handleFile(num) {
                getSourceObject(path + files[num], function (buffer) {
                    if (files[num].indexOf('/picture/') != -1) {
                        gameResources.pictures.push({
                            url: files[num],
                            data: buffer
                        });
                    }
                    else if (files[num].indexOf('/logic/') != -1) {
                        gameResources.logics.push({
                            url: files[num],
                            data: buffer
                        });
                    }
                    else if (files[num].indexOf('/view/') != -1) {
                        gameResources.views.push({
                            url: files[num],
                            data: buffer
                        });
                    }
                    else if (files[num].indexOf('/sound/') != -1) {
                        gameResources.sounds.push({
                            url: files[num],
                            data: buffer
                        });
                    }
                    else if (files[num].indexOf('/words.json') != -1) {
                        //@ts-ignore
                        gameResources.words = { url: files[num], data: buffer };
                    }
                    else if (files[num].indexOf('/object.json') != -1) {
                        //@ts-ignore
                        gameResources.objects = { url: files[num], data: buffer };
                    }
                    else ;
                    leftToDownload--;
                    if (leftToDownload === 0) {
                        onDone(gameResources);
                    }
                });
            }
        };
        // saveLogic = (siteId, game, roomValue, buffer) => {
        // };
        this.savePicture = function (siteId, game, roomId, commands) {
            roomId = roomId;
            var nextRoomId = roomId + 1;
            _this.downloadAllFiles('/static-assets/games/' + game + '/', ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'], function (buffers) {
                console.log('Directory files downloaded.');
                _this.parseDirfile(buffers['LOGDIR'], _this.logdirRecords);
                _this.parseDirfile(buffers['PICDIR'], _this.picdirRecords);
                _this.parseDirfile(buffers['VIEWDIR'], _this.viewdirRecords);
                _this.parseDirfile(buffers['SNDDIR'], _this.snddirRecords);
                var volNames = [];
                for (var i = 0; i < _this.availableVols.length; i++) {
                    if (_this.availableVols[i] === true) {
                        volNames.push('VOL.' + i);
                    }
                }
                _this.downloadAllFiles('/static-assets/games/' + game + '/', volNames, function (buffers) {
                    console.log('Resource volumes downloaded.');
                    for (var j = 0; j < volNames.length; j++) {
                        _this.volBuffers[j] = buffers[volNames[j]];
                    }
                    var newPicData = AgiPicture.encodePictureCommands(commands);
                    newPicData = AgiResources.addVolumeHeader(newPicData, 0);
                    var picRecord = _this.picdirRecords[roomId];
                    var nextPicRecord = _this.picdirRecords[nextRoomId]; // assuption: not the last picture
                    var picsStream = _this.volBuffers[picRecord.volNo].buffer;
                    var lengthOfOldPic = 0;
                    if (nextPicRecord) {
                        lengthOfOldPic = nextPicRecord.volOffset - picRecord.volOffset;
                    }
                    var newPicSizeDiff = newPicData.length - lengthOfOldPic; //+ 2; // last command + 255 end marker
                    // now that we know how the new picture relates to the old one we can re-size the stream
                    // up or down accordingly.
                    var newStreamLength = picsStream.length + newPicSizeDiff;
                    var newStream = new Uint8Array(newStreamLength);
                    for (var n = 0; n < newStream.length; n++) {
                        if (n < picRecord.volOffset || n > picRecord.volOffset + (newPicData.length - 1)) {
                            // copy the original buffer to the new buffer
                            if (n < picRecord.volOffset) {
                                // before the new resource
                                newStream[n] = picsStream[n];
                            }
                            else {
                                // after our resource, we have to account for 'overlap'
                                newStream[n] = picsStream[n - newPicSizeDiff];
                            }
                        }
                        else {
                            // copy the new picture into the new stream
                            newStream[n] = newPicData[n - picRecord.volOffset];
                        }
                    }
                    var newPicDirEncoded = AgiResources.updateDirectoryOffsets('P', _this.picdirRecords, picRecord.volOffset, newPicSizeDiff);
                    var newLogDirEncoded = AgiResources.updateDirectoryOffsets('L', _this.logdirRecords, picRecord.volOffset, newPicSizeDiff);
                    var newViewDirEncoded = AgiResources.updateDirectoryOffsets('V', _this.viewdirRecords, picRecord.volOffset, newPicSizeDiff);
                    var newSndDirEncoded = AgiResources.updateDirectoryOffsets('S', _this.snddirRecords, picRecord.volOffset, newPicSizeDiff);
                    var gamePath = '/static-assets/games/' + game + '/';
                    AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
                    AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
                    AgiResources.saveFile(siteId, gamePath, 'VIEWDIR', newViewDirEncoded);
                    AgiResources.saveFile(siteId, gamePath, 'SNDDIR', newSndDirEncoded);
                    // save updated volume file
                    AgiResources.saveFile(siteId, gamePath, 'VOL.0', newStream);
                });
            });
        };
        this.saveAsNewPicture = function (siteId, game) {
            _this.downloadAllFiles('/static-assets/games/' + game + '/', ['LOGDIR', 'PICDIR', 'VIEWDIR', 'SNDDIR'], function (buffers) {
                console.log('Directory files downloaded.');
                _this.parseDirfile(buffers['LOGDIR'], _this.logdirRecords);
                _this.parseDirfile(buffers['PICDIR'], _this.picdirRecords);
                _this.parseDirfile(buffers['VIEWDIR'], _this.viewdirRecords);
                _this.parseDirfile(buffers['SNDDIR'], _this.snddirRecords);
                var volNames = [];
                for (var i = 0; i < _this.availableVols.length; i++) {
                    if (_this.availableVols[i] === true) {
                        volNames.push('VOL.' + i);
                    }
                }
                _this.downloadAllFiles('/static-assets/games/' + game + '/', volNames, function (buffers) {
                    console.log('Resource volumes downloaded.');
                    for (var j = 0; j < volNames.length; j++) {
                        _this.volBuffers[j] = buffers[volNames[j]];
                    }
                    var newPicData = new Uint8Array(6);
                    newPicData[0] = 240; // set pic color
                    newPicData[1] = 0; // ard: black
                    newPicData[2] = 0; // draw fill
                    newPicData[3] = 10; // arg: x
                    newPicData[4] = 0; // arg: y
                    newPicData[5] = 255; // end
                    newPicData = AgiResources.addVolumeHeader(newPicData, 0);
                    var volNum = 0;
                    var picsStream = _this.volBuffers[0].buffer;
                    var offset = picsStream.length;
                    var roomValue = _this.picdirRecords.length;
                    var picRecord = (_this.picdirRecords[roomValue] = { volNo: volNum, volOffset: offset });
                    var newStreamLength = picsStream.length + newPicData.length;
                    var newStream = new Uint8Array(newStreamLength);
                    for (var n = 0; n < newStreamLength; n++) {
                        if (n < picsStream.length) {
                            // copy in the existing resources
                            newStream[n] = picsStream[n];
                        }
                        else {
                            // copy in new resource
                            newStream[n] = newPicData[n - picsStream.length];
                        }
                    }
                    var newPicDirEncoded = AgiResources.updateDirectoryOffsets('P', _this.picdirRecords, picRecord.volOffset, 0);
                    // Every room has a logic file. Add logic file
                    var roomLogic = AgiResources.DEFAULT_ROOM_LOGIC;
                    var volStream = new Uint8Array(newStreamLength + 117);
                    for (var n = 0; n < volStream.length; n++) {
                        if (n < newStream.length) {
                            // copy in the existing resources
                            volStream[n] = newStream[n];
                        }
                        else {
                            // copy in new resource
                            volStream[n] = roomLogic[n - newStream.length];
                        }
                    }
                    var logRecord = (_this.logdirRecords[roomValue] = { volNo: volNum, volOffset: newStream.length });
                    var newLogDirEncoded = AgiResources.updateDirectoryOffsets('L', _this.logdirRecords, logRecord.volOffset, 0);
                    //@ts-ignore
                    var gamePath = '/static-assets/games/' + game + '/';
                    AgiResources.saveFile(siteId, gamePath, 'PICDIR', newPicDirEncoded);
                    AgiResources.saveFile(siteId, gamePath, 'LOGDIR', newLogDirEncoded);
                    // save updated volume file
                    AgiResources.saveFile(siteId, gamePath, 'VOL.0', volStream);
                });
            });
        };
    }
    AgiResources.prototype.updateVolumeHeader = function (volumeBuffer, volumeId, positionInVolume) {
        var endMarkerPosition = positionInVolume + AgiResources.VOLUMERECORD_HEADER_SIZE + volumeBuffer.length;
        // ----- -----------------------------------------------------------
        //  0-1  Signature (0x12--0x34)
        //   2   Vol number that the resource is contained in
        //  3-4  Length of the resource taken from after the header
        // ----- -----------------------------------------------------------
        volumeBuffer[positionInVolume + 0] = 0x12; // signature
        volumeBuffer[positionInVolume + 1] = 0x34; // signature
        volumeBuffer[positionInVolume + 2] = volumeId; // volume
        volumeBuffer[positionInVolume + 3] = endMarkerPosition & (0xffff >> 8); // resource len LO
        volumeBuffer[positionInVolume + 4] = endMarkerPosition >> 8; // resource len HI
    };
    AgiResources.prototype.copyResourceBufferToVolume = function (volumeBuffer, bufferToCopy, positionInVolume) {
        for (var b = 0; b < bufferToCopy.length; b++) {
            volumeBuffer[positionInVolume + b] = bufferToCopy[b];
        }
    };
    AgiResources.prototype.createDirectoryEntry = function (volumeId, positionOffset) {
        return {
            volumeId: volumeId,
            positionOffset: positionOffset
        };
    };
    AgiResources.prototype.encodeResourceDirectory = function (directoryEntries) {
        // Each directory file is of the same format.
        // They contain a finite number of three byte entries, no more than 256.
        // The size will vary depending on the number of files of the type that the directory file is pointing to.
        // Dividing the filesize by three gives the maximum file number of that type of data file.
        // Each entry is of the following format:
        //    Byte 1           Byte 2           Byte 3
        // 7 6 5 4 3 2 1 0  7 6 5 4 3 2 1 0  7 6 5 4 3 2 1 0
        // V V V V P P P P  P P P P P P P P  P P P P P P P P
        // where V = VOL number and P = position (offset into VOL file).
        // The entry number itself gives the number of the data file that it is pointing to.
        // For example, if the following three byte entry is entry number 45 in the SOUND directory file,
        // 12 3D FE
        // then sound.45 is located at position 0x23DFE in the vol.1 file. The first entry number is entry 0.
        // If the three bytes contain the value 0xFFFFFF, then the resource does not exist.
        if (directoryEntries.length > 0) {
            var directoryBuffer = new Uint8Array(directoryEntries.length * 3);
            var position = 0;
            for (var i = 0; i < directoryEntries.length; i++) {
                var entry = directoryEntries[i];
                var a = entry.volumeId;
                var b = entry.positionOffset >> 16;
                var b1 = (a << 4) + b;
                console.log("encoding vol: " + entry.volumeId + " : " + b1);
                //b1 = entry.positionOffset >> 16;
                var b2 = entry.positionOffset >> 8;
                var b3 = entry.positionOffset & (0xffff >> 8);
                // (a << 16) + (b << 8) + c
                // var volNo = val >>> 20;
                var val = (b1 << 16) + (b2 << 8) + b3;
                console.log('(' + b1 + ', ' + b2 + ', ' + b3 + ') = ' + val + ' : ' + entry.positionOffset);
                directoryBuffer[position] = b1;
                directoryBuffer[position + 1] = b2;
                directoryBuffer[position + 2] = b3;
                position = i * 3;
            }
            return directoryBuffer;
        }
        else {
            return new Uint8Array(0);
        }
    };
    AgiResources.prototype.gameResourceItemSort = function (itemA, itemB) {
        var pathA = itemA.url;
        var pathB = itemB.url;
        var fileA = pathA.substring(pathA.lastIndexOf('/') + 1);
        var orderA = fileA.substring(0, fileA.indexOf('-'));
        var fileB = pathB.substring(pathB.lastIndexOf('/') + 1);
        var orderB = fileB.substring(0, fileB.indexOf('-'));
        return Number(orderA) - Number(orderB);
    };
    // Volume Spec version 2
    AgiResources.prototype.saveGame = function (siteId, gameId, gameData, callback) {
        var volumeSize = 0;
        var gamePath = "/static-assets/games/".concat(gameId);
        console.log('Building Game :' + gameId);
        gameData.picturesDirectoryEntries = [];
        gameData.viewDirectoryEntries = [];
        gameData.logicDirectoryEntries = [];
        gameData.soundDirectoryEntries = [];
        // sort these alphabetical so that naming convention controls order
        gameData.pictures.sort(this.gameResourceItemSort);
        gameData.logics.sort(this.gameResourceItemSort);
        gameData.views.sort(this.gameResourceItemSort);
        gameData.sounds.sort(this.gameResourceItemSort);
        // encode pictures
        for (var i = 0; i < gameData.pictures.length; i++) {
            var picture = gameData.pictures[i];
            console.log('  Encoding picture :' + picture.url);
            var encodedPicture = AgiPicture.encodePictureCommands(picture.data.vectorCommands);
            gameData.pictures[i] = { url: picture.url, buffer: encodedPicture };
            volumeSize += 5; // header
            volumeSize += encodedPicture.length;
        }
        // encode logic
        // we don't have logic files yet so for each picture encode the default logic
        for (var i = 0; i < gameData.logics.length; i++) {
            var logic = gameData.logics[i];
            console.log('  Encoding logic :' + logic.url);
            var encodedLogic = AgiLogic.compile(logic.data, gameData.words.data, gameData.logics[0].data);
            var encodedMessages = AgiLogic.encodeMessages(logic.data, logic.data.length);
            gameData.logics[i] = {
                url: logic.url,
                logicBuffer: encodedLogic.buffer,
                messageBuffer: encodedMessages.buffer,
                data: logic.data
            };
            volumeSize += 5; // header
            volumeSize += encodedLogic.length;
        }
        // encode views
        for (var i = 0; i < gameData.views.length; i++) {
            var view = gameData.views[i];
            console.log('  Encoding view :' + view.url);
            var encodedView = AgiView.encodeViewCommands(view.data);
            gameData.views[i] = { url: view.url, buffer: encodedView };
            volumeSize += 5; // header
            volumeSize += encodedView.length;
        }
        // encode sounds
        for (var i = 0; i < gameData.sounds.length; i++) {
            var sound = gameData.sounds[i];
            console.log('  Encoding sound :' + sound.url);
            var encodedSound = AgiSound.encodeSoundData(sound.data);
            gameData.sounds[i] = { url: sound.url, buffer: encodedSound };
            volumeSize += 5; // header
            volumeSize += encodedSound.length;
        }
        // encode words
        if (gameData.words) {
            console.log('  Encoding Words :' + gameData.words.url);
            var wordsBuffer = AgiLogic.encodeWords(gameData.words.data);
            gameData.words.buffer = wordsBuffer;
        }
        else {
            console.log('  Warning! No WORDS source ');
        }
        // encode objects
        if (gameData.objects) {
            console.log('  Encoding Objects :' + gameData.objects.url);
            var objectsBuffer = AgiLogic.encodeObjects(gameData.objects.data);
            gameData.objects.buffer = objectsBuffer;
        }
        else {
            console.log('  Warning! No OBJECTS source ');
        }
        // =====================================================================
        // build the volume file
        // ====================================================================
        // build the volume file
        var volumeId0 = 0; // for now we only suppoer a single volume
        var volumeBuffer0 = new Uint8Array(volumeSize);
        var positionInVolume0 = 0;
        // pictures
        for (var i = 0; i < 10; i++) { //gameData.pictures.length; i++) {
            var picture = gameData.pictures[i];
            console.log('  Adding picture: ' + picture.url);
            console.log('    Adding picture directory entry at position: ' + positionInVolume0);
            gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId0, positionInVolume0);
            console.log('    Adding picture to volume');
            this.updateVolumeHeader(volumeBuffer0, volumeId0, positionInVolume0);
            positionInVolume0 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            this.copyResourceBufferToVolume(volumeBuffer0, picture.buffer, positionInVolume0);
            positionInVolume0 += picture.buffer.length;
            positionInVolume0 += 1;
        }
        // build the volume file
        var volumeId1 = 1; // for now we only suppoer a single volume
        var volumeBuffer1 = new Uint8Array(volumeSize);
        var positionInVolume1 = 0;
        // pictures
        for (var i = 10; i < 20; i++) {
            var picture = gameData.pictures[i];
            console.log('  Adding picture: ' + picture.url);
            console.log('    Adding picture directory entry at position: ' + positionInVolume1);
            gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId1, positionInVolume1);
            console.log('    Adding picture to volume');
            this.updateVolumeHeader(volumeBuffer1, volumeId1, positionInVolume1);
            positionInVolume1 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            this.copyResourceBufferToVolume(volumeBuffer1, picture.buffer, positionInVolume1);
            positionInVolume1 += picture.buffer.length;
            positionInVolume1 += 1;
        }
        // build the volume file
        var volumeId2 = 2; // for now we only suppoer a single volume
        var volumeBuffer2 = new Uint8Array(volumeSize);
        var positionInVolume2 = 0;
        // pictures
        for (var i = 20; i < 30; i++) {
            var picture = gameData.pictures[i];
            console.log('  Adding picture: ' + picture.url);
            console.log('    Adding picture directory entry at position: ' + positionInVolume2);
            gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId2, positionInVolume2);
            console.log('    Adding picture to volume');
            this.updateVolumeHeader(volumeBuffer2, volumeId2, positionInVolume2);
            positionInVolume2 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            this.copyResourceBufferToVolume(volumeBuffer2, picture.buffer, positionInVolume2);
            positionInVolume2 += picture.buffer.length;
            positionInVolume2 += 1;
        }
        // build the volume file
        var volumeId3 = 3; // for now we only suppoer a single volume
        var volumeBuffer3 = new Uint8Array(volumeSize);
        var positionInVolume3 = 0;
        // pictures
        for (var i = 30; i < 40; i++) {
            var picture = gameData.pictures[i];
            console.log('  Adding picture: ' + picture.url);
            console.log('    Adding picture directory entry at position: ' + positionInVolume3);
            gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId3, positionInVolume3);
            console.log('    Adding picture to volume');
            this.updateVolumeHeader(volumeBuffer3, volumeId3, positionInVolume3);
            positionInVolume3 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            this.copyResourceBufferToVolume(volumeBuffer3, picture.buffer, positionInVolume3);
            positionInVolume3 += picture.buffer.length;
            positionInVolume3 += 1;
        }
        // build the volume file
        var volumeId4 = 4; // for now we only suppoer a single volume
        var volumeBuffer4 = new Uint8Array(volumeSize);
        var positionInVolume4 = 0;
        // pictures
        for (var i = 40; i < gameData.pictures.length; i++) {
            var picture = gameData.pictures[i];
            console.log('  Adding picture: ' + picture.url);
            console.log('    Adding picture directory entry at position: ' + positionInVolume4);
            gameData.picturesDirectoryEntries[i] = this.createDirectoryEntry(volumeId4, positionInVolume4);
            console.log('    Adding picture to volume');
            this.updateVolumeHeader(volumeBuffer4, volumeId4, positionInVolume4);
            positionInVolume4 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            this.copyResourceBufferToVolume(volumeBuffer4, picture.buffer, positionInVolume4);
            positionInVolume4 += picture.buffer.length;
            positionInVolume4 += 1;
        }
        // logic
        var volumeId5 = 5;
        var volumeBuffer5 = new Uint8Array(volumeSize);
        var positionInVolume5 = 0;
        for (var i = 0; i < 40; i++) {
            var logic = gameData.logics[i];
            console.log('  Adding logic: ' + logic.url);
            console.log('    Adding logic directory entry at position: ' + positionInVolume5);
            gameData.logicDirectoryEntries[i] = this.createDirectoryEntry(volumeId5, positionInVolume5);
            console.log('    Adding logic to volume');
            // ----- -----------------------------------------------------------
            //  0-1  0x1234: signature for the start of a file in the VOL block
            //   2   Vol file number
            //  3-4  Length of the logic script
            //  5-6  Offset of logic code end and text begin
            // ----- -----------------------------------------------------------
            this.updateVolumeHeader(volumeBuffer5, volumeId5, positionInVolume5);
            positionInVolume5 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            var messagesOffsetRecordPosition = positionInVolume5 - 2;
            volumeBuffer5[positionInVolume5++];
            volumeBuffer5[positionInVolume5++];
            this.copyResourceBufferToVolume(volumeBuffer5, logic.logicBuffer, positionInVolume5);
            positionInVolume5 += logic.logicBuffer.length;
            this.copyResourceBufferToVolume(volumeBuffer5, logic.messageBuffer, positionInVolume5);
            positionInVolume5 += logic.messageBuffer.length;
            var scriptLength = logic.logicBuffer.length + logic.messageBuffer.length;
            var msgOffset = logic.logicBuffer.length;
            volumeBuffer5[messagesOffsetRecordPosition] = scriptLength & (0xffff >> 8); // lo
            volumeBuffer5[messagesOffsetRecordPosition + 1] = scriptLength >> 8; // message index hi
            volumeBuffer5[messagesOffsetRecordPosition + 2] = msgOffset & (0xffff >> 8); // lo
            volumeBuffer5[messagesOffsetRecordPosition + 3] = msgOffset >> 8; // message index hi
            positionInVolume5 += 1;
        }
        var volumeId6 = 6;
        var volumeBuffer6 = new Uint8Array(volumeSize);
        var positionInVolume6 = 0;
        for (var i = 40; i < gameData.logics.length; i++) {
            var logic = gameData.logics[i];
            console.log('  Adding logic: ' + logic.url);
            console.log('    Adding logic directory entry at position: ' + positionInVolume6);
            gameData.logicDirectoryEntries[i] = this.createDirectoryEntry(volumeId6, positionInVolume6);
            console.log('    Adding logic to volume');
            // ----- -----------------------------------------------------------
            //  0-1  0x1234: signature for the start of a file in the VOL block
            //   2   Vol file number
            //  3-4  Length of the logic script
            //  5-6  Offset of logic code end and text begin
            // ----- -----------------------------------------------------------
            this.updateVolumeHeader(volumeBuffer6, volumeId6, positionInVolume6);
            positionInVolume6 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            var messagesOffsetRecordPosition = positionInVolume6 - 2;
            volumeBuffer6[positionInVolume6++];
            volumeBuffer6[positionInVolume6++];
            this.copyResourceBufferToVolume(volumeBuffer6, logic.logicBuffer, positionInVolume6);
            positionInVolume6 += logic.logicBuffer.length;
            this.copyResourceBufferToVolume(volumeBuffer6, logic.messageBuffer, positionInVolume6);
            positionInVolume6 += logic.messageBuffer.length;
            var scriptLength = logic.logicBuffer.length + logic.messageBuffer.length;
            var msgOffset = logic.logicBuffer.length;
            volumeBuffer6[messagesOffsetRecordPosition] = scriptLength & (0xffff >> 8); // lo
            volumeBuffer6[messagesOffsetRecordPosition + 1] = scriptLength >> 8; // message index hi
            volumeBuffer6[messagesOffsetRecordPosition + 2] = msgOffset & (0xffff >> 8); // lo
            volumeBuffer6[messagesOffsetRecordPosition + 3] = msgOffset >> 8; // message index hi
            positionInVolume6 += 1;
        }
        // views
        var volumeId7 = 7;
        var volumeBuffer7 = new Uint8Array(volumeSize);
        var positionInVolume7 = 0;
        for (var i = 0; i < 50; i++) {
            var view = gameData.views[i];
            console.log('  Adding view: ' + view.url);
            console.log('    Adding view directory entry at position: ' + positionInVolume7);
            gameData.viewDirectoryEntries.push(this.createDirectoryEntry(volumeId7, positionInVolume7));
            console.log('    Adding view to volume');
            this.updateVolumeHeader(volumeBuffer7, volumeId7, positionInVolume7);
            positionInVolume7 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            this.copyResourceBufferToVolume(volumeBuffer7, view.buffer, positionInVolume7);
            positionInVolume7 += view.buffer.length;
            positionInVolume7 += 1;
        }
        // views
        var volumeId8 = 8;
        var volumeBuffer8 = new Uint8Array(volumeSize);
        var positionInVolume8 = 0;
        for (var i = 50; i < gameData.views.length; i++) {
            var view = gameData.views[i];
            console.log('  Adding view: ' + view.url);
            console.log('    Adding view directory entry at position: ' + positionInVolume8);
            gameData.viewDirectoryEntries.push(this.createDirectoryEntry(volumeId8, positionInVolume8));
            console.log('    Adding view to volume');
            this.updateVolumeHeader(volumeBuffer8, volumeId8, positionInVolume8);
            positionInVolume8 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            this.copyResourceBufferToVolume(volumeBuffer8, view.buffer, positionInVolume8);
            positionInVolume8 += view.buffer.length;
            positionInVolume8 += 1;
        }
        // sound
        var volumeId9 = 9;
        var volumeBuffer9 = new Uint8Array(volumeSize);
        var positionInVolume9 = 0;
        for (var i = 0; i < gameData.sounds.length; i++) {
            var sound = gameData.sounds[i];
            console.log('  Adding sound: ' + sound.url);
            console.log('    Adding sound directory entry at position: ' + positionInVolume9);
            gameData.soundDirectoryEntries.push(this.createDirectoryEntry(volumeId9, positionInVolume9));
            console.log('    Adding sound to volume');
            this.updateVolumeHeader(volumeBuffer9, volumeId9, positionInVolume9);
            positionInVolume9 += AgiResources.VOLUMERECORD_HEADER_SIZE;
            this.copyResourceBufferToVolume(volumeBuffer9, sound.buffer, positionInVolume9);
            positionInVolume9 += sound.buffer.length;
            positionInVolume9 += 1;
        }
        // write volume file
        console.log('  Writing VOLs');
        AgiResources.saveFile(siteId, gamePath, 'vol.0', volumeBuffer0);
        AgiResources.saveFile(siteId, gamePath, 'vol.1', volumeBuffer1);
        AgiResources.saveFile(siteId, gamePath, 'vol.2', volumeBuffer2);
        AgiResources.saveFile(siteId, gamePath, 'vol.3', volumeBuffer3);
        AgiResources.saveFile(siteId, gamePath, 'vol.4', volumeBuffer4);
        AgiResources.saveFile(siteId, gamePath, 'vol.5', volumeBuffer5);
        AgiResources.saveFile(siteId, gamePath, 'vol.6', volumeBuffer6);
        AgiResources.saveFile(siteId, gamePath, 'vol.7', volumeBuffer7);
        AgiResources.saveFile(siteId, gamePath, 'vol.8', volumeBuffer8);
        AgiResources.saveFile(siteId, gamePath, 'vol.9', volumeBuffer9);
        // write directory files
        console.log('  Writing PICDIR');
        var encodedPictureDirectory = this.encodeResourceDirectory(gameData.picturesDirectoryEntries);
        AgiResources.saveFile(siteId, gamePath, 'PICDIR', encodedPictureDirectory);
        console.log('  Writing LOGDIR');
        var encodedLogicDirectory = this.encodeResourceDirectory(gameData.logicDirectoryEntries);
        AgiResources.saveFile(siteId, gamePath, 'LOGDIR', encodedLogicDirectory);
        console.log('  Writing VIEWDIR');
        var encodedViewDirectory = this.encodeResourceDirectory(gameData.viewDirectoryEntries);
        AgiResources.saveFile(siteId, gamePath, 'VIEWDIR', encodedViewDirectory);
        console.log('  Writing SNDDIR');
        var encodedSoundDirectory = this.encodeResourceDirectory(gameData.soundDirectoryEntries);
        AgiResources.saveFile(siteId, gamePath, 'SNDDIR', encodedSoundDirectory);
        console.log('  Writing WORDS.TOK');
        AgiResources.saveFile(siteId, gamePath, 'WORDS.TOK', gameData.words.buffer);
        console.log('  Writing OBJECT');
        AgiResources.saveFile(siteId, gamePath, 'OBJECT', gameData.objects.buffer);
        callback.next();
    };
    AgiResources.prototype.parseDirfile = function (buffer, records) {
        var length = buffer.length / 3;
        for (var i = 0; i < length; i++) {
            var val = (buffer.readUint8() << 16) + (buffer.readUint8() << 8) + buffer.readUint8();
            var volNo = val >>> 20;
            var volOffset = val & 0xfffff;
            if (val >>> 16 == 0xff)
                continue;
            records[i] = { volNo: volNo, volOffset: volOffset };
            if (this.availableVols[volNo] === undefined)
                this.availableVols[volNo] = true;
        }
    };
    AgiResources.VOLUMERECORD_HEADER_SIZE = 5;
    AgiResources.addVolumeHeader = function (picData, volume) {
        var endMarkerPosition = picData.length; //indexOf(255) + 1
        var sizeOfNewData = endMarkerPosition + 5;
        var dataWithHeader = new Uint8Array(sizeOfNewData);
        dataWithHeader[0] = 0x12; // signature
        dataWithHeader[1] = 0x34; // signature
        dataWithHeader[2] = volume; // volume
        dataWithHeader[3] = endMarkerPosition & (0xffff >> 8); // resource len LO
        dataWithHeader[4] = endMarkerPosition >> 8; // resource len HI
        // dataWithHeader[5] = 0    // compressed resource len LO
        // dataWithHeader[6] = 0    // compressed resource len HI
        for (var i = 0; i < picData.length; i++) {
            dataWithHeader[i + 5] = picData[i];
        }
        return dataWithHeader;
    };
    AgiResources.updateDirectoryOffsets = function (dirname, dirRecords, startOffset, adjustBy) {
        // now modify the directory
        var position = 0;
        var recordCount = dirRecords.length;
        var newDirEncoded = new Uint8Array(recordCount * 3);
        for (var d = 0; d < recordCount; d++) {
            if (dirRecords[d]) {
                var offset = dirRecords[d].volOffset;
                var volume = dirRecords[d].volNo;
                if (offset > startOffset) {
                    offset = dirRecords[d].volOffset + adjustBy;
                }
                newDirEncoded[position] = volume;
                newDirEncoded[position + 1] = offset >> 8;
                newDirEncoded[position + 2] = offset & (0xffff >> 8);
            }
            else {
                newDirEncoded[position] = 255;
                newDirEncoded[position + 1] = 255;
                newDirEncoded[position + 2] = 255;
            }
            position = position + 3;
        }
        return newDirEncoded;
    };
    AgiResources.saveFile = function (siteId, path, filename, data) {
        var API_WRITE_CONTENT = '/studio/api/1/services/api/1/content/write-content.json';
        var serviceUrl = API_WRITE_CONTENT +
            "?site=".concat(siteId, "&path=").concat(path, "&contentType=folder&createFolders=true&draft=false&duplicate=false&unlock=true");
        var body = new FormData();
        body.append('site', siteId);
        body.append('relativePath', 'null');
        body.append('validating', 'false');
        body.append('path', path);
        body.append('name', filename);
        body.append('type', 'application/octet-stream');
        body.append('allowed', 'true');
        body.append('file', new Blob([data]), filename);
        post(serviceUrl, body).subscribe({
            next: function (response) {
                // alert('File Saved: ' + filename);
            },
            error: function (e) {
                alert('File Failed :' + filename);
            }
        });
    };
    AgiResources.uint8ArrayToByteStream = function (buffer) {
        return new ByteStream(buffer);
    };
    AgiResources.DEFAULT_ROOM_LOGIC = [
        12,
        34,
        0,
        112,
        84,
        82,
        0,
        255,
        7,
        5,
        255,
        29,
        0,
        24,
        0,
        25,
        0,
        27,
        0,
        63,
        50,
        255,
        252,
        1,
        1,
        1,
        1,
        1,
        0,
        252,
        255,
        6,
        0,
        37,
        0,
        120,
        140,
        112,
        120,
        35,
        0,
        26,
        255,
        14,
        1,
        20,
        0,
        255,
        2,
        0,
        101,
        1,
        255,
        1,
        2,
        1,
        255,
        2,
        0,
        18,
        99,
        255,
        1,
        2,
        2,
        255,
        2,
        0,
        18,
        99,
        255,
        1,
        2,
        3,
        255,
        2,
        0,
        18,
        2,
        255,
        1,
        2,
        4,
        255,
        2,
        0,
        18,
        99,
        0,
        1,
        27,
        0,
        4,
        0,
        21,
        30,
        0,
        0,
        0,
        45,
        6,
        82,
        6,
        15,
        78,
        36,
        27,
        25,
        7,
        89,
        100,
        7,
        29,
        8,
        12,
        64,
        65
    ];
    return AgiResources;
}());

function DecodeResourceDialog(props) {
    useActiveSiteId();
    var _a = React.useState(false), dialogOpen = _a[0], setDialogOpen = _a[1];
    var _b = React.useState(0), resourceType = _b[0], setResourceType = _b[1];
    var _c = React.useState([]), resourceList = _c[0], setResourceList = _c[1];
    var _d = React.useState(''), resourceCode = _d[0], setResourceCode = _d[1];
    var RESOURCE_TYPE_NONE = 0;
    var RESOURCE_TYPE_VIEW = 1;
    var RESOURCE_TYPE_PICTURE = 2;
    var RESOURCE_TYPE_LOGIC = 3;
    var RESOURCE_TYPE_WORDS = 4;
    var RESOURCE_TYPE_OBJECT = 5;
    var RESOURCE_TYPE_SOUND = 6;
    function lookupRooms() {
        var rooms = [];
        var Resources = AgiActiveGame.agiExecute('Get Resources', 'Resources');
        for (var i = 0; i < 10000; i++) {
            try {
                // @ts-ignore
                var pic = Resources.readAgiResource(Resources.AgiResource.Pic, i);
                if (pic) {
                    rooms.push(i);
                }
            }
            catch (err) { }
        }
        return rooms;
    }
    function handleTypeChange(event, child) {
        var type = Number(event.target.value);
        setResourceType(type);
        setResourceCode('');
        if (type == RESOURCE_TYPE_NONE) {
            // none
            setResourceList([]);
        }
        else if (type == RESOURCE_TYPE_VIEW) {
            // view
            var views = [];
            for (var i = 0; i < 200; i++) {
                views[views.length] = i;
            }
            setResourceList(views);
        }
        else if (type == RESOURCE_TYPE_PICTURE) {
            // picture
            var rooms = lookupRooms();
            setResourceList(rooms);
        }
        else if (type == RESOURCE_TYPE_LOGIC) {
            // logic
            var rooms = lookupRooms();
            setResourceList(rooms);
        }
        else if (type == RESOURCE_TYPE_WORDS) {
            // words
            setResourceList([0]);
        }
        else if (type == RESOURCE_TYPE_OBJECT) {
            // object
            setResourceList([]);
        }
        else if (type == RESOURCE_TYPE_SOUND) {
            // sound
            var sounds = [];
            for (var i = 0; i < 200; i++) {
                sounds[sounds.length] = i;
            }
            setResourceList(sounds);
        }
    }
    function handleResourceSelect(event, child) {
        var resourceId = Number(event.target.value);
        var type = resourceType;
        if (type == RESOURCE_TYPE_NONE) ;
        else if (type == RESOURCE_TYPE_VIEW) {
            // view
            var viewCode = JSON.stringify(AgiView.decodeView(resourceId));
            setResourceCode(viewCode);
        }
        else if (type == RESOURCE_TYPE_PICTURE) {
            // picture
            var pictureCommands = JSON.stringify(AgiPicture.getPictureCommands(resourceId));
            setResourceCode(pictureCommands);
        }
        else if (type == RESOURCE_TYPE_LOGIC) {
            // logic
            var Agi = AgiActiveGame.agiExecute('Get Logic Array', 'Agi');
            var code = new Agi.LogicParser(Agi.interpreter, resourceId);
            var codeData = AgiActiveGame.agiExecute('Get Binary', 'Resources.readAgiResource(Resources.AgiResource.Logic, ' + resourceId + ')');
            var decompiledCode = AgiLogic.decompile(codeData, code);
            var prettyPrintedCode = AgiLogic.prettyPrintCode(decompiledCode);
            setResourceCode(prettyPrintedCode);
        }
        else if (type == RESOURCE_TYPE_WORDS) {
            // words
            var agiResources = new AgiResources();
            var wordsCode = agiResources.getWords();
            setResourceCode(wordsCode);
        }
        else if (type == RESOURCE_TYPE_OBJECT) ;
        else if (type == RESOURCE_TYPE_SOUND) {
            var soundCode = AgiSound.decodeSound(resourceId);
            setResourceCode(soundCode);
            AgiSound.playSound(JSON.parse(soundCode).soundData);
        }
    }
    var handleClick = function (event) {
        setDialogOpen(true);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { fullWidth: true, maxWidth: "xl", sx: { paddingLeft: '30px' }, onClose: function () { return setDialogOpen(false); }, "aria-labelledby": "simple-dialog-title", open: dialogOpen },
            React.createElement(DialogTitle, null, "Decode Resources"),
            React.createElement(DialogActions, null),
            React.createElement(DialogContent, null,
                React.createElement(FormControl, { fullWidth: true },
                    React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Resource Type"),
                    React.createElement(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", value: resourceType, label: "Resource Type", onChange: handleTypeChange },
                        React.createElement(MenuItem$1, { value: RESOURCE_TYPE_NONE }, "Select Resource Type"),
                        React.createElement(MenuItem$1, { value: RESOURCE_TYPE_VIEW }, "View"),
                        React.createElement(MenuItem$1, { value: RESOURCE_TYPE_PICTURE }, "Picture"),
                        React.createElement(MenuItem$1, { value: RESOURCE_TYPE_LOGIC }, "Logic"),
                        React.createElement(MenuItem$1, { value: RESOURCE_TYPE_WORDS }, "Words"),
                        React.createElement(MenuItem$1, { value: RESOURCE_TYPE_OBJECT }, "Object"),
                        React.createElement(MenuItem$1, { value: RESOURCE_TYPE_SOUND }, "Sound"))),
                resourceList.length > 0 ? (React.createElement(React.Fragment, null,
                    React.createElement(FormControl, { fullWidth: true },
                        React.createElement(InputLabel, { id: "demo-simple-select-label" }, "Resource"),
                        React.createElement(Select, { labelId: "demo-simple-select-label", id: "demo-simple-select", label: "Resource Type", onChange: handleResourceSelect }, resourceList === null || resourceList === void 0 ? void 0 : resourceList.map(function (resource, idx) { return (React.createElement(MenuItem$1, { value: idx }, idx)); }))))) : (React.createElement(React.Fragment, null)),
                React.createElement(TextField, { id: "outlined-textarea", sx: { width: '100%' }, multiline: true, rows: 10, value: resourceCode }))),
        React.createElement(Tooltip, { title: 'Decode Resources' },
            React.createElement(IconButton$1, { disabled: !AgiActiveGame.gameIsLoaded(), size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(CodeOffRoundedIcon, null)))));
}

var AgiBuild = /** @class */ (function () {
    function AgiBuild() {
        var _this = this;
        this.compile = function (siteId, gameId, callback) {
            _this.loadSources(siteId, gameId, {
                next: function (gameResources) {
                    var agiResources = new AgiResources();
                    agiResources.saveGame(siteId, gameId, gameResources, callback);
                }
            });
        };
        this.loadSources = function (siteId, gameId, callback) {
            var resourcesServiceUrl = "/api/1/site/content_store/tree.json?url=/static-assets/games/".concat(gameId, "/src");
            get(resourcesServiceUrl).subscribe({
                next: function (resourceResponse) {
                    var downloadList = [];
                    for (var r = 0; r < resourceResponse.response.children.length; r++) {
                        var item = resourceResponse.response.children[r];
                        if (item.name == 'picture' || item.name == 'logic' || item.name == 'view' || item.name == 'sound') {
                            for (var p = 0; p < item.children.length; p++) {
                                var sourceItem = item.children[p];
                                downloadList.push(sourceItem.url);
                            }
                        }
                        else if (item.name == 'object.json') {
                            downloadList.push(item.url);
                        }
                        else if (item.name == 'words.json') {
                            downloadList.push(item.url);
                        }
                    }
                    console.log('Loading Resources');
                    var agiResources = new AgiResources();
                    agiResources.downloadGameData('', downloadList, function (gameData) {
                        console.log('Ready to Build');
                        callback.next(gameData);
                    });
                },
                error: function (e) { }
            });
        };
    }
    return AgiBuild;
}());

function Compile(props) {
    var siteId = useActiveSiteId();
    var _a = React.useState(''), snackMessage = _a[0], setSnackMessage = _a[1];
    var _b = React.useState(true), snackSuccess = _b[0], setSnackSuccess = _b[1];
    var _c = React.useState(false), snackShow = _c[0], setSnackShow = _c[1];
    var _d = React.useState(false), progressShow = _d[0], setProgressShow = _d[1];
    var _e = React.useState(null), anchorEl = _e[0], setAnchorEl = _e[1];
    var open = Boolean(anchorEl);
    usePreviewNavigation().currentUrlPath;
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
        var agiBuild = new AgiBuild();
        setProgressShow(true);
        agiBuild.compile(siteId, AgiActiveGame.getActiveGameId(), {
            next: function () {
                setSnackMessage('Build Complete');
                setSnackSuccess(true);
                setSnackShow(true);
            }
        });
    };
    function handleSnackClose(event, reason) {
        setProgressShow(false);
        setSnackShow(false);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { title: 'Compile' },
            React.createElement(IconButton$1, { disabled: false, size: "medium", style: { padding: 4 }, id: "go-positioned-button", "aria-controls": open ? 'demo-positioned-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick },
                React.createElement(FlashOnRoundedIcon, null))),
        React.createElement(Backdrop, { sx: { color: '#fff', zIndex: function (theme) { return theme.zIndex.drawer + 1; } }, open: progressShow },
            React.createElement(CircularProgress, { color: "inherit" }),
            React.createElement(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: snackShow, autoHideDuration: 1000, onClose: handleSnackClose },
                React.createElement(Alert, { severity: snackSuccess ? "success" : "error", sx: { width: '100%' } }, snackMessage)))));
}

var plugin = {
    locales: undefined,
    scripts: undefined,
    stylesheets: undefined,
    id: 'org.rd.plugin.agistudio',
    widgets: {
        'org.rd.plugin.agistudio.RoomSelector': RoomSelector,
        'org.rd.plugin.agistudio.AllowInput': AllowInput,
        'org.rd.plugin.agistudio.SoundSelector': SoundSelector,
        'org.rd.plugin.agistudio.SetEgoPosition': SetEgoPosition,
        'org.rd.plugin.agistudio.ShowPriorityBuffer': ShowPriorityBuffer,
        'org.rd.plugin.agistudio.ShowWords': ShowWords,
        'org.rd.plugin.agistudio.ShowCode': ShowCode,
        'org.rd.plugin.agistudio.CurrentRoom': CurrentRoom,
        'org.rd.plugin.agistudio.AddGame': AddGame,
        'org.rd.plugin.agistudio.EditPictureDialog': EditPictureDialog,
        'org.rd.plugin.agistudio.EditViewDialog': EditViewDialog,
        'org.rd.plugin.agistudio.OpenPicDialogButton': OpenPicDialogButton,
        'org.rd.plugin.agistudio.OpenViewDialogButton': OpenViewDialogButton,
        'org.rd.plugin.agistudio.DecodeResourceDialog': DecodeResourceDialog,
        'org.rd.plugin.agistudio.Compile': Compile
    }
};

export { AddGame, AllowInput, Compile, CurrentRoom, DecodeResourceDialog, EditPictureDialog, EditViewDialog, OpenPicDialogButton, OpenViewDialogButton, RoomSelector, SetEgoPosition, ShowCode, ShowWords, SoundSelector, plugin as default };
