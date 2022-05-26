
const BOARD_SIZE = 14;
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = 'HERO';
const HERO_IMG = '<img height="20px" src="img/cannon2.png" />'
const ALIEN = 'ALIEN';
const ALIEN_IMG = '<img height="20px" src="img/ufo.png" />'
const LASER = '⚪';


var gBoard
var gGame
var gIsPlay



function init() {
    gIsAlienFreeze = false
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 2
    gCountAliens=0
    gGame = {
        isOn: false,
        aliensCount: 0
    }
    gIsPlay = true
    gBoard = createBoard(BOARD_SIZE, '')
    clearInterval(gIntervalAliens)
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard, '.board')
    moveAliens(-1, 7)

}

function renderBoard(board, selector) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = (board[i][j] === HERO) ? HERO_IMG : board[i][j]
            var cell = (board[i][j] === ALIEN) ? ALIEN_IMG : board[i][j]
            var className = 'cell cell-' + i + '-' + j;
            className += i === 13 ? ' floor ' : ''
            strHTML += `<td class="${className}"> ${cell} </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// function createCell(gameObject = null) {
//     return {
//         type: SKY,
//         gameObject: gameObject
//     }
// }

// // position such as: {i: 2, j: 7}
// function updateCell(pos, gameObject = null) {
//     gBoard[pos.i][pos.j].gameObject = gameObject;
//     var elCell = getElCell(pos);
//     elCell.innerHTML = gameObject || '';
// }

function stopAliens(elBtn) {
    gIsAlienFreeze = !gIsAlienFreeze
    elBtn.innerText = gIsAlienFreeze ? 'play' : 'stop'


}

// location such as: {i: 2, j: 7}
function updateCell(pos, gameObject = '') {
    // gBoard[pos.i][pos.j].gameObject = gameObject;
    gameObject = (gameObject === HERO) ? HERO_IMG : gameObject
    gameObject = (gameObject === ALIEN) ? ALIEN_IMG : gameObject
    gBoard[pos.i][pos.j] = gameObject;
    var elCell = getElCell(pos);
    // elCell.innerHTML = gameObject
    elCell.innerHTML = gameObject || ''
}

function displayModal(isWin) {
    if (isWin) {
        var str = 'YOU WIN <br> '
    } else {
        var str = 'YOU ARE LOSE'
    }
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var elModalSpan = document.querySelector('.modal span')
    elModalSpan.innerHTML = str
    gIsPlay = false
    clearInterval(gIntervalAliens)
}
function restart() {
    var elScore = document.querySelector('.score span')
    elScore.innerHTML = 0
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    init()
}

