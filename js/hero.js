
const LASER_SPEED = 60;
var gLaserPos
var gLaserInterval
var isNKeyDown
var gSuperLaser

var gHero

function createHero(board) {
    gHero = {
        pos: { i: 12, j: 5 },
        laserSpeed: 3,
        score: 0,
        lives:3
    }
    board[gHero.pos.i][gHero.pos.j] = HERO_IMG
    var elBtn = document.querySelector('.super-laser')
    elBtn.innerHTML = gHero.laserSpeed ? '🚀'.repeat(gHero.laserSpeed) : ' '
}

function onKeyDown(event) {
    var i = gHero.pos.i
    var j = gHero.pos.j
    // console.log(event);
    switch (event.key) {
        case 'ArrowLeft':
            moveHero({ i, j: j - 1 });
            break;
        case 'ArrowRight':
            moveHero({ i, j: j + 1 });
            break;
        case ' ':
            shoot({ i, j });
            break;
        case 'x':
            if (gHero.laserSpeed > 0) {
                gSuperLaser = true
                shoot({ i, j }, gSuperLaser)
            }
            break;
        case 'n':
            blowUpNeighbors()
            break;
    }
}

function moveHero(dir) {
    if (dir.j < 0 || dir.j > 13) return
    if (!gIsPlay) return
    updateCell(gHero.pos)

    gHero.pos.i = dir.i
    gHero.pos.j = dir.j

    updateCell(gHero.pos, HERO)
}

//function shoot check if have laser on board
//(gLaserPos get restart in function blinkLaser) 
// and start laser-interval, in super or normal speed
function shoot(pos) {
    if (!gIsPlay) return
    if (!gLaserPos) {
        gLaserPos = pos
        gHero.isShoot = true
        var speed = 150
        if (gSuperLaser && gHero.laserSpeed > 0) {
            speed = LASER_SPEED
            gHero.laserSpeed--
            var elBtn = document.querySelector('.super-laser')
            elBtn.innerHTML = gHero.laserSpeed ? '🚀'.repeat(gHero.laserSpeed) : '---'
        }

        gLaserInterval = setInterval(blinkLaser, speed, gLaserPos)
    }
}


function blinkLaser(pos) {
    //check if in next cell have alien or end board 
    if (!pos.i || gBoard[pos.i - 1][pos.j] === ALIEN ||
        gBoard[pos.i - 1][pos.j] === CANDY) {
        //if pos.i=true the cell in board, else stop the action
        if (gBoard[0][pos.j] === CANDY && pos.i === 1) {
            gHero.score += 50
            //delet candy
            updateCell({ i: 0, j: pos.j })
            gIsAlienFreeze = true
            setTimeout(() => {
                gIsAlienFreeze = false
            }, 5000)
        } else if (pos.i) {
            if (isNKeyDown) {
                var hitCell = countNeighbors(gBoard, pos.i, pos.j)
                console.log(hitCell.length);
                gHero.score += hitCell.length * 10
            } else {
                var hitCell = [{ i: pos.i - 1, j: pos.j }]
                // console.log(hitCell.length);
                gHero.score += 10
            }
            for (var i = 0; i < hitCell.length; i++) {
                updateCell(hitCell[i])
                handleAlienHit(hitCell[i])
            }

        }
        var elScore = document.querySelector('.score span')
        elScore.innerHTML = gHero.score
        clearInterval(gLaserInterval)
        updateCell(pos)
        gSuperLaser=false
        gLaserPos = ''
    } else {
        if (gHero.pos.i !== pos.i) updateCell(pos)
        pos.i = --pos.i
        if (gSuperLaser) updateCell(pos, SUPER_LASER)
        else updateCell(pos, LASER)
    }
}

function blowUpNeighbors() {
    isNKeyDown = true
    setTimeout(() => {
        isNKeyDown = false
    }, 300)
}

