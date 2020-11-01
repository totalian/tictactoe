const game = ((currentPlayer,nextPlayer) => {

    const changePlayer = function(){
        [this.currentPlayer, this.nextPlayer] = [this.nextPlayer, this.currentPlayer]
    }

    const gameOver = function(){
        alert(`Game over ${getWinner()} has won the game`)
    }

    const allPlayers = function(){return [this.currentPlayer, this.nextPlayer]}

    const getPlayerByChoice = function(choice){
        let allplayers = game.allPlayers()
        for (player of allplayers){
            if(player.choice == choice){
                return player
            }
        }
    }

    const getWinner = function(){
        let winner = getPlayerByChoice(gameboard.checkWinner())
        return winner.name
    }

    return {currentPlayer, nextPlayer, changePlayer, gameOver, getPlayerByChoice, allPlayers}
})()

const gameboard = (() => {

    const board = [[null,null,null],[null,null,null],[null,null,null]]

    const boardReset = () => board = [[null,null,null],[null,null,null],[null,null,null]]

    const updateBoard = (row,column,value) => {
        if(!board[row][column]){
            board[row][column] = value
            return true
        }
    }

    const winninglines = () => {
        let allLines = []
        // get all current rows of the board
        board.forEach(arr => allLines.push(arr))

        // get all the current columns on the board
        for(let i = 0; i < board.length; i++){
            let temp = []
            board.forEach(arr => {
                temp.push(arr[i])
            })
            allLines.push(temp)
        }

        // get the two diagonals
        let [row1,row2,row3] = board
        let mainDiagonal = [row1[0],row2[1],row3[2]]
        allLines.push(mainDiagonal)

        let inverseDiagonal = [row1[2],row2[1],row3[0]]
        allLines.push(inverseDiagonal)

        return allLines

    }

    const checkWinner = () => {
        let winningLines = winninglines()
        const checkRepeatedArray = arr => arr.every( choice => choice === arr[0] )
        for (let line of winningLines) {
            if(checkRepeatedArray(line)){
                return line[0]
            }
        }
    }

    return {board,updateBoard,checkWinner, boardReset}
})()

const Player = (name,choice) => {

    const move = square => {
        let squareRow = displayController.getSquareRow(square)
        let squareColumn = displayController.getSquareColumn(square)
        if(gameboard.updateBoard(squareRow,squareColumn,choice)){
            displayController.printValue(square,choice)
            if(gameboard.checkWinner()){
                game.gameOver()
            }
            game.changePlayer()
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