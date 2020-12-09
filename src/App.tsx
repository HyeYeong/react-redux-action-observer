import React from 'react';
import { Provider } from 'react-redux';
import { ActionObservableProvider } from 'react-redux-action-observer';
import './App.css';
import Demo from './Demo';
import { actionObservable, store } from './redux';

const App = () => {
  return (
    <Provider store={store}>
      <ActionObservableProvider observable={actionObservable}>
        <Demo />
      </ActionObservableProvider>
    </Provider>
  );
};

export default App;
