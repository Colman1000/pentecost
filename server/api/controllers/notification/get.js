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

    const translate_subject_desc  = async (arr = [], fromLang) => ({
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
      })
    ;


    const notifTrans8Promises = notifs.map( )
    //TODO: TRANSLATE B4 SENDING........

  }
};
