import * as api from '../../../api';
import * as actionNotification from './notification.actions';
import * as actionApi from './api.actions';

const CryptoJS = require('crypto-js');

export const SIGN_UP = '[AUTH] SIGN UP';
export const SIGN_IN = '[AUTH] SIGN IN';
export const SIGN_IN_WITH_TOKEN = '[AUTH] SIGN IN WITH TOKEN';
export const SIGN_OUT = '[AUTH] SIGN OUT';

export const UPDATE_TOKEN = '[AUTH] UPDATE TOKEN';

export const SET_ACCOUNT_AVATAR = '[AUTH] SET ACCOUNT AVATAR';
export const SET_ACCOUNT_BALANCE = '[AUTH] SET ACCOUNT BALANCE';

const encrypt = text => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));

export const signIn = (options) => (dispatch) => {
  const password = encrypt(options.password);
  const opt = { ...options, password };
  dispatch({ type: actionApi.SET_API_BUSY, isBusy: true });
  api.signIn(opt).then((result) => {
    console.log(result);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    if (result.data.success) {
      localStorage.setItem('access_token', result.data.access_token);
      dispatch({ type: SIGN_IN, payload: result.data });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    console.log('[sign in error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const signUp = (userData) => (dispatch) => {
  dispatch({ type: actionApi.SET_API_BUSY, isBusy: true });
  api.signUp(userData).then((result) => {
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    if (result.data.success) {
      console.log('[sign up ] Attempt to sign in');
      dispatch(actionNotification.showNotification('Sign up Success, please verify your account and sign in.'));
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
      console.log('error sign up');
    }
  }).catch(err => {
    console.log('[sign up error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const signInWithToken = (token) => (dispatch) => {
  console.log('[sign with token]', token);
  dispatch({ type: actionApi.SET_API_BUSY, isBusy: true });
  api.signInWithToken(token).then((result) => {
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    if (result.data.success) {
      localStorage.setItem('access_token', result.data.access_token);
      dispatch({ type: SIGN_IN_WITH_TOKEN, payload: result.data });
    } else {
      console.log('[sign out] token expired or failed');
      dispatch({ type: SIGN_OUT });
    }
  }).catch(err => {
    console.log(err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const signOut = () => (dispatch) => {
  console.log('[sign out]');
  localStorage.setItem('access_token', '');
  dispatch({ type: SIGN_OUT });
};
