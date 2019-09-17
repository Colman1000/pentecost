module.exports = {
  friendlyName: 'Get Meditations',

  description: 'Returns all the available Pentecost Meditations',

  inputs: {
    lang: {
      required: true,
      type: 'string'
    }
  },

  exits: {},

  fn: async function (inputs) {
    // All done.

    //start of today
    let start = new Date();
    start.setHours(0, 0, 0, 0);

    const meditations = await Meditation.find({
      where: {
        createdAt: {
          $gte: start
        }
      },
      select: ['note', 'interval', 'lang']
    });

    const meds = meditations.map(async (meditation) => await sails.helpers.translateText2ForeignText({
      text: meditation.note,
      from: meditation.lang,
      to: inputs.lang,
    }));

    if(meds.length < 1) return [];

    return {meditations : meds, interval: meditations[0].interval }
  }
};
