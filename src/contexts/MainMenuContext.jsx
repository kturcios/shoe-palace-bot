/* eslint-disable no-param-reassign */
import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

const initialState = {
  currentIndex: 0,
};

const reducer = (draft, action) => {
  switch (action.type) {
    case 'CHANGE_MENU': {
      draft.currentIndex = action.currentIndex;
      return;
    }
    default:
      return;
  }
};

const MainMenuContextState = createContext();
const MainMenuContextDispatch = createContext();

export default function MainMenuContextProvider({ children }) {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  return (
    <MainMenuContextDispatch.Provider value={dispatch}>
      <MainMenuContextState.Provider value={state}>
        {children}
      </MainMenuContextState.Provider>
    </MainMenuContextDispatch.Provider>
  );
}

export function useMainMenuState() {
  const state = useContext(MainMenuContextState);
  if (state === undefined) {
    throw new Error('Main menu state context must be used within a ContextProvider');
  }
  return state;
}

export function useMainMenuDispatch() {
  const dispatch = useContext(MainMenuContextDispatch);
  if (dispatch === undefined) {
    throw new Error('Main menu dispatch context must be used within a ContextProvider');
  }
  return dispatch;
}
