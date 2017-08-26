var checks = require('../lib/checks.js');
var expect = require('chai').expect;

describe('isValidNumber', function() {
  it('should be true for empty expression', function() {
    expect(checks.isValidNumber('', '4')).to.be.true;
  });

  it('should be true for operator ending expression', function() {
    expect(checks.isValidNumber('+', '4')).to.be.true;
    expect(checks.isValidNumber('-', '3')).to.be.true;
    expect(checks.isValidNumber('/', '2')).to.be.true;
    expect(checks.isValidNumber('*', '8')).to.be.true;
  });

  it('should be true following an opening brace', function() {
    expect(checks.isValidNumber('(', '0')).to.be.true;
    expect(checks.isValidNumber('(', '3')).to.be.true;
  });

  it('should be false following a closing brace', function() {
    expect(checks.isValidNumber(')', '3')).to.be.false;
    expect(checks.isValidNumber(')', '0')).to.be.false;
  });

  it('should be false for leading 0 in empty expression', function() {
    expect(checks.isValidNumber('0', '3')).to.be.false;
  });

  it('should be false for leading 0 in non-empty expression', function() {
    expect(checks.isValidNumber('(0', '2')).to.be.false;
    expect(checks.isValidNumber('+0', '2')).to.be.false;
    expect(checks.isValidNumber('-0', '2')).to.be.false;
    expect(checks.isValidNumber('/0', '2')).to.be.false;
    expect(checks.isValidNumber('*0', '2')).to.be.false;
  });

  it('should be true if decimal is present', function() {
    expect(checks.isValidNumber('0.', '0')).to.be.true;
    expect(checks.isValidNumber('.0', '0')).to.be.true;
  });

  it('should be true if 0 is trailing a decimal', function() {
    expect(checks.isValidNumber('3.0', '0')).to.be.true;
  });

  it('should take into account only last number', function() {
    expect(checks.isValidNumber('(3+0', '4')).to.be.false;
    expect(checks.isValidNumber('3+0.', '0')).to.be.true;
    expect(checks.isValidNumber('2+(9', '0')).to.be.true;
    expect(checks.isValidNumber('3(2', '4')).to.be.true;
  });
});
