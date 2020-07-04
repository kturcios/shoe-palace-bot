import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { useMainMenuState, useMainMenuDispatch } from './contexts/MainMenuContext';

export default function MainListItems() {
  const { currentIndex } = useMainMenuState();
  const dispatch = useMainMenuDispatch();

  return (
    <div>
      <ListItem
        selected={currentIndex === 0}
        button
        onClick={() => dispatch({
          type: 'CHANGE_MENU',
          currentIndex: 0,
        })}
      >
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Billings Profiles" />
      </ListItem>
      <ListItem
        button
        selected={currentIndex === 1}
        onClick={() => dispatch({
          type: 'CHANGE_MENU',
          currentIndex: 1,
        })}
      >
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>
    </div>
  );
}
