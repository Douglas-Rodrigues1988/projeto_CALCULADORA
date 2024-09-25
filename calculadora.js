const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('.calculator button'));

let currentInput = '';
let operator = '';
let previousInput = '';

function updateDisplay(value) {
    display.textContent = value || '0';
}

function clearAll() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function appendNumber(number) {
    if (currentInput.length < 10) {
        currentInput += number;
        updateDisplay(currentInput);
    }
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let calculation;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            calculation = prev + curr;
            break;
        case '-':
            calculation = prev - curr;
            break;
        case '*':
            calculation = prev * curr;
            break;
        case '/':
            calculation = prev / curr;
            break;
        default:
            return;
    }
    currentInput = calculation.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function toggleSign() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            clearAll();
        } else if (value === 'CE') {
            clearDisplay();
        } else if (value === '±') {
            toggleSign();
        } else if (value === '=') {
            calculate();
        } else if (['+', '-', '*', '/'].includes(value)) {
            setOperator(value);
        } else {
            appendNumber(value);
        }
    });
});

// Atualiza a exibição inicialmente
updateDisplay();
