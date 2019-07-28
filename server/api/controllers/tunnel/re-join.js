module.exports = {
  friendlyName: "Re join",

  description: "",

  inputs: {
    tunnel: {
      required: true,
      type: "string"
    },
    user: {
      required: true,
      type: "string"
    }
  },

  exits: {},

  fn: async function(inputs) {
    var user = await User.findOne({ id: inputs.user });
    var _tunnel = await User.findOne({ id: inputs.tunnel });

    // Subcribe to socket event only after directly leaving it
    sails.sockets.leave(this.req, _tunnel.tunnel, done => {
      sails.log.debug(`left ${_tunnel.tunnel}'s tunnel`);
      sails.sockets.join(this.req, _tunnel.tunnel, __ => {
        sails.log("Subcribed to", _tunnel.tunnel);
      });
    });

    // All done.
    return { user, _tunnel };
  }
};
