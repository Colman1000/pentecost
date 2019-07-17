module.exports = {
  friendlyName: "Get channels",

  description: "Returns all the available pentecost channels",

  inputs: {},

  exits: {},

  fn: async function(inputs) {
    var channels = await Channel.find();
    // All done.
    return channels;
  }
};
