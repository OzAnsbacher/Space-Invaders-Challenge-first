
const BOARD_SIZE = 14;
var ALIENS_ROW_LENGTH = 5
var ALIENS_ROW_COUNT = 3

const CANDY = '🍭'
const HERO = 'HERO';
const ALIEN = 'ALIEN';


const WALL = '<img height="28px" src="img/wall.png" />'
const LASER = '<img height="20px" src="img/bullet.png" />'
const SUPER_LASER = '<img height="20px" src="img/super-bullet.png" />'
const ALIEN_LASER = '🧨'
const DEATH_IMG = '<img height="20px" src="img/death.png" />'
var ALIEN_IMG1 = '<img height="20px" src="img/ufo1.png" />'
var ALIEN_IMG2 = '<img height="20px" src="img/ufo2.png" />'
var ALIEN_IMG3 = '<img height="20px" src="img/ufo3.png" />'
var HERO_IMG = '<img height="20px" src="img/space-ship.png" />'

var gImgAliens
var gBoard
var gGame
var gIsPlay
var gIntervalCandy


function init() {
    gHeroProtector = {
        active: false,
        num: 2
    }
    gSuperLaser = false
    isNKeyDown = false
    gIsAlienFreeze = false
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 2
    gCountAliens = 0
    gGame = {
        isOn: false,
        aliensCount: 0
    }
    gBoard = createBoard(BOARD_SIZE, '')
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard, '.board')
    if (gIsPlay) {
        clearInterval(gIntervalAliens)
        clearInterval(gAlinesShoot)
        clearInterval(gIntervalCandy)
        clearInterval(gIntervalAliensLaser)
        gIntervalCandy = setInterval(spaceCandies, 1000 * 10)
        gIntervalAliensLaser = setInterval(aliensLaser, 1000 * 7)
        moveAliens(-1, 10)
    }
}

function createImgAliens(numImg){
    if(numImg){
        ALIEN_IMG1 = `<img height="20px" src="img/ufo${numImg}.png" />`
        ALIEN_IMG2 = `<img height="20px" src="img/ufo${numImg}.png" />`
        ALIEN_IMG3 = `<img height="20px" src="img/ufo${numImg}.png" />`
    }
    var elSelectAliens = document.querySelector('.aliens-style')
    elSelectAliens.style.display = 'none'

    var elBeginModal = document.querySelector('.start')
    elBeginModal.style.display = 'block'
}

function startGame(isComputer) {
    var elBeginModal = document.querySelector('.start')
    elBeginModal.style.display = 'none'
    if (isComputer) {
        var elBtnMobil = document.querySelectorAll('.computer')
        elBtnMobil[0].style.display = 'none'
        elBtnMobil[1].style.display = 'none'
    }
    restart()
}

function renderBoard(board, selector) {
    var strHTML = '<table><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = (board[i][j] === HERO) ? HERO_IMG : board[i][j]
            if (board[i][j] === ALIEN) {
                if (i === gAliensTopRowIdx) var cell = ALIEN_IMG3
                if (i === gAliensTopRowIdx + 1) var cell = ALIEN_IMG1
                if (i === gAliensBottomRowIdx) var cell = ALIEN_IMG2
            }


            // var cell = (board[i][j] === ALIEN) ? ALIEN_IMG : board[i][j]
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

function stopAliens(elBtn) {
    if (!gIsPlay) return
    gIsAlienFreeze = !gIsAlienFreeze
    elBtn.innerText = gIsAlienFreeze ? 'Play' : 'Pause'
}

function spaceCandies() {
    if (!gIsPlay) return
    var rndNum = getRandomInt(0, 14)
    if (gBoard[0][rndNum]) return
    gBoard[0][rndNum] = CANDY
    setTimeout(() => {
        gBoard[0][rndNum] = ''
    }, 5000);
}

// location such as: {i: 2, j: 7}
function updateCell(pos, gameObject = '') {
    gameObject = (gameObject === HERO) ? HERO_IMG : gameObject
    gameObject = (gameObject === ALIEN) ? ALIEN_IMG : gameObject
    gBoard[pos.i][pos.j] = gameObject;
    var elCell = getElCell(pos);
    elCell.innerHTML = gameObject
}

function getLevel(level) {

    ALIENS_ROW_LENGTH = level.rowLength
    ALIENS_ROW_COUNT = level.count
    ALIEN_SPEED = level.speed

    restart()
}

function displayModal(isWin) {
    gIsPlay = false
    if (isWin) {
        var str = 'YOU WIN <br> '
    } else {
        var str = 'YOU LOSE'
        var elLives = document.querySelector('.lives')
        elLives.innerHTML = '💀💀💀'
        updateCell(gHero.pos, DEATH_IMG)
    }
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var elModalSpan = document.querySelector('.modal span')
    elModalSpan.innerHTML = str
    clearInterval(gAlinesShoot)
    clearInterval(gIntervalCandy)
    clearInterval(gIntervalAliens)
    clearInterval(gIntervalAliensLaser)
    console.log(gIntervalAliensLaser);
    console.log(gAlinesShoot);
    console.log(gIntervalCandy);
}

function restart() {
    // if push on restert in pause-time, the btn change for pause
    if (gIsAlienFreeze) {
        var elBtnPlay = document.querySelector('.pause')
        elBtnPlay.innerText = 'Pause'
    }
    var elLives = document.querySelector('.lives')
    elLives.innerHTML = '💖💖💖'
    var elScore = document.querySelector('.score span')
    elScore.innerHTML = 0
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    gIsPlay = true
    init()
}

