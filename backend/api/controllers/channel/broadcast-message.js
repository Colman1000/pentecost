module.exports = {
  friendlyName: "Broadcast Message",

  description: "Begin the translation proccess and blast the channels",

  inputs: {
    audioId: {
      type: "string",
      required: true
    },
    channelId: {
      type: "string",
      required: true
    }
  },

  exits: {},

  fn: async function(inputs) {
    if (inputs.channelId == "undefined") return;
    var chan = await Channel.findOne({ id: inputs.channelId });

    var audioText = await Audio.findOne({ id: inputs.audioId });

    if (audioText && chan) {
      audioText = audioText.text;
      var translatedText = await sails.helpers.translateText2ForeignText.with({
        text: audioText,
        target: chan.language
      });

      sails.log.info("--".repeat(20));
      sails.log.debug("Channel: ", chan.name);
      sails.log.debug("Language: ", chan.language);
      sails.log.debug("origin text:", audioText);
      sails.log.debug("trans text:", translatedText);
      sails.log.info("--".repeat(20));

      sails.sockets.broadcast(chan.name, "rotciv", translatedText, this.req);
      return translatedText;
    }
    return;
    // All done.
  }
};
