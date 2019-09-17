module.exports = {
  friendlyName: "Translate text",

  description: "",

  inputs: {
    text: {
      required: true,
      type: "string"
    },
    channelId: {
      required: true,
      type: "string"
    }
  },

  exits: {},

  fn: async function(inputs) {
    var channel = await Channel.findOne({
      id: inputs.channelId
    });

    var text = await sails.helpers.translateText2ForeignText.with({
      text: inputs.text,
      from: "en",
      to: channel.language
    });

    // All done.
    return text;
  }
};
