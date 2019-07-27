module.exports = {
  friendlyName: "Translate for",

  description: "Translate text for one user",

  inputs: {
    user: {
      required: true,
      type: "string",
      description: "The user we're running this translation for"
    },
    speech: {
      required: true,
      type: "string"
    },
    from: {
      required: true,
      type: "string"
    },
    to: {
      required: true,
      type: "string"
    }
  },

  exits: {},

  fn: async function(inputs) {
    let user = await User.findOne({ id: inputs.user });
    var text = await sails.helpers.translateText2ForeignText.with({
      text: inputs.speech,
      from: inputs.from.split("-")[0],
      to: inputs.to.split("-")[0]
    });
    // All done.
    return { text, user: user.username, time: Date.now() };
  }
};
