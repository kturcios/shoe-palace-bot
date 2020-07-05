/* eslint-disable no-param-reassign */
import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

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
};

const reducer = (draft, action) => {
  switch (action.type) {
    case 'RESET': {
      draft = initialState;
      break;
    }
    case 'CREATE': {
      draft = { ...initialState };
      break;
    }
    case 'UPDATE_TASK_INDEX':
      draft.selectedTaskIndex = action.selectedTaskIndex;
      break;
    case 'TASK_FIELD_UPDATE': {
      draft[action.field] = action.value;
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
