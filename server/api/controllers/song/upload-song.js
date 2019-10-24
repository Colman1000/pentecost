module.exports = {
  friendlyName: "Upload songs",

  description: "",

  files: ["song"],
  inputs: {
    title: {
      type: "string",
      required: true
    },
    song: {
      required: true,
      type: "ref"
    }
  },

  exits: {
    success: {
      outputDescription: "The newly created `Song`.",
      outputExample: {}
    },

    noFileAttached: {
      description: "No file was attached.",
      responseType: "badRequest"
    },

    tooBig: {
      description: "The file is too big.",
      responseType: "badRequest"
    }
  },

  fn: async function({ song, title }) {
    var util = require("util");

    // Upload the image.
    var info = await sails
      .uploadOne(song, {
        // maxBytes: 3000000,
        adapter: require("skipper-s3"),
        key: "thekyehthethaeiaghadkthtekey",
        secret: "AB2g1939eaGAdesoccertournament",
        bucket: "pentecost"
      })
      // Note: E_EXCEEDS_UPLOAD_LIMIT is the error code for exceeding
      // `maxBytes` for both skipper-disk and skipper-s3.
      .intercept("E_EXCEEDS_UPLOAD_LIMIT", "tooBig")
      .intercept(
        err => new Error("The song upload failed: " + util.inspect(err))
      );

    if (!info) {
      throw "noFileAttached";
    }

    song = await Song.create({
      title: title,
      src: info.fd,
      size: info.size
    }).fetch();

    this.req.session.songId = song.id;
    // All done.
    return song;
  }
};
