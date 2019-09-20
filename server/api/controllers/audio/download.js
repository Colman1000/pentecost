module.exports = {
  friendlyName: "Download audio",

  description: "Download audio file (returning a stream).",

  inputs: {
    id: {
      description: "The id of the item whose audio we're downloading.",
      type: "number",
      required: true
    }
  },

  exits: {
    success: {
      outputDescription: "The streaming bytes of the specified thing's audio.",
      outputType: "ref"
    },
    forbidden: { responseType: "forbidden" },
    notFound: { responseType: "notFound" }
  },

  fn: async function(inputs) {
    var audio = await Audio.findOne().where({
      id: inputs.id
    });

    if (!audio || _.isEmpty(audio)) {
      throw "notFound";
    }

    this.res.type(audio.type);

    var downloading = await sails.startDownload(audio.fd);

    return downloading; // All done.
  }
};
