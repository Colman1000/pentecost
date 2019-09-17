module.exports = {
  friendlyName: "Create tunnel",

  description: "",

  inputs: {
    username: {
      required: true,
      type: "string"
    },
    password: {
      required: true,
      type: "string"
    },
    lang: {
      required: true,
      type: "string"
    }
  },

  exits: {
    success: {
      description:
        "The user has been created or found and has been assigned tunnel"
    },
    invalid: {
      responseType: "badRequest",
      description: "The user already exist, logged him in",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent."
    },
    badCombo: {
      description: `The provided username and password combination does not
      match any user in the database.`,
      responseType: "unauthorized"
    }
  },

  fn: async function(inputs) {
    var username = inputs.username.toLowerCase().trim();
    const randomFromName = require("randomatic")("?", 4, { chars: username });

    var _user = await User.findOne({ username: username });

    if (_user) {
      await sails.helpers.passwords
        .checkPassword(inputs.password, _user.password)
        .intercept("incorrect", "badCombo");
    }

    var user = await User.findOrCreate(
      {
        username: username
      },
      {
        username: username,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        lang: inputs.lang,
        tunnel: randomFromName
      }
    ).intercept({ name: "UsageError" }, "invalid");

    // Now update the user language
    await User.updateOne(user.id).set({
      lang: inputs.lang
    });
    // All done.
    return user;
  }
};
