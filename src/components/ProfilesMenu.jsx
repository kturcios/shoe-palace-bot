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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useProfiles } from '../hooks';

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
  const { profiles, update } = useProfiles();
  const [currentIndex, setCurrentIndex] = useState('');
  const [currentProfile, setCurrentProfile] = useState(null);
  useEffect(() => {
    if (currentIndex !== '') {
      setCurrentProfile(profiles[currentIndex]);
    }
  }, [currentIndex]);
  const updateCurrentProfile = (field) => (event) => {
    setCurrentProfile({
      ...currentProfile,
      [field]: event.target.value,
    });
  }
  return (
    <Grid
      container
      xs={12}
      direction="column"
      spacing={3}
    >
      <Grid
        item
        container
        xs={12}
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
              {profiles.map((bp, i) => <MenuItem value={i}>{bp.firstname}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Grid
        item
        container
        xs={12}
      >
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="h5"
              >
                Shipping
              </Typography>
              <TextField
                fullWidth
                type="text"
                label="First Name"
                value={currentProfile && currentProfile.firstName}
                onChange={updateCurrentProfile('firstName')}
              />
              <TextField
                fullWidth
                type="text"
                label="Last Name"
                value={currentProfile && currentProfile.lastName}
                onChange={updateCurrentProfile('lastName')}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
