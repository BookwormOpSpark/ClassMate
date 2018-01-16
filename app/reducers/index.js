import { combineReducers } from 'redux';
import user from './user';
import session from './session';
import homeworks from './homeworks';
import badges from './badges';

const rootReducer = combineReducers({
  user,
  session,
  homeworks,
  badges,
});

export default rootReducer;
