import * as api from '../../../api';
import * as actionApi from './api.actions';
import * as actionNotification from './notification.actions';

export const SERVICE_LIST = '[REQ] SERVICE_LIST';
export const ADD_SERVICE = '[REQ] ADD_SERVICE';
export const BOOK_SERVICE = '[REQ] BOOK_SERVICE';
export const SET_CURRENT_SERVICE = '[REQ] SET_CURRENT_SERVICE';
export const GET_BOOK_SERVICES = '[REQ] GET_BOOK_SERVICES';
export const GET_BOOK_INFO_OF_SERVICE = '[REQ] GET_BOOK_INFO_OF_SERVICE';
export const GET_BOOK_LIST_OF_SERVICE = '[REQ] GET_BOOK_LIST_OF_SERVICE';
export const SERVICE_ADDED = '[REQ] SERVICE_ADDED';
export const SERVICE_PROVIDER_SUCCESS = '[REQ] SERVICE_PROVIDER_SUCCESS';
export const PROVIDER_INFO = '[REQ] PROVIDER_INFO';

export const serviceAdded = (value) => ({
  type: SERVICE_ADDED,
  payload: value
});

export const providerRegistered = (value) => ({
  type: SERVICE_PROVIDER_SUCCESS,
  payload: value
});

export const getProviderInfo = (serviceId) => (dispatch) => {
  try {
    api.getProviderInfo(serviceId).then((result) => {
      // console.log('Provider Info', result);
      if (result.data.success) {
        dispatch({ type: PROVIDER_INFO, payload: result.data.providerInfo });
      } else {
        dispatch(actionNotification.showNotification(result.data.message));
      }
    }).catch(err => {
      // console.log('[add comment error]', err);
      dispatch(actionNotification.showNotification('Something went wrong.'));
    });
  } catch (err) {
    // console.log('[add comment error]', err);
    dispatch(actionNotification.showNotification('Something went wrong.'));
  }
};

export const registerServiceProvider = (providerInfo) => (dispatch) => {
  api.registerServiceProvider(providerInfo).then((result) => {
    // console.log('Register Service Provider', result);
    if (result.data.success) {
      dispatch(providerRegistered(true));
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const getAllServices = () => (dispatch) => {
  dispatch({ type: actionApi.SET_API_BUSY, isBusy: true });
  api.getAllServices().then((result) => {
    // console.log('Get Services', result);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    if (result.data.success) {
      dispatch({ type: SERVICE_LIST, payload: result.data.services });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const getBookInfoByServIdUsrName = (serviceInfo) => (dispatch) => {
  api.getBookInfoByServIdUsrName(serviceInfo).then((result) => {
    // console.log('get book services', result);
    if (result.data.success) {
      dispatch({ type: GET_BOOK_INFO_OF_SERVICE, payload: result.data.bookInfo });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const getBookListByServiceId = (serviceInfo) => (dispatch) => {
  api.getBookListByServiceId(serviceInfo).then((result) => {
    // console.log('get book services', result);
    if (result.data.success) {
      dispatch({ type: GET_BOOK_LIST_OF_SERVICE, payload: result.data.bookInfos });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const acceptCancelBookRequest = (cancelInfo) => (dispatch) => {
  api.acceptCancelBookRequest(cancelInfo.bookId).then((result) => {
    // console.log('get book services', result);
    if (result.data.success) {
      dispatch(getBookListByServiceId(cancelInfo.serviceId));
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const getBookedServices = () => (dispatch) => {
  api.getBookedService().then((result) => {
    // console.log('Book Service', result);
    if (result.data.success) {
      dispatch({ type: GET_BOOK_SERVICES, payload: result.data.bookInfos });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const unbookService = (bookInfo) => (dispatch) => {
  api.unbookService(bookInfo).then((result) => {
    // console.log('UnBook Service', result);
    if (result.data.success) {
      dispatch({ type: GET_BOOK_SERVICES, payload: result.data.bookInfos });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const bookService = (bookInfo) => (dispatch) => {
  api.bookService(bookInfo).then((result) => {
    // console.log('Book Service', result);
    if (result.data.success) {
      dispatch({ type: BOOK_SERVICE, payload: result.data.bookInfo });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const addService = (serviceObj) => (dispatch) => {
  api.addService(serviceObj).then((result) => {
    // console.log('Add Services', result);
    if (result.data.success) {
      dispatch({ type: ADD_SERVICE, payload: result.data.service });
      dispatch(serviceAdded(true));
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    // console.log('[get services error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const setCurrentService = (service) => ({
  type: SET_CURRENT_SERVICE,
  payload: { service }
});
