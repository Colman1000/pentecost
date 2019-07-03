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
    let userLanguage = this.req.session.language || "fr";
    sails.log.info("Langauge: ", this.req.session.language);
    sails.log.debug("Translating Audio Text From One Channel..");
    // translate audio
    let text = await sails.helpers.translateAudio2Text.with({ id: id });
    sails.log.info("Translated AudioText :", text);

    sails.log.debug(
      `Translating \`${text}\` to \`${userLanguage}\` Equivalent ...`
    );
    // convert text in eg (en to es)
    var translatedText = await sails.helpers.translateText2ForeignText.with({
      text: text,
      target: userLanguage
    });
    sails.log.info(`Translated \`${text}\` to \`${translatedText}\` ...`);

    sails.log.debug(`Converting \`${translatedText}\` to Audio now  ...`);
    var userAudio = await sails.helpers.translateText2Speech.with({
      locale: userLanguage,
      text: translatedText
    });

    sails.log.info(`Converted "${translatedText}" to audio`, userAudio);

    // All done.
    return userAudio;
  }
};
