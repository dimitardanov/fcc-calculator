var symbols = require('../data/data.js').revSymbols;
var replacer = require('../helpers/helpers.js').exprReplacer;

function expression(leftHTML, rightHTML, e) {
  var left = replacer(e.left, symbols);
  var right = replacer(e.right, symbols);
  leftHTML.innerHTML = left;
  rightHTML.innerHTML = right;
}

function result(tag, r) {
  tag.textContent = r;
}

module.exports = {
  expression: expression,
  result: result
};
