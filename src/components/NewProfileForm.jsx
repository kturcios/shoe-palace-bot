import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
} from '@material-ui/core';
import dispatch from '../contexts/ProfilesContext';
import {
  CREATE_PROFILE,
  LIST_PROFILES,
  UPDATE_PROFILES_LIST,
} from '../shared/constants';

const { ipcRenderer, logger } = window;

export default function NewProfileForm({ open, onClose }) {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    address2: '',
    city: '',
    zipCode: '',
    state: '',
    country: '',
  });
  const handleCreate = async () => {
    try {
      await ipcRenderer.invoke(CREATE_PROFILE, profile);
      const profilesList = await ipcRenderer(LIST_PROFILES);
      dispatch({
        type: UPDATE_PROFILES_LIST,
        profiles: profilesList,
      });
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create a New Profile
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
