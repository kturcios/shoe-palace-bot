/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
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
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTasks, useProfiles, useProxies } from '../../hooks';
import InitialState from '../../contexts/tasks/InitialState';
import StoreSelect from '../StoreSelect';
import ProfileSelect from '../ProfileSelect';
import ProxyGroupSelect from '../ProxyGroupSelect';

const { logger } = window;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    textAlign: 'center',
  },
});

export default function TasksMenu() {
  const classes = useStyles();
  const { profiles } = useProfiles();
  const { proxies } = useProxies();
  const [currentIndex, setCurrentIndex] = useState('');
  const [currentTask, setCurrentTask] = useState({ ...InitialState });
  const {
    tasks,
    update,
    remove,
    start,
  } = useTasks();
  const {
    store,
    url,
    size,
    quantity,
  } = currentTask;
  useEffect(() => {
    if (currentIndex !== '') {
      setCurrentTask(tasks[currentIndex]);
    } else {
      setCurrentTask({ ...InitialState });
    }
  }, [currentIndex]);
  const handleUpdate = async () => {
    try {
      await update(currentTask);
    } catch (err) {
      logger.error(err);
      alert(`Failed to update task: ${err}`);
    }
  };
  const handleDelete = async () => {
    try {
      await remove(currentTask.id);
    } catch (err) {
      logger.error(err);
      alert(`Failed to delete task ${err}`);
    } finally {
      setCurrentIndex('');
    }
  };
  const updateField = (field) => (event) => {
    setCurrentTask({
      ...currentTask,
      [field]: event.target.value,
    });
  };
  const updateSelectedProfile = (event) => {
    const [selectedProfile] = profiles.filter(({ id }) => event.target.value === id);
    logger.info('selected profile: ', selectedProfile);
    setCurrentTask({
      ...currentTask,
      profile: {
        ...selectedProfile,
      },
    });
  };
  const updateSelectedProxyGroup = (event) => {
    const [selectedProxyGroup] = proxies.filter(({ id }) => event.target.value === id);
    setCurrentTask({
      ...currentTask,
      ...selectedProxyGroup,
    });
  };
  const handleStart = async () => {
    try {
      await start(currentTask);
    } catch (err) {
      logger.error(err);
      alert(`Failed to start task: ${err}`);
    }
  };
  return (
    <Container
      maxWidth="md"
      className={classes.container}
    >
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
              <InputLabel>Select a Task...</InputLabel>
              <Select
                value={currentIndex}
                onChange={(e) => setCurrentIndex(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {tasks.map((task, index) => <MenuItem value={index.toString()}>{`${task.store} - ${task.profile.shipping.firstName}`}</MenuItem>)}
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
                <StoreSelect
                  value={store}
                  onChange={updateField('store')}
                />
                <TextField
                  label="URL"
                  fullWidth
                  value={url}
                  onChange={updateField('url')}
                />
                <TextField
                  label="Size"
                  fullWidth
                  value={size}
                  onChange={updateField('size')}
                />
                <TextField
                  label="Quantity"
                  fullWidth
                  value={quantity}
                  onChange={updateField('quantity')}
                />
                <ProfileSelect
                  value={currentTask.profile.id}
                  onChange={updateSelectedProfile}
                />
                <ProxyGroupSelect
                  value={currentTask.proxyGroup.id}
                  onChange={updateSelectedProxyGroup}
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
          &nbsp;
          &nbsp;
          <Button
            variant="contained"
            style={{
              display: currentIndex === '' ? 'none' : 'block',
            }}
            onClick={handleStart}
          >
            START
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
