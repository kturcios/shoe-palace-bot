import React from 'react';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import { useProfilesState } from '../contexts/profiles/ProfilesContext';

export default function ProfileSelect({ value, onChange }) {
  const { profiles } = useProfilesState();
  return (
    <FormControl fullWidth>
      <InputLabel>Profile</InputLabel>
      <Select
        value={value}
        onChange={onChange}
      >
        {profiles.map(({ id, shipping: { firstName, lastName } }) => (
          <MenuItem value={id}>
            {`${firstName} ${lastName}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
