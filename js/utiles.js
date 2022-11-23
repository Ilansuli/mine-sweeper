
function renderBoard(board) {
    var strHTML = ''
    strHTML += `<tbody>`
    for (let i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < board[0].length; j++) {
            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            var cellClass = `cell-${i}-${j}`

            var cell = (board[i][j].isMine) ? MINE : setMinesNegsCount(gBoard, i, j)

            strHTML += `<td  ${cellData} class ="cell ${cellClass}" onclick="onCellClicked(this)">${cell}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody>`
    // document.querySelector(.cell)

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

function renderTools(){
 var elOptionsTools =   document.querySelector('.options-tool')
 var elLife = elOptionsTools.querySelector('.life')
 var elSmiley = elOptionsTools.querySelector('.smiley')
 elSmiley.innerText = SMILEY
 elLife.innerText = [LIFE,LIFE,LIFE]
}
function showTimer(){


}

function scoreCounter(){



}