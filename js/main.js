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
    lifeLeft: 3,
    markedCount: 0,
    secsPassed: 0
}


function onInIt() {
    gBoard = buildBoard(6)
    renderBoard(gBoard)
    // console.log(gBoard);
    renderTools()


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
                    isMarked: true
                }
            } else {
                board[i][j] = {
                    minesAroundCount: 4,
                    isShown: false,
                    isMine: true,
                    isMarked: true
                }
            }
        }

    }
    return board
}



function onCellClicked(elCell, i, j) {

    if (gGame.shownCount === 0) {         //if the game just started
        gGame.isOn = true
        gBoard[i][j].isMine = false
        elCell.innerText = setMinesNegsCount(gBoard, i, j)
    }
    expandShown(gBoard, elCell, i, j)
    if (!gGame.isOn) return      //if player lost life and waiting to reset OR gameover

    if (!gBoard[i][j].isShown) {
        gBoard[i][j].isShown = true
        elCell.style.contentVisibility = "visible"
        gGame.shownCount++
    }
    checkGameOver(i, j, elCell)
}

function expandShown(board, elCell, rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
    }
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (i === rowIdx && j === colIdx) continue
        if (j < 0 || j >= board[0].length) continue
        if (!board[i][j].isMine) elCell.style.contentVisibility = 'visible'
    }
}

function checkGameOver(i, j, elCell) {
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

function onStartOver(elSmiley) {
    if (elSmiley.innerText === RESETSMILEY) {
        gGame.shownCount = 0
        onInIt()
    }
    if (elSmiley.innerText === ENDGAMESMILEY) {
        gGame.lifeLeft = 0
        gGame.shownCount = 0
        onInIt()
    }
}