import "core-js";
import Vue from "vue";
import App from "./App.vue";
import "@/assets/notifications";
import vuetify from "./plugins/vuetify";
import "./plugins/socket";
import "./plugins/axios";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import _ from "lodash";
import VuePageTransition from "vue-page-transition";
import "@mdi/font/css/materialdesignicons.css";
import moment from "vue-moment";

Vue.prototype._ = _;

Vue.use(moment);
Vue.use(VuePageTransition);

var { mapState } = require("vuex");
Vue.mixin({
  data() {
    return {
      baseUrl:
        process.env.NODE_ENV == "development"
          ? "localhost:1337/api/v1"
          : "https://pentecust.herokuapp.com"
    };
  },
  mounted() {},
  computed: {
    ...mapState([
      "infinite",
      "isActivated",
      "_loading",
      "waiting",
      "connected",
      "timer"
    ])
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
