import { supportedLanguages, TranslateLanguageData } from '../'

console.log(Object.keys(supportedLanguages()).length)

TranslateLanguageData({
  listOfWordsToTranslate: ['hello here i am', 'HI hello'],
  fromLanguage: 'en',
  toLanguage: 'pa',
}).then(data => {
  console.log(data)
})
