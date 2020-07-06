const { app, ipcMain } = require('electron');
const Storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const logger = require('electron-log');
const { order } = require('../utils/shoe-palace-checkout');

let storage = null;
let initialized = false;
// const storageDir = app.getPath('appData');
const storageDir = '/Users/kturcios/GitHub/shoe-palace-bot/storage/tasks';
logger.info({ storageDir });

const {
  LIST_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  EXECUTE_TASK,
} = require('../../src/shared/constants');

const init = async () => {
  storage = await Storage.create({
    dir: storageDir,
  });
  await storage.init();
  initialized = true;
};

// Return a list of all the tasks
ipcMain.handle(LIST_TASKS, async () => {
  if (!initialized) {
    await init();
  }
  logger.info('Attempting to list tasks...');
  const tasks = await storage.values();
  return tasks;
});

// Create and store a new task
ipcMain.handle(CREATE_TASK, async (event, taskDef) => {
  if (!initialized) {
    await init();
  }
  const id = uuidv4();
  const newTask = {
    id,
    ...taskDef,
  };
  logger.info('Attempting to create a new task...');
  await storage.setItem(id, newTask);
  logger.info(`New task successfully created: ${newTask}`);
});

// Update an existing task by id
ipcMain.handle(UPDATE_TASK, async (event, task) => {
  if (!initialized) {
    await init();
  }
  logger.info(`Attempting to update task ${task.id}...`);
  await storage.updateItem(task.id, task);
  logger.info(`Task successfully updated: ${task}`);
});

// Delete an existing task by id
ipcMain.handle(DELETE_TASK, async (event, id) => {
  if (!initialized) {
    await init();
  }
  logger.info(`Attempting to delete task ${id}`);
  await storage.removeItem(id);
  logger.info(`Task deleted: ${id}`);
});

ipcMain.handle(EXECUTE_TASK, async (event, task, billingProfile) => {
  const checkoutOptions = {
    ...task,
    ...billingProfile,
  };
  logger.info(`Attempting to checkout order with: ${JSON.stringify(checkoutOptions, null, 2)}`);
  await order(checkoutOptions);
});
