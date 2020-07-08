import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BillingProfileFormContextProvider from './contexts/BillingProfilesContext';
import TaskContextProvider from './contexts/TasksContext';
import ProfilesContextProvider from './contexts/ProfilesContext';

ReactDOM.render(
  <React.StrictMode>
    <ProfilesContextProvider>
      <TaskContextProvider>
        <BillingProfileFormContextProvider>
          <App />
        </BillingProfileFormContextProvider>
      </TaskContextProvider>
    </ProfilesContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
