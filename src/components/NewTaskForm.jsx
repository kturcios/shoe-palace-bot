/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { useTasks, useProfiles } from '../hooks';
import InitialState from '../contexts/tasks/InitialState';
import StoreSelect from './StoreSelect';
import ProfileSelect from './ProfileSelect';

const { logger } = window;

export default function NewTaskForm({ open, onClose }) {
  const { create } = useTasks();
  const { profiles } = useProfiles();
  const [task, setTask] = useState({ ...InitialState });
  const {
    store,
    url,
    size,
    quantity,
    profile,
  } = task;
  const handleCreate = async () => {
    try {
      await create(task);
      alert('Task Created!');
    } catch (err) {
      logger.error(err);
      alert(`Failed to create task: ${err}`);
    } finally {
      onClose();
    }
  };
  useEffect(() => {
    if (!open) {
      // Reset the state if the user closes the form
      setTask({ ...InitialState });
    }
  }, [open]);
  const updateField = (field) => (event) => {
    setTask({
      ...task,
      [field]: event.target.value,
    });
  };
  const updateProfile = (event) => {
    const [selectedProfile] = profiles.filter(({ id }) => id === event.target.value);
    setTask({
      ...task,
      profile: {
        ...selectedProfile,
      },
    });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h4">
          Create a New Task
        </Typography>
      </DialogTitle>
      <DialogContent>
        <StoreSelect
          value={store}
          onChange={updateField('store')}
        />
        <TextField
          label="URL"
          type="text"
          fullWidth
          value={url}
          onChange={updateField('url')}
        />
        <TextField
          label="Size"
          type="text"
          fullWidth
          value={size}
          onChange={updateField('size')}
        />
        <TextField
          label="Quantity"
          type="text"
          fullWidth
          value={quantity}
          onChange={updateField('quantity')}
        />
        <ProfileSelect
          value={profile.id}
          onChange={updateProfile}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
