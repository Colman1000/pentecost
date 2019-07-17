module.exports = {
  friendlyName: "Speak",

  description: "Speak channel.",

  inputs: {
    text: {
      required: true,
      type: "string"
    },
    locale: {
      required: true,
      type: "string"
    }
  },

  exits: {},

  fn: async function(inputs) {
    var spoke = await sails.helpers.translateText2Speech.with({
      locale: inputs.locale,
      text: inputs.text
    });
    // All done.
    return spoke;
  }
};
