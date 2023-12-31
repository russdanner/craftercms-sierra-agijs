import * as React from 'react';
import { CrafterCMSNextBridge } from '@craftercms/studio-ui';
import { default as descriptor, OpenBoardDialogPanelButton } from 'trello-board-components';
import { registerPlugin } from '@craftercms/studio-ui/services/plugin';
import { useLayoutEffect } from 'react';

function App() {
  useLayoutEffect(() => {
    registerPlugin(descriptor, { name: '', site: '', type: '' });
  }, []);
  return (
    <CrafterCMSNextBridge>
      <OpenBoardDialogPanelButton />
    </CrafterCMSNextBridge>
  );
}

export default App;
