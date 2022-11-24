'use strict'

// MINES SWEEPER 

const MINE = '💣'
const MARK = '🚩'
const SMILEY = '😎'
const RESETSMILEY = '😯'
const ENDGAMESMILEY = '🤯'
const LIFE = ['💖,💖,💖']

var gBoard
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function onInIt() {
    gBoard = buildBoard(4)
    renderTools()
    renderBoard(gBoard)
    scoreCounter()
    showTimer()

    
}

function buildBoard(size) {
    var board = []

    for (let i = 0; i < size; i++) {
        board[i] = []
        for (let j = 0; j < size; j++) {
            if (Math.random() > 0.3) {
                board[i][j] = {
                    minesAroundCount: 4,
                    isShown: false,
                    isMine: false,
                    isMarked: false
                }
            } else {
                board[i][j] = {
                    minesAroundCount: 4,
                    isShown: false,
                    isMine: true,
                    isMarked: false
                }
            }
        }

    }
    return board
}


function onCellClicked(elCell, i, j) {
    if (elCell.innerText === MARK) return
    if (gGame.shownCount === 0) {         //if the game just started
        gBoard[i][j].isMine = false
        elCell.innerText = elCell.id

        gGame.isOn = true
        gBoard[i][j].isShown = true
        gGame.shownCount++
        scoreCounter()
    }

    if (!gGame.isOn) return      //if player lost life and waiting to reset OR gameover

    if (!gBoard[i][j].isShown) {
        elCell.innerText = (gBoard[i][j].isMine) ? MINE : elCell.id
        gBoard[i][j].isShown = true
        // elCell.style.contentVisibility = "visible"
        gGame.shownCount++
        scoreCounter()
    }
    checkIfMine(i, j, elCell)
}

function scoreCounter() {
    var elScore = document.querySelector('.score-counter')
    elScore.innerText = gGame.shownCount
}

window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);

function onMarked(elCell, i, j) {
    if (!gGame.isOn) return
    // elCell.preventDefault();
    if (gBoard[i][j].isShown) return
    if (elCell.innerText !== MARK) {
        elCell.innerText = MARK
        gBoard[i][j].isMarked = true

    } else {
        elCell.innerText = ""
        gBoard[i][j].isMarked = false

    }



}


function checkIfMine(i, j, elCell) {
    if (gBoard[i][j].isMine) {
        gGame.isOn = false
        gGame.lifeLeft--
        elCell.style.backgroundColor = "red"
        var elSmiley = document.querySelector('.smiley')
        elSmiley.innerText = RESETSMILEY
        if (gGame.lifeLeft === 0) {
            document.querySelector('h1').innerText = 'GAME OVER'
            gGame.isOn = false
            elSmiley.innerText = ENDGAMESMILEY
        }
    }
}
function checkGameOver() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine === currCell.isMarked && currCell.isShown) {
                document.querySelector('h1').innerText = 'VICTORY'

            }

        }
    }
}

function onStartOver(elSmiley) {
    if (elSmiley.innerText === RESETSMILEY) {
        gGame.shownCount = 0
        elSmiley.innerText = SMILEY
        onInIt()
    }
    if (elSmiley.innerText === ENDGAMESMILEY) {
        elSmiley.innerText = SMILEY
        gGame.lifeLeft = 0
        gGame.shownCount = 0
        onInIt()
    }
}
