module.exports = {
  friendlyName: "Broadcast message",

  description: "",

  inputs: {
    lang: {
      type: "string",
      required: true
    }
  },

  exits: {},

  fn: async function(inputs) {
    sails.sockets.broadcast(
      inputs.lang,
      "rotciv",
      { howdy: "hi there!" },
      this.req
    );

    // All done.
    return;
  }
};
