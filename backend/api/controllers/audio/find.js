module.exports = {
  friendlyName: "Find",

  description: "Find audio.",

  inputs: {
    time: {
      type: "number",
      required: true,
      description: "The current timestamp of audios you want to retrieve"
    },
    limit: {
      type: "number",
      required: false,
      description: "The limit of audios to be retrieved"
    }
  },

  exits: {
    noTimeFound: {
      responseType: "",
      description: "No audios in this current `time` provided"
    }
  },

  fn: async function(inputs) {
    var allAudiosThatFellInTime = await Audio.find({
      createdAt: inputs.time
    });

    if (_.isEmpty(allAudiosThatFellInTime)) {
      // throw "noTimeFound";
      allAudiosThatFellInTime = await Audio.find({});
    }

    sails.sockets.blast("new audio", allAudiosThatFellInTime);
    // All done.
    return allAudiosThatFellInTime;
  }
};
