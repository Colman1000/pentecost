module.exports = {
  friendlyName: "Change ssml gender",

  description: "Change SSML gender",

  inputs: {
    gender: {
      type: "string",
      required: true
    }
  },

  exits: {},

  fn: async function(inputs) {
    this.req.session.ssmlGender = inputs.gender;
    sails.log.silly("Changed `ssmlGender to` ", inputs.gender);
    // All done.
    return inputs.gender;
  }
};
