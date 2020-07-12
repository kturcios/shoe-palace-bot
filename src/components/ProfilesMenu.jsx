import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useProfiles } from '../hooks';
import InitialState from '../contexts/profiles/InitialState';
import StateSelect from './StateSelect';
import CountrySelect from './CountrySelect';
import CreditCardTypeSelect from './CreditCardTypeSelect';
import MonthSelect from './MonthSelect';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    textAlign: 'center',
  },
});

export default function ProfilesMenu() {
  const classes = useStyles();
  const {
    profiles,
    update,
    remove,
  } = useProfiles();
  const [currentIndex, setCurrentIndex] = useState('');
  const [currentProfile, setCurrentProfile] = useState({ ...InitialState });
  const {
    shipping,
    billing,
    payment,
  } = currentProfile;
  useEffect(() => {
    if (currentIndex !== '') {
      setCurrentProfile(profiles[currentIndex]);
    } else {
      setCurrentProfile({ ...InitialState });
    }
  }, [currentIndex]);
  const handleUpdate = async () => {
    try {
      await update(currentProfile);
    } catch (err) {
      alert(`Failed to update profile: ${err}`);
    }
  };
  const handleDelete = async () => {
    try {
      await remove(currentProfile.id);
    } catch (err) {
      alert(`Failed to delete profile: ${err}`);
    } finally {
      setCurrentIndex('');
    }
  };
  const updateShippingField = (field) => (event) => {
    setCurrentProfile({
      ...currentProfile,
      shipping: {
        ...shipping,
        [field]: event.target.value,
      },
    });
  };
  const updateBillingField = (field) => (event) => {
    setCurrentProfile({
      ...currentProfile,
      billing: {
        ...billing,
        [field]: event.target.value,
      },
    });
  };
  const updatePaymentField = (field) => (event) => {
    setCurrentProfile({
      ...currentProfile,
      payment: {
        ...payment,
        [field]: event.target.value,
      },
    });
  };
  return (
    <Container
      maxWidth="md"
      className={classes.container}
    >
      <Grid
        container
        direction="column"
        spacing={1}
      >
        <Grid
          item
          container
        >
          <Grid item xs={3} />
          <Grid
            item
            xs={6}
          >
            <FormControl fullWidth>
              <InputLabel>Select a Profile...</InputLabel>
              <Select
                value={currentIndex}
                onChange={(e) => setCurrentIndex(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                {profiles.map(({ shipping: { firstName, lastName } }, index) => <MenuItem value={index.toString()}>{`${firstName} ${lastName}`}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <Grid
          item
          container
          spacing={3}
        >
          <Grid item xs={4}>
            <Card
              style={{
                display: currentIndex === '' ? 'none' : 'block',
              }}
            >
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              style={{
                display: currentIndex === '' ? 'none' : 'block',
              }}
            >
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card
              style={{
                display: currentIndex === '' ? 'none' : 'block',
              }}
            >
              <CardContent>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="flex-end"
        >
          <Button
            variant="contained"
            style={{
              display: currentIndex === '' ? 'none' : 'block',
            }}
            onClick={handleDelete}
          >
            DELETE
          </Button>
          &nbsp;
          &nbsp;
          <Button
            variant="contained"
            style={{
              display: currentIndex === '' ? 'none' : 'block',
            }}
            onClick={handleUpdate}
          >
            UPDATE
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
