// DOM Bindings
const calculator = document.querySelector('.calc');
const calculatorDisplay = document.querySelector('.calc__display');

calculator.addEventListener('click', handleClick);

let number1 = null;
let number2 = null;
let operand = null;
let result = null;

function handleClick(e) {
  if (!e.target instanceof HTMLButtonElement) return;
  const symbol = e.target.textContent;
  if (!Number.isNaN(Number(symbol))) handleNumber(symbol);
  if ('x/+-'.includes(symbol)) handleOperator(symbol);
  if (symbol === 'AC') handleAC();
  if (symbol === 'CE') handleCE();
  if (symbol === 'DEL') handleDEL();
  if (symbol === '+/-') handleSign();
  if (symbol === '=' && operand) calculate();
  if (symbol === '.') handleDecimal();
}

function handleNumber(input) {
  if (result) result = null;
  if (!operand) {
    if (!number1) {
      number1 = Number(input);
    } else {
      if (Number(input) === 0) {
        number1 = String(number1) + input;
      } else {
        number1 = Number(String(number1) + input);
      }
    }
    display(number1);
  } else {
    if (!number2) {
      number2 = Number(input);
    } else {
      if (Number(input) === 0) {
        number2 = String(number2) + input;
      } else {
        number2 = Number(String(number2) + input);
      }
    }
    display(number2);
  }
}

function handleSign() {
  if (result) return;
  if (!operand) {
    number1 = -number1;
    display(number1);
  } else {
    number2 = -number2;
    display(number2);
  }
}

function handleOperator(symbol) {
  if (
    (symbol === operand && !number2) ||
    (!operand && !number1 && !number2 && !result)
  ) {
    return;
  }

  if (number1 && number2 && operand) {
    calculate();
    operand = symbol;
  }
  if (number1 && number2 && result) {
    number1 = result;
    operand = symbol;
    result = null;
  }
  if (!number2 && !operand) {
    operand = symbol;
  }
  if (result) {
    number1 = result;
    operand = symbol;
    result = null;
  }
  operand = symbol;
}

function calculate() {
  if (number1 === null || number2 === null) return;

  if (operand === '+') {
    result = (number1.toFixed(2) * 100 + number2.toFixed(2) * 100) / 100;
  } else if (operand === '-') {
    result = (number1.toFixed(2) * 100 - number2.toFixed(2) * 100) / 100;
  } else if (operand === '/') {
    result = number1 / number2;
    result = (result.toFixed(2) * 100) / 100;
  } else if (operand === 'x') {
    result = number1 * number2;
    result = (result.toFixed(2) * 100) / 100;
  }
  number1 = number2 = null;
  operand = null;
  display(result);
}

function handleAC() {
  number1 = null;
  number2 = null;
  operand = null;
  result = null;
  display(0);
}

function handleCE() {
  if (!operand) number1 = null;
  else number2 = null;
  display(0);
}

function handleDEL() {
  let strNumber;
  if (result) return;
  if (!operand) {
    strNumber = String(number1);
    number1 = Number(strNumber?.slice(0, -1)) ?? 0;
    display(number1);
  } else {
    strNumber = String(number2);
    number2 = Number(strNumber?.slice(0, -1)) ?? 0;
    display(number2);
  }
}

function handleDecimal() {
  if (!operand) {
    if (Number.isInteger(+number1) || number1 === null) {
      number1 = number1 ? number1 + '.' : '0.';
    }
  } else {
    if (Number.isInteger(+number2) || number2 === null) {
      number2 = number2 ? number2 + '.' : '0.';
    }
  }
}

function display(content) {
  if (Number.isNaN(content)) content = 0;
  calculatorDisplay.textContent = content;
}
