import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField
        id="shoe-url"
        label="Shoe URL"
      />
      <TextField
        id="shoe-size"
        label="Shoe size"
      />
      <TextField
        id="shoe-quantity"
        label="Quantity"
      />
      <TextField
        id="firstname"
        label="First name"
      />
      <TextField
        id="lastname"
        label="Last name"
      />
      <TextField
        id="street-address"
        label="Street address"
      />
      <TextField
        id="city"
        label="City"
      />
      <TextField
        id="zip-code"
        label="Zip code"
      />
      <TextField
        id="credit-card-number"
        label="Credit card number"
      />
      <TextField
        id="expiration-year"
        label="Expiration year"
      />
      <TextField
        id="security-code"
        label="Security code (CCV)"
      />
    </div>
  );
}

export default App;
