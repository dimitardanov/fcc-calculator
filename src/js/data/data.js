var reverse = require('../helpers/helpers.js').reverseKeyValuePairs;

var symbols = {
  '&#61;': '=',
  '&#8722;': '-',
  '&#10133;': '+',
  '&#10135;': '/',
  '&#215;': '*',
  '(': '(',
  ')': ')',
  '.': '.'
};

module.exports = {
  symbols: symbols,
  revSymbols: reverse(symbols)
};
