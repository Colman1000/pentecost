module.exports = {
  friendlyName: "Add Meditations",

  description: "Adds Meditation Notes to DataBase",

  inputs: {
    notes: {
      required: true,
      type: "json"
    },
    interval: {
      required: true,
      type: "number"
    },
    lang: {
      type: "string",
      defaultsTo: "en"
    }
  },

  exits: {},

  fn: async function(inputs) {
    const saveArr = [];
    inputs.notes.forEach(note =>
      saveArr.push({ note: note, interval: inputs.interval })
    );

    await Meditation.createAll(saveArr);

    return true;
  }
};
