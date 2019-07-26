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
      description: "The user has been created and has been assigned tunnel"
    },
    invalid: {
      responseType: "badRequest",
      description: "The user already exist, logged him in",
      extendedDescription:
        "If this request was sent from a graphical user interface, the request " +
        "parameters should have been validated/coerced _before_ they were sent."
    },

    userExist: {
      statusCode: 409,
      description: "Some provided details are already in use."
    }
  },

  fn: async function(inputs) {
    var username = inputs.username.toLowerCase().trim();
    const randomFromName = require("randomatic")("?", 4, { chars: username });

    var user = await User.create({
      username: username,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      lang: inputs.lang,
      tunnel: randomFromName
    })
      .intercept("E_UNIQUE", "userExist")
      .intercept({ name: "UsageError" }, "invalid")
      .fetch();

    this.req.session.userId = user.id;
    // All done.
    return user;
  }
};
