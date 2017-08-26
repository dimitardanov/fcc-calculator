var matchLastNumber = require('../helpers/helpers.js').matchLastNumber;

function isValidNumber(expr, digit) {
  var match = matchLastNumber(expr);
  if (match[0] == '' && match.index == expr.length && expr.length > 0) {
    // if there is no last number check if last character of the
    // expression is + - * \ or (
    return /[\+\-\*\/\(]$/.test(expr);
  } else if (match[0] == '0') {
    return false;
  }
  return true;
}

module.exports = {
  isValidNumber: isValidNumber
};
