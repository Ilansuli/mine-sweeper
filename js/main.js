'use strict'

// MINES SWEEPER 

// SYMBOLS

const MINE = '💣'
const MARK = '🚩'
const SMILEY = '😀'
const RESTARTSMILEY = '😯'
const ENDGAMESMILEY = '🤯'
const LIFE = '💕'

// ELEMENTS

const elLife = document.querySelector('.life')
const elSmiley = document.querySelector('.smiley')
const elHeader = document.querySelector('h1')
const elOptionsTools = document.querySelector('.options-tool')
const elBoard = document.querySelector('.board')
const elMines = document.querySelector('.mines')
const elScore = document.querySelector('.score-counter')
const elTimer = document.querySelector('.timer')

//GLOBAL 

var gBoard
var gGame = {
    isOn: false,
    shownCount: 0,
    lifeLeft: 3,
    minesCount: 0,
    markedCount: 0,
    // secsPassed: 0
}
var gSeconds = 0
var gTimerInterval = null

function onInIt() {     //Loading refresh
    gBoard = buildBoard(4)
    renderSmiley()
    renderBoard(gBoard)
    scoreCounter()
    minesCounter()

}
function buildBoard(size) {// build data board
    var board = []
    gGame.minesCount = 0
    gGame.markedCount = 0
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
                    isCounted: false,
                    isMarked: false
                }
            }
            if (board[i][j].isMine === true) gGame.minesCount++
        }
    }
    return board
}
function onCellClicked(elCell, i, j) { // right click action on cell

    var currCellObj = gBoard[i][j]
    if (elCell.innerText === MARK) return // if cell is flagged
    if (gGame.shownCount === 0) {         //if the game just started
        gGame.isOn = true
        gTimerInterval = setInterval(timer, 1000) // timer
        //first play wont be a mine
        currCellObj.isMine = false
        elCell.innerText = elCell.id
        currCellObj.isShown = true
        //score counter
        gGame.shownCount++
        scoreCounter()
    }

    if (!gGame.isOn) return      //if player lost life and waiting to reset OR gameover

    if (!currCellObj.isShown) {  //unplayed cells

        expandShown(gBoard,+(elCell.dataset.i),+(elCell.dataset.j)) // checking if negs are mines

        elCell.innerText = (currCellObj.isMine) ? MINE : elCell.id 
        currCellObj.isShown = true
        //score counter
        gGame.shownCount++
        scoreCounter()
    }
    // if player clicked a mine
    checkIfMine(i, j, elCell)
}
window.addEventListener('contextmenu', function (e) {      //disabling context menu
    e.preventDefault();
}, false);
function onMarked(elCell, i, j) { // left click action on cell
    var currCellObj = gBoard[i][j]
    if (!gGame.isOn || currCellObj.isShown) return
    if (elCell.innerText !== MARK) { //if cell not flagged
        elCell.innerText = MARK
        currCellObj.isMarked = true
        if (currCellObj.isMine && currCellObj.isMarked && gGame.minesCount !== 0) {
            if (currCellObj.isCounted) return 
            currCellObj.isCounted = true
            gGame.minesCount--
            minesCounter()
        }
    }
    else {
        elCell.innerText = ""
        currCellObj.isMarked = false
    }



}
function onStartOver(elSmiley) {    // smiley actions
    if (elSmiley.innerText === SMILEY) {
        elHeader.innerText = 'MINES SWEEPER'
        elLife.innerText = `${LIFE} ${LIFE} ${LIFE}`
        gGame.shownCount = 0
        gGame.lifeLeft = 3
        onInIt()
    } else if (elSmiley.innerText === RESTARTSMILEY) {
        gGame.isOn = true
        elSmiley.innerText = SMILEY
    } else if (elSmiley.innerText === ENDGAMESMILEY) {
        elHeader.innerText = 'MINES SWEEPER'
        elSmiley.innerText = SMILEY
        gGame.lifeLeft = 3
        gGame.shownCount = 0
        onInIt()
    }
}
