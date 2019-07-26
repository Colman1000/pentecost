module.exports = {
  friendlyName: "Enter tunnel",

  description: "",

  inputs: {
    tunnel: {
      required: true,
      type: "string"
    }
  },

  exits: {
    tunnelNotFound: {
      statusCode: 404,
      description: "The tunnel cannt be found"
    }
  },

  fn: async function(inputs) {
    //? IN FUTURE CHANGE THE SUBSCRIPTION TO `ID` INSTEAD OF `USERNAME`

    var _tunnel = await User.findOne()
      .where({
        tunnel: inputs.tunnel.toLowerCase().trim()
      })
      // filter explict result
      .select(["id", "tunnel", "username", "lang"]);

    if (_tunnel) {
      // All done.
      // Subcribe to socket event
      sails.sockets.join(this.req, _tunnel.tunnel, __ => {
        sails.log("Subcribed to", _tunnel.tunnel);
      });
      return _tunnel;
    }
    throw "tunnelNotFound";
  }
};
