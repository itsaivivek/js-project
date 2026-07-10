const btnContainer = document.querySelector(".buttonContainer")
const display = document.querySelector(".display")

const themeSelect = document.querySelector('#themeSelect')

// sync the dropdown interface with saved localstorage option
function syncDropdownUI() {
    const currentSaved = localStorage.getItem('theme') || 'system'
    themeSelect.value = currentSaved;
}


// Manage theme visibility
function updateThemeVisibility() {
    const selectedMode = themeSelect.value;
    localStorage.setItem('theme', selectedMode)

    if (selectedMode === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (selectedMode === 'light') {
        document.documentElement.classList.remove('dark');
    }
    else {
        // if system is active then select system preference
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', systemDark);
    }

}


function getPrecedence(char) {
    if (char === '/' || char === '*') return 2;
    if (char === '+' || char === '-') return 1;
    return 0;
}

function infixToPostfix(string) {
    let savedOperator = ['+', '-', '*', '/'];
    let postfixStack = [];
    let operatorStack = [];

    // it will convert the string into array which can have multidigit number and also support decimal number
    let tokens = string.match(/\d+\.\d+|\d+|\.|[\+\-\*\/]/g) || [];

    for (const token of tokens) {

        if (savedOperator.includes(token)) {
            // Pop operators with higher or equal precedence to the postfix output
            while (
                operatorStack.length > 0 &&
                getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)
            ) {
                postfixStack.push(operatorStack.pop());
            }
            operatorStack.push(token);
        } else {
            postfixStack.push(token); // Push the full number string eg "55"
        }
    }

    // Pop all remaining operators left in the stack
    while (operatorStack.length > 0) {
        postfixStack.push(operatorStack.pop());
    }
    return postfixStack;
}

function calculateTotal(infixString) {
    // Convert display symbols (×, ÷, ·) into standard calculation characters (*, /, .)
    let cleanedString = infixString
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/·/g, '.');

    let postfixArray = infixToPostfix(cleanedString)
    let operators = ['+', '-', '*', '/'];

    let result = [];
    let a, b;

    postfixArray.forEach((e) => {

        if ((operators.includes(e))) {
            b = result.pop() // poping second number
            a = result.pop() // poping first number

            switch (e) {
                case '+':
                    result.push(a + b)
                    break;

                case '-':
                    result.push(a - b)
                    break;

                case '/':
                    result.push(a / b)
                    break;

                case '*':
                    result.push(a * b)
                    break;

                default:
                    break;
            }
        }
        else {
            // If it is not an operator, parse it as a number and push once
            result.push(parseFloat(e));

        }
    }
    )

    // Return string formatted gracefully, or default to empty if calculation fails
    return result[0] !== undefined ? String(parseFloat(result[0].toFixed(9))) : "";
}


function main() {
    syncDropdownUI()

    // 2. Refresh initial class state based on current select values
    updateThemeVisibility();

    // listen for manual dropdown
    themeSelect.addEventListener('change', updateThemeVisibility)

    // listen for system theme in background
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // if user selected sytem then only adjust UI 
        if (themeSelect.value === 'system') {
            document.documentElement.classList.toggle('dark', e.matches)
        }
    }
    )



    // Event delegation for btn
    btnContainer.addEventListener('click', (event) => {
        let btn = event.target.closest('.btn')

        // Protects against console crashes when clicking grid gaps
        if (!btn) return;

        btn.classList.add('active-click');

        setTimeout(() => {
            btn.classList.remove('active-click');
        }, 100); // Matches the 0.15s transition time in CSS


        // if btn is not equalsto then push into display
        if (!(btn.classList.contains('specialOperator'))) {
            display.textContent += btn.textContent;
        }
        else {
            if (btn.value === 'allClear') {
                display.textContent = ''
            }
            else if (btn.value == 'clear') {
                display.textContent = display.textContent.slice(0, -1)
            }
            else if (btn.value == 'equals') {
                display.textContent = calculateTotal(display.textContent)
            }

        }

    }
    )
}

main()