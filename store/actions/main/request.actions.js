import * as api from '../../../api';
import * as actionApi from './api.actions';
import * as actionNotification from './notification.actions';

export const DOC_TYPES = '[REQ] DOC_TYPES';
export const SET_CURRENT_REQUEST = '[REQ] SET_CURRENT_REQUEST';
export const ADD_COMMENT = '[REQ] ADD_COMMENT';
export const SET_RUQUEST_CONTENT = '[REQ] SET_RUQUEST_CONTENT';
export const PRODUCT_CATEGORY_TYPES = '[PRODUCT] PRODUCT_CATEGORY_TYPES';
export const EDIT_REQUEST = '[REQ] EDIT_REQ';

export const getDocTypes = (author = 'all') => (dispatch) => {
  dispatch({ type: actionApi.SET_API_BUSY, isBusy: true });
  api.getDocTypes({ author }).then((result) => {
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    if (result.data.success) {
      dispatch({ type: DOC_TYPES, payload: result.data.type });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    console.log('[get doctypes error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const setCurrentRequest = (req, url) => ({
  type: SET_CURRENT_REQUEST,
  payload: { req, url }
});

export const addComment = (comment) => (dispatch) => {
  try {
    api.addComment(comment).then((result) => {
      console.log('new comment', result);
      if (result.data.success) {
        dispatch({ type: ADD_COMMENT, payload: result.data.req });
      } else {
        dispatch(actionNotification.showNotification(result.data.message));
      }
    }).catch(err => {
      console.log('[add comment error]', err);
      dispatch(actionNotification.showNotification('Something went wrong.'));
    });
  } catch (err) {
    console.log('[add comment error]', err);
    dispatch(actionNotification.showNotification('Something went wrong.'));
  }
};

export const editRequest = (editInfoObj) => (dispatch) => {
  try {
    api.sendEditRequest(editInfoObj).then((result) => {
      console.log('edit request', result);
      if (result.data.success) {
        dispatch({ type: EDIT_REQUEST, payload: result.data.req });
      } else {
        dispatch(actionNotification.showNotification(result.data.message));
      }
    }).catch(err => {
      console.log('[edit request error]', err);
      dispatch(actionNotification.showNotification('Something went wrong.'));
    });
  } catch (err) {
    console.log('[edit request error]', err);
    dispatch(actionNotification.showNotification('Something went wrong.'));
  }
};

export const getAllProductCategories = () => (dispatch) => {
  dispatch({ type: actionApi.SET_API_BUSY, isBusy: true });
  api.getAllProductCategories().then((result) => {
    console.log('productCategories', result);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    if (result.data.success) {
      dispatch({ type: PRODUCT_CATEGORY_TYPES, payload: result.data.types });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    console.log('[get doctypes error]', err);
    dispatch({ type: actionApi.SET_API_BUSY, isBusy: false });
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};

export const getRequestContentById = (request) => (dispatch) => {
  api.getRequestContentById(request._id).then((result) => {
    console.log('request content', result);
    if (result.data.success) {
      dispatch({ type: SET_RUQUEST_CONTENT, payload: result.data.content });
    } else {
      dispatch(actionNotification.showNotification(result.data.message));
    }
  }).catch(err => {
    console.log('[get request content error]', err);
    dispatch(actionNotification.showNotification('Something went wrong.'));
  });
};
