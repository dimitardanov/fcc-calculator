
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
  // TODO: Come up with a more elegant and robust solution
  Object.keys(replaceObj).forEach(function(key) {
    if (key.match(/[a-z0-9]/)) {
      var regex = new RegExp(key, 'g');
    } else {
      var regex = new RegExp('\\' + key, 'g');
    }
    str = str.replace(regex, replaceObj[key]);
  });
  return str;
}

module.exports = {
  createActionObj: createActionObj,
  reverseKeyValuePairs: reverseKeyValuePairs,
  exprReplacer: exprReplacer
};
