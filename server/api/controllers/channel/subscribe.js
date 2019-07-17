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
    // Leave the socket before joing back incase the user is refreshing the page
    sails.sockets.leave(this.req, channel.name);
    // Have the socket which made the request join the "Name" room.
    sails.sockets.join(this.req, channel.name);

    // All done.
    return channel;
  }
};
