
// const LASER_SPEED = 80;
var gLaserPos
var gLaserInterval

var gHero

function createHero(board) {
    gHero = {
        pos: { i: 12, j: 5 },
        isShoot: false,
        score: 0
    }
    board[gHero.pos.i][gHero.pos.j] = HERO
}

function onKeyDown(event) {
    var i = gHero.pos.i
    var j = gHero.pos.j
    switch (event.key) {
        case 'ArrowLeft':
            moveHero({ i, j: j - 1 });
            break;
        case 'ArrowRight':
            moveHero({ i, j: j + 1 });
            break;
        default:
            shoot({ i, j });
            break;
    }
}

function moveHero(dir) {
    if (dir.j < 0 || dir.j > 13) return
    if(!gIsPlay) return
    updateCell(gHero.pos)

    gHero.pos.i = dir.i
    gHero.pos.j = dir.j

    updateCell(gHero.pos, HERO)
}

//function shoot check if have laser on board (gLaserPos get restart in function blinkLaser) and start laser-interval 
function shoot(pos) {
    if(!gIsPlay) return
    if (!gLaserPos) {
        gLaserPos = pos
        gHero.isShoot = true
        gLaserInterval = setInterval(blinkLaser, 10, gLaserPos)
    }
}


function blinkLaser(pos) {

    if (!pos.i || gBoard[pos.i - 1][pos.j] === ALIEN) {
        if (pos.i) {
            gHero.score += 10
            var elScore = document.querySelector('.score span')
            elScore.innerHTML = gHero.score
            updateCell({ i: pos.i - 1, j: pos.j })
            handleAlienHit(pos)
        }
        clearInterval(gLaserInterval)
        updateCell(pos)
        // gHero.isShoot = false
        gLaserPos = ''
    } else {
        if (gHero.pos.i !== pos.i) updateCell(pos)
        pos.i = --pos.i
        updateCell(pos, LASER)
    }
}

