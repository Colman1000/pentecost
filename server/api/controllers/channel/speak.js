module.exports = {
  friendlyName: "Speak",

  description: "Speak channel.",

  inputs: {
    text: {
      required: true,
      type: "string"
    },
    locale: {
      required: true,
      type: "string"
    }
  },

  exits: {},

  fn: async function (inputs) {
    sails.log.silly("Speaking with", this.req.session.ssmlGender);

    console.log({
      locale: inputs.locale,
      text: inputs.text,
      gender: this.req.session.ssmlGender
    })


    var spoken = await sails.helpers.translateText2Speech.with({
      locale: inputs.locale,
      text: inputs.text,
      gender: this.req.session.ssmlGender
    });

    // All done.
    return spoken;
  }
};
