import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTasksState, useTasksDispatch } from '../contexts/TasksContext';
import {
  LIST_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from '../shared/constants';

const { ipcRenderer, logger } = window;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    width: '100%',
  },
}));

export default function TaskMenuContent() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const dispatch = useTasksDispatch();
  const {
    isNew,
    selectedTaskIndex,
    task,
  } = useTasksState();
  const {
    store,
    url,
    size,
    quantity,
    billingProfileId,
  } = task;
  const handleCancelClick = async () => {

  };
  const handleClickDelete = async () => {

  };
  const fetchTasks = async () => {
    try {
      const taskList = await ipcRenderer.invoke(LIST_TASKS);
      setTasks(taskList);
    } catch (err) {
      logger.error(`Failed to fetch tasks: ${err}`);
    }
  };
  const handleCreateTask = async () => {
    dispatch({ type: 'CREATE' });
  };
  const handleTaskFieldUpdate = (field) => (event) => {
    dispatch({
      type: 'TASK_FIELD_UPDATE',
      field,
      value: event.target.value,
    });
  };
  const handleTaskUpdate = async () => {
    if (isNew) {
      dispatch({
        type: 'UPDATE_TASK',
      });
    }
    try {
      await ipcRenderer.invoke(UPDATE_TASK, isNew, task);
    } catch (err) {
      logger.error(err);
    } finally {
      fetchTasks();
    }
  };
  return (
    <Grid
      container
      spacing={3}
      direction="column"
    >
      <Grid
        item
        xs={12}
        container
        alignItems="center"
      >
        <Grid item xs={8}>
          <FormControl
            className={classes.formControl}
            disabled={isNew}
          >
            <InputLabel>Task</InputLabel>
            <Select
              value={selectedTaskIndex}
              onChange={(event) => dispatch({
                type: 'UPDATE_TASK_INDEX',
                selectedTaskIndex: event.target.value,
              })}
            >
              {tasks.map((bp, index) => <MenuItem value={index}>{bp.firstname}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateTask}
          >
            NEW
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        spacing={3}
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          container
          direction="column"
        >
          <FormControl>
            <InputLabel>Store</InputLabel>
            <Select
              value={store}
              onChange={handleTaskFieldUpdate('store')}
            >
              <MenuItem value="Shoe Palace">Shoe Palace</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="URL"
            value={url}
            onChange={handleTaskFieldUpdate('url')}
          />
          <TextField
            label="Size"
            value={size}
            onChange={handleTaskFieldUpdate('size')}
          />
          <TextField
            label="Quanity"
            value={quantity}
            onChange={handleTaskFieldUpdate('quantity')}
          />
          <FormControl>
            <InputLabel>Billing Profile</InputLabel>
            <Select
              value={store}
              onChange={handleTaskFieldUpdate('billingProfileId')}
            >
              {tasks.map((task) => <h1>hi</h1>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row-reverse"
        >
          {(selectedTaskIndex !== null || isNew) && (
            <>
              <Button
                variant="contained"
                onClick={handleTaskUpdate}
              >
                SAVE
              </Button>
              &nbsp;
              &nbsp;
              <Button
                variant="contained"
                onClick={isNew ? handleCancelClick : handleClickDelete}
              >
                {isNew ? 'CANCEL' : 'DELETE'}
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
