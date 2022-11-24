
function renderBoard(board) {
    var strHTML = ''
    strHTML += `<tbody>`
    for (let i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < board[0].length; j++) {
            var cellId = `${setMinesNegsCount(gBoard, i, j)}`  //nums of mine negs
            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            var cellClass = `cell-${i}-${j}`
            var cell = (board[i][j].isMine) ? '' : ''
            strHTML += `<td id="${cellId}" ${cellData} class ="cell ${cellClass}" oncontextmenu="onMarked(this,${i},${j})" onclick="onCellClicked(this,${i},${j})">${cell}</td>`
        }

        strHTML += `</tr>`
    }
    strHTML += `</tbody>`

    return document.querySelector('.board').innerHTML = strHTML
}
function setMinesNegsCount(board, rowIdx, colIdx) {
    var MinesCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            // var currCell = board[i][j]
            if (board[i][j].isMine) MinesCount++
        }
    }
    return MinesCount
}

function renderTools() {
    var elOptionsTools = document.querySelector('.options-tool')
    //  var elLife = elOptionsTools.querySelector('.life')
    var elSmiley = elOptionsTools.querySelector('.smiley')
    elSmiley.innerText = SMILEY
    //  elLife.innerText = LIFE
}

function onLevel(elLvl){
    gBoard = buildBoard(elLvl)
    gGame.shownCount = 0
      var elScore = document.querySelector('.score-counter')
    elScore.innerText = gGame.shownCount
    renderBoard(gBoard)
    
}


