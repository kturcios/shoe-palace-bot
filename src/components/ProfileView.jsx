import React, { useState, useEffect } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Container,
} from '@material-ui/core';
import { useProfilesState, useProfilesDispatch } from '../contexts/ProfilesContext';
import {
  LIST_PROFILES,
} from '../shared/constants';

const { logger, ipcRenderer } = window;

export default function ProfileView() {
  const dispatch = useProfilesDispatch();
  const {
    shipping,
    billing,
    payment,
    profiles,
    index,
  } = useProfilesState();
  const handleUpdateIndex = (event) => {
    dispatch({
      type: 'UPDATE_INDEX',
      index: event.target.value,
    });
  };
  const fetchProfiles = async () => {
    try {
      const profilesList = await ipcRenderer.invoke(LIST_PROFILES);
      logger.info({ profilesList });
      dispatch({
        type: 'SET_PROFILES',
        profiles: profilesList,
      });
    } catch (err) {
      logger.error(err);
    }
  };
  useEffect(() => {
    if (index === null) {
      dispatch({ type: 'RESET' });
      fetchProfiles();
    } else {
      dispatch({ type: 'UPDATE_CURRENT_PROFILE' });
    }
  }, [index]);
  const handleShippingChange = (field) => (event) => {
    dispatch({
      type: 'UPDATE_SHIPPING_FIELD',
      field,
      value: event.target.value,
    });
  };
  return (
    <Grid
      container
      xs={12}
      direction="column"
      spacing={1}
    >
      <Grid
        item
        xs={12}
        container
      >
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Container>
            <FormControl fullWidth>
              <InputLabel>Billing Profile</InputLabel>
              <Select
                value={index}
                onChange={handleUpdateIndex}
              >
                {profiles.map((bp, i) => <MenuItem value={i}>{bp.firstname}</MenuItem>)}
              </Select>
            </FormControl>
          </Container>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Grid
        item
        container
        xs={12}
      >
        <Grid
          item
          xs={4}
        >
          <Container
            style={{
              border: '1px solid black',
              // display: index === null ? 'none' : 'block',
            }}
          >
            <Typography variant="h5">
              Shipping
            </Typography>
            <TextField
              fullWidth
              type="text"
              label="First Name"
              value={shipping.firstName}
              onChange={handleShippingChange('firstName')}
            />
            <TextField
              fullWidth
              type="text"
              label="Last Name"
              value={shipping.lastName}
              onChange={handleShippingChange('lastName')}
            />
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={shipping.email}
              onChange={handleShippingChange('email')}
            />
            <TextField
              fullWidth
              type="tel"
              label="Phone Number"
              value={shipping.phoneNumber}
              onChange={handleShippingChange('phoneNumber')}
            />
            <TextField
              fullWidth
              type="text"
              label="Address"
              value={shipping.address}
              onChange={handleShippingChange('address')}
            />
            <TextField
              fullWidth
              type="text"
              label="Address 2"
              value={shipping.address2}
              onChange={handleShippingChange('address2')}
            />
            <TextField
              fullWidth
              type="text"
              label="City"
              value={shipping.city}
              onChange={handleShippingChange('city')}
            />
          </Container>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <Container
            style={{
              border: '1px solid black',
            }}
          >
            <Typography variant="h5">
              Billing
            </Typography>
          </Container>
        </Grid>
        <Grid
          item
          xs={4}
        >
          <Container
            style={{
              border: '1px solid black',
            }}
          >
            <Typography variant="h5">
              Payment
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </Grid>
  );
}
