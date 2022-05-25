
// const ALIEN_SPEED = 500;
// var gIntervalAliens;

// var gAliensTopRowIdx;
// var gAliensBottomRowIdx;
// var gIsAlienFreeze = true;

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
    if(!gCountAliens){
        displayModal(true)
    }
}


// function shiftBoardRight(board, fromI, toI) {}
// function shiftBoardLeft(board, fromI, toI) {}
// function shiftBoardDown(board, fromI, toI) {}

// function moveAliens() {}