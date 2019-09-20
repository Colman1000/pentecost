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

io.sails.url =
  process.env.NODE_ENV == "development" ?
  "http://192.168.0.106:1337"
  //  "//192.168.43.113:1337"
  :
  "https://thepentecost.herokuapp.com";
io.sails.transports = ["websocket"];
// io.sails.initialConnectionHeaders = { nosession: true };
// io.socket.on("connect", c => console.clear());
const SAILS_SOCKET = {
  install(Vue, options) {
    Vue.mixin({
      created() {
        Vue.prototype.$ioSails = io.sails;
        Vue.prototype.io = io.socket;
        Vue.prototype.$io = io.socket;
        window.io = io.socket;
      }
    });
  }
};
Vue.use(SAILS_SOCKET);
export default SAILS_SOCKET;