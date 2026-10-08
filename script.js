let currentOperand = '';
let previousOperand = '';
let operation = null;

function updateDisplay() {
    const display = document.getElementById('displayText');
    const opDisplay = document.getElementById('displayOperation');

    // update main text
    if (currentOperand !== '') {
        display.innerText = currentOperand;
    }
    else {
        display.innerText = '0';
    }

    // update operator display 
    if (operation !== null) {
        opDisplay.innerText = operation;
    }
    else {
        opDisplay.innerText = '=';
    }
}

// display new number 
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;

    if (number === '.' && currentOperand === '') {
        currentOperand = '0.';
        updateDisplay();
        return;
    }

    currentOperand += number;
    updateDisplay();
}

// display new operator
function chooseOperator(op) {
    if (currentOperand === '' && previousOperand === '') return;

    // if operator changes
    if (currentOperand === '' && previousOperand !== '') {
        operation = chooseOperator();
        updateDisplay();
        return;
    }

    if (previousOperand !== '') {
        computeResult();
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// clear 
function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

// arithmatic 
function computeResult() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero.");
                clearDisplay();
                return;
            }

            computation = prev + current;
            break;
        default:
            return;        
    }

    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}