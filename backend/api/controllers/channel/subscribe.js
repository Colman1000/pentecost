module.exports = {
  friendlyName: "Subscribe",

  description: "Subscribe channel.",

  inputs: {
    id: {
      type: "string",
      required: true
    }
  },

  exits: {
    notFound: {
      responseType: "notfound",
      description: "The channel could not be found"
    },
    protocolNotAllowed: {
      responseType: "protocolNotAllowed",
      description: "Only a socket request is allowed"
    }
  },

  fn: async function(inputs) {
    if (!this.req.isSocket) {
      throw "protocolNotAllowed";
    }
    var channel = await Channel.findOne().where({ id: inputs.id });
    if (!channel) throw "notFound";
    // Have the socket which made the request join the "funSockets" room.
    sails.sockets.join(this.req, channel.name);

    sails.log.silly("Joined", channel.name);

    sails.sockets.broadcast(channel.name, "rotciv", channel, this.req);

    sails.log.silly("Blasted", channel.name);
    // All done.
    return channel;
  }
};
