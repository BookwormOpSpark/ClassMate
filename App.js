import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
// import appReducer from './app/reducers';
import RootReducer from './app/reducers';
import MainNavigation from './app/navigation/MainNavigation';
import LoginNavigation from './app/navigation/LoginNavigation';


export default function App() {
  const store = createStore(RootReducer);

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
