// minimax algo for a pente
// we can add alpha beta pruning for more


let player = 'x';
let opponent = 'o';

// class Move:
//     def __init__(self):
//         self.row = None
//         self.column = None
class Move{
    constructor(row, column){
        this.row = row;
        this.column = column;
    }
}

class Minimax{
minimax(board, depth, isMaxPlayer){
    
    let score = evaluate(board);
    if(score == 10 || score == -10){
        return score;
    }

    if(isMovesLeft(board) == False){
        return 0;
    }
        
    // ''' If the max condition is true, its AI's turn'''
    if(isMaxPlayer == true){
        bestVal = -1000
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j] == '_'){
                board[r][c] = player;
                bestVal = max(bestVal, minimax(board, depth+1, false));
                board[r][c] = '_';
            }
        }
    }
        return bestVal;
    }

    // ''' if the max player is false // its the opponent's turn'''
    if(isMaxPlayer == false){
        bestVal = 1000
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j] == '_'){
                board[r][c] = player;
                bestVal = min(bestVal, minimax(board, depth+1, true));
                board[r][c] = '_';
                }
            }
        }       
        return bestVal;
    }
}

isMovesLeft(board){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){        
            if(board[i][j] == '_'){
                return true;
            }
        }
    }
    return false;
}
    

// ''' 
// Evaluate the score for the position of the board
// This can be improved/written differently - recursive or using direction arrays   
// '''
evaluate(board){
    for(let i=0;i<3;i++){
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2]){
            if(board[i][0] == player)
                return 10;
            else if(board[i][0] == opponent)
                return -10;
        }
    }
    
    for(let i=0;i<3;i++){
        if(board[0][i] == board[1][i] && board[1][i] == board[2][i]){
            if(board[0][i] == player)
                return 10;
            elif(board[0][i] == opponent)
                return -10;
        }
    }

    if(board[0][0] == board[1][1] && board[1][1] == board[2][2]){
        if(board[0][0] == player)
            return 10;
        else if(board[0][0] == opponent)
            return -10;
    }

    if(board[0][2] == board[1][1] && board[1][1] == board[2][0]){
        if(board[0][2] == player)
            return 10
        else if(board[0][2] == opponent)
            return -10
    }

    
    return -1

}

findBestMove(board){
    console.log((5));
    bestVal = -1000;
    move = Move();
    for(let r=0;r<3;r++){     
        for(let c=0;c<3;c++){
            if(board[r][c] == '_'){
                board[r][c] = player;
                val = minimax(board, 0, false);
                board[r][c] = '_';
                if(val>bestVal){
                    move.row = r;
                    move.column = c;
                    bestVal = val;
                }
            }
        }
    }

    // console.log(('move row: ', move.row)
    // console.log(('move column: ',move.column)
    // console.log(('previous board: ',board)
    // board[move.row][move.column] = player
    // console.log(('new board: ',board)

}

}            
    
// board = [
//         [ 'x', 'o', 'x' ], 
//         [ 'o', 'o', 'x' ], 
//         [ '_', '_', '_']
//         ]
    
// findBestMove(board)
