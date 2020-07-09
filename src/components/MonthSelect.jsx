import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

export default function MonthSelect({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Expiration Month</InputLabel>
      <Select
        value={value}
        onChange={onChange}
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
  );
}
