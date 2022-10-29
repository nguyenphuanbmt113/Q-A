import axios from "axios";
import store from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const access_token = store?.getState()?.account?.access_token;
    console.log("access_token", access_token);
    config.headers["Authorization"] = "Bearer " + access_token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    let result = response?.data;
    return result;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
