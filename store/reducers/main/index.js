import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import notificationReducer from './notification.reducer';
import requestReducer from './request.reducer';
import apiReducer from './api.reducer';
import serviceReducer from './service.reducer';

const mainReducers = combineReducers({
  authReducer,
  serviceReducer,
  apiReducer,
  requestReducer,
  notificationReducer,
});

export default mainReducers;
