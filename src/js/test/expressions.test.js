
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

describe('addOperator function', function() {
  it('should add a "-" or "+" at the beginning of an empty expr',
    function() {
      expect(e.addOperator('+', '', '')).to.deep.equal(
        {'left': '+', 'right': ''}
      );
      expect(e.addOperator('-', '', '')).to.deep.equal(
        {'left': '-', 'right': ''}
      );
    }
  );

  it('should ignore "*" and "/" at the beginning of an empty expr',
    function() {
      expect(e.addOperator('*', '', '')).to.deep.equal(
        {'left': '', 'right': ''}
      );
      expect(e.addOperator('/', '', '')).to.deep.equal(
        {'left': '', 'right': ''}
      );
    }
  );

  it('should add an operator at the end of left hand expr', function() {
    expect(e.addOperator('*', '(45+23', ')')).to.deep.equal(
      {'left': '(45+23*', 'right': ')'}
    );
    expect(e.addOperator('/', '(23+67)', '')).to.deep.equal(
      {'left': '(23+67)/', 'right': ''}
    );
  });

  it('should replace an operator if last char of left exp is an operator',
    function() {
      expect(e.addOperator('*', '45+', '')).to.deep.equal(
        {'left': '45*', 'right': ''}
      );
      expect(e.addOperator('-', '23+43*', '')).to.deep.equal(
        {'left': '23+43-', 'right': ''}
      );
      expect(e.addOperator('+', '34+24-', '')).to.deep.equal(
        {'left': '34+24+', 'right': ''}
      );
      expect(e.addOperator('/', '89-23*', '')).to.deep.equal(
        {'left': '89-23/', 'right': ''}
      );
    }
  );
});

describe('addParenthesis function', function() {
  it('should add "(" to the left and ")" to the right for empty expr',
    function() {
      expect(e.addParenthesis('(', '', '')).to.deep.equal(
        {'left': '(', 'right': ')'}
      );
    }
  );

  it('should add "(" to the left and ")" to the right after an operator',
    function() {
      expect(e.addParenthesis('(', '34+', '')).to.deep.equal(
        {'left': '34+(', 'right': ')'}
      );
      expect(e.addParenthesis('(', '23*', '')).to.deep.equal(
        {'left': '23*(', 'right': ')'}
      );
      expect(e.addParenthesis('(', '45/', '')).to.deep.equal(
        {'left': '45/(', 'right': ')'}
      );
      expect(e.addParenthesis('(', '-', '')).to.deep.equal(
        {'left': '-(', 'right': ')'}
      );
    }
  );

  it('should allow nesting of parentheses', function() {
    expect(e.addParenthesis('(', '(34+', ')')).to.deep.equal(
      {'left': '(34+(', 'right': '))'}
    );
    expect(e.addParenthesis('(', '23+((', '))')).to.deep.equal(
      {'left': '23+(((', 'right': ')))'}
    );
  });

  it('should move ")" to the left if left expr ends with a number',
    function() {
      expect(e.addParenthesis(')', '(3*(23+4', '))')).to.deep.equal(
        {'left': '(3*(23+4)', 'right': ')'}
      );
    }
  );

  it('should move ")" to the left if left expr ends with ")"', function() {
    expect(e.addParenthesis(')', '(23/(45-3)', ')')).to.deep.equal(
      {'left': '(23/(45-3))', 'right': ''}
    );
  });

  it('should throw error if adding ")" to empty expr', function() {
    expect(function() {
      e.addParenthesis(')', '', '');
    }).to.throw();
  });

  it('should throw error if trying to add unmatched ")"', function() {
    expect(function() {
      e.addParenthesis(')', '23*(43-2)+5', '');
    }).to.throw();
  });

  it('should throw error if adding ")" after an operator', function() {
    expect(function() {
      e.addParenthesis(')', '(34+', ')');
    }).to.throw();
  });

  it('should throw error if adding ")" after a "." without a surrounding digit',
    function() {
      expect(function() {
        e.addParenthesis(')', '(43+.', ')');
      }).to.throw();
    }
  );

  it('should throw error if adding "(" after a number', function() {
    expect(function() {
      e.addParenthesis('(', '24+34', '');
    }).to.throw();
  });
});

describe('replaceExprWithResult function', function() {
  it('should return an expression with the result as left hand side',
    function() {
      expect(e.replaceExprWithResult('34', '((34-43)+21', ')')).to.deep.equal(
        {'left': '34', 'right': ''}
      );
    }
  );
});
