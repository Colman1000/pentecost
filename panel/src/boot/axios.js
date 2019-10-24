import Vue from "vue";
import axios from "axios";

let config = {
  baseURL:
    process.env.NODE_ENV == "development"
      ? "//localhost:1337"
      : "https://thepentecost.herokuapp.com",
  timeout: 60 * 1000 // Timeout
};

const _axios = axios.create(config);

Vue.prototype.$axios = _axios;
Vue.prototype.$audioUrl = config.baseURL.concat("/song");
