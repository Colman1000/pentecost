module.exports = {
  friendlyName: "Help translate",

  description: "",

  inputs: {
    id: {
      required: true,
      type: "string"
    },
    language: {
      required: false,
      type: "string"
    }
  },

  exits: {
    success: {
      description: "All done."
    }
  },

  fn: async function(inputs) {
    var path = require("path");
    var result = {};
    // Imports the Google Cloud client library
    const speech = require("@google-cloud/speech");
    const fs = require("fs");

    // Creates a client
    const client = new speech.SpeechClient();

    // The name of the audio file to transcribe
    const _audio = await Audio.findOne({ id: inputs.id });
    fileName = _audio.fd;

    // Reads a local audio file and converts it to base64
    const file = fs.readFileSync(fileName);

    const audioBytes = file.toString("base64");

    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      content: audioBytes
    };
    const config = {
      encoding: "FLAC",
      // sampleRateHertz: 18000,
      languageCode: inputs.language || "en-US"
    };
    const request = {
      audio: audio,
      config: config
    };

    // Detects speech in the audio file
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join("\n");

    return transcription;
  }
};
