import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Keycloak from 'keycloak-js'


let initOptions = {
  url: 'http://localhost:8180/auth', realm: 'codecta', clientId: 'react-ff', onLoad: 'login-required'
}

const keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {

  if (!auth) {
      window.location.reload();
  } else {
      console.info("Authenticated");
  }

  //React Render
  ReactDOM.render(<App />, document.getElementById('root'));

  localStorage.setItem("react-token", keycloak.token);
  localStorage.setItem("react-refresh-token", keycloak.refreshToken);

  setTimeout(() => {
      keycloak.updateToken(70).success((refreshed) => {
          if (refreshed) {
              console.debug('Token refreshed' + refreshed);
          }
      }).catch(() => {
          console.error('Failed to refresh token');
      });
  }, 60000)

}).catch(() => {
  console.error("Authenticated Failed");
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
