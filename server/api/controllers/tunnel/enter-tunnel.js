module.exports = {
  friendlyName: "Enter tunnel",

  description: "",

  inputs: {
    tunnel: {
      required: true,
      type: "string"
    },
    username: {
      required: true,
      type: "string"
    },
    password: {
      required: true,
      type: "string"
    }
  },

  exits: {
    badCombo: {
      description: `The provided username or password combination does not
      match any user in the database.`,
      statusCode: 409
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    },
    tunnelNotFound: {
      statusCode: 404,
      description:
        "The tunnel can't be found, please make sure you copied the right tunnel name, tunnels are case sensitive"
    }
  },

  fn: async function(inputs) {
    //? IN FUTURE CHANGE THE SUBSCRIPTION TO `ID` INSTEAD OF `USERNAME`

    // Verify that the user exist
    var userRecord = await User.findOne({
      username: inputs.username.toLowerCase().trim()
    });

    // If there was no matching user, respond thru the "badCombo" exit.
    if (!userRecord) {
      throw "badCombo";
    }

    // If the password doesn't match, then also exit thru "badCombo".
    await sails.helpers.passwords
      .checkPassword(inputs.password, userRecord.password)
      .intercept("incorrect", "badCombo");

    // Then look up the channel
    var _tunnel = await User.findOne().where({
      tunnel: inputs.tunnel
    });
    // filter explict result

    if (_tunnel) {
      sails.log.silly(`${userRecord.username} logged into ${_tunnel.username}`);
      // All done.
      // Subcribe to socket event
      sails.sockets.join(this.req, _tunnel.tunnel, __ => {
        sails.log("Subcribed to", _tunnel.tunnel);
      });
      this.req.session.me = userRecord;
      return _.extend(userRecord, { tunnelIn: _tunnel });
    }
    throw "tunnelNotFound";
  }
};
