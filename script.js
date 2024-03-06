const symbols = ['🍒', '🍋', '🍇', '🍊', '🍉', '🍌'];
const spinButton = document.querySelector('#spinButton');
const winOrLose = document.querySelector('#winOrLose');
const incrementButton = document.querySelector('#incrementBalanceButton');
const decrementButton = document.querySelector('#decrementBalanceButton');
const addBalanceInput = document.querySelector('#amount');
const addBalanceButton = document.querySelector('#addBalanceButton');
const addBalanceBlock = document.querySelector('#addBalanceBlock');
let isSpinning = false;
let intervalIds = [];
let currentBalance = parseFloat(localStorage.getItem('balance'));
const reels = [
    document.querySelector('#reel1'),
    document.querySelector('#reel2'),
    document.querySelector('#reel3'),
    document.querySelector('#reel4'),
    document.querySelector('#reel5'),
    document.querySelector('#reel6'),
    document.querySelector('#reel7'),
    document.querySelector('#reel8'),
    document.querySelector('#reel9'),
];
const styles = {
    color: '#0f0',
    fontSize: '20px',
    loseColor: '#f00',
    fontWeight: '700',
    blueText: '#00f',
};
const reelsSymbols = [];
const costForOneSpin = 300;

window.onload = () => {
    updateReels();
    updateBalanceDisplay();
    toggleAddBalanceBlock();
}

if (isNaN(currentBalance) || currentBalance === 0) {
    currentBalance = 0;
}

function toggleAddBalanceBlock() {
    if (currentBalance === 0 || currentBalance < 5000) {
        addBalanceBlock.style.display = 'flex';
        addBalanceButton.style.display = 'flex';
    } else {
        addBalanceBlock.style.display = 'none';
        addBalanceButton.style.display = 'none';
    }
}

function updateBalanceDisplay() {
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `$${currentBalance.toFixed(2)}`;
}

for (let i = 0; i < reels.length; i++) {
    const savedSymbol = localStorage.getItem(`reel${i}`);
    if (symbols.includes(savedSymbol)) {
        reelsSymbols.push(savedSymbol);
    } else {
        const defaultSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reelsSymbols.push(defaultSymbol);
    }
}

function updateReels() {
    for (let i = 0; i < reels.length; i++) {
        const reel = reels[i];
        const symbol = reelsSymbols[i];
        reel.textContent = symbol;
        localStorage.setItem(`reel${i}`, symbol);
    }
}

function updateBalance(newBalance) {
    currentBalance = newBalance;
    localStorage.setItem('balance', currentBalance);
    updateBalanceDisplay();
}

function spinReel(reel) {
    return setInterval(() => {
        reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    }, 100);
}

function stopReel(_reel, intervalId) {
    clearInterval(intervalId);
}

