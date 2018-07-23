const chai = require('chai');
const assert = chai.assert;
const obj = require('./calculateFrequency');
const calculateFrequency = obj.calculateFrequency;

describe('The function CalculateFrequency', function() {

  it('Should Find the Frequency of each alphabet in the string.', function() {    
    const input = "shali is running fast";
    const result = JSON.stringify(calculateFrequency(input));
    assert.equal(result, '{"s":3,"h":1,"a":2,"l":1,"i":3,"r":1,"u":1,"n":3,"g":1,"f":1,"t":1}');
  });
});
