
var symbols = require('./data/data.js').symbols;
var helpers = require('./helpers/helpers.js');
var expr = require('./lib/expressions.js');
var render = require('./renderers/render.js');

var expression = {
  'left': '',
  'right': ''
};

var result = {
  'value': 0,
  'updated': true
};

var offset = 20;

var bodyHTML = document.querySelector('body');
var keysHTML = document.querySelector('.numpad');
var displayHTML = document.querySelector('.display');
var exprHTML = document.querySelector('#expr');
var exprLeftHTML = document.querySelector('#left');
var exprRightHTML = document.querySelector('#right');
var resultHTML = document.querySelector('#res');

keysHTML.addEventListener('click', function(event) {
  event.stopPropagation();
  event.preventDefault();
  var act = helpers.createActionObj(event.target);
  calculate(act);
});

bodyHTML.addEventListener('keypress', function(event) {
  if (helpers.isKeyActionable(event)) {
    event.preventDefault();
    event.stopPropagation();
    var act = helpers.createKeyActionObj(event.key);
    calculate(act);
  }
});

function calculate(act) {
  try {
    expression = createExpression(act, expression.left, expression.right);
    render.expression(exprLeftHTML, exprRightHTML, expression);
    var width = exprLeftHTML.offsetWidth + exprRightHTML.offsetWidth + offset;
    checkOverflow(displayHTML.offsetWidth, width, exprHTML);
  } catch (e) {
    exprHTML.className = 'warning';
    setTimeout(function() {
      exprHTML.className = '';
    }, 250);
  }
  result = expr.evaluateExpr(result, expression.left, expression.right);
  render.result(resultHTML, result.value);
  if (result.updated) {
    resultHTML.className = '';
  } else {
    resultHTML.className = 'stale';
  }
  console.log('expression: ', expression, 'result: ', result);
}

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

function checkOverflow(containerWidth, elementWidth, element) {
  if (containerWidth > elementWidth) {
    element.className = '';
  } else {
    element.className = 'long';
  }
}
