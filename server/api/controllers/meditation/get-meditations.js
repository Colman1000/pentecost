module.exports = {
  friendlyName: "Get Meditations",

  description: "Returns all the available Pentecost Meditations",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    // All done.

    //start of today
    let start = new Date();
    start.setHours(0,0,0,0);

    return await Meditation.find({
      where:{
        createdAt:{
          $gte: start
        }
      },
      select: ['note', 'interval']
    });

    //TODO: TRANSLATE B4 SENDING........
  }
};
