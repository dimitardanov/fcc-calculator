var revObj = require('../helpers/helpers.js').reverseKeyValuePairs;
var replacer = require('../helpers/helpers.js').exprReplacer;
var expect = require('chai').expect;

describe('reverseKeyValuePairs function', function() {
  it('should swap the key-value pairs for object', function() {
    var obj = {'key1': 'val1', 'key2': 'val2'};
    var expobj = {'val1': 'key1', 'val2': 'key2'};
    expect(revObj(obj)).to.deep.equal(expobj);
  });

  it('should return {} if given {}', function() {
    expect(revObj({})).to.be.empty;
  });
});

describe('exprReplacer function', function() {
  before(function() {
    this.substObj = {
      'a': 'z',
      'b': 'y'
    };
    this.str = 'a1';
  });

  after(function() {
    delete this.substObj;
    delete this.str;
  });

  it('should replace a single character in a given string', function() {
    expect(replacer(this.str, this.substObj)).to.equal('z1');
  });
});
