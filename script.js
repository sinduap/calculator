// DOM Bindings
const calculator = document.querySelector('.calc');
const display = document.querySelector('.calc__display');

let number1, number2, operand;

function processNumber(input) {
  if (!operand) {
    if (!number1 && input === '.') number1 = '0';
    number1 = (number1 || '').concat(input);
    printDisplay(number1);
  } else if (operand) {
    if (!number2 && input === '.') number2 = '0';
    number2 = (number2 || '').concat(input);
    printDisplay(number2);
  }
}

function processCalculate(n1, n2, op) {
  if (op === '+') {
    number1 = Number(n1) + Number(n2) + '';
  } else if (op === '-') {
    number1 = Number(n1) - Number(n2) + '';
  } else if (op === '/') {
    number1 = Number(n1) / Number(n2) + '';
  } else if (op === 'x') {
    number1 = Number(n1) * Number(n2) + '';
  }
  number2 = '';
  operand = '';
  printDisplay(number1);
}

function printDisplay(content) {
  content = content + '';
  let decimals;
  if (content.includes('.')) {
    [content, decimals] = content.split('.');
    decimals = decimals.slice(0, 2);
    content += '.' + decimals;
  }
  display.textContent = content;
}

function handleClick(e) {
  if (!e.target instanceof HTMLButtonElement) return;
  const symbol = e.target.textContent;
  if (!Number.isNaN(Number(symbol)) || symbol === '.') processNumber(symbol);
  if ('x/+-'.includes(symbol)) operand = symbol;
  if (symbol === '=') processCalculate(number1, number2, operand);
  if (symbol === 'AC') {
    number1 = number2 = operand = '';
    printDisplay('0');
  }
  if (symbol === 'CE') {
    if (!operand) number1 = '';
    else number2 = '';
    printDisplay('0');
  }
  if (symbol === 'DEL') {
    if (!operand) {
      number1 = number1?.slice(0, -1) || '0';
      printDisplay(number1);
    } else {
      number2 = number2?.slice(0, -1) || '0';
      printDisplay(number2);
    }
  }
}

calculator.addEventListener('click', handleClick);
