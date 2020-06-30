import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@material-ui/core';
import { PROCESS_ORDER } from './shared/constants';

const { ipcRenderer, logger } = window;

function App() {
  const [orderInfo, setOrderInfo] = useState({
    phoneNumber: '',
    url: '',
    size: '',
    quantity: '',
    firstname: '',
    lastname: '',
    street: '',
    city: '',
    zip: '',
    ccType: '',
    cc: '',
    expYear: '',
    expMonth: '',
    ccv: '',
    email: '',
  });

  const handleChange = (field) => (event) => {
    setOrderInfo({
      ...orderInfo,
      [field]: event.target.value,
    });
  };

  const handleStart = async () => {
    try {
      await ipcRenderer.invoke(PROCESS_ORDER, orderInfo);
    } catch (err) {
      logger.error(`Order failed: ${err}`);
      alert(`Order failed: ${err}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField
        id="phone-number"
        label="Phone number"
        value={orderInfo.phoneNumber}
        onChange={handleChange('phoneNumber')}
      />
      <TextField
        id="email"
        label="Email"
        value={orderInfo.email}
        onChange={handleChange('email')}
      />
      <TextField
        id="shoe-url"
        label="Shoe URL"
        value={orderInfo.url}
        onChange={handleChange('url')}
      />
      <TextField
        id="shoe-size"
        label="Shoe size"
        value={orderInfo.size}
        onChange={handleChange('size')}
      />
      <TextField
        id="shoe-quantity"
        label="Quantity"
        value={orderInfo.quantity}
        onChange={handleChange('quantity')}
      />
      <TextField
        id="firstname"
        label="First name"
        value={orderInfo.firstname}
        onChange={handleChange('firstname')}
      />
      <TextField
        id="lastname"
        label="Last name"
        value={orderInfo.lastname}
        onChange={handleChange('lastname')}
      />
      <TextField
        id="street-address"
        label="Street address"
        value={orderInfo.street}
        onChange={handleChange('street')}
      />
      <TextField
        id="city"
        label="City"
        value={orderInfo.city}
        onChange={handleChange('city')}
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orderInfo.state}
          onChange={handleChange('state')}
          style={{
            width: 165,
          }}
        >
          <MenuItem value="1">Alabama</MenuItem>
          <MenuItem value="2">Alaska</MenuItem>
          <MenuItem value="4">Arizona</MenuItem>
          <MenuItem value="5">Arkansas</MenuItem>
          <MenuItem value="12">California</MenuItem>
          <MenuItem value="13">Colorado</MenuItem>
          <MenuItem value="14">Connecticut</MenuItem>
          <MenuItem value="15">Delaware</MenuItem>
          <MenuItem value="16">District of Columbia</MenuItem>
          <MenuItem value="18">Florida</MenuItem>
          <MenuItem value="19">Georgia</MenuItem>
          <MenuItem value="21">Hawaii</MenuItem>
          <MenuItem value="22">Idaho</MenuItem>
          <MenuItem value="23">Illinois</MenuItem>
          <MenuItem value="24">Indiana</MenuItem>
          <MenuItem value="25">Iowa</MenuItem>
          <MenuItem value="26">Kansas</MenuItem>
          <MenuItem value="27">Kentucky</MenuItem>
          <MenuItem value="28">Louisiana</MenuItem>
          <MenuItem value="29">Maine</MenuItem>
          <MenuItem value="31">Maryland</MenuItem>
          <MenuItem value="32">Massachusetts</MenuItem>
          <MenuItem value="33">Michigan</MenuItem>
          <MenuItem value="34">Minnesota</MenuItem>
          <MenuItem value="35">Mississippi</MenuItem>
          <MenuItem value="36">Missouri</MenuItem>
          <MenuItem value="37">Montana</MenuItem>
          <MenuItem value="38">Nebraska</MenuItem>
          <MenuItem value="39">Nevada</MenuItem>
          <MenuItem value="40">New Hampshire</MenuItem>
          <MenuItem value="41">New Jersey</MenuItem>
          <MenuItem value="42">New Mexico</MenuItem>
          <MenuItem value="43">New York</MenuItem>
          <MenuItem value="44">North Carolina</MenuItem>
          <MenuItem value="45">North Dakota</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="zip-code"
        label="Zip code"
        value={orderInfo.zip}
        onChange={handleChange('zip')}
      />
      <FormControl>
        <InputLabel>Credit Card type</InputLabel>
        <Select
          value={orderInfo.state}
          onChange={handleChange('ccType')}
          style={{
            width: 165,
          }}
        >
          <MenuItem value="AE">American Express</MenuItem>
          <MenuItem value="VI">Visa</MenuItem>
          <MenuItem value="MC">MasterCard</MenuItem>
          <MenuItem value="DI">Discover</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="credit-card-number"
        label="Credit card number"
        value={orderInfo.cc}
        onChange={handleChange('cc')}
      />
      <FormControl>
        <InputLabel>Expiration month</InputLabel>
        <Select
          value={orderInfo.state}
          onChange={handleChange('expMonth')}
          style={{
            width: 165,
          }}
        >
          <MenuItem value="1">1 - Jan</MenuItem>
          <MenuItem value="2">2 - Feb</MenuItem>
          <MenuItem value="3">3 - Mar</MenuItem>
          <MenuItem value="4">4 - Apr</MenuItem>
          <MenuItem value="5">5 - May</MenuItem>
          <MenuItem value="6">6 - Jun</MenuItem>
          <MenuItem value="7">7 - Jul</MenuItem>
          <MenuItem value="8">8 - Aug</MenuItem>
          <MenuItem value="9">9 - Sep</MenuItem>
          <MenuItem value="10">10 - Oct</MenuItem>
          <MenuItem value="11">11 - Nov</MenuItem>
          <MenuItem value="12">12 - Dec</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="expiration-year"
        label="Expiration year"
        value={orderInfo.expYear}
        onChange={handleChange('expYear')}
      />
      <TextField
        id="security-code"
        label="Security code (CCV)"
        value={orderInfo.ccv}
        onChange={handleChange('ccv')}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: 10,
        }}
        onClick={handleStart}
      >
        Start
      </Button>
    </div>
  );
}

export default App;
