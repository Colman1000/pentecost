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
    // var p = moment(inputs.time).format("h");
    // var _p = moment(Date.now()).format("h");
    // sails.log.warn(p);
    // sails.log.warn(_p);
    var allAudiosThatFellInTime = await Audio.find({
      createdAt: {
        ">": 100
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
