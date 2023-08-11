console.log('sanity check')

let playerRed = 'r'
let playerYellow = 'y'
let currentPlayer = playerRed;

let gameOver = false;
let board;
let currColumns;

let rows = 6;
let columns = 7;

window.onload = function() {
    setGame()
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]
    
    for (let r = 0; r < rows; r++) {
        console.log(r)
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
        console.log(board)
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
    console.log(tile)
    if (currentPlayer == playerRed) {
        tile.classList.add('red-piece')
        currentPlayer = playerYellow
    } else {
        tile.classList.add('yellow-piece')
        currentPlayer = playerRed
    }

    r -= 1;
    console.log(r)
    currColumns[c] = r;

    checkWinner()
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
    } else if (board[r][c] == playerYellow) {
        winner.innerText = 'Yellow wins!'
    }
    console.log(winner)

    gameOver = true;
}