module.exports = {
  friendlyName: "Set language",

  description: "",

  inputs: {
    language: {
      required: true,
      type: "string"
    }
  },

  exits: {},

  fn: async function(inputs) {
    this.req.session.language = inputs.language;
    // All done.
    return this.req.session.language;
  }
};
