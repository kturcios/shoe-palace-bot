import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';

const initialState = {
  profiles: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILES_LIST': {
      return {
        ...state,
        profiles: [...action.profiles],
      };
    }
    default:
      throw new Error('Unsupported action type');
  }
};

const ProfilesDispatchContext = createContext();
const ProfilesStateContext = createContext();

export default function ProfilesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProfilesDispatchContext.Provider value={dispatch}>
      <ProfilesStateContext.Provider value={state}>
        {children}
      </ProfilesStateContext.Provider>
    </ProfilesDispatchContext.Provider>
  );
}

export function useProfilesDispatch() {
  const dispatch = useContext(ProfilesDispatchContext);
  if (dispatch === undefined) {
    throw new Error('Profiles dispatch context must be used within a context provider');
  }
  return dispatch;
}

export function useProfilesState() {
  const state = useContext(ProfilesStateContext);
  if (state === undefined) {
    throw new Error('Profiles state context must be used within a context provider');
  }
  return state;
}
