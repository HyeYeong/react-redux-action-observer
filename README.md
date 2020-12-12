# React Redux Action Observer

Respond to redux actions within components.

## Usage

The `useActionObserver()` hook allows you to fire a callback (which receives the action) whenever specific actions are dispatched.

```javascript
// LoginObserver.jsx
import React from 'react';
import { useActionObserver } from 'react-redux-action-observer';

const LoginObserver = ({ children }) => {
  useActionObserver(
    (action) => {
      // callback recieves the action
      if (action.type === 'LOGIN_SUCCESS') {
        alert('You logged in!');
      } else {
        alert('Failed to login!');
      }
    },
    ['LOGIN_SUCCESS', 'LOGIN_FAILURE'] // callback will only run if action.type is included in the dependency array, i.e. this specific callback will not run if action.type === 'LOGIN_UNKNOWN'
  );

  return <React.Fragment>{children}</React.Fragment>;
};
```

**Basic setup** is to connect an `ActionObservable` to your redux middleware.

```javascript
// store.js
import { createStore, applyMiddleware } from 'redux';
import { ActionObservable } from 'react-redux-action-observer';
import anyReducer from './anyReducer';

export const actionObservable = new ActionObservable();

export const store = createStore(
  anyReducer,
  applyMiddleware(actionObservable.createMiddleware()) // .createMiddleware() returns a redux Middleware
);
```

You can `subscribe` callbacks to the `ActionObservable` object directly. This returns an `unsubscribe` function.

```javascript
// dummyObserver.js
import { actionObservable } from './store';

// the subscribed callback will run for every action
const unsubscribe = actionObservable.subscribe((action) => {
  // callback recieves the action
  console.log(action);
});
unsubscribe();
```

To use the `useActionObservable()` and `useActionObserver()` hooks, you must provide the `ActionObservable` object to your components using an `ActionObservableProvider`.

```javascript
// App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { ActionObservableProvider } from 'react-redux-action-observer';
import { store, actionObservable } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <ActionObservableProvider observable={actionObservable}>
        // ...
      </ActionObservableProvider>
    </Provider>
  );
};
```

Using the `useActionObservable()` hook gives you access to the `ActionObservable` object. This may offer more flexibility than the `useActionObserver()` hook shown at the beginning.

```javascript
// LogoutObserver.jsx
import React, { useEffect } from 'react';
import { useActionObservable } from 'react-redux-action-observer';

const LogoutObserver = ({ children }) => {
  const actionObservable = useActionObservable();

  useEffect(() => {
    // the subscribed callback will run for every action
    const unsubscribe = actionObservable.subscribe((action) => {
      if (action.type === 'LOGOUT_SUCCESS') {
        alert('You logged out!');
      } else if (action.type === 'LOGOUT_FAILURE') {
        alert('Failed to logout!');
      }
    });
    return unsubscribe;
  }, [actionObservable]);

  return <React.Fragment>{children}</React.Fragment>;
};
```

## Demo

[Live Demo](https://z0bi7z.github.io/react-redux-action-observer)

For local testing you can clone the [repo](https://github.com/z0BI7z/react-redux-action-observer) and run:

```
npm i --only=dev
npm run build-package
npm run link-package
npm start
```

To unlink the package run:

```
npm run unlink-package
```
