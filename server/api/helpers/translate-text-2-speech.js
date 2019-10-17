module.exports = {
  friendlyName: "Translate text 2 speech",

  description: "",

  inputs: {
    text: {
      required: true,
      type: "string",
      description: "The text we want to get the locale output"
    },
    locale: {
      type: "string",
      required: true,
      description: "The desired local from the user"
    },
    gender: {
      type: "string",
      defaultsTo: "MALE",
      description: "The ssmlGender of the audio"
    }
  },

  exits: {
    success: {
      description: "All done."
    }
  },

  fn: async function({ text, locale, gender }) {
    const textToSpeech = require("@google-cloud/text-to-speech");
    // Creates a client
    const client = new textToSpeech.TextToSpeechClient();

    console.log("Translate text 2 speech");
    console.log({
      text,
      locale,
      gender
    });
    // Construct the request
    const request = {
      input: { text: text },

      voice: {
        languageCode: locale,
        ssmlGender: gender
      },
      // Select the type of audio encoding
      audioConfig: {
        speakingRate: 0.8,
        audioEncoding: "MP3"
      }
    };

    // Performs the Text-to-Speech request
    const [response] = await client.synthesizeSpeech(request);
    // sails.log(response.audioContent.toString("base64"));
    return response.audioContent.toString("base64");
  }
};
