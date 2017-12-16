import {
  AUTHENTICATE,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  LOGOUT,
  SET_PUSH_NOTIFICATION,
} from './AuthenticationAction';
import { authenticationState } from '../../core/initialState';
import { parseAPIErrorMessage } from '../../core/util/index';

export default function reducer(state = authenticationState, action) {
  switch (action.type) {
    case AUTHENTICATE: {
      return Object.assign({}, state, {
        errorMsg: '',
        isAuthenticating: true,
      });
    }
    case AUTHENTICATE_SUCCESS: {
      const { accessToken, expiredAt } = action.payload;

      return Object.assign({}, state, {
        accessToken,
        expiredAt,
        isAuthenticating: false,
      });
    }
    case AUTHENTICATE_FAILURE: {
      const { payload } = action;
      return Object.assign({}, state, {
        errorMsg: parseAPIErrorMessage(action.payload),
        isAuthenticating: false,
      });
    }
    case LOGOUT: {
      return authenticationState;
    }
    case SET_PUSH_NOTIFICATION: {
      return Object.assign({}, state, {
        pushNotification: action.payload,
      });
    }
    default: {
      return state;
    }
  }
}
