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

// Billing Profiles
createConstant('LIST_BILLING_PROFILES', 'list-billing-profiles');
createConstant('CREATE_BILLING_PROFILE', 'create-billing-profile');
createConstant('UPDATE_BILLING_PROFILE', 'update-billing-profile');
createConstant('DELETE_BILLING_PROFILE', 'delete-billing-profile');
// Tasks
createConstant('LIST_TASKS', 'list-tasks');
createConstant('CREATE_TASK', 'create-task');
createConstant('UPDATE_TASK', 'update-task');
createConstant('DELETE_TASK', 'delete-task');

/* --------------------------------------------------- */

// Database names
createConstant('BILLING_PROFILES_DB', 'billing-profiles-db');
createConstant('TASKS_DB', 'tasks-db');
