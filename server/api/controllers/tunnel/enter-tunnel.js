module.exports = {
  friendlyName: "Enter tunnel",

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

  exits: {
    tunnelNotFound: {
      statusCode: 404,
      description:
        "The tunnel can't be found, please make sure you copied the right tunnel name, tunnels are case sensitive"
    }
  },

  fn: async function(inputs) {
    var user = await User.findOne(inputs.user);

    // look up the channel
    var _tunnel = await User.findOne().where({
      tunnel: inputs.tunnel
    });
    if (_tunnel) {
      sails.log.silly(`${user.username} logged into ${_tunnel.username}`);
      // All done.
      return _.extend(user, { tunnelIn: _tunnel });
    }
    throw "tunnelNotFound";
  }
};
