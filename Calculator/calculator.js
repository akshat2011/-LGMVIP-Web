// Get the elements
const result = document.getElementById('result');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');
const divide = document.getElementById('divide');
const multiply = document.getElementById('multiply');
const subtract = document.getElementById('subtract');
const add = document.getElementById('add');
const equals = document.getElementById('equals');
const zero = document.getElementById('zero');
const decimal = document.getElementById('decimal');
const numbers = document.querySelectorAll('.grid-item:not(.operator)');
// Initialize variables
let currentOperand = '';
let previousOperand = '';
let currentOperator = null;
let shouldReset = false;
// Add event listeners
clear.addEventListener('click', clearAll);
backspace.addEventListener('click', deleteLastChar);
divide.addEventListener('click', () => setOperator('/'));
multiply.addEventListener('click', () => setOperator('*'));
subtract.addEventListener('click', () => setOperator('-'));
add.addEventListener('click', () => setOperator('+'));
equals.addEventListener('click', calculate);
zero.addEventListener('click', appendNumber);
decimal.addEventListener('click', appendDecimal);
numbers.forEach(number => number.addEventListener('click', appendNumber));
// Helper functions
function clearAll() {
  currentOperand = '';
  previousOperand = '';
  currentOperator = null;
  shouldReset = false;
  updateResult();
}
function deleteLastChar() {
  currentOperand = currentOperand.slice(0, -1);
  updateResult();
}
function setOperator(operator) {
  if (currentOperand === '') {
    return;
  }
  if (previousOperand !== '') {
    calculate();
  }
  currentOperator = operator;
  previousOperand = currentOperand;
  currentOperand = '';
  shouldReset = false;
}
function calculate() {
  if (currentOperator === null || shouldReset) {
    return;
  }
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return;
  }
  let result;
  switch (currentOperator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  previousOperand = '';
  currentOperator = null;
  shouldReset = true;
  updateResult();
}
function appendNumber(event) {
  if (shouldReset) {
    currentOperand = '';
    shouldReset = false;
  }
  const number = event.target.innerText;
  if (number === '0' && currentOperand === '') {
    return;
  } 
  currentOperand += number;
  updateResult();
}
function appendDecimal() {
  if (shouldReset) {
    currentOperand = '';
    shouldReset = false;
  }
  if (currentOperand === '') {
    currentOperand = '0';
  }
  if (currentOperand.includes('.')) {
    return;
  }
  currentOperand += '.';
  updateResult();
}
function updateResult() {
  result.innerText = currentOperand === '' ? '0' : currentOperand;
}
