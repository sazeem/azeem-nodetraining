const chai = require('chai');
const assert = chai.assert;
const obj = require('./secondLargest');
const secondLargest = obj.secondLargest;

describe('findSecondLargest', function() {

  it('Should Find Second Largest Element', function() {    
    const array = [1,2,3,4,5,6,7];
    const value = secondLargest(array);
    assert.equal(value, 7);
  });
});

