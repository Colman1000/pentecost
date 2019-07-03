module.exports = {
  friendlyName: "Get audio text",

  description: "",

  inputs: {
    id: {
      type: "number",
      required: true
    }
  },

  exits: {},

  fn: async function({ id }) {
    let userLanguage = this.req.session.language || "en-US";

    // translate audio
    let text = await sails.helpers.helpTranslate.with({ id: id });

    sails.log.debug("Translated AudioText :", text);

    // convert audio in eg (en to es)
    var translatedText = await sails.helpers.translateText2ForeignText.with({
      text: text,
      target: userLanguage
    });

    sails.log.debug("Translated Text:", translatedText);

    var userAudio = await sails.helpers.translateText2Speech.with({
      locale: userLanguage,
      text: text
    });

    sails.log.debug(userAudio);

    // All done.
    return userAudio;
  }
};
