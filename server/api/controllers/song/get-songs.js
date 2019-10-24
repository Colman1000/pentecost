module.exports = {
  friendlyName: "Get songs",

  description: "",

  inputs: {},

  exits: {},

  fn: async function(inputs) {
    let songs = await Song.find();
    // All done.
    return songs;
  }
};
