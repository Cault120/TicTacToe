let TicTacToe = {
    init: function() {
        TicTacToe.symbols = ["X", "O"];
        TicTacToe.squares = Array.from(document.querySelectorAll(".square"));
        TicTacToe.turnIndicator = document.querySelector(".turnIndicator");
        TicTacToe.button = document.querySelector(".newGame");
        TicTacToe.board = document.querySelector(".board");
        TicTacToe.winningSets = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        TicTacToe.addEventListeners();
        TicTacToe.newGame();
    },

    addEventListeners: function() {
        let ttt = this;
        this.squares.forEach(function(x) {
            x.addEventListener("click",function() {
                ttt.play(this);
            })
        })
        this.button.addEventListener("click", function() {
            ttt.newGame();
        })
    },

    newGame: function() {
        this.activePlayer = 0; 
        this.gameOver = false;
        this.squares.forEach(function (x) {
            x.classList.remove("X");
            x.classList.remove("O");
        })
        this.board.classList.remove("gameOver")
        this.setTurnIndicator();
    },

    setTurnIndicator: function() {
        this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s turn.";
    },
 
    play: function(el) {
        //make sure that the square is not filled
        if (!this.gameOver && el.classList.length == 1) {

            // Set contents to players symbol
            el.classList.add(this.symbols[this.activePlayer]);

            // Check win
            if (this.checkWin()) {
                this.turnIndicator.innerText = this.symbols[this.activePlayer] + " Wins!";
                this.endGame();
            }

            //check if draw
            else if (this.checkDraw()) {
                this.turnIndicator.innerText = "It's a Draw!";
                this.endGame();
            }

            //next turn
            else {
                this.activePlayer = 1 - this.activePlayer;
                this.setTurnIndicator();
            }
        } 
    },

    checkWin: function() {
        let ttt = this;
        return this.winningSets.some(function (x) {
            return x.every(function(i) {
                return Array.from(ttt.squares[i].classList).indexOf(ttt.symbols[ttt.activePlayer]) > -1;
            })
        })
    },

    checkDraw: function() {
        return this.squares.every(function (x) {
            return x.classList.length > 1;
        })
    },

    endGame: function() {
        this.gameOver = true;
        this.board.classList.add("gameOver");
    }
}

window.onload = TicTacToe.init;


// https://youtu.be/TjKLbj9Ssqo?t=1115