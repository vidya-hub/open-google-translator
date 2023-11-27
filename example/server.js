const translator = require("../src/index");
console.log(Object.entries(translator.supportedLanguages()).length);
translator
  .TranslateLanguageData({
    listOfWordsToTranslate: ["hello here i am", "HI hello"],
    fromLanguage: "en",
    toLanguage: "pa",
  })
  .then((data) => {
    console.log(data);
  });
