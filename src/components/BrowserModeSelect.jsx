import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

export default function BrowserModeSelect({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Browser Mode</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        <MenuItem value="desktop">Desktop</MenuItem>
        <MenuItem value="mobile">Mobile</MenuItem>
      </Select>
    </FormControl>
  );
}
