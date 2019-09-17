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

  // if ((await Channel.count()) > 0) {
  //   return;
  // }
  //
  await Channel.destroy({});
  await Channel.createEach([
    //21 LANGUAGES WITH VOOICE OUTPUT
    { voice: 'en-US', flag: 'us', name: 'English', language: 'en' },
    { voice: 'ru-RU', flag: 'ru', name: 'Russia', language: 'ru' },
    { voice: 'es-ES', flag: 'es', name: 'Espanol', language: 'es' },
    { voice: 'fr-FR', flag: 'fr', name: 'French', language: 'fr' },
    {voice: 'pt-BR',flag: 'pt',name: 'Portugese',language: 'pt'},
    { voice: 'de-DE', flag: 'de', name: 'German', language: 'de' },
    {voice: 'ko-KR',flag: 'kr',name: 'South Korean',language: 'ko'},
    {voice: 'ja-JP',flag: 'jp',name: 'Japanese',language: 'ja'},
    {voice: 'it-IT',flag: 'it',name: 'Italian',language: 'it'},
    {voice: 'ar-XA',flag: 'sa',name: 'Arabic',language: 'ar'},
    {voice: 'hi-IN',flag: 'in',name: 'Hindi',language: 'hi'},
    {voice: 'hu-HU',flag: 'hu',name: 'Hungarian',language: 'hu'},
    {voice: 'id-ID',flag: 'id',name: 'Indonesian',language: 'id'},
    {voice: 'fi-FI',flag: 'fi',name: 'Finnish',language: 'fi'},
    {voice: 'el-GR',flag: 'gr',name: 'Greek',language: 'el'},
    {voice: 'nb-NO',flag: 'no',name: 'Norwegian ',language: 'no'},
    {voice: 'pl-PL',flag: 'pl',name: 'Polish ',language: 'pl'},
    {voice: 'sv-SE',flag: 'se',name: 'Swedish',language: 'sv'},
    {voice: 'tr-TR',flag: 'tr',name: 'Turkish',language: 'tr'},
    {voice: 'uk-UA',flag: 'ua',name: 'Ukrainian ',language: 'uk'},
    {voice: 'vi-VN',flag: 'vn',name: 'Vietnamese',language: 'vi'},

    //30 LANGUAGES WITH NO VOICE OUTPUT
    { noVoiceText: 'Faʻamolemole, e leai se leo o loʻo i ai nei', voice: '', flag: 'ws', name: 'Samoan', language: 'sm'},
    { noVoiceText: 'Uxolo, okwamanje akukho okukhipha izwi', voice: '', flag: 'za', name: 'Zulu', language: 'zu'},
    { noVoiceText: 'Kechirasiz, hozirda ovoz chiqishi yo\'q', voice: '', flag: 'uz', name: 'Uzbek', language: 'uz'},
    { noVoiceText: 'معذرت ، فی الحال کوئی آواز آؤٹ پٹ نہیں ہے۔', voice: '', flag: 'pk', name: 'Urdu', language: 'ur'},
    { noVoiceText: 'ขออภัยไม่มีเสียงในขณะนี้', voice: '', flag: 'th', name: 'Thai', language: 'th'},
    { noVoiceText: 'Waan ka xunnahay, hadda ma jiro soo saar cod ah', voice: '', flag: 'et', name: 'Somali', language: 'so'},
    { noVoiceText: 'කණගාටුයි, දැනට හ voice ප්‍රතිදානයක් නොමැත', voice: '', flag: 'lk', name: 'Sinhala', language: 'si'},
    { noVoiceText: 'Tine hurombo, parizvino hapana kuburitsa izwi', voice: '', flag: 'zw', name: 'Shona', language: 'sn'},
    { noVoiceText: 'Ts\'oarelo, hajoale ha ho na tlhahiso ea lentsoe', voice: '', flag: 'ls', name: 'Sesotho', language: 'st'},
    { noVoiceText: 'Извините, тренутно нема гласа', voice: '', flag: 'ba', name: 'Serbian', language: 'sr'},
    { noVoiceText: 'Ne pare rău, în prezent nu există ieșire vocală', voice: '', flag: 'md', name: 'Romanian', language: 'ro'},
    { noVoiceText: 'ਮੁਆਫ ਕਰਨਾ, ਇਸ ਵੇਲੇ ਕੋਈ ਵੌਇਸ ਆਉਟਪੁਟ ਨਹੀਂ ਹੈ', voice: '', flag: 'pk', name: 'Punjabi', language: 'pa'},
    { noVoiceText: 'متأسفیم ، در حال حاضر خروجی صدا وجود ندارد', voice: '', flag: 'af', name: 'Persian', language: 'fa'},
    { noVoiceText: 'माफ गर्नुहोस्, वर्तमानमा कुनै आवाज आउटपुट छैन', voice: '', flag: 'np', name: 'Nepali', language: 'ne'},
    { noVoiceText: 'Aroha, kaore e puta te whakapiki reo', voice: '', flag: 'nz', name: 'Maori', language: 'mi'},
    { noVoiceText: 'Jiddispjacini, bħalissa m\'hemm l-ebda ħruġ bil-vuċi', voice: '', flag: 'mt', name: 'Maltese', language: 'mt'},
    { noVoiceText: 'Извинете, во моментов нема излезен глас', voice: '', flag: 'mk', name: 'Macedonian', language: 'mk'},
    { noVoiceText: 'Nos paenitet, vox ibi sit amet nulla output', voice: '', flag: 'it', name: 'Latin', language: 'la'},
    { noVoiceText: 'ຂໍໂທດ, ປະຈຸບັນບໍ່ມີຜົນງານອອກສຽງ', voice: '', flag: 'la', name: 'Lao', language: 'lo'},
    { noVoiceText: 'ಕ್ಷಮಿಸಿ, ಪ್ರಸ್ತುತ ಯಾವುದೇ ಧ್ವನಿ ಉತ್ಪಾದನೆ ಇಲ್ಲ', voice: '', flag: 'in', name: 'Kannada', language: 'kn'},
    { noVoiceText: 'Því miður er engin raddúttak', voice: '', flag: 'dk', name: 'Icelandic', language: 'is'},
    { noVoiceText: 'Nažalost, trenutno nema glasa', voice: '', flag: 'hr', name: 'Croatian', language: 'hr'},
    { noVoiceText: 'Sorry, sa pagkakaron wala’y output sa tingog', voice: '', flag: 'ph', name: 'Cebuano', language: 'ceb'},
    { noVoiceText: 'Jammer, daar is tans geen stemuitset nie', voice: '', flag: 'za', name: 'Afrikaans',language: 'af'},
    { noVoiceText: 'Ma binu, lọwọlọwọ isijade ohun ko si',voice: '',flag: 'ng',name: 'Yoruba',language: 'yo'},
    { noVoiceText: 'Ndo, ugbua enweghi mmepụta olu',voice: '',flag: 'ng',name: 'Igbo',language: 'ig'},
    { noVoiceText: 'Yi hakuri, a halin yanzu babu fitowar murya',voice: '',flag: 'ng',name: 'Hausa',language: 'ha'},
    { noVoiceText: '抱歉，目前没有语音输出',voice: '',flag: 'cn',name: 'Chinese',language: 'zh'},
    { noVoiceText: 'סליחה, אין כרגע פלט קולי זמין',voice: '',flag: 'il',name: 'Hebrew',language: 'he'},
    { noVoiceText: 'দুঃখিত, বর্তমানে কোনও ভয়েস আউটপুট উপলব্ধ নেই',voice: '',flag: 'bd',name: 'Bangladesh',language: 'bn'}
  ]);
  // ```
};
