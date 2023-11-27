const generateFinalToken = require("../utils/token_gen");

function constructTranslationUrl({
  translateFrom,
  translateTo,
  generatedToken,
}) {
  const baseUrl = "https://translate.googleapis.com/translate_a/t";
  const queryParams = new URLSearchParams({
    client: "te",
    v: "1.0",
    sl: translateFrom,
    tl: translateTo,
    tk: generatedToken,
  });

  return `${baseUrl}?${queryParams.toString()}`;
}

function getHeaders() {
  const headers = new Headers();
  headers.append("accept", "*/*");
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  return headers;
}

function getEncodedBody({ phrases }) {
  const urlencodedBody = new URLSearchParams();
  phrases.forEach((phrase) => urlencodedBody.append("q", phrase));
  return urlencodedBody;
}
async function translateText({
  listOfWordsToTranslate,
  translateFrom = "en",
  translateTo = "en",
}) {
  var _result = listOfWordsToTranslate.map((originalPhrase, index) => ({
    original: originalPhrase,
    translation: originalPhrase,
  }));
  if (translateFrom === translateTo) {
    return _result;
  }
  var generatedToken = generateFinalToken(listOfWordsToTranslate);

  const url = constructTranslationUrl({
    generatedToken: generatedToken,
    translateFrom: translateFrom,
    translateTo: translateTo,
  });

  const headers = getHeaders();
  const urlencodedBody = getEncodedBody({
    phrases: listOfWordsToTranslate,
  });
  // Create requestOptions
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: urlencodedBody,
    redirect: "follow",
  };

  try {
    const response = await fetch(url, requestOptions);
    var result = await response.json();
    _result = listOfWordsToTranslate.map((originalPhrase, index) => ({
      original: originalPhrase,
      translation: result[index].length == 0 ? originalPhrase : result[index],
    }));
  } catch (error) {
    console.error("Error:", error);
  }
  return _result;
}

module.exports = translateText;
