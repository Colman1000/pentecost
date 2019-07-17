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
    const translate = require("translate");
    translate.key = "AIzaSyAtY4abPd-ICKi2FxDl9fccwNazy9CXDLM";
    return await translate(text, target);
  }
};
