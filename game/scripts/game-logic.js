console.log('sanity check')

let playerOne = 'one'
let playerTwo = 'two'
let currentPlayer = playerOne;

let gameOver = false;
let board;

let rows = 7;
let columns = 6;

function setGame() {
    board = [];

    for (let i = 0; i < rows; i++) {
        console.log(i)
        let row = []
        for (let j = 0; j < columns; j++) {
            row.push(' ');
            let tile = document.createElement('div');
            tile.id = i.toString() + '-' + j.toString()
            tile.classList.add('tile');
            document.getElementById('board').append(tile)
        }
        board.push(row)
    }
}

console.log(setGame())