import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

export default function CreditCardTypeSelect({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Credit Card Type</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        <MenuItem value="AE">American Express</MenuItem>
        <MenuItem value="VI">Visa</MenuItem>
        <MenuItem value="MC">MasterCard</MenuItem>
        <MenuItem value="DI">Discover</MenuItem>
      </Select>
    </FormControl>
  );
}
