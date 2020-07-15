import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';
import { UPDATE_PROXIES_LIST } from '../../shared/constants';

const initialState = {
  proxies: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PROXIES_LIST: {
      return {
        ...state,
        proxies: [...action.proxies],
      };
    }
    default:
      throw new Error('Unsupported action type');
  }
};

const ProxiesDispatchContext = createContext();
const ProxiesStateContext = createContext();

export default function ProfilesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProxiesDispatchContext.Provider value={dispatch}>
      <ProxiesStateContext.Provider value={state}>
        {children}
      </ProxiesStateContext.Provider>
    </ProxiesDispatchContext.Provider>
  );
}

export function useProxiesDispatch() {
  const dispatch = useContext(ProxiesDispatchContext);
  if (dispatch === undefined) {
    throw new Error('Proxies dispatch context must be used within a context provider');
  }
  return dispatch;
}

export function useProxiesState() {
  const state = useContext(ProxiesStateContext);
  if (state === undefined) {
    throw new Error('Proxies state context must be used within a context provider');
  }
  return state;
}
