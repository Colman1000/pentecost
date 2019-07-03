module.exports = {
  friendlyName: "Translate text 2 foreign text",

  description: "",

  inputs: {
    text: {
      required: true,
      type: "string",
      description: "The text we want to get the locale output"
    },
    target: {
      type: "string",
      required: true,
      description: "The desired local from the user"
    }
  },

  exits: {
    success: {
      description: "All done."
    }
  },

  fn: async function({ text, target }) {
    const projectId = "vigilant-guru-245610";

    const { Translate } = require("@google-cloud/translate");
    const translate = new Translate({ projectId });

    // The text to translate

    // The target language

    // Translates some text into Russian
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
    // TODO
    return translation;
  }
};
