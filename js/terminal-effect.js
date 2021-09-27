const terminalInput = ['Software', 'Web', 'Fullstack'];
const TIME_BETWEEN_WORDS = 1000;
const TYPING_SPEED = 120;
const UNDERSCORE_BLINK_SPEED = 400;

function inputTerminalText(inputArray, id = 'terminal-text-input', colors = ['coral']) {
    const terminalElement = document.getElementById('terminal');
    const terminalInputElement = document.getElementById(id);
    let isVisible = true;
    let wordLetterCount = 1;
    let typedLettersCount = 1;
    let waiting = false;
    terminalInputElement.setAttribute('style', 'color:' + colors[0]);
    window.setInterval(function () {
        if (waiting) { return; }
        if (wordLetterCount === 0) {
            waiting = true;
            terminalInputElement.innerHTML = inputArray[0].substring(0, wordLetterCount);
            window.setTimeout(function () {
                colors.push(colors.shift());            // shift between colors
                inputArray.push(inputArray.shift());    // shift between words
                terminalInputElement.setAttribute('style', `color: ${colors[0]}`);

                typedLettersCount = 1;
                wordLetterCount += typedLettersCount;
                waiting = false;
            }, TIME_BETWEEN_WORDS); return;
        }
        if (wordLetterCount === inputArray[0].length + 1) {
            waiting = true;

            window.setTimeout(function () {
                typedLettersCount = -1;
                wordLetterCount += typedLettersCount;
                waiting = false;
            }, TIME_BETWEEN_WORDS);
            return;
        }
        terminalInputElement.innerHTML = inputArray[0].substring(0, wordLetterCount)
        wordLetterCount += typedLettersCount;
    }, TYPING_SPEED)

    window.setInterval(function () {
        if (!isVisible) {
            terminalElement.className = 'terminal-underscore';
            isVisible = true;
            return;
        }
        terminalElement.className = 'terminal-underscore hidden';
        isVisible = false;
    }, UNDERSCORE_BLINK_SPEED)
}

inputTerminalText(terminalInput);