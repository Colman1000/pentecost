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
    const run = require("shelljs").exec;
    var audio = await sails
      .uploadOne(inputs.audio, {
        maxBytes: 3000000
      })
      .intercept("E_EXCEEDS_UPLOAD_LIMIT", "tooBig")
      .intercept(
        err => new Error("The photo upload failed: " + util.inspect(err))
      );
    if (audio) {
      // convert the audio to flac and save it
      run(
        `ffmpeg -i ${audio.fd} -v warning -b:a 96k -map a ${audio.fd.replace(
          "mp3",
          "flac"
        )}`
      );
      run(`rm ${audio.fd}`);
      var savedAudio = await Audio.create({
        fd: audio.fd.replace("mp3", "flac"),
        size: audio.size,
        type: audio.type
      }).fetch();

      // save the req so that we can update it later from GCP
      // we're not using this at all
      this.req.session.audioID = savedAudio.id;

      // before you blast, get the text of the audio from google to aid in
      // ... translating multiple socket request from the frontend
      let text = await sails.helpers.translateAudio2Text.with({
        id: savedAudio.id
      });
      // if the text was successfully generated
      if (text) {
        // Update the text to match the resulting audio
        var zed = await Audio.updateOne({ id: savedAudio.id }).set({
          text: text
        });
        // if the audio was updated successfully
        if (zed) {
          // Then we can now notify the `Channels` that they can now ..
          // ... request thier langauage equivalent :()
          sails.sockets.blast("new audio", savedAudio);
        } // </zed>
      } //</if>
      // All done.
      return savedAudio;
    } else return;
  }
};
