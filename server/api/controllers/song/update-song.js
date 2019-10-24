module.exports = {
  friendlyName: "Update song",

  description: "",

  inputs: {
    title: {
      required: true,
      type: "string"
    }
  },

  exits: {},

  fn: async function(inputs) {
    let song = await Song.updateOne(this.req.session.songId).set({
      title: inputs.title
    });
    // All done.
    return song;
  }
};
