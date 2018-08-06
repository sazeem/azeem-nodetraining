const q1 = require('./SecondLargest');
const q2 = require('./CalculateFrequency');
const q3 = require('./Flatten');
const q4 = require('./Unflatten');

const secondLargest = q1.SecondLargest;
const calculateFrequency = q2.CalculateFrequency;
const flatten = q3.Flatten;
const unflatten = q4.Unflatten;

const inp1 = [3,56,7,32,9,14];
const inp2 = "dummy";
const inp3 = { "flatJSON": false, "i": { "am": { "not": { "so": { "flat": true, "unflat": false } }, "a": "tree" } }, "dates": [ { "day": 1 }, { "day": 8947 } ] };

console.log();
console.log("The Output for the input = [3,56,7,32,9,14] to the function SecondLargest is:");
console.log(secondLargest(inp1));
console.log();
console.log("The Output for the input = 'dummy' to the function CalculateFrequency is:");
console.log(calculateFrequency(inp2));
console.log();
console.log('The Output for the input = { "flatJSON": false, "i": { "am": { "not": { "so": { "flat": true, "unflat": false } }, "a": "tree" } }, "dates": [ { "day": 1 }, { "day": 8947 } ] } to the function Flatten is:');
console.log(flatten(inp3));
console.log();
