/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import MonthSelect from './MonthSelect';
import StateSelect from './StateSelect';
import CountrySelect from './CountrySelect';
import CreditCardTypeSelect from './CreditCardTypeSelect';
import { useProfiles } from '../hooks';
import InitialState from '../contexts/profiles/InitialState';

const { logger } = window;

export default function NewProfileForm({ open, onClose }) {
  const { create } = useProfiles();
  const [profile, setProfile] = useState({ ...InitialState });
  const {
    shipping,
    billing,
    payment,
  } = profile;
  const handleCreate = async () => {
    try {
      await create(profile);
      alert('Profile Created!');
    } catch (err) {
      logger.error(err);
      alert(`Failed to create profile: ${err}`);
    } finally {
      onClose();
    }
  };
  useEffect(() => {
    if (!open) {
      // Reset the state if the user closes the form
      setProfile({ ...InitialState });
    }
  }, [open]);
  const updateShippingField = (field) => (event) => {
    setProfile({
      ...profile,
      shipping: {
        ...shipping,
        [field]: event.target.value,
      },
    });
  };
  const updateBillingField = (field) => (event) => {
    setProfile({
      ...profile,
      billing: {
        ...billing,
        [field]: event.target.value,
      },
    });
  };
  const updatePaymentField = (field) => (event) => {
    setProfile({
      ...profile,
      payment: {
        ...payment,
        [field]: event.target.value,
      },
    });
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick
      fullWidth
      maxWidth="md"
    >
      <DialogTitle
        id="form-dialog-title"
      >
        <Typography variant="h4">
          Create a New Profile
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h5">
              Shipping
            </Typography>
            <TextField
              label="First Name"
              type="text"
              fullWidth
              value={shipping.firstName}
              onChange={updateShippingField('firstName')}
            />
            <TextField
              label="Last Name"
              type="text"
              fullWidth
              value={shipping.lastName}
              onChange={updateShippingField('lastName')}
            />
            <TextField
              label="Email"
              type="text"
              fullWidth
              value={shipping.email}
              onChange={updateShippingField('email')}
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={shipping.phoneNumber}
              onChange={updateShippingField('phoneNumber')}
            />
            <TextField
              label="Address"
              fullWidth
              value={shipping.address}
              onChange={updateShippingField('address')}
            />
            <TextField
              label="Adress 2 (Apt, P.O., etc.)"
              fullWidth
              value={shipping.address2}
              onChange={updateShippingField('address2')}
            />
            <TextField
              label="City"
              fullWidth
              value={shipping.city}
              onChange={updateShippingField('city')}
            />
            <StateSelect
              value={shipping.state}
              onChange={updateShippingField('state')}
            />
            <TextField
              label="ZIP Code"
              fullWidth
              value={shipping.zipCode}
              onChange={updateShippingField('zipCode')}
            />
            <CountrySelect
              value={shipping.country}
              onChange={updateShippingField('country')}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Billing
            </Typography>
            <TextField
              label="First Name"
              type="text"
              fullWidth
              value={billing.firstName}
              onChange={updateBillingField('firstName')}
            />
            <TextField
              label="Last Name"
              type="text"
              fullWidth
              value={billing.lastName}
              onChange={updateBillingField('lastName')}
            />
            <TextField
              label="Email"
              type="text"
              fullWidth
              value={billing.email}
              onChange={updateBillingField('email')}
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={billing.phoneNumber}
              onChange={updateBillingField('phoneNumber')}
            />
            <TextField
              label="Address"
              fullWidth
              value={billing.address}
              onChange={updateBillingField('address')}
            />
            <TextField
              label="Adress 2 (Apt, P.O., etc.)"
              fullWidth
              value={billing.address2}
              onChange={updateBillingField('address2')}
            />
            <TextField
              label="City"
              fullWidth
              value={billing.city}
              onChange={updateBillingField('city')}
            />
            <StateSelect
              value={billing.state}
              onChange={updateBillingField('state')}
            />
            <TextField
              label="ZIP Code"
              fullWidth
              value={billing.zipCode}
              onChange={updateBillingField('zipCode')}
            />
            <CountrySelect
              value={billing.country}
              onChange={updateBillingField('country')}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5">
              Payment
            </Typography>
            <CreditCardTypeSelect
              value={payment.ccType}
              onChange={updatePaymentField('ccType')}
            />
            <TextField
              label="Credit Card Number"
              fullWidth
              value={payment.cc}
              onChange={updatePaymentField('cc')}
            />
            <TextField
              label="CVV (Security Code)"
              fullWidth
              value={payment.cvv}
              onChange={updatePaymentField('cvv')}
            />
            <MonthSelect
              value={payment.expMonth}
              onChange={updatePaymentField('expMonth')}
            />
            <TextField
              label="Expiration Year"
              fullWidth
              value={payment.expYear}
              onChange={updatePaymentField('expYear')}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
