import apiConfig, { myAxios } from '../config';

const apiModule = 'service/';
export const getAllServices = () => {
  console.log('[api] get all services');
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-services';
  return myAxios({
    method: 'POST',
    url: apiUrl
  });
};

export const getBookListByServiceId = (serviceId) => {
  console.log('[api] getBookListByServiceId', serviceId);
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-book-list-by-serviceId';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: { serviceId }
  });
};

export const acceptCancelBookRequest = (bookId) => {
  console.log('[api] acceptCancelBookRequest', bookId);
  const apiUrl = apiConfig().baseUrl + apiModule + 'accept-cancel-request';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: { bookId }
  });
};

export const getBookInfoByServIdUsrName = (serviceId) => {
  console.log('[api] getBookInfoByServIdUsrName', serviceId);
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-book-info-by-serviceIdUserName';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: { serviceId }
  });
};

export const getBookedService = () => {
  console.log('[api] book service');
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-booked-service-by-user';
  return myAxios({
    method: 'POST',
    url: apiUrl
  });
};

export const bookService = (bookInfo) => {
  console.log('[api] get add service');
  const apiUrl = apiConfig().baseUrl + apiModule + 'book-service';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: bookInfo
  });
};

export const unbookService = (bookInfo) => {
  console.log('[api] get add service');
  const apiUrl = apiConfig().baseUrl + apiModule + 'unbook-service';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: bookInfo
  });
};

export const addService = (serviceObj) => {
  console.log('[api] get add service');
  const apiUrl = apiConfig().baseUrl + apiModule + 'add-service';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: serviceObj
  });
};

export const registerServiceProvider = (providerInfo) => {
  console.log('[api] register service provider', providerInfo);
  const apiUrl = apiConfig().baseUrl + apiModule + 'register-service-provider';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: providerInfo
  });
};

export const getProviderInfo = (serviceId) => {
  console.log('[api] get provider info', serviceId);
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-provider-info-by-service-id';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: { serviceId }
  });
};
