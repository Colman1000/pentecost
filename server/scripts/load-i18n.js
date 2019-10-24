module.exports = {
  friendlyName: "Get writeup",

  description: "Gets the default writeup for the mobile application",

  inputs: {},

  exits: {},

  fn: async function(inputs) {
    let fs = require("fs");
    const chalk = require("chalk");

    sails.log.info("Getting internalizations...");
    let ns = {
      watchLive: "Watch Live",
      testimony: "Testimony",
      bible: "Holy Bible",
      meditation: "Meditation",
      prayerRequest: "Prayer Request",
      singers: "Songs",
      translation: "Translation",
      contactUs: "Contact Us",
      aboutUs: "About Us",
      media: "Media",
      edify: "Edify",
      selectLanguage: "Select Language",
      // Pages
      prayerRequestText:
        "Send us your prayer request and we will stand steadfastly in faith with you",
      testimonyText:
        "Somebody needs your testimony to help them get out of thier desperate setback",

      indexTitle: "Tap play and get connected by faith in jesus name",

      // Form Body
      fullName: "Full Name",
      emailAddress: "Email Address",
      country: "Country",
      phone: "Phone Number",

      // MISC
      submit: "Submit",
      tellUsYourPrayerRequest: "Tell us your prayer request",
      tellUsYourTestimony: "Tell us your testimony",
      requiredField: "This field is required",

      // Song list
      songList: "Song List",
      songHeaderText:
        "Speaking to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord",

      pageLanguageNotAvailable:
        "Posts translation for your language is not available right now, please open the page in your browser to view translations.",

      amountInUSD: "Amount in USD",
      donateText: "When we give for God's sake, we are reshaping our destiny",
      donateTextBtn: "Donate",
      parntnership: "Partnership",

      // Contact/About
      prayerAndCounseling: "Prayer and counseling",
      testimonyLines: "Testimony Lines",
      informationLines: "Information Lines",
      partnershipLines: "Partnership",
      visitLines: "Visit Lines - (for those in Nigeria)",
      networkLost: "You lost connection to Emmanuel TV servers",
      reconnect: "Re-connect"
    };

    // Main dummy `locale` variable to be used later
    let locales = {};

    // list of languages to get stuff for
    let langs = [
      "sq",
      "af",
      "am",
      "ar",
      "hy",
      "az",
      "eu",
      "be",
      "bn",
      "bs",
      "bg",
      "ca",
      "zh",
      "co",
      "hr",
      "cs",
      "da",
      "nl",
      "en",
      "eo",
      "et",
      "fi",
      "fr",
      "fy",
      "gl",
      "ka",
      "de",
      "el",
      "gu",
      "ht",
      "ha",
      "he",
      "hi",
      "hu",
      "is",
      "ig",
      "id",
      "ga",
      "it",
      "ja",
      // ];
      // // Second batch
      // langs = [
      "kn",
      "kk",
      "km",
      "ko",
      "ku",
      "ky",
      "lo",
      "la",
      "lv",
      "lt",
      "lb",
      "mk",
      "mg",
      "ms",
      "ml",
      "mt",
      "mi",
      "mr",
      "mn",
      "my",
      "ne",
      "no",
      "ny",
      "ps",
      "fa",
      "pl",
      "pt",
      "pa",
      "ro",
      "ru",
      "sm",
      "gd",
      "sr",
      "st",
      "sn",
      "sd",
      "si",
      "sk",
      "sl",
      "so",
      "es",
      "su",
      "sw",
      "sv",
      "tl",
      "tg",
      "ta",
      "te",
      "th",
      "tr",
      "uk",
      "ur",
      "uz",
      "vi",
      "cy",
      "xh",
      "yi",
      "yo",
      "zu"
    ];

    langs = [...new Set(langs)];

    // loop the languages
    sails.log.debug("Running translations..");
    for (let lang of langs) {
      // Assing the current lang to ``
      let currentLanguage = (locales[lang] = {});
      // loop the transcript
      for (let value in ns) {
        try {
          var hook = value;
          var val = ns[value];
          let langPath = "/tmp/tb-locales/" + lang + ".json";

          var existingLang = fs.readFileSync(langPath);
          existingLang = JSON.parse(existingLang.toString());

          // Check if the key exist in it the other existing translation..
          if (existingLang[hook]) {
            // Skip it then..
            continue;
          }

          // if it does not exist yet, run the translation ..
          // sails.log.debug(
          //   `Translating ${chalk.red(ns[value])} -> ${chalk.blue(
          //     val.substring(0, 10)
          //   )}... ${chalk.blue.bold("->")} in ${chalk.red(lang)} ..`
          // );

          currentLanguage[hook] = val;
        } catch (e) {
          throw new Error(
            "Discrepancy Violation: While trying to run transcript script for raw translations " +
              "Somehow, something spookey occured - this should never happen,\n\n here's the stack that will asist you to hunt this culprit \n\n------- \n" +
              e
          );
        }
        let reValue = await sails.helpers.translateText2ForeignText.with({
          text: val,
          from: "en",
          to: lang
        });

        // sails.log(val);
        currentLanguage[hook] = reValue;
        fs.writeFileSync(
          "/tmp/tb-locales/" + lang + ".json",
          JSON.stringify(Object.assign(existingLang, currentLanguage))
        );
      }
    }

    sails.log.info("Getting internalizations done!");
    // All done, return the locales
    return;
  }
};
