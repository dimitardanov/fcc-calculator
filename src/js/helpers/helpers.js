
function createActionObj(key) {
  var actObj = Object.create(null);
  actObj.type = key.getAttribute('data-type') || 'number';
  actObj.value = key.getAttribute('data-value') || key.textContent;
  return actObj;
}

function reverseKeyValuePairs(obj) {
  return Object.keys(obj).reduce(function(acc, key) {
    acc[obj[key]] = key;
    return acc;
  }, {});
}

function exprReplacer(str, replaceObj) {
  var specialChars = /^[\+\-\*\/\(\)\.]/;
  Object.keys(replaceObj).forEach(function(key) {
    var regExStr = key;
    if (specialChars.test(key)) {
      var regExStr = '\\' + regExStr;
    }
    str = str.replace(new RegExp(regExStr, 'g'), replaceObj[key]);
  });
  return str;
}

function matchLastNumber(expr) {
  var regex = /(\d*\.?\d*)$/;
  return expr.match(regex);
}

function isKeyActionable(event) {
  return /([\d\+\-\*\/=\(\)\.])|(Delete)|(Backspace)|(Enter)/.test(event.key);
}

function createKeyActionObj(key) {
  var act = {'value': key};
  if (/[\d]/.test(key)) {
    act.type = 'number';
  } else if (/[\+\-\*\/]/.test(key)) {
    act.type = 'operator';
  } else if (/[\(\)]/.test(key)) {
    act.type = 'function';
  } else if (/[=\.]/.test(key)) {
    act.type = 'symbol';
  } else if (/(Enter)/.test(key)) {
    act.type = 'symbol';
    act.value = '=';
  } else if (/(Delete)/.test(key)) {
    act.type = 'delete';
    act.value = 'clear';
  } else if (/(Backspace)/.test(key)) {
    act.type = 'delete';
    act.value = 'bsp';
  } else {
    throw new Error('Unhandled key: ', key);
  }
  return act;
}

module.exports = {
  createActionObj: createActionObj,
  reverseKeyValuePairs: reverseKeyValuePairs,
  exprReplacer: exprReplacer,
  matchLastNumber: matchLastNumber,
  isKeyActionable: isKeyActionable,
  createKeyActionObj: createKeyActionObj
};
