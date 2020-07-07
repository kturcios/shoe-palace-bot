/* eslint-disable no-fallthrough */
/* eslint-disable no-param-reassign */
import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

const { logger } = window;

// TODO: Update reducer to use init to reset state
const init = () => ({
  billingProfile: {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    country: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    ccType: '',
    cc: '',
    ccv: '',
    expMonth: '',
    expYear: '',
  },
  isNew: false,
  selectedProfileIndex: null,
  billingProfiles: [],
});

const initialState = {
  billingProfile: {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    country: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    ccType: '',
    cc: '',
    ccv: '',
    expMonth: '',
    expYear: '',
  },
  isNew: false,
  selectedProfileIndex: null,
};

function reducer(draft, action) {
  switch (action.type) {
    case 'SAVE': {
      draft.isNew = false;
      break;
    }
    case 'UPDATE_BILLING_PROFILES_LIST': {
      draft.billingProfiles = action.billingProfiles;
      break;
    }
    case 'UPDATE_BILLING_PROFILE': {
      draft.selectedProfileIndex = null;
      draft.isNew = false;
      draft.billingProfile = {
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        ccType: '',
        cc: '',
        ccv: '',
        expMonth: '',
        expYear: '',
      };
      break;
    }
    case 'switch-billing-profile': {
      draft.billingProfile = action.billingProfile;
      break;
    }
    case 'PROFILE_FIELD_UPDATE': {
      draft.billingProfile[action.field] = action.value;
      break;
    }
    case 'UPDATE_SELECTED_BILLING_PROFILE': {
      draft.selectedProfileIndex = action.selectedProfileIndex;
      break;
    }
    case 'DELETE': {
      draft.isNew = false;
      draft.selectedProfileIndex = null;
      draft.billingProfile = {
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        ccType: '',
        cc: '',
        ccv: '',
        expMonth: '',
        expYear: '',
      };
      break;
    }
    case 'CREATE': {
      draft.selectedProfileIndex = null;
      draft.isNew = true;
      draft.billingProfile = {
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        ccType: '',
        cc: '',
        ccv: '',
        expMonth: '',
        expYear: '',
      };
      break;
    }
    case 'CANCEL': {
      draft.isNew = false;
      draft.billingProfile = {
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        ccType: '',
        cc: '',
        ccv: '',
        expMonth: '',
        expYear: '',
      };
      draft.selectedProfileIndex = null;
    }
    default:
      break;
  }
}

const BillingProfilesStateContext = createContext();
const BillingProfilesDispatchContext = createContext();

export default function BillingProfilesContextProvider({ children }) {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  return (
    <BillingProfilesDispatchContext.Provider value={dispatch}>
      <BillingProfilesStateContext.Provider value={state}>
        {children}
      </BillingProfilesStateContext.Provider>
    </BillingProfilesDispatchContext.Provider>
  );
}

export function useBillingProfilesState() {
  const state = useContext(BillingProfilesStateContext);
  if (state === undefined) {
    throw new Error('Billing profiles state context must be used within a ContextProvider');
  }
  return state;
}

export function useBillingProfilesDispatch() {
  const dispatch = useContext(BillingProfilesDispatchContext);
  if (dispatch === undefined) {
    throw new Error('Billing profiles dispatch context must be used within a ContextProvider');
  }
  return dispatch;
}
