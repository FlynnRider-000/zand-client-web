import apiConfig, { myAxios } from '../config';

const apiModule = 'auth/';

export const signUp = (userData) => {
  const user = userData;
  const apiUrl = apiConfig().baseUrl + apiModule + 'register';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: user
  });
};

export const signIn = ({ email, password, macAddress }) => {
  const user = {
    email,
    password,
    macAddress
  };

  console.log(apiConfig());

  const apiUrl = apiConfig().baseUrl + apiModule + 'signIn';

  console.log(user);
  console.log(apiUrl);

  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: user
  });
};

export const signInWithToken = (token) => {
  const apiUrl = apiConfig().baseUrl + apiModule + 'access-token/' + token;
  return myAxios({
    method: 'GET',
    url: apiUrl
  });
};
