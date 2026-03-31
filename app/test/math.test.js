const { add, subtract, multiply, divide } = require('../src/math.js');

console.log('Testing math functions...');

console.assert(add(2, 3) === 5, 'add(2, 3) should equal 5');
console.assert(subtract(5, 2) === 3, 'subtract(5, 2) should equal 3');
console.assert(multiply(2, 3) === 6, 'multiply(2, 3) should equal 6');
console.assert(divide(6, 2) === 3, 'divide(6, 2) should equal 3');

console.log('All tests passed!');