const createConstant = (name, value) => {
  Object.defineProperty(module.exports, name, {
    value,
    enumerable: true,
    writable: false,
  });
};

createConstant('APP_INFO', 'app_info');
createConstant('PROCESS_ORDER', 'process-order');

// Channels
createConstant('UPDATE_BILLING_PROFILE', 'update-billing-profile');
createConstant('LIST_BILLING_PROFILES', 'list-billing-profiles');

// Database keys
createConstant('BILLING_PROFILES', 'billing-profiles');
