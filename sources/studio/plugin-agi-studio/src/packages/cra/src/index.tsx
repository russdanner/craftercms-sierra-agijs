import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { obtainAuthToken } from '@craftercms/studio-ui/services/auth';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const renderApp = () => {
  root.render(
    // Don't use strict mode as it may present unexpected consequences
    // (e.g. opening a widget dialog immediately auto-closes)
    <App />
  );
};

if (process.env.NODE_ENV === 'production') {
  renderApp();
} else {
  // This call's purpose is checking if you're logged in to studio during development
  // on the webpack server; which will be necessary to perform studio api calls. Not
  // necessary to do this in "production" since the plugin host page is protected by
  // Studio authentication. You could call any non-public api here, really. Doesn't have to be this one.
  obtainAuthToken().subscribe({
    next: () => {
      renderApp();
    },
    error: () => {
      root.render(
        <div style={{ margin: '100px auto', textAlign: 'center' }}>
          Please <a href="http://localhost:8080/studio/login">login</a> first. Then,{' '}
          <a
            href="/"
            rel="noopener"
            target="_blank"
            onClick={(e) => {
              e.preventDefault();
              window.location.reload();
            }}
          >
            refresh this page
          </a>
          .
        </div>
      );
    }
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
