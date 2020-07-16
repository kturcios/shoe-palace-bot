/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@material-ui/core';
import InitialState from '../contexts/proxies/InitialState';
import { useProxies } from '../hooks';

const { logger } = window;

export default function ProxiesMenu() {
  const [currentIndex, setCurrentIndex] = useState('');
  const [currentProxy, setCurrentProxy] = useState({ ...InitialState });
  const {
    proxies,
    update,
    remove,
  } = useProxies();
  useEffect(() => {
    if (currentIndex !== '') {
      setCurrentProxy(proxies[currentIndex]);
    } else {
      setCurrentProxy({ ...InitialState });
    }
  }, [currentIndex]);
  const handleUpdate = async () => {
    try {
      await update(currentProxy);
      alert('Proxy group updated');
    } catch (err) {
      logger.error(err);
      alert(`Failed to update proxy: ${err}`);
    }
  };
  const handleDelete = async () => {
    try {
      await remove(currentProxy.id);
      alert('Proxy group deleted');
    } catch (err) {
      logger.error(err);
      alert(`Failed to delete proxy ${err}`);
    } finally {
      setCurrentIndex('');
    }
  };
  const updateCurrentProxyField = (event) => {
    setCurrentProxy({
      ...currentProxy,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Grid
      container
      direction="column"
      spacing={1}
    >
      <Grid
        item
        container
      >
        <Grid item xs={3} />
        <Grid
          item
          xs={6}
        >
          <FormControl fullWidth>
            <InputLabel>Select a Proxy Group...</InputLabel>
            <Select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {proxies.map(({ name }, index) => (
                <MenuItem value={index}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Grid
        item
        container
        spacing={3}
      >
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Card
            style={{
              display: currentIndex === '' ? 'none' : 'block',
            }}
          >
            <CardContent>
              <TextField
                name="name"
                label="Name"
                variant="filled"
                fullWidth
                value={currentProxy.name}
                onChange={updateCurrentProxyField}
              />
              <TextField
                variant="filled"
                type="text"
                label="Proxy list"
                fullWidth
                multiline
                rows={20}
                value={currentProxy.data}
                name="data"
                onChange={updateCurrentProxyField}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Grid
        item
        xs={12}
        container
        justify="center"
      >
        <Button
          variant="contained"
          style={{
            display: currentIndex === '' ? 'none' : 'block',
          }}
          onClick={handleDelete}
        >
          DELETE
        </Button>
        &nbsp;
        &nbsp;
        <Button
          variant="contained"
          style={{
            display: currentIndex === '' ? 'none' : 'block',
          }}
          onClick={handleUpdate}
        >
          UPDATE
        </Button>
      </Grid>
    </Grid>
  );
}
