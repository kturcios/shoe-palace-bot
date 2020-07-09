import { useEffect } from 'react';
import { useProfilesState, useProfilesDispatch } from './contexts/profiles/ProfilesContext';
import {
  LIST_PROFILES,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  DELETE_PROFILE,
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
