const xClass = 'x';
const circleClass = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
let board = document.getElementById('board');
let winningText = document.querySelector('[data-winning-message-text]')
let winningMessageElm = document.getElementById('winning-message');
let restartBTN = document.getElementById('restartBTN');
let playerName = document.getElementById('playerName');
let check = document.querySelector('[data-board]');
let playerTurnText = document.querySelector('.player-turn ');
let circleTurn;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame();

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        playerName.innerHTML = `<span span class = "playerX" >X</span>`;
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })

    setBoardHoverClass();
    winningMessageElm.classList.remove('show');
}

function endGame(draw) {
    if (draw) {
        winningText.innerHTML = "TIE  -_-` "

    } else {
        if (circleTurn)
            winningText.innerHTML = `<span class="playerY">O's</span> Wins !!!`;
        else {
            winningText.innerHTML = `<span class="playerX">X's</span> Wins !!!`;
        }
    }
    winningMessageElm.classList.add('show');
}

function checkForWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function handleClick(e) {
    const cell = e.target;
    console.log(cell);
    const currentClass = circleTurn ? circleClass : xClass;
    placeMark(cell, currentClass);
    if (checkForWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        setBoardHoverClass();
    }
}


function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) ||
            cell.classList.contains(circleClass)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    if (check.classList.contains(circleClass)) {
        playerName.classList.remove('playerY');
        playerName.classList.add('playerX');
        playerName.innerHTML = "X";
    } else {
        playerName.classList.add('playerY');
        playerName.innerHTML = "O";

    }
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if (circleTurn) {
        board.classList.add(circleClass);
    } else {
        board.classList.add(xClass);
    }
}
restartBTN.addEventListener('click', startGame)