import apiConfig, { myAxios } from '../config';

const apiModule = 'doc-type/';
export const getDocTypes = (author) => {
  console.log('[api] get doc by author');
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-doc-by-author';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: author
  });
};

export const getDocTypes1 = (author) => {
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-doc-by-author';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: author
  });
};
