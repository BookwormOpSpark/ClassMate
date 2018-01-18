import { combineReducers } from 'redux';
import user from './user';
import session from './session';
import homeworks from './homeworks';
import badges from './badges';

const appReducer = combineReducers({
  user,
  session,
  homeworks,
  badges,
});

const RootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};
export default RootReducer;

// const AppReducer = (state, action) => {
// appReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);
// };
// DOCUMENTATION
// const appReducer = combineReducers({ a, b })
// function appReducer(state = {}, action) {
//   return {
//     a: a(state.a, action),
//     b: b(state.b, action)
//   };
// }
// function todoApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
//   }
// }
// If we call createStore without the preloadedState, it's going to initialize the state to {}. 
// Therefore, state.a and state.b will be undefined by the time it calls a and b reducers.
// Both a and b reducers will receive undefined as their state arguments,
// and if they specify default state values, those will be returned.
// This is how the combined reducer returns a { a: 'lol', b: 'wat' } state object on the first invocation.
// The combineReducers utility included with Redux is very useful, but is deliberately limited to handle a single
// common use case: updating a state tree that is a plain Javascript object, by delegating the work of updating
// each slice of state to a specific slice reducer
