/**
 * @description This plugin exposes sails.io and socket-client to Vue's instance and window
 * @example this.io.on('message', data => { ... })
 * @example io.on('message', data => { ... })
 * @example this.$io.on('message', data => { ... })
 */

import Vue from "vue";
import socketio from "socket.io-client";
import sailsio from "sails.io.js-dist";
const io = sailsio(socketio);
// try to reconnect if connection is lost
io.sails.reconnection = true;
io.sails.autoConnect = true;
io.sails.environment = process.env.NODE_ENV;

io.sails.url = "//localhost:1337";
io.sails.transports = ["polling"];
io.sails.useCORSRouteToGetCookie = true;
io.socket.on("connect", c => console.clear());
const SAILS_SOCKET = {
  install(Vue, options) {
    Vue.mixin({
      created() {
        Vue.prototype.io = io.socket;
        Vue.prototype.$io = io.socket;
        window.io = io.socket;
      }
    });
  }
};
Vue.use(SAILS_SOCKET);
export default SAILS_SOCKET;
