module.exports = {
  friendlyName: "Upload text",

  description: "",

  inputs: {
    lang: {
      type: "string",
      required: true
    },
    text: {
      type: "string",
      required: true,
      description: "A raw text to be translated",
      exendedDescription: "The `text` must have been parsed first",
      example: "Praise the lord"
    }
  },

  exits: {},

  fn: async function(inputs) {
    sails.log(inputs);
    const axios = require("axios");

    let puntuatedText = inputs.text;

    sails.log.info("Adding puntuations..");
    try {
      // Attempt to puntuate the text
      let { data } = await axios.post(
        "http://bark.phon.ioc.ee/punctuator",
        `text=${encodeURI(inputs.text)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      puntuatedText = data;
    } catch {
      // Fall back to normal text spoken
      sails.log.error(
        "Could not puntuate text, falling back to normal text spoken.."
      );
      puntuatedText = inputs.text;
    }

    sails.log.silly("Creating..");
    var savedAudio = await Audio.create({
      fd: "undefined",
      size: 1122,
      type: "text/buffet",
      text: puntuatedText,
      lang: inputs.lang
    }).fetch();

    function convertlanguage(langCode) {}
    //! Google translate does not recognize non ISO 639-1
    //! The name "en-ca" is not part of the ISO 639-1 and we couldn't automatically parse it
    let translateLang = savedAudio.lang.split("-")[0];

    // Find all channels that has been created
    var channels = await Channel.find();

    // TODO: Filter incactive channels here
    //? filter inactive channels here
    //? Inactive channels are ones no one has subcribed to, so ...
    //? for the sake of inconsistency -> filter them out to save resources

    // loop through them and blast thier messages
    _.each(channels, async channel => {
      // translate thier text to thier foreign channel language

      //* What should really translate is not the inputs language but the chanels ISO 639-1 language
      let translatedText = await sails.helpers.translateText2ForeignText.with({
        text: savedAudio.text,
        from: inputs.lang.split("-")[0],
        to: channel.language
      });
      /**
       * @description { Save the translated text into the db for syncing purposes }
       * @return {object}
       * @example {
       * {
       *  "id": 14,
       *  "foreignWord": " comment tu t'appelles",
       *  "nativeWord": " what's your name",
       *  "channel": 88
       *}}
       * */

      //! For the sake of testing, remove all translations before ..
      //! Attempting to create a new one
      await Translation.destroy({
        channel: channel.id
      });
      let _text = await Translation.create({
        channel: channel.id,
        nativeWord: translatedText,
        foreignWord: savedAudio.text
      }).fetch();

      sails.log.silly(_text);
      // blast thier translated text to thier channels
      sails.sockets.broadcast(channel.name, "rotciv", _text, this.req);
    });
    var socketId = sails.sockets.getId(this.req);
    sails.log("Current Socket ID: " + socketId);

    // sails.sockets.blast("new audio", savedAudio);

    // All done.
    return puntuatedText;
  }
};
