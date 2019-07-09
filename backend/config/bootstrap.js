/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {
  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  await Channel.destroy({});
  await Channel.createEach([
    { flag: "/svg/en.svg", name: "English", language: "en" },
    { flag: "/svg/es.svg", name: "Russia", language: "ru" },
    { flag: "/svg/de.svg", name: "Espanol", language: "es" }
    // { flag: "/svg/de.svg", name: "French", language: "es" },
    // { flag: "/svg/de.svg", name: "Hebrew", language: "es" },
    // { flag: "/svg/de.svg", name: "Portugese", language: "es" },
    // { flag: "/svg/de.svg", name: "German", language: "es" }

    // etc.
  ]);
  // ```
};
