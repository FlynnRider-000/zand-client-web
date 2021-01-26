import axios from 'axios';

const secondary = {
  serverUrl: 'http://localhost:5000/',
  baseUrl: 'http://localhost:5000/api/',
};

// const primary = {
//   serverUrl: 'http://localhost:5000/',
//   baseUrl: 'http://localhost:5000/api/',
// };

const primary = {
  serverUrl: 'https://api.zandmedicine.com/',
  baseUrl: 'https://api.zandmedicine.com/api/',
};

axios.interceptors.request.use(req => {
  req.headers.auth = localStorage.getItem('access_token');
  return req;
});

axios.interceptors.response.use(res => res, (error) => {
  // console.log('error calling api');
  if (!error.response) {
    // console.log('network error, use secondary server');
    // console.log(error.config);
    if (localStorage.getItem('server_origin') === 'secondary') {
      // console.log('second server is dead, too');
    }
    localStorage.setItem('server_origin', 'secondary');

    Promise.reject(error);
  }
});

const getApiConfig = () => {
  if (localStorage.getItem('server_origin') === 'secondary') {
    return secondary;
  }
  return primary;
};

export const myAxios = (config) => new Promise(async (resolve) => {
  // console.log('myAxios', config);
  const resp = await axios(config);
  // console.log(resp);
  if (resp) {
    resolve(resp);
  } else {
    const resp1 = await axios({ ...config, url: secondary.baseUrl + config.url.slice(primary.baseUrl.length) });
    // console.log(resp1);
    resolve(resp1);
  }
});

export default getApiConfig;
