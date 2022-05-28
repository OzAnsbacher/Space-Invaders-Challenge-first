
var ALIEN_SPEED = 1000;
var gIntervalAliens
var gIntervalAliensLaser

var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze

var gAlinesShoot
var gCountAliens = 0

function createAliens(board) {

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
            while (true) {
                if (gBoard[gAliensBottomRowIdx][toI] === '' &&
                    gBoard[gAliensBottomRowIdx - 1][toI] === '' &&
                    gBoard[gAliensBottomRowIdx - 2][toI] === '') {
                    toI--
                } else break
            }
        } else if (fromI > toI) {
            toI--
            fromI--
            shiftBoardLeft(gBoard, fromI, toI)
            while (true) {
                if (gBoard[gAliensBottomRowIdx][toI] === '' &&
                    gBoard[gAliensBottomRowIdx - 1][toI] === '' &&
                    gBoard[gAliensBottomRowIdx - 2][toI] === '') {
                    toI++
                } else break
            }
        }
    }, ALIEN_SPEED)
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
    gAliensTopRowIdx++
    renderBoard(board, '.board')
    if (gAliensBottomRowIdx === 12) displayModal(false)
}

function aliensLaser() {
    var cell = getEmptyCell(gAliensBottomRowIdx)
    gAlinesShoot = setInterval(shootAliens, 500, cell)
}

function shootAliens(pos) {
    if (!gIsPlay) return
    if (gHero.pos.j === pos.j && gHero.pos.i === pos.i + 1) {
        if (gHeroProtector.active) {
            updateCell(pos)
            clearInterval(gAlinesShoot)
            return
        }
        gHero.lives--
        if (gHero.lives < 1) {
            updateCell(pos)
            displayModal(false)
            return
        } else {
            var elLives = document.querySelector('.lives')
            elLives.innerHTML = '💖'.repeat(gHero.lives)
            clearInterval(gAlinesShoot)
            updateCell(pos)
            updateCell(gHero.pos, HERO)
            return
        }
    }
    if (pos.i < 12 && gBoard[pos.i + 1][pos.j] !== WALL) {
        if (pos.i > gAliensBottomRowIdx) updateCell(pos)
        pos.i = ++pos.i
        if (pos.i > gAliensBottomRowIdx) updateCell(pos, ALIEN_LASER)
    } else {
        updateCell(pos)
        clearInterval(gAlinesShoot)
        if (gBoard[pos.i + 1][pos.j] === WALL) updateCell({ i: pos.i + 1, j: pos.j })
    }
}



