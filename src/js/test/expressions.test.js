
var expect = require('chai').expect;
var e = require('../lib/expressions.js');

describe('addDigitToExpression function', function() {
  it('should append the digit at the end of the left hand side expression',
    function() {
      expect(e.addDigitToExpression('9', '12+', '')).to.deep.equal(
        {'left': '12+9', 'right': ''}
      );
    }
  );

  it('should throw error if last number starts with 0', function() {
    expect(
      function() {
        e.addDigitToExpression('8', '34+0', '');
      }
    ).to.throw();
  });

  it('should append the digit at the end of the left hand side number',
    function() {
      expect(e.addDigitToExpression('7', '(23+4-9', ')')).to.deep.equal(
        {'left': '(23+4-97', 'right': ')'}
      );
    }
  );
});
