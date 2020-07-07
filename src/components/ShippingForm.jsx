import React from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';

export default function ShippingForm({ shipping, setShipping }) {
  const handleChange = (field) => (event) => {
    setShipping({
      ...shipping,
      [field]: event.target.value,
    });
  };
  return (
    <>
      <TextField
        type="text"
        label="First Name"
        value={shipping.firstName}
        onChange={handleChange('firstName')}
      />
      <TextField
        type="text"
        label="First Name"
        value={shipping.lastName}
        onChange={handleChange('lastName')}
      />
      <TextField
        type="email"
        label="Email"
        value={shipping.email}
        onChange={handleChange('email')}
      />
      <TextField
        type="tel"
        label="Phone Number"
        value={shipping.phoneNumber}
        onChange={handleChange('phoneNumber')}
      />
      <TextField
        type="text"
        label="Address"
        value={shipping.address}
        onChange={handleChange('address')}
      />
      <TextField
        type="text"
        label="Address 2"
        value={shipping.address2}
        onChange={handleChange('address2')}
      />
      <TextField
        type="text"
        label="City"
        value={shipping.city}
        onChange={handleChange('city')}
      />
      <FormControl>
        <InputLabel>State</InputLabel>
        <Select
          value={shipping.state}
          onChange={handleChange('state')}
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
          <MenuItem value="47">Ohio</MenuItem>
          <MenuItem value="48">Oklahoma</MenuItem>
          <MenuItem value="49">Oregon</MenuItem>
          <MenuItem value="51">Pennsylvania</MenuItem>
          <MenuItem value="53">Rhode Island</MenuItem>
          <MenuItem value="54">South Carolina</MenuItem>
          <MenuItem value="55">South Dakota</MenuItem>
          <MenuItem value="56">Tennessee</MenuItem>
          <MenuItem value="57">Texas</MenuItem>
          <MenuItem value="58">Utah</MenuItem>
          <MenuItem value="59">Vermont</MenuItem>
          <MenuItem value="61">Virginia</MenuItem>
          <MenuItem value="62">Washington</MenuItem>
          <MenuItem value="63">West Virginia</MenuItem>
          <MenuItem value="64">Wisconsin</MenuItem>
          <MenuItem value="65">Wyoming</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="text"
        label="Zip Code"
        value={shipping.zipCode}
        onChange={handleChange('zipCode')}
      />
      <FormControl>
        <InputLabel>Country</InputLabel>
        <Select
          value={shipping.country}
          onChange={handleChange('country')}
        >
          <MenuItem value="US">United States</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
