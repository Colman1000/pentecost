module.exports = {
  friendlyName: "Broadcast message",

  description: "",

  inputs: {
    lang: {
      type: "string",
      required: true
    },
    message: {
      type: "string",
      required: true
    }
  },

  exits: {},
  // TODO: Move this file to a helper
  fn: async function(inputs) {
    await sails.helpers.broadcast.with(inputs);
    // All done.
    return;
  }
};
