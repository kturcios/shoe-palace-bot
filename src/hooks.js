import { useState, useEffect } from 'react';
import { LIST_PROFILES } from './shared/constants';

const { ipcRenderer, logger } = window;

// eslint-disable-next-line import/prefer-default-export
export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const fetchProfiles = async () => {
    try {
      setProfiles(await ipcRenderer.invoke(LIST_PROFILES));
    } catch (err) {
      logger.error(err);
    }
  };
  useEffect(() => {
    fetchProfiles();
  }, []);
  return {
    profiles,
    update: fetchProfiles, // update function calls fetchProfiles internally
  };
}
