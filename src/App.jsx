import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// eslint-disable-next-line import/no-named-as-default
import mainListItems from './ListItems';
import { useBillingProfileFormState, useBillingProfileDispatch } from './BillingProfileFormContext';
import {
  LIST_BILLING_PROFILES,
  UPDATE_BILLING_PROFILE,
} from './shared/constants';

const { ipcRenderer, logger } = window;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    width: '100%',
  },
}));

export default function App() {
  const classes = useStyles();
  const dispatch = useBillingProfileDispatch();
  const [bProfilesList, setBProfilesList] = useState([]);
  const { billingProfile, isNew } = useBillingProfileFormState();
  const {
    firstname,
    lastname,
    phoneNumber,
    email,
    country,
    street,
    city,
    state,
    zip,
    ccType,
    cc,
    ccv,
    expMonth,
    expYear,
  } = billingProfile;
  const [open, setOpen] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileSelect = (event) => {
    setSelectedProfile(event.target.value);
    logger.info('selected profile index: ', event.target.value);
    logger.info(bProfilesList[event.target.value]);
    dispatch({
      type: 'switch-billing-profile',
      billingProfile: bProfilesList[event.target.value],
    });
  };
  const handleProfileFieldUpdate = (field) => (event) => {
    dispatch({
      type: 'PROFILE_FIELD_UPDATE',
      field,
      value: event.target.value,
    });
  };
  const handleBillingProfileUpdate = async () => {
    try {
      await ipcRenderer.invoke(UPDATE_BILLING_PROFILE, billingProfile);
    } catch (err) {
      logger.error(err);
    }
  };
  const fetchBillingProfiles = async () => {
    try {
      setBProfilesList(await ipcRenderer.invoke(LIST_BILLING_PROFILES));
    } catch (err) {
      logger.error(err);
    }
  };
  const handleCreateNewBillingProfile = async () => {
    // dispatch({ type: })
  };

  useEffect(() => {
    fetchBillingProfiles();
  }, []);
  useEffect(() => {
    logger.info('BILLING PROFILE', billingProfile);
  }, [billingProfile]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar posiƒƒtion="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Hands.IO
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid
            container
            spacing={3}
            direction="column"
          >
            <Grid
              item
              xs={12}
              container
              alignItems="center"
            >
              <Grid item xs={8}>
                <FormControl className={classes.formControl}>
                  <InputLabel>Billing Profile</InputLabel>
                  <Select
                    value={selectedProfile}
                    onChange={handleProfileSelect}
                  >
                    {bProfilesList.map((bp, index) => <MenuItem value={index}>{bp.firstname}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCreateNewBillingProfile}
                >
                  NEW
                </Button>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              spacing={3}
              justifyContent="center"
            >
              {selectedProfile !== null && (
                <>
                  <Grid
                    item
                    xs={12}
                    container
                    direction="column"
                  >
                    <Typography
                      variant="h4"
                    >
                      Personal Info
                    </Typography>
                    <TextField
                      label="First Name"
                      value={firstname}
                      onChange={handleProfileFieldUpdate('firstname')}
                    />
                    <TextField
                      label="Last Name"
                      value={lastname}
                      onChange={handleProfileFieldUpdate('lastname')}
                    />
                    <TextField
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={handleProfileFieldUpdate('phoneNumber')}
                    />
                    <TextField
                      label="Email"
                      value={email}
                      onChange={handleProfileFieldUpdate('email')}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    direction="column"
                  >
                    <Typography
                      variant="h4"
                    >
                      Billing Info
                    </Typography>
                    <FormControl>
                      <InputLabel>Country</InputLabel>
                      <Select
                        value={country}
                        onChange={handleProfileFieldUpdate('country')}
                      >
                        <MenuItem value="US">United States</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Street"
                      value={street}
                      onChange={handleProfileFieldUpdate('street')}
                    />
                    <TextField
                      label="City"
                      value={city}
                      onChange={handleProfileFieldUpdate('city')}
                    />
                    <FormControl>
                      <InputLabel>State</InputLabel>
                      <Select
                        value={state}
                        onChange={handleProfileFieldUpdate('state')}
                      >
                        <MenuItem value="1">Alabama</MenuItem>
                        <MenuItem value="2">Alaska</MenuItem>
                        <MenuItem value="4">Arizona</MenuItem>
                        <MenuItem value="5">Arkansas</MenuItem>
                        <MenuItem value="12">California</MenuItem>
                        <MenuItem value="13">Colorado</MenuItem>
                        <MenuItem value="14">Connecticut</MenuItem>
                        <MenuItem value="15">Delaware</MenuItem>
                        <MenuItem value="16">District of Columbia</MenuItem>
                        <MenuItem value="18">Florida</MenuItem>
                        <MenuItem value="19">Georgia</MenuItem>
                        <MenuItem value="21">Hawaii</MenuItem>
                        <MenuItem value="22">Idaho</MenuItem>
                        <MenuItem value="23">Illinois</MenuItem>
                        <MenuItem value="24">Indiana</MenuItem>
                        <MenuItem value="25">Iowa</MenuItem>
                        <MenuItem value="26">Kansas</MenuItem>
                        <MenuItem value="27">Kentucky</MenuItem>
                        <MenuItem value="28">Louisiana</MenuItem>
                        <MenuItem value="29">Maine</MenuItem>
                        <MenuItem value="31">Maryland</MenuItem>
                        <MenuItem value="32">Massachusetts</MenuItem>
                        <MenuItem value="33">Michigan</MenuItem>
                        <MenuItem value="34">Minnesota</MenuItem>
                        <MenuItem value="35">Mississippi</MenuItem>
                        <MenuItem value="36">Missouri</MenuItem>
                        <MenuItem value="37">Montana</MenuItem>
                        <MenuItem value="38">Nebraska</MenuItem>
                        <MenuItem value="39">Nevada</MenuItem>
                        <MenuItem value="40">New Hampshire</MenuItem>
                        <MenuItem value="41">New Jersey</MenuItem>
                        <MenuItem value="42">New Mexico</MenuItem>
                        <MenuItem value="43">New York</MenuItem>
                        <MenuItem value="44">North Carolina</MenuItem>
                        <MenuItem value="45">North Dakota</MenuItem>
                        <MenuItem value="47">Ohio</MenuItem>
                        <MenuItem value="48">Oklahoma</MenuItem>
                        <MenuItem value="49">Oregon</MenuItem>
                        <MenuItem value="51">Pennsylvania</MenuItem>
                        <MenuItem value="53">Rhode Island</MenuItem>
                        <MenuItem value="54">South Carolina</MenuItem>
                        <MenuItem value="55">South Dakota</MenuItem>
                        <MenuItem value="56">Tennessee</MenuItem>
                        <MenuItem value="57">Texas</MenuItem>
                        <MenuItem value="58">Utah</MenuItem>
                        <MenuItem value="59">Vermont</MenuItem>
                        <MenuItem value="61">Virginia</MenuItem>
                        <MenuItem value="62">Washington</MenuItem>
                        <MenuItem value="63">West Virginia</MenuItem>
                        <MenuItem value="64">Wisconsin</MenuItem>
                        <MenuItem value="65">Wyoming</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Zip Code"
                      value={zip}
                      onChange={handleProfileFieldUpdate('zip')}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    direction="column"
                  >
                    <Typography
                      variant="h4"
                    >
                      Credit Card Info
                    </Typography>
                    <FormControl>
                      <InputLabel>Credit Card Type</InputLabel>
                      <Select
                        value={ccType}
                        onChange={handleProfileFieldUpdate('ccType')}
                      >
                        <MenuItem value="AE">American Express</MenuItem>
                        <MenuItem value="VI">Visa</MenuItem>
                        <MenuItem value="MC">MasterCard</MenuItem>
                        <MenuItem value="DI">Discover</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Credit Card Number"
                      value={cc}
                      onChange={handleProfileFieldUpdate('cc')}
                    />
                    <FormControl>
                      <InputLabel>Expiration month</InputLabel>
                      <Select
                        value={expMonth}
                        onChange={handleProfileFieldUpdate('expMonth')}
                      >
                        <MenuItem value="1">1 - Jan</MenuItem>
                        <MenuItem value="2">2 - Feb</MenuItem>
                        <MenuItem value="3">3 - Mar</MenuItem>
                        <MenuItem value="4">4 - Apr</MenuItem>
                        <MenuItem value="5">5 - May</MenuItem>
                        <MenuItem value="6">6 - Jun</MenuItem>
                        <MenuItem value="7">7 - Jul</MenuItem>
                        <MenuItem value="8">8 - Aug</MenuItem>
                        <MenuItem value="9">9 - Sep</MenuItem>
                        <MenuItem value="10">10 - Oct</MenuItem>
                        <MenuItem value="11">11 - Nov</MenuItem>
                        <MenuItem value="12">12 - Dec</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Expiration Year"
                      value={expYear}
                      onChange={handleProfileFieldUpdate('expYear')}
                    />
                    <TextField
                      label="CCV (Security Code)"
                      value={ccv}
                      onChange={handleProfileFieldUpdate('ccv')}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row-reverse"
            >
              {selectedProfile !== null && (
                <>
                  <Button
                    variant="contained"
                    onClick={handleBillingProfileUpdate}
                  >
                    SAVE
                  </Button>
                  &nbsp;
                  &nbsp;
                  <Button
                    variant="contained"
                  >
                    DELETE
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
