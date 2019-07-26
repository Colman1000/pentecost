module.exports = {
  friendlyName: "Upload speech",

  description: "",

  inputs: {
    lang: {
      type: "string",
      required: false
    },
    speech: {
      type: "string",
      required: false
    },
    to: {
      //! this may be stale
      type: "string",
      required: false
    },
    from: {
      type: "ref",
      example: ` { lang:"en", id:"" } `,
      required: false
    }
  },

  exits: {},

  fn: async function(inputs) {
    sails.log(inputs);
    var to = await User.findOne({ id: inputs.to });

    var translatedTranscript = await sails.helpers.translateText2ForeignText.with(
      {
        text: inputs.speech,
        to: inputs.lang.split("-")[0], // get recivers language
        from: inputs.from.lang.split("-")[0]
      }
    );

    let broadcasting = {
      from: inputs.from.id || sails.sockets.getId(this.req),
      speech: translatedTranscript
    };
    sails.log.info("broadcasting with", broadcasting);
    sails.sockets.broadcast(to.tunnel, broadcasting);

    // All done.
    return;
  }
};
