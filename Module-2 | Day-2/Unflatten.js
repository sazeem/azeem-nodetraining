const input = { "flatJSON": false, "i.am.not.so.flat": true, "i.am.not.so.unflat": false, "i.am.a": "tree", "dates.0.day": 1, "dates.1.day": 8947 };
//output = { "flatJSON": false, "i": { "am": { "not": { "so": { "flat": true, "unflat": false } }, "a": "tree" } }, "dates": [ { "day": 1 }, { "day": 8947 } ] };

function Unflatten(flatObject){
	const myarray = Object.keys(flatObject);
  var mykeys = [];
  for(var index = 0; index < myarray.length; index++){
    mykeys.push(myarray[index].split("."));
  }
  console.log(mykeys);
}


Unflatten(input);
// module.exports = {Unflatten};
