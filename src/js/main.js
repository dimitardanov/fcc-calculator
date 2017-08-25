
var symbols = require('./data/data.js').symbols;
var helpers = require('./helpers/helpers.js');
var expr = require('./lib/expressions.js');
var render = require('./renderers/render.js');

var expression = {
  'left': '',
  'right': ''
};

var result = 0;

var keysHTML = document.querySelector('.numpad');
var exprLeftHTML = document.querySelector('#left');
var exprRightHTML = document.querySelector('#right');
var resultHTML = document.querySelector('#res');

keysHTML.addEventListener('click', function(event) {
  event.stopPropagation();
  event.preventDefault();
  var act = helpers.createActionObj(event.target);
  expression = createExpression(act, expression.left, expression.right);
  render.expression(exprLeftHTML, exprRightHTML, expression);
  result = expr.evaluateExpr(result, expression.left, expression.right);
  render.result(resultHTML, result);
  console.log(expression);
});

function createExpression(act, exprLeft, exprRight) {
  var value = symbols[act.value] || act.value;
  switch (act.type) {
    case 'number':
      return expr.addDigitToExpression(value, exprLeft, exprRight);
    case 'delete':
      if (value == 'bsp') {
        return expr.deleteLastChar(exprLeft, exprRight);
      } else if (value == 'clear') {
        return expr.resetExpression();
      }
    case 'operator':
      return expr.addOperator(value, exprLeft, exprRight);
    case 'function':
      if (value == '(' || value == ')') {
        return expr.addParenthesis(value, exprLeft, exprRight);
      }
    case 'symbol':
      if (value == '=') {
        return expr.replaceExprWithResult(result, exprLeft, exprRight);
      } else if (value == '.') {
        return expr.addDecimal(exprLeft, exprRight);
      }
    default:
      throw new Error('Not implemented key handler', act);
  }
}
