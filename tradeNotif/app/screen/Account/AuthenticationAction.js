import { API } from '../../core/global';
import { fetchPost } from '../../core/util/index';

export const AUTHENTICATE = 'AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_PUSH_NOTIFICATION = 'SET_PUSH_NOTIFICATION';

export function authenticate() {
  return {
    type: AUTHENTICATE,
  };
}

export function authenticateSuccess(payload) {
  return {
    type: AUTHENTICATE_SUCCESS,
    payload,
  };
}

export function authenticateFailure(payload) {
  return {
    type: AUTHENTICATE_FAILURE,
    payload,
  };
}

export function setPushNotification(isActive) {
  return {
    type: SET_PUSH_NOTIFICATION,
    payload: isActive,
  };
}
