import axios from 'axios';
import apiConfig from '../config';

const apiModule = 'product-category/';

export const getAllProductCategories = (author) => {
  console.log('[api] get all product categories');
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-all';
  return axios({
    method: 'POST',
    url: apiUrl,
    data: author
  });
};

export const addProductCategory = (productCategory) => {
  const apiUrl = apiConfig().baseUrl + apiModule + 'add';
  return axios({
    method: 'POST',
    url: apiUrl,
    data: productCategory
  });
};

export const updateProductCategory = (productCategory) => {
  const apiUrl = apiConfig().baseUrl + apiModule + 'update';
  return axios({
    method: 'POST',
    url: apiUrl,
    data: productCategory
  });
};

export const deleteProductCategory = (productCategory) => {
  const apiUrl = apiConfig().baseUrl + apiModule + 'delete';
  return axios({
    method: 'POST',
    url: apiUrl,
    data: productCategory
  });
};
