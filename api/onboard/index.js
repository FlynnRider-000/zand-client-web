import apiConfig, { myAxios } from '../config';

const apiModule = 'onboard/';

export const getHomePage = () => {
  console.log('[api] get Home page');
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-home-page';
  return myAxios({
    method: 'POST',
    url: apiUrl
  });
};

export const getHomePage1 = () => {
  console.log('[api] get Home page');
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-home-page';
  return myAxios({
    method: 'POST',
    url: apiUrl
  });
};
