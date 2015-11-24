const currencyCodes = {
  GBP: '£',
  USD: '$'
};

/**
 * Take a ISO 3 letter country code and return its currency symbol
 * @param {String} code  Country code
 * @return {String}      Currency symbol
 */
function codeToSymbol(code) {
  return currencyCodes[code];
}

export default {codeToSymbol};
