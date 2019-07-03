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
      await sails.rm(audio.fd);
      await Audio.destroy({ id: inputs.id });
    }
    // All done.
    return audio;
  }
};
