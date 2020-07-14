import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';
import { UPDATE_TASKS_LIST } from '../../shared/constants';

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TASKS_LIST: {
      return {
        ...state,
        tasks: [...action.tasks],
      };
    }
    default:
      throw new Error('Unsupported action type');
  }
};

const TasksDispatchContext = createContext();
const TasksStateContext = createContext();

export default function TasksContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
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
