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
      await Song.destroyOne(song.id);
    } catch (e) {
      sails.log.error(e);
    }
    // All done.
    return;
  }
};
