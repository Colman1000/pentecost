module.exports = {
  friendlyName: "Delete song",

  description: "",

  inputs: {
    songId: {
      type: "string",
      required: true
    }
  },

  exits: {},

  fn: async function({ songId }) {
    let song = await Song.findOne(songId);
    try {
      await sails.rm(song.cid);
    } catch(e) {
      sails.log(e)
    }
    // await Song.destroyOne(songId);
    // All done.
    return;
  }
};
