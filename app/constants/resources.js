import axios from 'axios';
import cookie from 'react-cookie';

const Resources = {
  api: {
    test: '/api/test'
  },
  cookies: {
    user: 'ReactReduxNodeMongodb_user'
  },
};

Resources.request = {
  post(url, data = {}) {
    data.refreshToken = cookie.load(Resources.cookies.user) ? cookie.load(Resources.cookies.user).refreshToken : null;
    return axios
      .post(url, data);
  },
  get(url, data = {}) {
    data.refreshToken = cookie.load(Resources.cookies.user) ? cookie.load(Resources.cookies.user).refreshToken : null;
    return axios
      .get(url, {params: data});
  },
  delete(url, data = {}) {
    data.refreshToken = cookie.load(Resources.cookies.user) ? cookie.load(Resources.cookies.user).refreshToken : null;
    return axios
      .delete(url, {params: data});
  },
  put(url, data = {}) {
    data.refreshToken = cookie.load(Resources.cookies.user) ? cookie.load(Resources.cookies.user).refreshToken : null;
    return axios
      .put(url, data);
  }
};

export default Resources;
