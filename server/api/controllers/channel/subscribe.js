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

    let socketId = sails.sockets.getId(this.req);
    // Leave the socket before joing back incase the user is refreshing the page
    sails.sockets.leave(this.req, channel.name, done => {
      sails.log.debug(`${socketId} has left ${channel.name}'s channel`);
      sails.sockets.join(this.req, channel.name);
    });
    // Have the socket which made the request join the "Chanel Name" .
    await Channel.updateOne(channel.id).set({
      connectedClients: socketId
    });

    // All done.
    return channel;
  }
};
