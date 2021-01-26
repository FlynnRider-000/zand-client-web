const isProd = process.env.NODE_ENV === 'production';

const link = {
  crypto: {
    home: '/',
    contact: '/contact',
    request: '/public-request',
    checkrequest: '/check-request',
    login: '/login',
    document: '/document',
    register: '/register',
    autoupdate: '/autoupdate',
    getstarted: '/get-started',
    maintain: '/maintain',
    new: '/add-new',
    service: '/service',
    add_new_service: '/add-new-service',
    view_service: '/serviceView',
  }
};
const linkDev = {
  crypto: {
    home: '/',
    contact: '/contact',
    request: '/public-request',
    checkrequest: '/check-request',
    login: '/login',
    document: '/document',
    register: '/register',
    autoupdate: '/autoupdate',
    getstarted: '/get-started',
    maintain: '/maintain',
    new: '/add-new',
    service: '/service',
    add_new_service: '/add-new-service',
    view_service: '/serviceView',
  }
};

export default isProd ? link : linkDev;
