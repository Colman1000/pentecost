module.exports = {
  friendlyName: 'DeepL Translate',

  description: 'Translates a given text from one language to another using DeepL',

  inputs: {
    text: {
      required: true,
      type: 'string',
      description: 'The text we want to get the locale output'
    },
    from: {
      type: 'string',
      description: 'The locale the user is translating from',
      example: 'fr',
      defaultsTo: 'EN'
    },
    to: {
      type: 'string',
      required: true,
      description: 'The locale the user is translating to',
      example: 'en'
    }
  },

  exits: {
    success: {
      description: 'All done.'
    }
  },

  fn: async function (inputs) {
    const axios = require('axios');

    API_KEY = '55add4d2-94f5-6363-6977-bad85630d3d3';
    URL = ' https://api.deepl.com/v2/translate';

    let {
      data
    } = await axios.post(
      URL,
      `text=${encodeURI(inputs.text)}&source_lang=${encodeURI(inputs.from)}&target_lang=${encodeURI(inputs.to)}&auth_key=${encodeURI(API_KEY)}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return data['translations'][0]['text'];
  }
};
