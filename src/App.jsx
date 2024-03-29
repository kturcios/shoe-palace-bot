import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LanguageIcon from '@material-ui/icons/Language';
import ProfilesMenu from './components/menus/ProfilesMenu';
import TasksMenu from './components/menus/TasksMenu';
import ProxiesMenu from './components/menus/ProxiesMenu';
import NewProfileForm from './components/forms/NewProfileForm';
import NewTaskForm from './components/forms/NewTaskForm';
import NewProxyForm from './components/forms/NewProxyForm';

const drawerWidth = 260;

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
}));

export default function App() {
  const [proxyFormOpen, setProxyFormOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [profileFormOpen, setProfileFormOpen] = useState(false);
  const classes = useStyles();
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const menus = [
    <ProfilesMenu />,
    <ProxiesMenu />,
    <TasksMenu />,
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
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
        <List>
          <ListItem
            selected={selectedMenuIndex === 0}
            button
            onClick={() => setSelectedMenuIndex(0)}
          >
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profiles" />
            <IconButton
              onClick={() => setProfileFormOpen(true)}
            >
              <AddCircleIcon />
            </IconButton>
          </ListItem>
          <ListItem
            button
            selected={selectedMenuIndex === 1}
            onClick={() => setSelectedMenuIndex(1)}
          >
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Proxies" />
            <IconButton
              onClick={() => setProxyFormOpen(true)}
            >
              <AddCircleIcon />
            </IconButton>
          </ListItem>
          <ListItem
            button
            selected={selectedMenuIndex === 2}
            onClick={() => setSelectedMenuIndex(2)}
          >
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
            <IconButton
              onClick={() => setTaskFormOpen(true)}
            >
              <AddCircleIcon />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {menus[selectedMenuIndex]}
        </Container>
      </main>
      <NewProfileForm open={profileFormOpen} onClose={() => setProfileFormOpen(false)} />
      <NewTaskForm open={taskFormOpen} onClose={() => setTaskFormOpen(false)} />
      <NewProxyForm open={proxyFormOpen} onClose={() => setProxyFormOpen(false)} />
    </div>
  );
}
