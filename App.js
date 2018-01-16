import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './app/reducers';
import MainNavigation from './app/navigation/MainNavigation';


export default function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
