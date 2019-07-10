module.exports = {
  friendlyName: "Upload text",

  description: "",

  inputs: {
    rawText: {
      type: "string",
      required: true,
      description: "A raw text to be translated",
      exendedDescription: "The `rawText` must have been parsed first",
      example: "Praise the lord"
    }
  },

  exits: {},

  fn: async function(inputs) {
    var savedAudio = await Audio.create({
      fd: "undefined",
      size: 1122,
      type: "text/buffet",
      text: inputs.rawText
    }).fetch();
    sails.sockets.blast("new audio", savedAudio);
    // All done.
    return;
  }
};
