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
  "POST /api/v1/audio/upload": { action: "audio/upload" },
  "GET /api/v1/audio/download/:id": { action: "audio/download" },

  //   GET ALL AUDIO'S WITH INPUT TIME
  "GET /api/v1/audios/:time": {
    action: "audio/find",
    isSocket: true
  },

  "DELETE /api/v1/audio/:id": { action: "audio/delete" },

  "GET /songs": { action: "song/get-songs" },
  "GET /song/:id": { action: "song/stream-song" },
  "POST /song": { action: "song/upload-song" },
  "PATCH /song": { action: "song/update-song" },
  "DELETE /song/:songId": { action: "song/delete-song" },

  "POST /api/v1/audio/get-audio-text": {
    action: "audio/get-audio-text",
    isSocket: true
  }
};