function checkWin() {
    const symbolsMatch = (reel1, reel2, reel3) =>
        reel1.textContent === reel2.textContent && reel2.textContent === reel3.textContent;

    switch (true) {
        case symbolsMatch(reels[0], reels[1], reels[2]):
            const fruit = reels[0].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win $100!-- 3 x ${fruit}`;
            currentBalance += 100;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(reels[3], reels[4], reels[5]):
            const fruit2 = reels[3].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win $100!-- 3 x ${fruit2}`;
            currentBalance += 100;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(reels[6], reels[7], reels[8]):
            const fruit3 = reels[6].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win $100!-- 3 x ${fruit3}`;
            currentBalance += 100;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(
            reels[0], reels[1], reels[2],
            reels[3], reels[4], reels[5],
            reels[6], reels[7], reels[8]):
            const fruit4 = reels[4].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win the Jackpot! $10.000-- 9 x ${fruit4}`;
            currentBalance += 10_000;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(reels[0], reels[4], reels[8]):
            const fruit5 = reels[0].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win a $200!-- 3 x ${fruit5}`;
            currentBalance += 200;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(reels[0], reels[7], reels[2]):
            const fruit6 = reels[0].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win a $200!-- 3 x ${fruit6}`;
            currentBalance += 200;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(reels[6], reels[4], reels[2]):
            const fruit7 = reels[6].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win a $50!-- 3 x ${fruit7}`;
            currentBalance += 50;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(reels[6], reels[1], reels[8]):
            const fruit8 = reels[6].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win a $50!-- 3 x ${fruit8}`;
            currentBalance += 50;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(reels[3], reels[1], reels[5]):
            const fruit9 = reels[3].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win a $50!-- 3 x ${fruit9}`;
            currentBalance += 50;
            updateBalance(currentBalance);
            break;
        case symbolsMatch(reels[3], reels[7], reels[5]):
            const fruit10 = reels[3].textContent;
            checkWinTime();
            winOrLose.textContent = `Congratulations! You win a $50!-- 3 x ${fruit10}`;
            currentBalance += 50;
            updateBalance(currentBalance);
            break;
        default:
            checkLoseTime();
            winOrLose.style.border = styles.border;
            winOrLose.textContent = 'Try again. No win this time.';
            break;
    }
}

function startSpin() {
    spinButton.disabled = true;
    isSpinning = true;
    intervalIds = [];

    for (let i = 0; i < reels.length; i++) {
        const intervalId = spinReel(reels[i]);
        intervalIds.push(intervalId);
        winOrLose.style.color = styles.blueText;
        winOrLose.style.border = styles.border;
        winOrLose.textContent = 'Place your bet!';
    }


    setTimeout(() => {
        stopSpin();
        checkWin();
    }, 2000);
}

function stopSpin() {
    spinButton.disabled = false;
    isSpinning = false;
    intervalIds.forEach((intervalId, index) => {
        stopReel(reels[index], intervalId);
    });
}

function checkWinTime() {
    winOrLose.style.color = styles.color;
    winOrLose.style.fontWeight = styles.fontWeight;
    winOrLose.style.fontSize = styles.fontSize;
    return {
        color: styles.color,
        fontWeight: styles.fontWeight,
        fontSize: styles.fontSize
    };
}

function checkLoseTime() {
    winOrLose.style.color = styles.loseColor;
    winOrLose.style.fontWeight = styles.fontWeight;
    winOrLose.style.fontSize = styles.fontSize;
    return {
        color: styles.loseColor,
        fontWeight: styles.fontWeight,
        fontSize: styles.fontSize
    };
}

spinButton.addEventListener('click', () => {
    if (currentBalance === 0
        || currentBalance < costForOneSpin) {
        toggleAddBalanceBlock();
        winOrLose.style.color = 'darkblue';
        winOrLose.textContent = `Please add your balance! Usual bet is $${costForOneSpin}`;
        return;
    }
    currentBalance -= costForOneSpin;
    updateBalance(currentBalance);
    updateReels();
    updateBalanceDisplay();
    if (!isSpinning) startSpin();
});

setTimeout(() => {
    localStorage.removeItem('balance');
}, 2000);

addBalanceInput.value = 0;

addBalanceInput.addEventListener('change', (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
        console.warn('Error: Input value is not a valid number.');
        addBalanceInput.value = 0;
    } else {
        addBalanceInput.value = value;
        updateBalanceDisplay();
    }
});

function addBalance() {
    const value = parseFloat(addBalanceInput.value);
    if (!isNaN(value)) {
        if (value === 0) {
            winOrLose.style.color = `red`;
            winOrLose.textContent = `Added balances can't be zero `;
            setTimeout(() => {
                winOrLose.textContent = `Place your bet!`;
            }, 2000);
        }
        currentBalance += value;
        updateBalance(currentBalance);
        addBalanceInput.value = 0;
        toggleAddBalanceBlock();
    } else {
        console.warn('Error: Input value is not a valid number.');
    }
}
addBalanceButton.addEventListener('click', addBalance);

incrementButton.addEventListener('click', () => {
    addBalanceInput.value = parseFloat(addBalanceInput.value) + 50;
});

decrementButton.addEventListener('click', () => {
    let newValue = parseFloat(addBalanceInput.value) - 50;
    if (newValue < 0) {
        console.warn('Value cannot be less than zero!');
        newValue = 0;
    }
    addBalanceInput.value = newValue;
});