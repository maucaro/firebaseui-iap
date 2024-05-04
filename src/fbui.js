// Require firebase modules.
var firebase = require('firebase/compat/app');
require('firebase/compat/auth');
// Require firebaseui module.
var firebaseui = require('firebaseui');
// Require gcip-iap module.
var ciap = require('gcip-iap');
import {apiKey, authDomain, authProvider} from './config';
const configs = {
  [apiKey]: {
    authDomain: authDomain,
    displayMode: 'optionFirst', // Or identifierFirst
    callbacks: {
      // The callback to trigger when the selection tenant page
      // or enter email for tenant matching page is shown.
      selectTenantUiShown: () => {
        // Show title and additional display info.
      },
      // The callback to trigger when the selection tenant page
      // or enter email for tenant matching page is hidden.
      selectTenantUiHidden: () => {
        // Hide title and additional display info.
      },
      // The callback to trigger when the sign-in page
      // is shown.
      signInUiShown: (tenantId) => {
        // Show tenant title and additional display info.
      },
      beforeSignInSuccess: (user) => {
        // Do additional processing on user before sign-in is
        // complete.
        return Promise.resolve(user);
      }
    },
    tenants: {
      "*": {
        displayName: 'My Organization',
        signInOptions: [
          {
            provider: authProvider
          }
        ],
        immediateFederatedRedirect: true
      }
    }
  }
};
// Create a FirebaseUiHandler instance.
const handler = new firebaseui.auth.FirebaseUiHandler(
    '#firebaseui-auth-container', configs);
// Initialize a ciap.Authentication instance using the FirebaseUiHandler
// instance.
const ciapInstance = new ciap.Authentication(handler);

// Start the authentication flow.
ciapInstance.start();