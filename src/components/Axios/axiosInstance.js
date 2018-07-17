import axios from 'axios';

const cors = "https://cors-anywhere.herokuapp.com/";
const apiRoot = "http://pokeapi.co/api/v2/";

var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
    config.url = `${cors}${apiRoot}${config.url}`;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export default axiosInstance;
