const result = document.getElementById('game-over');

let board = [];
let gameOver;

// The board of the game
for(let i = 0; i < 3; i++) {
    let row = [];
    for(let j = 0; j < 3; j++) {
        row.push(new Cell(i, j));
    }
    board.push(row);
};

let temporaryDisplay =  (str, time=1500) => {
    result.innerHTML = str;
    result.style.visibility = 'visible';
    setTimeout(() => {
        result.style.visibility = 'hidden';
    }, time);
}

// Play the computer's chance
let computerChance =  () => {
    move =  find_best_move();
    board[move.i][move.j].play(2);
    isOver();
}

// Choose who starts the game
let getRandom =  (min = 1, max = 2) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize the game
let initialize =  () => {
    result.style.visibility = 'hidden';
    gameOver = false;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            board[i][j].reset();
        }
    };

    // Determine who starts
    let currentMove =  getRandom();
    if(currentMove == 1) {
        // User's turn
         temporaryDisplay("By random choice, you start");
    }
    else {
        // Computer's turn
        temporaryDisplay("By random choice, computer starts");
        computerChance(); 
    }
}

// A function to evaluate the board
const evaluate =  () => {
    // checking all rows
    let firstVal;
    for(let i = 0; i < 3; i++) {
        firstVal = board[i][0].val;
        if(firstVal != 0 && firstVal == board[i][1].val && firstVal == board[i][2].val) {
            return firstVal;
        }
    }

    // checking all cols
    for(let j = 0; j < 3; j++) {
        firstVal = board[0][j].val;
        if(firstVal != 0 && firstVal == board[1][j].val && firstVal == board[2][j].val) {
            return firstVal;
        }
    }

    // checking diagonals
    firstVal = board[0][0].val;
    if(firstVal != 0 && firstVal == board[1][1].val && firstVal == board[2][2].val) {
        return firstVal;
    }

    firstVal = board[0][2].val;
    if(firstVal != 0 && firstVal == board[1][1].val && firstVal == board[2][0].val) {
        return firstVal;
    }

    // checking for tie
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            // not a terminal state
            if(board[i][j].val == 0) {
                return -1;
            }
        }
    }

    // game tied
    return 0;
}

// A function to check if a terminal state is achieved
let isOver =  () => {
    let result =  evaluate();
    if(result == 1) {
        gameOverFolks("You Win!");
    }
    else if(result == 2) {
        gameOverFolks("Computer Wins!");
    } 
    else if(result == 0) {
        gameOverFolks("Draw game.");
    }
    else {
        return false;
    }
    
    gameOver = true;
    return true;
}

// User has made a move
const movePlayed =  (cell) => {
    if(!gameOver) {
        if(cell.play(1) == true) {
            if(!isOver()) {
                computerChance();
                isOver();
            }
        }
    }
}

// The game is over - either someone wins or draw game
const gameOverFolks =  msg => {
    result.innerHTML = msg + '<div id="smaller">Start a new game?  <a href="#" id="start-btn" onclick="initialize()"> Yes </a> </div>';
    result.style.visibility = 'visible';

    // Disabling these functions until the game is re-initialized
    // temporaryDisplay = undefined;
    // computerChance = undefined;
}