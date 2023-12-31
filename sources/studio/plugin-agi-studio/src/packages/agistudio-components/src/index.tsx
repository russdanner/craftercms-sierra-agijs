import { PluginDescriptor } from '@craftercms/studio-ui';

import AllowInput from './components/AllowInput';
import RoomSelector from './components/RoomSelector';
import SoundSelector from './components/SoundSelector';
import SetEgoPosition from './components/SetEgoPosition';
import ShowPriorityBuffer from './components/ShowPriorityBuffer';
import ShowWords from './components/ShowWords';
import CurrentRoom from './components/CurrentRoom';
import ShowCode from './components/ShowCode';
import AddGame from './components/AddGame';
import EditPictureDialog from './components/EditPictureDialog';
import OpenPicDialogButton from './components/OpenPicDialogButton';
import EditViewDialog from './components/EditViewDialog';
import OpenViewDialogButton from './components/OpenViewDialogButton';
import DecodeResourceDialog from './components/DecodeResourceDialog';
import Compile from './components/Compile';

const plugin: PluginDescriptor = {
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

export {
  RoomSelector,
  SoundSelector,
  AllowInput,
  SetEgoPosition,
  CurrentRoom,
  ShowWords,
  ShowCode,
  AddGame,
  OpenPicDialogButton,
  EditPictureDialog,
  EditViewDialog,
  OpenViewDialogButton,
  DecodeResourceDialog,
  Compile
};

export default plugin;
