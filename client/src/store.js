import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

// Create a localStorage system for persisting data
const vuexLocal = new VuexPersistence({
  key: "pentecost",
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    _loading: false,
    connected: false,
    waiting: true,
    isActivated: false,
    timer: 0,
    infinite: false //? Whether the mic should continue speaking even after its inbuilt timeout
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state, user) {
      state.user = {};
    }
  },
  actions: {
    setTimer(state, time) {
      state.timer = time;
    }
  },
  plugins: [vuexLocal.plugin]
});
