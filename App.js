import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './app/reducers';
import MainNavigation from './app/navigation/MainNavigation';
import { getUser } from './app/actions/actions';


export default function App() {
  const store = createStore(rootReducer);
  //store.dispatch(getUser({ email: 'aurelie.lebec' }));
  console.log(store.getState());
  const unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  )
  unsubscribe();

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
