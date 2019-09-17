module.exports = {
  friendlyName: "Translate text 2 foreign text",

  description: "",

  inputs: {
    text: {
      required: true,
      type: "string",
      description: "The text we want to get the locale output"
    },
    from: {
      type: "string",
      description: "The locale the user is translating from",
      example: "fr",
      defaultsTo: "en"
    },
    to: {
      type: "string",
      required: true,
      description: "The locale the user is translating to",
      example: "en"
    }
  },

  exits: {
    success: {
      description: "All done."
    }
  },

  fn: async function({ text, from, to }) {
    const translate = require("translate");
    translate.key = "AIzaSyAZMYD0LfFS7xZOB9vMpLrrODtLsaGPrtQ";
    return await translate(text, { to: to, from: from });
  }
};
