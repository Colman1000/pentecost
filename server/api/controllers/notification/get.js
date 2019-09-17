module.exports = {
  friendlyName: "Get Notification",

  description: "Returns all the available Pentecost Notifications for Today",

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
    start.setHours(0,0,0,0);

    const notifs = await Notification.find({
      where:{
        createdAt:{
          $gte: start
        }
      },
      select: ['subject', 'desc', 'lang']
    });

    const translate_subject_and_desc  = async (arr = [], fromLang = 'en') => ({
      subject: await sails.helpers.translateText2ForeignText({
        text: arr[0],
        from: fromLang,
        to: inputs.lang
      }),
      desc: await sails.helpers.translateText2ForeignText({
        text: arr[1],
        from: fromLang,
        to: inputs.lang
      })
      });

    return notifs.map(async (notif) => await translate_subject_and_desc([notif.subject, notif.desc], notif.lang));
  }
};
