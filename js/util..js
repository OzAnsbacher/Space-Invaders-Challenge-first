
function createBoard(SIZE, variable) {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = variable;
        }
    }

    board[10][0] = board[10][1] =board[10][12] = board[10][13] = WALL
    return board;
}

function getElCell(pos) {
    return document.querySelector(`.cell-${pos.i}-${pos.j}`);
}

function countNeighbors(mat, rowIdx, colIdx) {
    var hitCell = []
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            if (mat[i][j] === ALIEN) {
                mat[i][j] = ''
                hitCell.push({ i, j })
            }
        }
    }
    return hitCell
}

//min- in, max-out
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getEmptyCell(i) {
    var emptyCells = []
    for (var j = 0; j < gBoard[0].length - 1; j++) {
        if (gBoard[i][j] === ALIEN) emptyCells.push({ i, j })
    }
    if (!emptyCells.length) return
    return emptyCells.splice(getRandomInt(0, emptyCells.length), 1)[0]
}


