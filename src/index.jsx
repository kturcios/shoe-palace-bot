import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BillingProfileFormContextProvider from './contexts/BillingProfilesContext';
import TaskContextProvider from './contexts/TasksContext';
import ProfileViewContextProvider from './contexts/ProfileViewContext';

ReactDOM.render(
  <React.StrictMode>
    <ProfileViewContextProvider>
      <TaskContextProvider>
        <BillingProfileFormContextProvider>
          <App />
        </BillingProfileFormContextProvider>
      </TaskContextProvider>
    </ProfileViewContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
