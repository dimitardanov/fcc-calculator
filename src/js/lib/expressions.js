
function addDigitToExpression(digit, left, right) {
  return {
    'left': left + digit,
    'right': right
  };
}

function deleteLastChar(left, right) {
  var expr = {
    'left': left,
    'right': right
  };
  if (left.length == 0) {
    return expr;
  } else if (left[left.length - 1] == '(') {
    expr.left = left.slice(0, -1);
    expr.right = right.slice(1);
  } else {
    expr.left = left.slice(0, -1);
  }
  return expr;
}

function resetExpression() {
  return {
    'left': '',
    'right': ''
  };
}

function addOperator(operator, left, right) {
  if (/[\+\-\*\/]$/.test(left)) {
    left = left.slice(0, -1);
  }
  return {
    'left': left + operator,
    'right': right
  };
}

function addParenthesis(paren, left, right) {
  if (paren == '(') {
    left += paren;
    right = ')' + right;
  } else {
    left += right[0] || '';
    right = right.slice(1);
  }
  return {
    'left': left,
    'right': right
  };
}

function replaceExprWithResult(result, left, right) {
  return {
    'left': String(result),
    'right': ''
  };
}

function addDecimal(left, right) {
  return {
    'left': left + '.',
    'right': ''
  };
}

function evaluateExpr(result, left, right) {
  try {
    result = eval(left + right);
  } catch (e) {
    console.error(e);
  }
  return result;
}

module.exports = {
  addDigitToExpression: addDigitToExpression,
  deleteLastChar: deleteLastChar,
  resetExpression: resetExpression,
  addOperator: addOperator,
  addParenthesis: addParenthesis,
  replaceExprWithResult: replaceExprWithResult,
  addDecimal: addDecimal,
  evaluateExpr: evaluateExpr
};
