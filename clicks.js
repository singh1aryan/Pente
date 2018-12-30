//Yefim Shneyderman and Aryan Singh 2018
// class Pente

    let playerTurn = 0;
    let board = [];
    let boardSize = 13;
        for(let i=0;i<13;++i){
        let c= [];
            for(let j=0;j<13;++j){
                document.getElementById('btn' + i + ',' + j).style.backgroundColor = '#D3D3D3';
                c.push(document.getElementById('btn' + i + ',' + j));
            }
            board.push(c);
    }   

    let click = false;
    function buttonclick(id){
            var property = document.getElementById(id);
            // playPiece();
            // have to pass x,y in playPiece
            let a = id.split(',');
            playPiece(a[0],a[1]);
            
            if(!click){
                property.style.backgroundColor = '#FF0000'
                click = true;
            }
            else{
                property.style.backgroundColor = '#000000'
                click = false;
            }
        }

    //prints a friendly message at the start of the round
    function initialize(){
        console.log("Welcome to Pente!");
    }

    //prints to the console such that x:0 and y:0 are on top left
    function printBoard() {
        let print = "";
        for (let x = 0; x < boardSize; ++x) {
            for (let y = 0; y < boardSize; ++y) {
                print += board[y][x] + " ";
            }
            console.log(print);
            print = "";
        }
    }

    //returns the board array
    function getBoard(){
        return  board;
    }

    //returns a string formatted such that x:0 and y:0 are on top left of the string
    function toString(){
        let boardString = "";
        let print = "";
        for (let x = 0; x <  boardSize; ++x) {
            for (let y = 0; y <  boardSize; ++y) {
                print +=  board[y][x] + " ";
            }
            boardString = boardString + print + "\r\n";
            print = "";
        }
        return boardString;
    }

    //removes the specified piece from the board and leaves an empty space
    // function delete(x,y){
    //     board[x][y] = 0;
    //     board[x][y].style.backgroundColor = '#D3D3D3';
    // }

    //plays a piece at the correct spot and calls updateBoard to update player turn and update board
    //only does so if place is not occupied by any other piece
    function playPiece(x,y) {
        if (!isOccupied(x, y)) {
            if (playerTurn === 1) {
                 setWhite(x, y);
            }
            else {
                setBlack(x, y);
            }
            updateBoard();
        }
        else{
            console.log("That square is already occupied.");
        }
    }

    //returns true if (x,y) is occupied by player 1 or 2
    //returns false if the spot is empty and a new piece can be played there
    function isOccupied(x,y){
        return(getColor(x,y) === 1 || getColor(x,y) === 2);
    }

    //sets the specified piece to black
    function setBlack (x,y) {
        board[x][y].style.backgroundColor = '#000000';
    }

    //sets the specified piece to white
    function setWhite (x,y) {
        board[x][y].style.backgroundColor = '#ffffff';
    }

    function setBlank(x,y){
        board[x][y].style.backgroundColor = '#D3D3D3';
    }

    //returns the color of the specified piece
    function getColor(x,y) {
        if(board[x][y].style.backgroundColor == '#D3D3D3'){//grey
            return 0;
        }
        else if(board[x][y].style.backgroundColor == '#000000'){//black
            return 1;
        }
        else{//white
            return 2;
        }
    }

    //returns true if the two specified pieces are opposite player colors and neither is blank
    function oppositeColors(x1,y1,x2,y2){
        if(getColor(x1,y1) !== 0 && getColor(x2,y2) !== 0 && 
        getColor(x1,y1) !== getColor(x2,y2)){
            return true;
        }
        return false;
    }

    //resets the game board to all blank
    // function resetBoard(){
    //     constructor();
    // }

    //method must be called after every move
    //checks for winners by checking for 5 in a row
    //checks for sandwiches and removes the centers
    //updates the player turn information (however it is designed)
    function updateBoard(){
        for(let x = 0; x<boardSize; ++x) {
            if(hasWinner){break;}
            for (let y = 0; y < boardSize; ++y) {
                if(hasWinner){break;}
                if(getColor(x,y) !== 0){
                    removeSandwich(x,y);
                    if (hasFiveInARow(x,y)) {
                        hasWinner = true;
                        declareWinner(x,y);
                    }
                }
            }
        }
         updateTurn();
    }

    function updateTurn(){
        if( playerTurn === 1){
             playerTurn = 2;
        }
        else{
             playerTurn = 1;
        }
    }

    //declares a winner and ends the game
    function declareWinner(x,y){
        console.log( getColor(x,y) + " wins the game!");
         winner =  getColor(x,y);
    }

    //detects if there are any sandwiches branching off the current piece and then deletes the centers
    function removeSandwich(x,y){
        if( hasSandwichNorth(x,y)){
             delete(x,y-1);
             delete(x,y-2);
        }
        if( hasSandwichNorthEast(x,y)){
             delete(x+1,y-1);
             delete(x+2,y-2);
        }
        if( hasSandwichEast(x,y)){
             delete(x+1,y);
             delete(x+2,y);
        }
        if( hasSandwichSouthEast(x,y)){
             delete(x+1,y+1);
             delete(x+2,y+2);
        }
        if( hasSandwichSouth(x,y)){
             delete(x,y+1);
             delete(x,y+2);
        }
        if( hasSandwichSouthWest(x,y)){
             delete(x-1,y+1);
             delete(x-1,y+2);
        }
        if( hasSandwichWest(x,y)){
             delete(x-1,y);
             delete(x-2,y);
        }
        if( hasSandwichNorthWest(x,y)){
            console.log("Removing sandwich");
             delete(x-1,y-1);
             delete(x-2,y-2);
        }
    }

    //checks for sandwiches in each cardinal direction
    function hasSandwichNorth(x,y){
        if(y-3 < 0){//checks if all nodes exist
            return false;
        }
        return  getColor(x, y - 3) ===  getColor(x, y) &&  getColor(x, y - 2) ===  getColor(x, y - 1) &&  oppositeColors(x, y, x, y - 1);
        //base case
    }

    function hasSandwichNorthEast(x,y){
        if(y-3 < 0 || x+3 > 18){//checks if all nodes exist
            return false;
        }
        return  getColor(x + 3, y - 3) ===  getColor(x, y) &&  getColor(x + 2, y - 2) ===  getColor(x + 1, y - 1) &&  oppositeColors(x, y, x + 1, y - 1);
        //base case
    }

    function hasSandwichEast(x,y){
        if(x+3 >  boardSize-1){//checks if all nodes exist
            return false;
        }
        return  getColor(x + 3, y) ===  getColor(x, y) &&  getColor(x + 2, y) ===  getColor(x + 1, y) &&  oppositeColors(x, y, x + 1, y);
        //base case
    }

    function hasSandwichSouthEast(x,y){
        if(x+3 >  boardSize-1 || y+3 >  boardSize-1){//checks if all nodes exist
            return false;
        }
        return  getColor(x + 3, y + 3) ===  getColor(x, y) &&  getColor(x + 2, y + 2) ===  getColor(x + 1, y + 1) &&  oppositeColors(x, y, x + 1, y + 1);
        //base case
    }

    function hasSandwichSouth(x,y){
        if(y+3 >  boardSize-1){//checks if all nodes exist
            return false;
        }
        return  getColor(x, y + 3) ===  getColor(x, y) &&  getColor(x, y + 2) ===  getColor(x, y + 1) &&  oppositeColors(x, y, x, y + 1);
        //base case
    }

    function hasSandwichSouthWest(x,y){
        if(y+3 >  boardSize-1 || x-3 < 0){//checks if all nodes exist
            return false;
        }
        return  getColor(x - 3, y + 3) ===  getColor(x, y) &&  getColor(x - 2, y + 2) ===  getColor(x - 1, y + 1) &&  oppositeColors(x, y, x - 1, y + 1);
        //base case
    }

    function hasSandwichWest(x,y){
        if(x-3 < 0){//checks if all nodes exist
            return false;
        }
        return getColor(x - 3, y) === getColor(x, y) && getColor(x - 2, y) === getColor(x - 1, y) && oppositeColors(x, y, x - 1, y);
        //base case
    }

    function hasSandwichNorthWest(x,y){
        if(x-3 < 0 || y-3 < 0){//checks if all nodes exist
            return false;
        }
        return getColor(x - 3, y - 3) ===  getColor(x, y) &&  getColor(x - 2, y - 2) ===  getColor(x - 1, y - 1) &&  oppositeColors(x, y, x - 1, y - 1);
        //base case
    }


    //check for 5 in a row in any cardinal direction
    function hasFiveInARow(x,y){
        return !!(north(x, y, 1) || northEast(x, y, 1) || east(x, y, 1) || southEast(x, y, 1) 
        || south(x, y, 1) || southWest(x, y, 1) || west(x, y, 1) || northWest(x, y, 1));
    }

    //checks for 5 in a row at each cardinal direction
    function north(x,y,count){
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && getColor(x,y) === getColor(x,y-1)){//point must exist
            return north(x, y-1, count+1);
        }
        return(count >= 5);
    }

    function northEast(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && x+1 >= 0 && getColor(x,y) === getColor(x+1,y-1)){//point must exist
            return northEast(x+1, y-1, count+1);
        }
        return(count >= 5);
    }

    function east(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(x+1 <= boardSize-1 && getColor(x,y) === getColor(x+1,y)){//point must exist
            return east(x+1, y, count+1);
        }
        return(count >= 5);
    }

    function southEast(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= boardSize-1 && x+1 <= boardSize-1 && getColor(x,y) === getColor(x+1,y+1)){//point must exist
            return southEast(x+1, y+1, count+1);
        }
        return(count >= 5);
    }

    function south(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= boardSize-1 && getColor(x,y) === getColor(x,y+1)){//point must exist
            return south(x, y+1, count+1);
        }
        return(count >= 5);
    }

    function southWest(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= boardSize-1 && x-1 >= 0 && getColor(x,y) === getColor(x-1,y+1)){//point must exist
            return southWest(x-1, y+1, count+1);
        }
        return(count >= 5);
    }

    function west(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(x-1 >= 0 && getColor(x,y) === getColor(x-1,y)){//point must exist
            return west(x-1, y, count+1);
        }
        return(count >= 5);
    }

    function northWest(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && x-1 >= 0 && getColor(x,y) === getColor(x-1,y-1)){//point must exist
            return northWest(x-1, y-1, count+1);
        }
        return(count >= 5);
    }


//playGame
// let pente = new Pente(); //creates a board and prints a welcome message
// pente.playPiece(0,0); //fills the slots
// pente.playPiece(1,1);
// pente.playPiece(1,0);
// pente.playPiece(2,2);
// pente.playPiece(2,0);
// pente.playPiece(3,3);
// pente.playPiece(3,0);
// pente.playPiece(4,4);
// pente.playPiece(4,0)
// pente.printBoard(); //should print the board



// let click = false;
// 
// // function buttonclick(){
// //     var property = document.getElementById('btn0,1');
// //     if(!click){
// //         property.style.backgroundColor = '#FF0000'
// //         click = true;
// //     }
// //     else{
// //         property.style.backgroundColor = '#000000'
// //         click = false;
// //     }
// // }


