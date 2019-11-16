module.exports.bootstrap = async function () {
  if (await Channel.count() === 0) {
    await Channel.createEach([{
      voice: 'en-US',
      flag: 'us',
      name: 'English',
      language: 'EN'
    },
    {
      voice: 'de-DE',
      flag: 'de',
      name: 'Deutsch',
      language: 'DE'
    },
    {
      voice: 'es-ES',
      flag: 'es',
      name: 'Español',
      language: 'ES'
    },
    {
      voice: 'fr-FR',
      flag: 'fr',
      name: 'Français',
      language: 'FR'
    },
    {
      voice: 'it-IT',
      flag: 'it',
      name: 'Italiano',
      language: 'IT'
    },
    {
      voice: 'pl-PL',
      flag: 'pl',
      name: 'Polski',
      language: 'PL'
    },
    {
      voice: 'pt-BR',
      flag: 'pt',
      name: 'Português',
      language: 'PT'
    },
    {
      voice: 'ru-RU',
      flag: 'ru',
      name: 'русский язык',
      language: 'RU'
    },
    {
      voice: 'nl-NL',
      flag: 'nl',
      name: 'Nederlands',
      language: 'NL'
    },
    ]);
  }
};
