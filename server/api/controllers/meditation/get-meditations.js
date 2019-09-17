module.exports = {
  friendlyName: "Get Meditations",

  description: "Returns all the available Pentecost Meditations",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    var channels = await Channel.find();
    // All done.
    return channels;
  }
};
