import { combineReducers } from 'redux';
import loginReducer from '../screen/Account/AuthenticationReducer';
import priceListReducer from '../screen/Home/HomeReducer';
// import { navReducer } from '../app';

export default combineReducers({
  priceList: priceListReducer,
});
