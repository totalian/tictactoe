const game = ((currentPlayer,nextPlayer) => {

    const changePlayer = function(){
        [this.currentPlayer, this.nextPlayer] = [this.nextPlayer, this.currentPlayer]
    }

    return {currentPlayer, nextPlayer, changePlayer}
})()

const gameboard = (() => {
    const board = [[null,null,null],[null,null,null],[null,null,null]]
    const updateBoard = (row,column,value) => {
        if(!board[row][column]){
            console.log('made a move')
            board[row][column] = value
            game.changePlayer()
            return true
        }
    }

    return {board,updateBoard}
})()

const Player = (name,choice) => {
    const move = square => {
        let squareRow = displayController.getSquareRow(square)
        let squareColumn = displayController.getSquareColumn(square)
        if(gameboard.updateBoard(squareRow,squareColumn,choice)){
            displayController.printValue(square,choice)
        }
    }
    return {name,choice,move}
}

const displayController = (() => {
    const spaces = document.querySelectorAll('.space')
    spaces.forEach((square,index) => {
        let row = Math.floor(index / 3)
        let column = index % 3
        square.dataset.row = row
        square.dataset.column = column


        square.addEventListener('click', e => {
            game.currentPlayer.move(e.target)
        })
    })

    const getSquareRow = square => square.dataset.row
    const getSquareColumn = square => square.dataset.column

    const printValue = (square,value) => {
        square.innerHTML = value
    }

    return {getSquareColumn,getSquareRow,printValue}
})()

const zeki = Player('zeki','x')
const amir = Player('amir','o')
game.currentPlayer = zeki
game.nextPlayer = amir