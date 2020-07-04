/* eslint-disable no-param-reassign */
import React, { createContext, useContext } from 'react';
import { useImmerReducer } from 'use-immer';

const { logger } = window;

// Update reducer to use init to reset state
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
      return;
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
      return;
    }
    case 'switch-billing-profile': {
      logger.info('SWITCHED TO: ', action.billingProfile);
      draft.billingProfile = action.billingProfile;
      return;
    }
    case 'PROFILE_FIELD_UPDATE': {
      draft.billingProfile[action.field] = action.value;
      return;
    }
    case 'UPDATE_SELECTED_BILLING_PROFILE': {
      draft.selectedProfileIndex = action.selectedProfileIndex;
      return;
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
      return;
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
      return;
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
      return;
  }
}

const BillingProfileFormStateContext = createContext();
const BillingProfileFormDispatchContext = createContext();

export default function BillingProfileFormContextProvider({ children }) {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  return (
    <BillingProfileFormDispatchContext.Provider value={dispatch}>
      <BillingProfileFormStateContext.Provider value={state}>
        {children}
      </BillingProfileFormStateContext.Provider>
    </BillingProfileFormDispatchContext.Provider>
  );
}

export function useBillingProfileFormState() {
  const state = useContext(BillingProfileFormStateContext);
  if (state === undefined) {
    throw new Error('Billing form state context must be used within a ContextProvider');
  }
  return state;
}

export function useBillingProfileDispatch() {
  const dispatch = useContext(BillingProfileFormDispatchContext);
  if (dispatch === undefined) {
    throw new Error('Billing form dispatch context must be used within a ContextProvider');
  }
  return dispatch;
}
