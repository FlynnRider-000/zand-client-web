import apiConfig, { myAxios } from '../config';

const apiModule = 'request/';
export const newRequest = (request) => {
  const formData = new FormData();
  const {
    userName,
    requestType,
    productName,
    model,
    quantity,
    priceMin,
    priceMax,
    commission,
    deliveryLocation,
    description,
    productCategory,
    productProducedType,
    intendedUse
  } = request;

  let docs = null;
  docs = [];
  let i;
  let fileList = null;
  fileList = [];
  formData.append('userName', userName);
  formData.append('requestType', requestType === 'buy' ? 0 : 1);
  formData.append('productName', productName);
  formData.append('model', model);
  formData.append('quantity', quantity);
  formData.append('priceMin', priceMin);
  formData.append('priceMax', priceMax);
  formData.append('commission', commission);
  formData.append('deliveryLocation', deliveryLocation);
  formData.append('description', description);
  formData.append('productProducedType', productProducedType);
  formData.append('intendedUse', intendedUse);
  formData.append('productCategory', productCategory);

  for (i = 0; i < request.documents.length; i += 1) {
    docs.push({
      docId: request.documents[i].docId,
      docType: request.documents[i].docType,
      name: request.documents[i].name,
      description: request.documents[i].description
    });
    if (request.documents[i].files.length > 0) {
      const fileListItemName = request.documents[i].docId + '-files';
      fileList.push({ name: fileListItemName, maxCount: 10 });
      let j;
      for (j = 0; j < request.documents[i].files.length; j += 1) {
        formData.append(fileListItemName, request.documents[i].files[j]);
      }
    }
  }
  // console.log(fileList);
  formData.append('documents', JSON.stringify(docs));
  formData.append('fileList', JSON.stringify(fileList));

  const apiUrl = apiConfig().baseUrl + apiModule + 'add-new-request';
  // console.log(formData.get('userName'));
  return fetch(apiUrl, {
    method: 'POST',
    headers: { auth: localStorage.getItem('access_token') },
    body: formData
  }).then((resp) => resp.json());
};

export const addComment = (commentObj) => {
  // console.log('[api] add comment : ', commentObj);
  const formData = new FormData();
  const apiUrl = apiConfig().baseUrl + apiModule + 'add-comment';

  formData.append('comment', JSON.stringify(commentObj.comment));
  for (let j = 0; j < commentObj.attachFile.length; j += 1) {
    formData.append('attachFiles', commentObj.attachFile[j]);
  }

  return fetch(apiUrl, {
    method: 'POST',
    headers: { auth: localStorage.getItem('access_token') },
    body: formData
  }).then((resp) => resp.json());
};

export const getAllRequests = (requestType, requestStatus, userName, featuredRequest = false) => {
  // console.log('[api] get all requests');
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-all';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: {
      requestType, requestStatus, userName, featuredRequest
    }
  });
};

export const getRequestContentById = (requestId) => {
  // console.log('[api] get all documets by request id : request id : ' + requestId);
  const apiUrl = apiConfig().baseUrl + apiModule + 'get-request-content-by-id';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: { requestId }
  });
};

export const sendEditRequest = (editInfoObj) => {
  const { reqId } = editInfoObj;
  // console.log('[api] send edit request : request id : ' + reqId);
  const apiUrl = apiConfig().baseUrl + apiModule + 'set-edit-request-info';
  return myAxios({
    method: 'POST',
    url: apiUrl,
    data: editInfoObj
  });
};
