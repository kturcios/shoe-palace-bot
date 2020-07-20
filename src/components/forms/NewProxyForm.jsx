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
import { useProxies } from '../../hooks';
import InitialState from '../../contexts/proxies/InitialState';

const { logger } = window;

export default function NewProxyForm({ open, onClose }) {
  const [proxy, setProxy] = useState({
    name: '',
    data: '',
  });
  const { create } = useProxies();
  const handleUpdate = (event) => {
    setProxy({
      ...proxy,
      [event.target.name]: event.target.value,
    });
  };
  const handleCreate = async () => {
    try {
      await create(proxy);
      alert('Proxy group saved!');
    } catch (err) {
      logger.error(err);
      alert(`Failed to create proxy group: ${err}`);
    } finally {
      onClose();
    }
  };
  useEffect(() => {
    if (!open) {
      // Reset the state if the user closes the form
      setProxy({ ...InitialState });
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Typography variant="h4">
          Create a New Proxy Group
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          variant="filled"
          type="text"
          label="Proxy Group Name"
          fullWidth
          name="name"
          value={proxy.name}
          onChange={handleUpdate}
        />
        <TextField
          variant="filled"
          type="text"
          label="Enter your proxy list"
          fullWidth
          multiline
          rows={20}
          value={proxy.data}
          name="data"
          onChange={handleUpdate}
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
