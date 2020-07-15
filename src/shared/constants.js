const createConstant = (name, value) => {
  Object.defineProperty(module.exports, name, {
    value,
    enumerable: true,
    writable: false,
  });
};

createConstant('APP_INFO', 'app_info');
createConstant('PROCESS_ORDER', 'process-order');

/* -------------------- Channels -------------------- */

// Profiles
createConstant('UPDATE_PROFILES_LIST', 'update-profiles-list'); // used by profiles context
createConstant('LIST_PROFILES', 'list-profiles');
createConstant('CREATE_PROFILE', 'create-profile');
createConstant('UPDATE_PROFILE', 'update-profile');
createConstant('DELETE_PROFILE', 'delete-profile');

// Tasks
createConstant('UPDATE_TASKS_LIST', 'update-tasks-list'); // used by tasks context
createConstant('LIST_TASKS', 'list-tasks');
createConstant('CREATE_TASK', 'create-task');
createConstant('UPDATE_TASK', 'update-task');
createConstant('DELETE_TASK', 'delete-task');
createConstant('START_TASK', 'start-task');

// Proxies
createConstant('UPDATE_PROXIES_LIST', 'update-proxies-list'); // used by proxies context
createConstant('LIST_PROXIES', 'list-proxies');
createConstant('CREATE_PROXY', 'create-proxy');
createConstant('UPDATE_PROXY', 'update-proxy');
createConstant('DELETE_PROXY', 'delete-proxy');
