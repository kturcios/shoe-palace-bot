import React, {
  createContext,
  useContext,
  useReducer,
} from 'react';

const initialState = {
  shipping: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  billing: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  payment: {
    ccType: '',
    cc: '',
    cvv: '',
    expMonth: '',
    expYear: '',
  },
  profiles: [],
  index: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET': {
      return {
        ...initialState,
      };
    }
    case 'UPDATE_CURRENT_PROFILE': {
      const selectedProfile = state.profiles[state.index];
      return {
        ...state,
        shipping: {
          ...selectedProfile.shipping,
        },
        billing: {
          ...selectedProfile.billing,
        },
        payment: {
          ...selectedProfile.payment,
        },
      };
    }
    case 'UPDATE_INDEX': {
      return {
        ...state,
        index: action.index,
      };
    }
    case 'SET_PROFILES': {
      return {
        ...state,
        profiles: action.profiles,
      };
    }
    case 'UPDATE_SHIPPING_FIELD': {
      return {
        ...state,
        shipping: {
          ...state.shipping,
          [action.field]: action.value,
        },
      };
    }
    default:
      throw new Error('Unsupported action type!');
  }
};

const ProfileViewDispatchContext = createContext();
const ProfileViewStateContext = createContext();

export default function ProfileViewContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProfileViewDispatchContext.Provider value={dispatch}>
      <ProfileViewStateContext.Provider value={state}>
        {children}
      </ProfileViewStateContext.Provider>
    </ProfileViewDispatchContext.Provider>
  );
}

export function useProfileViewState() {
  const state = useContext(ProfileViewStateContext);
  if (state === undefined) {
    throw new Error('Profile view state context must be used within a context provider');
  }
  return state;
}

export function useProfileViewDispatch() {
  const dispatch = useContext(ProfileViewDispatchContext);
  if (dispatch === undefined) {
    throw new Error('Profile view dispatch context must be used within a context provider');
  }
  return dispatch;
}
