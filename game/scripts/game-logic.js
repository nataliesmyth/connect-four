console.log('sanity check')

let playerRed = 'r'
let playerYellow = 'y'
let currentPlayer = playerRed;

let gameOver = false;
let board;
let currColumns;

let rows = 6;
let columns = 7;

let currentTime = 5;
const timerText = document.getElementById('timer');
const btnStart = document.getElementById('btn-start');
let redWinCount = document.getElementById('red-win-count')
let yellowWinCount = document.getElementById('yellow-win-count')
let currPlayerText = document.getElementById('current-player')
let count = 5;

// btnStart.addEventListener('click', function() {
    
// })

window.onload = function() {
    setGame()
}
const intervalID = setInterval(setTimer, 1000)

function setTimer() {
    count -= 1;
    timerText.textContent = count;
    if (count === 0) {
        currentTime = 5;
        count = 5;
        clearInterval(intervalID)
        currPlayerText.innerText = 2;
        timerText.innerText = 5;
    }
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]
    
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString()
            tile.classList.add('tile');
            tile.addEventListener('click', setPiece);
            document.getElementById('board').append(tile);
        }
        board.push(row)
    }

}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return
    }

    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + '-' + c.toString());
    // console.log(tile)
    if (currentPlayer == playerRed) {
        tile.classList.add('red-piece')
        currentPlayer = playerYellow
    } else {
        tile.classList.add('yellow-piece')
        currentPlayer = playerRed
    }

    r -= 1;
    // console.log(r)
    currColumns[c] = r;

    checkWinner()
}

function switchPlayer() {
    if (currentPlayer === playerRed && currentTime === 0) {
        currentPlayer = playerYellow;
        const intervalID = setInterval(function() {
            count -= 1;
            timerText.textContent = count;
            if (count === 0) {
                clearInterval(intervalID)
                currPlayerText.innerText = 2;
                timerText.innerText = 5;
            }
        }, 1000)
    }
}

function checkWinner() {
    // check horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                    if (board[r][c] == board[r][c+1] && 
                        board[r][c+1] == board[r][c+2] && 
                        board[r][c+2] == board[r][c+3]) {
                        setWinner(r, c);
                        return;
                    }
                }
            }
        }

    // check vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && 
                    board[r+1][c] == board[r+2][c] &&
                    board[r+2][c] == board[r+3][c]) {
                        setWinner(r, c);
                            return;
                        }

            }
        }
    }

    // check top left to bottom right diagonal
    for (let r = 0; r < rows-3; r++) {
        for (let c = 0; c <= columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && 
                    board[r+1][c+1] == board[r+2][c+2] &&
                    board[r+2][c+2] == board[r+3][c+3]) {
                        setWinner(r, c);
                            return;
                        }
            }
        }
    }
    
    // check top right to bottom left diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && 
                    board[r-1][c+1] == board[r-2][c+2] &&
                    board[r-2][c+2] == board[r-3][c+3]) {
                        setWinner(r, c);
                            return;
                        }
            }
        }
    }

}

function setWinner(r, c) {
    let winner = document.getElementById('winner');
    if (board[r][c] == playerRed) {
        winner.innerText = 'Red wins!'
        redWinCount.innerText += 1
    } else if (board[r][c] == playerYellow) {
        winner.innerText = 'Yellow wins!'
        yellowWinCount.innerText += 1
    }
    // console.log(winner)

    gameOver = true;
}

let restartGame = document.getElementById('restartBtn');
restartGame.addEventListener('click', handleRestart);

function handleRestart() {
    console.log(board[r])
    currentTime = 5;
    count = 5;
    timerText.innerText = count;
    clearInterval(intervalID);
    setInterval(setTimer, 1000)
}

// Timer



// function countDown() {
//     currentTime--
//     if (currentTime > 0) {
//         timeLeft.textContent = currentTime;
//         console.log(currentTime)
//     } else {
//         clearInterval(timerId);
//         alert('player one turn is over')
//     }
// }

