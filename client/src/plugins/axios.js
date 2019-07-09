"use strict";
import Vue from "vue";
import axios from "axios";
import store from "../store";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

let config = {
  baseURL:
    process.env.NODE_ENV == "development"
      ? "//192.168.43.113:1337"
      : "http://easypharmacy.us-east-2.elasticbeanstalk.com",

  timeout: 60 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    store.state.loading = true;
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    store.state.error = false;
    // ┬ ┬┌─┐┌┐┌┌┬┐┬  ┌─┐  ┌─┐┬  ┌─┐┌┐ ┌─┐┬    ┌─┐┬─┐┬─┐┌─┐┬─┐┌─┐
    // ├─┤├─┤│││ │││  ├┤   │ ┬│  │ │├┴┐├─┤│    ├┤ ├┬┘├┬┘│ │├┬┘└─┐
    // ┴ ┴┴ ┴┘└┘─┴┘┴─┘└─┘  └─┘┴─┘└─┘└─┘┴ ┴┴─┘  └─┘┴└─┴└─└─┘┴└─└─┘
    // TODO: THIS HIERACHY SHOULD BE CHANGED
    if (
      (response.data && response.data.success) ||
      response.data.success == false
    ) {
      store.state.err.key = false;
    } else if (response.data && response.data.code !== 200) {
      store.state.err.key = true;
      store.state.err.message = response.data.message;
    }

    // if the connection is back, restore our `isOffline` to `false`
    store.state.isOffline = false; // </if>

    // Do something with response data
    store.state.loading = false;
    return response;
  },
  function(error) {
    if (
      String(error).includes("Network Error") &&
      /* and the app is not offline*/ !store.state.isOffline
    ) {
      // then only prompt the error
      store.state.error = true;
    }
    // if this, then, that ? destroy the loading state
    store.state.loading = false;

    if (error.response && error.response.status == 400) {
      // store.state.err.key = true;
      location.href = "#/auth/login";
      // store.state.err.message = error.response.statusText.concat(
      //   ", this request failed, please try again later or contact support."
      // );
    }
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  window.http = _axios;
  window.$http = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
