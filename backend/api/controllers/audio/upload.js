module.exports = {
  friendlyName: "Upload audio",

  description: "Upload an audio to the server and saves it in a db",

  files: ["audio"],
  inputs: {
    audio: {
      description: "Upstream for an incoming audio upload.",
      type: "ref",
      required: true
    }
  },
  exits: {
    tooBig: {
      description: "The audio is too big.",
      responseType: "badRequest"
    }
  },

  fn: async function(inputs) {
    var util = require("util");

    var audio = await sails
      .uploadOne(inputs.audio, {
        maxBytes: 3000000
      })
      .intercept("E_EXCEEDS_UPLOAD_LIMIT", "tooBig")
      .intercept(
        err => new Error("The photo upload failed: " + util.inspect(err))
      );

    var savedAudio = await Audio.create({
      fd: audio.fd,
      size: audio.size,
      type: audio.type
    }).fetch();

    // save the req so that we can update it later from GCP
    this.req.session.audioID = savedAudio.id;

    sails.sockets.blast("new audio", savedAudio);
    // All done.
    return savedAudio;
  }
};
