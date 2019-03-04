import {
  LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL, CHECK_IF_LOGGED_IN, SHOW_FIRST_SPLASH_SCREEN,
} from '../../constants/Actions';

export const login = config => ({
  type: LOGIN,
  payload: config,
});

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFail = err => ({
  type: LOGIN_FAIL,
  error: err,
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFail = err => ({
  type: LOGOUT_FAIL,
  error: err,
});

export const checkIfLoggedIn = () => ({
  type: CHECK_IF_LOGGED_IN,
});

export const showFirstSplashScreen = () => ({
  type: SHOW_FIRST_SPLASH_SCREEN,
});
