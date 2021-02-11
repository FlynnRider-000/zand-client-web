import * as api from '../../../api';
import * as actionApi from './api.actions';
import * as actionNotification from './notification.actions';

const CryptoJS = require('crypto-js');
const encrypt = text => CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));


export const updatePassword = (data) => (dispatch) => {
  let { password, newPassword } = data;
  password = encrypt(password);
  newPassword = encrypt(newPassword);
  dispatch({ type: actionApi.SET_API_BUSY, isBusy: true });
  try {
    api.updatePassword({ password, newPassword }).then((result) => {
      dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
      if (result.data.success)
        dispatch(actionNotification.showNotification('Password updated Successfully.'));
      else
        dispatch(actionNotification.showNotification('Password not correct. Please try again'));
    }).catch(err => {
      // console.log('[add comment error]', err);
      dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
      dispatch(actionNotification.showNotification('Something went wrong.'));
    });
  } catch (err) {
    // console.log('[add comment error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  }
};