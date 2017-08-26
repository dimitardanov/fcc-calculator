
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

module.exports = {
  createActionObj: createActionObj,
  reverseKeyValuePairs: reverseKeyValuePairs,
  exprReplacer: exprReplacer
};
