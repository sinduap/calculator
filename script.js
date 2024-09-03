// DOM Bindings
const calculator = document.querySelector('.calc');
const calculatorDisplay = document.querySelector('.calc__display');

calculator.addEventListener('click', handleClick);

let number1 = null;
let number2 = null;
let operator = null;
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
  if (symbol === '=' && operator) calculate();
  if (symbol === '.') handleDecimal();
}

function handleNumber(input) {
  if (result) result = null;
  if (!operator) {
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
  if (!operator) {
    number1 = -number1;
    display(number1);
  } else {
    number2 = -number2;
    display(number2);
  }
}

function handleOperator(symbol) {
  if (
    (symbol === operator && !number2) ||
    (!operator && !number1 && !number2 && !result)
  ) {
    return;
  }

  if (number1 && number2 && operator) {
    calculate();
    operator = symbol;
  }
  if (number1 && number2 && result) {
    number1 = result;
    operator = symbol;
    result = null;
  }
  if (!number2 && !operator) {
    operator = symbol;
  }
  if (result) {
    number1 = result;
    operator = symbol;
    result = null;
  }
  operator = symbol;
}

function calculate() {
  if (number1 === null || number2 === null) return;

  if (operator === '+') {
    result = (number1.toFixed(2) * 100 + number2.toFixed(2) * 100) / 100;
  } else if (operator === '-') {
    result = (number1.toFixed(2) * 100 - number2.toFixed(2) * 100) / 100;
  } else if (operator === '/') {
    result = number1 / number2;
    result = (result.toFixed(2) * 100) / 100;
  } else if (operator === 'x') {
    result = number1 * number2;
    result = (result.toFixed(2) * 100) / 100;
  }
  number1 = number2 = null;
  operator = null;
  display(result);
}

function handleAC() {
  number1 = null;
  number2 = null;
  operator = null;
  result = null;
  display(0);
}

function handleCE() {
  if (!operator) number1 = null;
  else number2 = null;
  display(0);
}

function handleDEL() {
  let strNumber;
  if (result) return;
  if (!operator) {
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
  if (!operator) {
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
