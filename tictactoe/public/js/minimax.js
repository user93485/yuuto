let minimax = (depth, toMaximize) => {
    let score = evaluate();
    // Human wins
    if(score == 1) {
        return -10;
    }
    // Computer wins
    if(score == 2) {
        return 10;
    }
    // Tie game
    if(score == 0) {
        return 0;
    }

    if(toMaximize) {
        let best = -Infinity;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j].val == 0) {
                    board[i][j].val = 2;
                    best = Math.max(best, minimax(depth + 1, false));
                    board[i][j].val = 0;
                }
            }
        }
        return best;
    }
    else {
        let best = Infinity;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(board[i][j].val == 0) {
                    board[i][j].val = 1;
                    best = Math.min(best, minimax(depth + 1, true));
                    board[i][j].val = 0;
                }
            }
        }
        return best;
    }
}

let find_best_move = () => {
    let bestVal = -Infinity;
    let moveVal = -Infinity;
    let bestMove;

    
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j].val == 0) {
                board[i][j].val = 2;
                moveVal = minimax(0, false);
                board[i][j].val = 0;

                if(moveVal > bestVal) {
                    bestMove = {i, j};
                    bestVal = moveVal;
                }
            }
        }
    }
    
    return bestMove;
}