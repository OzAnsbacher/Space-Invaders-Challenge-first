
function createBoard(SIZE, variable) {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = variable;
        }
    }
    return board;
}

function getElCell(pos) {
    return document.querySelector(`.cell-${pos.i}-${pos.j}`);
}
// function getElCell(pos) {
//     return document.querySelector(`[data-i='${pos.i}'][data-j='${pos.j}']`);
// }

