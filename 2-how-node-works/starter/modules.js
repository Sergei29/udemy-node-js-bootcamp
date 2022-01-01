// console.log(arguments);
console.log(require("module").wrapper);
const Calculator = require("./test-module-1");
const { add, multiply } = require("./test-module-2");

const calc = new Calculator();

console.log(calc.add(2, 3));
console.log(multiply(2, 3));
