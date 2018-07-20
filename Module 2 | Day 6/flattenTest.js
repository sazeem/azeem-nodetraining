const chai = require('chai');
const assert = chai.assert;
const obj = require('./flatten');
const flatten = obj.flatten;

describe('The Flat Object', function() {

  it('Should Make Given Object Flat', function() {    
    const object = { "flatJSON": false, "i": { "am": { "not": { "so": { "flat": true, "unflat": false } }, "a": "tree" } }, "dates": [ { "day": 1 }, { "day": 8947 } ] };
    const result = JSON.stringify(flatten(object));
    assert.equal(result, '{"flatJSON":false,"i.am.not.so.flat":true,"i.am.not.so.unflat":false,"i.am.a":"tree","dates.0.day":1,"dates.1.day":8947}');
  });
});

