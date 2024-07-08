
let resetBtn=document.querySelector('#reset-btn');
let newBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let vsAI = false;

function startTwoPlayerGame() {
    resetGame();
    vsAI = false;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    gameActive = true;
}

function startAIGame() {
    resetGame();
    vsAI = true;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    gameActive = true;
}

function resetGame() {
    msgContainer.classList.add("hide");
    document.getElementById('mode-selection').style.display = '';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = false;
    vsAI = false;
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
}

function makeMove(index) {
    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    document.querySelectorAll('.cell')[index].innerText = currentPlayer;

    if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
        msgContainer.classList.remove("hide");
        return;
    }

    if (board.every(cell => cell !== '')) {
        alert("It's a draw!");
        gameActive = false;
        msgContainer.classList.remove("hide");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (vsAI && currentPlayer === 'O') {
        makeAIMove();
    }
}

function makeAIMove() {
    let emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
