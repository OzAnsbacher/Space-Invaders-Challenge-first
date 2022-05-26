
// const ALIEN_SPEED = 500;
var gIntervalAliens

var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze

var gCountAliens = 0

function createAliens(board) {
    gAliens = []
    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 0; j < ALIENS_ROW_LENGTH; j++) {
            gCountAliens++
            board[i][j] = ALIEN
        }
    }
}

function handleAlienHit(pos) {
    gCountAliens--
    if (!gCountAliens) {
        displayModal(true)
    }
}

function moveAliens(fromI, toI) {
    gIntervalAliens = setInterval(() => {
        if (gIsAlienFreeze) return

        if (toI === 13 && fromI < toI) {
            toI = fromI + 1
            fromI = 14
            shiftBoardDown(gBoard, fromI - 1, toI)
        } else if (toI === 0 && fromI > toI) {
            toI = fromI - 1
            fromI = -1
            shiftBoardDown(gBoard, toI, fromI + 1)
        } else if (fromI < toI) {
            toI++
            fromI++
            shiftBoardRight(gBoard, fromI, toI)
        } else if (fromI > toI) {
            toI--
            fromI--
            shiftBoardLeft(gBoard, fromI, toI)
        }
    }, 1000)
}

function shiftBoardRight(board, fromI, toI) {

    for (var i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
        for (var j = toI; j >= fromI; j--) {
            if (j === fromI) board[i][j] = ''
            else if (board[i][j - 1] === LASER) board[i][j] = ''
            else board[i][j] = board[i][j - 1]
        }
    }
    renderBoard(board, '.board')
}

function shiftBoardLeft(board, fromI, toI) {

    for (var i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
        for (var j = toI; j <= fromI; j++) {
            if (j === fromI) board[i][j] = ''
            else if (board[i][j + 1] === LASER) board[i][j] = ''
            else board[i][j] = board[i][j + 1]
        }
    }
    renderBoard(board, '.board')
}

function shiftBoardDown(board, fromI, toI) {
    gAliensBottomRowIdx++
    for (var j = toI; j <= fromI; j++) {
        for (var i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
            if (i === gAliensTopRowIdx && j <= fromI) board[i][j] = ''
            else if (board[i - 1][j] === LASER) board[i][j] = ''
            else board[i][j] = board[i - 1][j]
        }
    }
    renderBoard(board, '.board')
    gAliensTopRowIdx++
    if (gAliensBottomRowIdx === 12) displayModal(false)
}
