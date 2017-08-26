
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

describe('deleteLastChar function', function() {
  it('should return empty expression, when given empty expression',
    function() {
      expect(e.deleteLastChar('', '')).to.deep.equal(
        {'left': '', 'right': ''}
      );
    }
  );

  it('should return empty expr if the given expr has a single char',
    function() {
      expect(e.deleteLastChar('4', '')).to.deep.equal(
        {'left': '', 'right': ''}
      );
    }
  );

  it('should delete last character if it is a digit from left expr',
    function() {
      expect(e.deleteLastChar('(23+32', ')')).to.deep.equal(
        {'left': '(23+3', 'right': ')'}
      );
    }
  );

  it('should delete last character if it is an operator from left expr',
    function() {
      expect(e.deleteLastChar('45-', '')).to.deep.equal(
        {'left': '45', 'right': ''}
      );
    }
  );

  it('should move rightmost ")" from the left expr to the right one',
    function() {
      expect(e.deleteLastChar('34+((23+2)', ')')).to.deep.equal(
        {'left': '34+((23+2', 'right': '))'}
      );
    }
  );

  it('should remove the bracket pair, when deleting a "("', function() {
    expect(e.deleteLastChar('65+(23+45*(', '))')).to.deep.equal(
      {'left': '65+(23+45*', 'right': ')'}
    );
  });
});

describe('resetExpression function', function() {
  it('should return an empty expression', function() {
    expect(e.resetExpression()).to.deep.equal({'left': '', 'right': ''});
  });
});
