import { useEffect } from 'react';
import { useProfilesState, useProfilesDispatch } from './contexts/profiles/ProfilesContext';
import { useTasksState, useTasksDispatch } from './contexts/tasks/TasksContext';
import {
  LIST_PROFILES,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  LIST_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} from './shared/constants';

const { ipcRenderer, logger } = window;

// eslint-disable-next-line import/prefer-default-export
export function useProfiles() {
  const { profiles } = useProfilesState();
  const dispatch = useProfilesDispatch();
  const fetchProfiles = async () => {
    try {
      const profilesList = await ipcRenderer.invoke(LIST_PROFILES);
      dispatch({
        type: 'UPDATE_PROFILES_LIST',
        profiles: profilesList,
      });
    } catch (err) {
      logger.error(err);
    }
  };
  const create = async (newProfile) => {
    try {
      await ipcRenderer.invoke(CREATE_PROFILE, newProfile);
      fetchProfiles();
    } catch (err) {
      logger.error(err);
    }
  };
  const update = async (updatedProfile) => {
    try {
      await ipcRenderer.invoke(UPDATE_PROFILE, updatedProfile);
      fetchProfiles();
    } catch (err) {
      logger.error(err);
    }
  };
  const remove = async (id) => {
    try {
      await ipcRenderer.invoke(DELETE_PROFILE, id);
      fetchProfiles();
    } catch (err) {
      logger.error(err);
    }
  };
  useEffect(() => {
    fetchProfiles();
  }, []);
  return {
    profiles,
    create,
    update,
    remove,
  };
}

export function useTasks() {
  const { tasks } = useTasksState();
  const dispatch = useTasksDispatch();
  const fetchTasks = async () => {
    try {
      const tasksList = await ipcRenderer.invoke(LIST_TASKS);
      dispatch({
        type: 'UPDATE_TASKS_LIST',
        tasks: tasksList,
      });
    } catch (err) {
      logger.error(err);
    }
  };
  const create = async (newTask) => {
    try {
      await ipcRenderer.invoke(CREATE_TASK, newTask);
      fetchTasks();
    } catch (err) {
      logger.error(err);
    }
  };
  const update = async (updatedTask) => {
    try {
      await ipcRenderer.invoke(UPDATE_TASK, updatedTask);
      fetchTasks();
    } catch (err) {
      logger.error(err);
    }
  };
  const remove = async (id) => {
    try {
      await ipcRenderer.invoke(DELETE_TASK, id);
      fetchTasks();
    } catch (err) {
      logger.error(err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  return {
    tasks,
    create,
    update,
    remove,
  };
}
