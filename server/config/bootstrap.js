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

  // await Translation.destroy({});

  if ((await Channel.count()) > 0) {
    return;
  }
  //
  await Channel.destroy({});
  await Channel.createEach([
    { voice: "en-US", flag: "/svg/en.svg", name: "English", language: "en" },
    { voice: "ru-RU", flag: "/svg/russia.svg", name: "Russia", language: "ru" },
    { voice: "es-ES", flag: "/svg/es.svg", name: "Espanol", language: "es" },
    { voice: "fr-FR", flag: "/svg/france.svg", name: "French", language: "fr" },
    {
      voice: "pt-BR",
      flag: "/svg/portugal.svg",
      name: "Portugese",
      language: "pt"
    },
    { voice: "de-DE", flag: "/svg/de.svg", name: "German", language: "de" },
    {
      voice: "ko-KR",
      flag: "/svg/south-korea.svg",
      name: "South Korea",
      language: "ko"
    },
    {
      voice: "ja-JP",
      flag: "/svg/japan.svg",
      name: "Japan",
      language: "ja"
    },
    {
      voice: "it-IT",
      flag: "/svg/italy.svg",
      name: "Italy",
      language: "it"
    },

    //! NO VOICE OUTPUT
    {
      noVoiceText: "抱歉，目前没有语音输出",
      voice: "",
      flag: "/svg/china.svg",
      name: "China",
      language: "zh"
    },
    {
      noVoiceText: "סליחה, אין כרגע פלט קולי זמין",
      voice: "",
      flag: "/svg/israel.svg",
      name: "Hebrew",
      language: "he"
    },
    {
      noVoiceText: "xin lỗi, hiện tại không có đầu ra giọng nói",
      voice: "",
      flag: "/svg/vietnam.svg",
      name: "vietnam",
      language: "vi"
    }

    // etc.
  ]);
  // ```
};
