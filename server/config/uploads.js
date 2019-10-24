module.exports.uploads = {
  // adapter: require("skipper-disk"),
  // dirname: "/srv/pentecost"
  adapter: require("skipper-gclouds"),
  keyFilename: require("path").resolve(
    __dirname,
    "./credentials/vigilant-guru-245610-88e15341e446.json"
  ),
  bucket: "thepentecost",
  //Are files uplodaded public?
  public: true
};
