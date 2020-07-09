import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

export default function StoreSelect({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Store</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        <MenuItem value="Shoe Palace">Shoe Palace</MenuItem>
      </Select>
    </FormControl>
  );
}
