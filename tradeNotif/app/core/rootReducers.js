import { combineReducers } from 'redux';
import loginReducer from '../screen/Account/AuthenticationReducer'
// import { navReducer } from '../app';

export default combineReducers({
  login: loginReducer,
});
