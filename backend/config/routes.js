/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  "GET / ": { action: "test" },
  "POST /api/v1/audio/upload": { action: "audio/upload" },
  "GET /api/v1/audio/download/:id": { action: "audio/download" },

  //   GET ALL AUDIO'S WITH INPUT TIME
  "GET /api/v1/audios/:time": {
    action: "audio/find",
    isSocket: true
  },
  "DELETE /api/v1/audio/:id": { action: "audio/delete" },

  "POST /api/v1/audio/get-audio-text": {
    action: "audio/get-audio-text",
    isSocket: true
  },

  //   MEMBERS ARENA
  // SET THE USERS PREFERED LANGAUGE
  "POST /api/v1/member/set-language": {
    action: "member/set-language",
    isSocket: true,
    cors: "*"
  }
};
