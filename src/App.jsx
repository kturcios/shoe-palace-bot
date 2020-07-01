import React from 'react';
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
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
  Container,
  Grid,
  Paper,
  Link,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import mainListItems from './ListItems';

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

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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
                  <Select>
                    <MenuItem value="1">Kevin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} />
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  fullWidth
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
              <Grid
                item
                xs={12}
                container
                direction="column"
              >
                <Typography
                  variant="h4"
                >
                  Personal Information
                </Typography>
                <TextField
                  label="First Name"
                />
                <TextField
                  label="Last Name"
                />
                <TextField
                  label="Phone Number"
                />
                <TextField
                  label="Email"
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
                <TextField
                  label="Country"
                />
                <TextField
                  label="Street"
                />
                <TextField
                  label="City"
                />
                <TextField
                  label="State"
                />
                <TextField
                  label="Zip Code"
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
                <TextField
                  label="Credit Card Type"
                />
                <TextField
                  label="Credit Card Number"
                />
                <TextField
                  label="Expiration Month"
                />
                <TextField
                  label="Expiration Year"
                />
                <TextField
                  label="CCV (Security Code)"
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              container
              direction="row-reverse"
            >
              <Button>DELETE</Button>
              <Button>SAVE</Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
