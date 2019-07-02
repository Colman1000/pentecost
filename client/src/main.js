import "core-js";
import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import "./plugins/vuetify";
import "./plugins/socket";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import _ from "lodash";

import moment from "vue-moment";
import AudioRecorder from "vue-audio-recorder";

Vue.use(moment);
Vue.use(AudioRecorder);

Vue.prototype.baseUrl =
  process.env.NODE_ENV == "development"
    ? "http://localhost:1337/api/v1"
    : "http://our-pentecost-server/api/v1";
Vue.prototype.$http = axios;

import VuePageTransition from "vue-page-transition";
Vue.use(VuePageTransition);

import "@mdi/font/css/materialdesignicons.css";
// import "roboto-fontface/css/roboto/roboto-fontface.css";

Vue.config.productionTip = false;

Vue.prototype._ = _;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
