import React, { useEffect, useState } from 'react';
import { APP_INFO } from './shared/constants';

const { ipcRenderer } = window;

function App() {
  const [appInfo, setAppInfo] = useState({
    name: '',
    version: '',
  });

  useEffect(() => {
    ipcRenderer.send(APP_INFO);
    ipcRenderer.on(APP_INFO, (event, arg) => {
      setAppInfo({
        name: arg.name,
        version: arg.version,
      });
    });
    // Remove listeners when this component unmounts
    return () => ipcRenderer.removeAllListeners(APP_INFO);
  }, []);

  return (
    <div className="App">
      <h1>{appInfo.name}</h1>
      <h2>{appInfo.version}</h2>
    </div>
  );
}

export default App;
