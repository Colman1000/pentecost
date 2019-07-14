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
  if ((await Channel.count()) > 0) {
    return;
  }
  //
  await Channel.destroy({});
  await Channel.createEach([
    { flag: "/svg/en.svg", name: "English", language: "en" },
    { flag: "/svg/russia.svg", name: "Russia", language: "ru" },
    { flag: "/svg/es.svg", name: "Espanol", language: "es" },
    { flag: "/svg/france.svg", name: "French", language: "fr" },
    { flag: "/svg/israel.svg", name: "Hebrew", language: "he" },
    { flag: "/svg/portugal.svg", name: "Portugese", language: "pt" },
    { flag: "/svg/de.svg", name: "German", language: "de" },
    { flag: "/svg/china.svg", name: "China", language: "ch" },
    { flag: "/svg/italy.svg", name: "Italy", language: "it" }

    // etc.
  ]);
  // ```
};
