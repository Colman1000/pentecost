module.exports = {
  friendlyName: "Find",

  description: "Find audio.",

  inputs: {
    time: {
      type: "number",
      required: false,
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
      statusCode: 404,
      description: "No audios in this current `time` provided"
    }
  },

  fn: async function(inputs) {
    // var moment = require("moment");
    var allAudiosThatFellInTime = await Audio.find({
      createdAt: {
        ">": 1 // moment should be here
      }
    }).sort("createdAt DESC");

    if (_.isEmpty(allAudiosThatFellInTime)) {
      throw "noTimeFound";
    }

    // sails.sockets.blast("new audio", allAudiosThatFellInTime);
    // All done.
    return allAudiosThatFellInTime;
  }
};
