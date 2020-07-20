const { app, ipcMain } = require('electron');
const Storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const logger = require('electron-log');
const { join } = require('path');
const shoepalace = require('../stores/shoe-palace');

let storage = null;
let initialized = false;
/*
  app.getPath('appData') = /Users/<user>/Library/Application Support
  app.getName() = Hands.IO
  So the full path will result in: /Users/<user>/Library/Application Support/Hands.IO/tasks
*/
const storageDir = join(app.getPath('appData'), app.getName(), 'Tasks');
logger.info({ storageDir });

const {
  LIST_TASKS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  START_TASK,
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
  logger.info('tasks list: ', JSON.stringify(tasks, null, 2));
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
  logger.info(`New task successfully created: ${JSON.stringify(newTask)}`);
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

ipcMain.handle(START_TASK, async (event, task) => {
  switch (task.store) {
    case 'Shoe Palace':
      await shoepalace.startTask(task);
      break;
    default:
      throw new Error('Unrecognized store');
  }
});
