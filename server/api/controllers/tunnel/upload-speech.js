module.exports = {
  friendlyName: "Upload speech",

  description: "",

  inputs: {
    speech: {
      type: "string",
      required: true
    },
    user: {
      type: "ref",
      required: true
    },
    tunnel: {
      type: "string",
      required: true
    }
  },

  exits: {},

  fn: async function(inputs) {
    sails.log(inputs);
    var user = await User.findOne({ id: inputs.user.id });
    var tunnel = await User.findOne({ id: inputs.tunnel });

    let broadcasting = {
      from: user.username,
      lang: user.lang,
      speech: inputs.speech
    };
    sails.log.info("broadcasting with", broadcasting);
    sails.sockets.broadcast(tunnel.tunnel, broadcasting);

    // All done.
    return;
  }
};
