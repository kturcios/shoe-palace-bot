import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

export default function CountrySelect({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Country</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        <MenuItem value="US">United States</MenuItem>
      </Select>
    </FormControl>
  );
}
