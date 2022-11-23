'use strict'

// MINES SWEEPER 

const MINE = '💣'
const MARK = '🚩'
const SMILEY = '😎'

var gBoard

    function onInIt() {
        gBoard = createBoard(4, 4)
        renderBoard(gBoard)
    }


function createBoard(rows, cols) {
    var board = []

    for (var i = 0; i < rows; i++) {
        board.push([])
        for (var j = 0; j < cols; j++) {
            if (Math.random() > 0.2) {

                board[i][j]= {
                    minesAroundCount: 4,
                    isShown: false,
                    isMine: false,
                    isMarked: true
                }
            } else {
                board[i][j]= {
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


function onCellClicked(elCell) {
    var i = elCell.dataset.i
    var j = elCell.dataset.j
    if (!gBoard[i][j].isMine) {
        elCell.innerText = countNegs(i,j,gBoard);
    }else{
        elCell.innerText = MINE
    }
}

