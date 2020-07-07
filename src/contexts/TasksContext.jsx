/* eslint-disable no-param-reassign */
import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

const { logger } = window;

const initialState = {
  isNew: false,
  selectedTaskIndex: null,
  task: {
    store: '',
    url: '',
    size: '',
    quantity: '',
    billingProfileId: '',
  },
  tasks: [],
};

const reducer = (draft, action) => {
  switch (action.type) {
    case 'UPDATE_TASKS_LIST': {
      draft.tasks = action.tasks;
      break;
    }
    case 'RESET': {
      logger.info('RESET INVOKED');
      draft.isNew = false;
      draft.selectedTaskIndex = null;
      draft.task = {
        store: '',
        url: '',
        size: '',
        quantity: '',
        billingProfileId: '',
      };
      break;
    }
    case 'SWITCH_TASK': {
      logger.info('SWITCH TASK INVOKED: ', action.task);
      draft.task = action.task;
      break;
    }
    case 'NEW': {
      logger.info('NEW INVOKED');
      draft.isNew = true;
      draft.selectedTaskIndex = null;
      draft.task = {
        store: '',
        url: '',
        size: '',
        quantity: '',
        billingProfileId: '',
      };
      break;
    }
    case 'UPDATE_TASK_INDEX': {
      logger.info('UPDATE_TASK INVOKED');
      draft.selectedTaskIndex = action.selectedTaskIndex;
      break;
    }
    case 'TASK_FIELD_UPDATE': {
      logger.info('TASK_FIELD_UPDATE INVOKED');
      draft.task[action.field] = action.value;
      break;
    }
    case 'CANCEL': {
      logger.info('CANCEL INVOKED');
      draft.isNew = false;
      draft.selectedTaskIndex = null;
      draft.task = {
        store: '',
        url: '',
        size: '',
        quantity: '',
        billingProfileId: '',
      };
      break;
    }
    default:
      break;
  }
};

const TasksStateContext = createContext();
const TasksDispatchContext = createContext();

export default function TasksContextProvider({ children }) {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  return (
    <TasksDispatchContext.Provider value={dispatch}>
      <TasksStateContext.Provider value={state}>
        {children}
      </TasksStateContext.Provider>
    </TasksDispatchContext.Provider>
  );
}

export function useTasksState() {
  const state = useContext(TasksStateContext);
  if (state === undefined) {
    throw new Error('Task state context must be used within a ContextProvider');
  }
  return state;
}

export function useTasksDispatch() {
  const dispatch = useContext(TasksDispatchContext);
  if (dispatch === undefined) {
    throw new Error('Billing form dispatch context must be used within a ContextProvider');
  }
  return dispatch;
}
