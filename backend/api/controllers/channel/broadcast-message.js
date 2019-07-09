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
  fn: async function(inputs) {
    // get all the current broadcasted messages
    // await sails.helpers.broadcast.with(inputs);
    sails.sockets.broadcast(inputs.lang, "rotciv", inputs.message, this.req);
    // All done.
    return;
  }
};
