module.exports = {
  friendlyName: "Get translations",

  description: "",

  inputs: {
    channel: {
      required: true,
      type: "string"
    }
  },

  exits: {},

  fn: async function(inputs) {
    var translations = await Translation.find()
      .where({
        channel: inputs.channel
      })
      .sort("createdAt DESC");
    // .omit(["updatedAt"]);
    // All done.
    return translations;
  }
};
