module.exports.uploads = {
  // adapter: require("skipper-disk"),
  // dirname: "/srv/pentecost"
  adapter: require("skipper-gclouds"),
  keyFilename: require("path").resolve(
    __dirname,
    "./credentials/first.json"
  ),
  bucket: "emmanueltv",
  //Are files uplodaded public?
  public: true
};
