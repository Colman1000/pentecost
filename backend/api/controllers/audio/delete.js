module.exports = {
  friendlyName: "Delete",

  description: "Delete audio.",

  inputs: {
    id: {
      type: "number",
      required: true
    }
  },

  exits: {},

  fn: async function(inputs) {
    var audio = await Audio.findOne({ id: inputs.id });
    if (audio) {
      try {
        await sails.rm(audio.fd);
      } catch {
        /** fail silently */
      }
      await Audio.destroy({ id: inputs.id });
    }
    // All done.
    return audio;
  }
};
