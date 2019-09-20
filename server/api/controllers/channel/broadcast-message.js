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
    },
    rawText: {
      type: "string",
      required: false,
      description: "A raw text to be translated",
      exendedDescription: "The `rawText` must have been parsed first",
      example: "Praise the lord"
    }
  },

  exits: {},

  fn: async function(inputs) {
    if (inputs.channelId == "undefined") return;
    var chan = await Channel.findOne({ id: inputs.channelId });

    var audioText = await Audio.findOne({ id: inputs.audioId });
    var translatedText = String();
    // process for audio stream
    sails.log.info("--".repeat(20));
    if (audioText && chan) {
      audioText = audioText.text;
      translatedText = await sails.helpers.translateText2ForeignText.with({
        text: audioText,
        target: chan.language
      });

      sails.log.debug("Channel: ", chan.name);
      sails.log.debug("Language: ", chan.language);
      sails.log.debug("origin text:", audioText);
      sails.log.debug("trans text:", translatedText);

      sails.sockets.broadcast(chan.name, "rotciv", translatedText, this.req);
      // return translatedText;
      // Process for raw text
    } else if (chan && inputs.rawText) {
      translatedText = await sails.helpers.translateText2ForeignText.with({
        text: inputs.rawText,
        target: chan.language
      });
      sails.log.debug("Channel: ", chan.name);
      sails.log.debug("Language: ", chan.language);
      sails.log.debug("origin text:", audioText);
      sails.log.debug("trans text:", translatedText);
      sails.sockets.broadcast(chan.name, "rotciv", translatedText, this.req);
    }
    sails.log.info("--".repeat(20));

    return translatedText;
    // All done.
  }
};
