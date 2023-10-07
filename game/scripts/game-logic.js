// ----- App State ----- //

let playerRed = 'r'
let playerYellow = 'y'
let currentPlayer = playerRed;
let playerOne = playerRed;
let playerTwo = playerYellow
let count = 5;
let redWinTotal = 0;
let yellowWinTotal = 0;
const trackFirstPlayer = [];

let gameOver = false;
let board;
let currColumns;

let rows = 6;
let columns = 7;

let currentTime = 5;

// ----- Cached DOM Elements ----- //
const timerText = document.getElementById('timer');
let restartGame = document.getElementById('restartBtn');
let playAgainBtn = document.getElementById('playAgainBtn');
let redWinCount = document.getElementById('red-win-count');
let yellowWinCount = document.getElementById('yellow-win-count');
let currPlayerText = document.getElementById('current-player');
let menu = document.getElementById('game-menu');
let timerContainerRed = document.getElementById('timerContainerRed')
let timerContainerYellow = document.getElementById('timerContainerYellow')
let timerBackground = document.getElementById('timerBackground')
let winnerContainer = document.getElementById('winnerContainer')
let winnerBackground = document.getElementById('winnerBackground');

restartGame.addEventListener('click', handleRestartClick);
playAgainBtn.addEventListener('click', playAgain)
window.onload = function() {
    setGame()
}

const intervalID = setInterval(setTimer, 1000);

function playAgain() {
    document.getElementById('board').innerHTML = '';
    gameOver = false;
    handlePlayerOne();
    playerRedState();
    setGame();

}

function setGame() {
    if (trackFirstPlayer.length % 2 === 0) {
        trackFirstPlayer.push('r')
    } else {
        trackFirstPlayer.push('y')
    }
    console.log(trackFirstPlayer)
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
            // console.log(tile)
        }
        board.push(row)
    }
}


function setTimer() {
    currentTime = 5;
    count = 5;
    timerText.textContent = count;
    if (count === 0) {
        console.log(currentPlayer)
        switchPlayer()
    }  
}

function setPiece() {
    // if there is a winner, the function does nothing so pieces cannot be set
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
    console.log(currentPlayer)
    let tile = document.getElementById(r.toString() + '-' + c.toString());
    // console.log(tile)
    if (currentPlayer == playerRed) {
        tile.classList.add('red-piece')
        clearInterval(intervalID)
        currentPlayer = playerYellow;
        // timerContainerRed.display = none;
        // timerContainerYellow.display = block;
        playerYellowState();
    } else {
        tile.classList.add('yellow-piece')
        currentPlayer = playerRed;
        playerRedState();
    }
    // setInterval(setTimer, 1000);

    r -= 1;
    // console.log(r)
    currColumns[c] = r;

    checkWinner()
}

function switchPlayer() {
    if (currentPlayer === playerRed) {
        currentPlayer = playerYellow;
    } else {
        currentPlayer = playerRed;
    }
    setTimer()
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
        redWinTotal++
        winner.innerText = 'player 1'
        redWinCount.innerText = redWinTotal;
        redWinState();
    } else if (board[r][c] == playerYellow) {
        yellowWinTotal++
        winner.innerText = 'player 2'
        yellowWinCount.innerText = yellowWinTotal;
        yellowWinState();
    }
    console.log('winner! play again?')

    // console.log(winner)

    gameOver = true;
    // handleRestart()
    // setGame()
}

// menu.addEventListener('click', )
    function handleRestartClick() {
        gameOver = false;
        
        document.getElementById('board').innerHTML = '';
        redWinTotal = 0;
        redWinCount.innerText = redWinTotal;
        yellowWinTotal = 0;
        yellowWinCount.innerText = yellowWinTotal;
        // clearInterval(intervalID);
        setTimer();
        setGame();
    }

    function handleRestart() {
        gameOver = false;
        
        document.getElementById('board').innerHTML = '';
        // redWinTotal = 0;
        // redWinCount.innerText = redWinTotal;
        // yellowWinTotal = 0;
        // yellowWinCount.innerText = yellowWinTotal;
        // clearInterval(intervalID);
        setTimer();
        setGame();
    }

    function handlePlayerOne() {
        if (trackFirstPlayer % 2 === 0) {
            currentPlayer === playerRed;
            console.log(currentPlayer)
        } else if (trackFirstPlayer % 2 !== 0) {
            currentPlayer === playerYellow;
        }
    }

    function playerState() {
        // if it's player red's turn, player red state is shown
        // if it's player yellow's turn, player yellow state is shown
    }

    function playerWinState() {

    }

    function playerRedState() {
        timerContainerRed.style.display = 'block';
        timerBackground.style.display = 'block';
        timerContainerYellow.style.display = 'none';
        winnerContainer.style.display = 'none';
        winnerBackground.style.display = 'none';
    }

    function playerYellowState() {
        timerContainerYellow.style.display = 'block';
        timerBackground.style.display = 'block';
        winnerContainer.style.display = 'none';
        winnerBackground.style.display = 'none';
    }

    function redWinState() {
        // if red wins, red win state is shown
        timerContainerRed.style.display = 'none';
        timerBackground.style.display = 'none';
        winnerContainer.style.display = 'flex';
        winnerBackground.style.display = 'block';
    }

    function yellowWinState() {
        // if yellow wins, yellow win state is shown
        console.log('yellow win state')
        // timerContainerYellow.style.display = 'block';
        timerBackground.style.display = 'block';
        winnerContainer.style.display = 'none';
        winnerBackground.style.display = 'none';
    }