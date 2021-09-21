import axios from "axios";

axios.defaults.baseURL = "/api/v2";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.interceptors.request.use();
axios.interceptors.response.use();

export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({ method: "get", url, params, ...config })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const post = (url, params, data, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({ method: "post", url, params, data, ...config })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default axios;
