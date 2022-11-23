'use strict'

// MINES SWEEPER 

const MINE = '💣'
const MARK = '🚩'
const SMILEY = '😎'
const LIFE = '💖'

var gBoard
var gCounter = 0


function onInIt() {
    gBoard = buildBoard(6)
    // console.log(gBoard);
    renderBoard(gBoard)
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

function onCellClicked(elCell){

    var i = elCell.dataset.i  
    var j = elCell.dataset.j
    if(!gBoard[i][j].isShown){
        gBoard[i][j].isShown = true
        elCell.style.contentVisibility= "visible"
    }
    checkGameOver(i,j)
}

function checkGameOver(i,j){
    if(gBoard[i][j].isMine && gBoard[i][j].isShown){
        gLifeCounter--
        renderBoard(gBoard)
        if(gLifeCounter === 0){
            console.log('GAME');
        }

    }
}

