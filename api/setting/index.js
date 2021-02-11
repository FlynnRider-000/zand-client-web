import apiConfig, { myAxios } from '../config';

const apiModule = 'setting/';

export const updatePassword = (password) => {
  // console.log('[api] send password update request');
  const apiUrl = apiConfig().baseUrl + apiModule + 'update-password';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: password
  });
};
