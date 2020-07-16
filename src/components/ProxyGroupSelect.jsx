import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { useProxies } from '../hooks';

export default function ProxyGroupSelect({ value, onChange }) {
  const { proxies } = useProxies();
  return (
    <FormControl fullWidth>
      <InputLabel>Proxy Group</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        {proxies.map(({ id, name }) => (
          <MenuItem value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
