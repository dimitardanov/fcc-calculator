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
      'b': 'y',
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
      '(': 'lBracket',
      ')': 'rBracket',
      '.': 'dot',
      '=': 'equal'
    };
    this.str = '1avf';
  });

  after(function() {
    delete this.substObj;
    delete this.str;
  });

  it('should replace a non-special character', function() {
    expect(replacer(this.str, this.substObj)).to.equal('1zvf');
  });

  it('should replace special characters', function() {
    expect(replacer('24+56-78*14/90(34)56.43=2dfg123', this.substObj)).to.equal(
      '24add56subtract78multiply14divide90lBracket34rBracket56dot43equal2dfg123'
    );
  });
});
