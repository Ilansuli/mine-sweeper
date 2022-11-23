function renderBoard(board){
    var strHTML =''
    strHTML += `<tbody>`
    for (let i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (let j = 0; j < board[0].length; j++) {
            var cell
            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            var cellClass = `cell-${i}-${j}`
            var cell = (board[i][j].isMine) ? '' : ''
            strHTML += `<td ${cellData} class ="cell ${cellClass}" onclick="onCellClicked(this)">${cell}</td>`

        }
        strHTML += `</tr>`
    }
    strHTML += `</tbody>`

    return document.querySelector('.board').innerHTML = strHTML
}

function countNegs(cellI, cellJ, mat) {
    var negsMinesCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j].isMine) negsMinesCount++
        }
    }
    // console.log(negsMinesCount);
    return negsMinesCount
}