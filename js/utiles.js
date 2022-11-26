function renderBoard(board) { // rendering data board to user
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

    return elBoard.innerHTML = strHTML
}
function renderSmiley() {// rendering data smiley to user
    elSmiley.innerText = SMILEY
}
function setMinesNegsCount(board, rowIdx, colIdx) { // mines counter around desired cell
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
function expandShown(board,cellI,cellJ) {   
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) console.log('hello');
            if (j < 0 || j >= board[0].length) continue
            if (!board[i][j].isMine) {
              var currCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
              currCell.innerText = currCell.id
            }
        }
    }
}
function timer() {  
    gSeconds++

    var hrs = Math.floor(gSeconds / 3600)
    var mins = Math.floor (gSeconds / 60)
    var secs = gSeconds % 60

    if (secs < 10) secs = '0' + secs
    if (mins < 10) mins = '0' + mins

    elTimer.innerText = `${mins}:${secs}`
}
function checkIfMine(i, j, elCell) {
    var currCellObj = gBoard[i][j]
    if (currCellObj.isMine) {
        gGame.isOn = false
        gGame.lifeLeft--
        elCell.style.backgroundColor = "red"
        elSmiley.innerText = RESTARTSMILEY
        if (gGame.lifeLeft === 2) {
            elLife.innerText = `${LIFE} ${LIFE}`
            elHeader.innerText = `ONLY ${gGame.lifeLeft} LIVES LEFT`
        }
        else if (gGame.lifeLeft === 1) {
            elLife.innerText = `${LIFE}`
            elHeader.innerText = `ONLY ${gGame.lifeLeft} LIVES LEFT`
        }
        else if (gGame.lifeLeft === 0) {
            clearInterval(gTimerInterval)

            gSeconds = 0
            gGame.isOn = false

            elTimer.innerText = '00:00'
            elLife.innerText = ''
            elHeader.innerText = 'GAME OVER'
            elSmiley.innerText = ENDGAMESMILEY
        }
    }
}
function onLevel(elLvl) {   // different levels
    clearInterval(gTimerInterval)
    gBoard = buildBoard(elLvl)
    gSeconds = 0
    gGame.shownCount = 0
    gGame.lifeLeft = 3
    elTimer.innerText = '00:00'
    elHeader.innerText = 'MINES SWEEPER'
    elMines.innerText = `Mines : ${gGame.markedCount}/${gGame.minesCount}`
    elScore.innerText = `Score : ${gGame.shownCount}`
    elLife.innerText = `${LIFE} ${LIFE} ${LIFE}`
    renderSmiley()
    renderBoard(gBoard)

}
function scoreCounter() {   
    elScore.innerText = `Score : ${gGame.shownCount}`
}
function minesCounter() {   // data mines counter to show the user 
    elMines.innerText = `Mines : ${gGame.minesCount}`
}


