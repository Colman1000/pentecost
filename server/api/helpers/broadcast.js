module.exports = {
  friendlyName: "Broadcast",

  description: "Broadcast something.",

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

  exits: {
    success: {
      description: "All done."
    }
  },

  fn: async function(inputs) {
    sails.sockets.broadcast(inputs.lang, "rotciv", inputs.message, this.req);
    return true;
  }
};
