module.exports = {
  friendlyName: "Broadcast Message",

  description: "Begin the translation proccess and blast the channels",

  inputs: {
    audioId: {
      type: "string",
      required: true
    },
    channelId: {
      type: "string",
      required: true
    }
  },

  exits: {},

  fn: async function(inputs) {
    sails.log();
    if (inputs.channelId == "undefined") return;
    var chan = await Channel.findOne({ id: inputs.channelId });
    let text = await sails.helpers.translateAudio2Text.with({
      id: inputs.audioId
    });
    sails.log(chan.name);
    sails.sockets.broadcast(chan.name, "rotciv", text, this.req);
    // All done.
    return chan;
  }
};
