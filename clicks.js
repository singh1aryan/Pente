//Yefim Shneyderman and Aryan Singh 2018
// class Pente{
    //initializes the board with all 0's to represent blank spaces
    // 0 is for blank, 1 is for black, 2 is for white
    // grey - blank
    // constructor(){
    //     this.playerTurn = 1;
    //     this.hasWinner = false;
    //     this.winner = 0;
    //     
    //     this.initialize();
    // }

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

    function buttonclick(id){
            var property = document.getElementById(id);

            playPiece();
            // if(!click){
            //     property.style.backgroundColor = '#FF0000'
            //     click = true;
            // }
            // else{
            //     property.style.backgroundColor = '#000000'
            //     click = false;
            // }
        }

    //prints a friendly message at the start of the round
    function initialize(){
        console.log("Welcome to Pente!");
    }

    //prints to the console such that x:0 and y:0 are on top left
    function printBoard() {
        let print = "";
        for (let x = 0; x < this.boardSize; ++x) {
            for (let y = 0; y < this.boardSize; ++y) {
                print += this.board[y][x] + " ";
            }
            console.log(print);
            print = "";
        }
    }

    //returns the board array
    function getBoard(){
        return this.board;
    }

    //returns a string formatted such that x:0 and y:0 are on top left of the string
    function toString(){
        let boardString = "";
        let print = "";
        for (let x = 0; x < this.boardSize; ++x) {
            for (let y = 0; y < this.boardSize; ++y) {
                print += this.board[y][x] + " ";
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
        if (!this.isOccupied(x, y)) {
            if (this.playerTurn === 1) {
                this.setWhite(x, y);
            }
            else {
                this.setBlack(x, y);
            }
            this.updateBoard();
        }
        else{
            console.log("That square is already occupied.");
        }
    }

    //returns true if (x,y) is occupied by player 1 or 2
    //returns false if the spot is empty and a new piece can be played there
    function isOccupied(x,y){
        return(this.getColor(x,y) === 1 || this.getColor(x,y) === 2);
    }

    //sets the specified piece to black
    function setBlack (x,y) {
        this.board[x][y].style.backgroundColor = '#000000';
    }

    //sets the specified piece to white
    function setWhite (x,y) {
        this.board[x][y].style.backgroundColor = '#ffffff';
    }

    function setBlank(x,y){
        this.board[x][y].style.backgroundColor = '#D3D3D3';
    }

    //returns the color of the specified piece
    function getColor(x,y) {
        if(this.board[x][y].style.backgroundColor == '#D3D3D3'){//grey
            return 0;
        }
        else if(this.board[x][y].style.backgroundColor == '#000000'){//black
            return 1;
        }
        else{//white
            return 2;
        }
    }

    //returns true if the two specified pieces are opposite player colors and neither is blank
    function oppositeColors(x1,y1,x2,y2){
        if(this.getColor(x1,y1) !== 0 && this.getColor(x2,y2) !== 0 && 
        this.getColor(x1,y1) !== this.getColor(x2,y2)){
            return true;
        }
        return false;
    }

    //resets the game board to all blank
    function resetBoard(){
        this.constructor();
    }

    //method must be called after every move
    //checks for winners by checking for 5 in a row
    //checks for sandwiches and removes the centers
    //updates the player turn information (however it is designed)
    function updateBoard(){
        for(let x = 0; x<this.boardSize; ++x) {
            if(this.hasWinner){break;}
            for (let y = 0; y < this.boardSize; ++y) {
                if(this.hasWinner){break;}
                if(this.getColor(x,y) !== 0){
                    this.removeSandwich(x,y);
                    if (this.hasFiveInARow(x,y)) {
                        this.hasWinner = true;
                        this.declareWinner(x,y);
                    }
                }
            }
        }
        this.updateTurn();
    }

    function updateTurn(){
        if(this.playerTurn === 1){
            this.playerTurn = 2;
        }
        else{
            this.playerTurn = 1;
        }
    }

    //declares a winner and ends the game
    function declareWinner(x,y){
        console.log(this.getColor(x,y) + " wins the game!");
        this.winner = this.getColor(x,y);
    }

    //detects if there are any sandwiches branching off the current piece and then deletes the centers
    function removeSandwich(x,y){
        if(this.hasSandwichNorth(x,y)){
            this.delete(x,y-1);
            this.delete(x,y-2);
        }
        if(this.hasSandwichNorthEast(x,y)){
            this.delete(x+1,y-1);
            this.delete(x+2,y-2);
        }
        if(this.hasSandwichEast(x,y)){
            this.delete(x+1,y);
            this.delete(x+2,y);
        }
        if(this.hasSandwichSouthEast(x,y)){
            this.delete(x+1,y+1);
            this.delete(x+2,y+2);
        }
        if(this.hasSandwichSouth(x,y)){
            this.delete(x,y+1);
            this.delete(x,y+2);
        }
        if(this.hasSandwichSouthWest(x,y)){
            this.delete(x-1,y+1);
            this.delete(x-1,y+2);
        }
        if(this.hasSandwichWest(x,y)){
            this.delete(x-1,y);
            this.delete(x-2,y);
        }
        if(this.hasSandwichNorthWest(x,y)){
            console.log("Removing sandwich");
            this.delete(x-1,y-1);
            this.delete(x-2,y-2);
        }
    }

    //checks for sandwiches in each cardinal direction
    function hasSandwichNorth(x,y){
        if(y-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x, y - 3) === this.getColor(x, y) && this.getColor(x, y - 2) === this.getColor(x, y - 1) && this.oppositeColors(x, y, x, y - 1);
        //base case
    }

    function hasSandwichNorthEast(x,y){
        if(y-3 < 0 || x+3 > 18){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y - 3) === this.getColor(x, y) && this.getColor(x + 2, y - 2) === this.getColor(x + 1, y - 1) && this.oppositeColors(x, y, x + 1, y - 1);
        //base case
    }

    function hasSandwichEast(x,y){
        if(x+3 > this.boardSize-1){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y) === this.getColor(x, y) && this.getColor(x + 2, y) === this.getColor(x + 1, y) && this.oppositeColors(x, y, x + 1, y);
        //base case
    }

    function hasSandwichSouthEast(x,y){
        if(x+3 > this.boardSize-1 || y+3 > this.boardSize-1){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y + 3) === this.getColor(x, y) && this.getColor(x + 2, y + 2) === this.getColor(x + 1, y + 1) && this.oppositeColors(x, y, x + 1, y + 1);
        //base case
    }

    function hasSandwichSouth(x,y){
        if(y+3 > this.boardSize-1){//checks if all nodes exist
            return false;
        }
        return this.getColor(x, y + 3) === this.getColor(x, y) && this.getColor(x, y + 2) === this.getColor(x, y + 1) && this.oppositeColors(x, y, x, y + 1);
        //base case
    }

    function hasSandwichSouthWest(x,y){
        if(y+3 > this.boardSize-1 || x-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x - 3, y + 3) === this.getColor(x, y) && this.getColor(x - 2, y + 2) === this.getColor(x - 1, y + 1) && this.oppositeColors(x, y, x - 1, y + 1);
        //base case
    }

    function hasSandwichWest(x,y){
        if(x-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x - 3, y) === this.getColor(x, y) && this.getColor(x - 2, y) === this.getColor(x - 1, y) && this.oppositeColors(x, y, x - 1, y);
        //base case
    }

    function hasSandwichNorthWest(x,y){
        if(x-3 < 0 || y-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x - 3, y - 3) === this.getColor(x, y) && this.getColor(x - 2, y - 2) === this.getColor(x - 1, y - 1) && this.oppositeColors(x, y, x - 1, y - 1);
        //base case
    }


    //check for 5 in a row in any cardinal direction
    function hasFiveInARow(x,y){
        return !!(this.north(x, y, 1) || this.northEast(x, y, 1) || this.east(x, y, 1) || this.southEast(x, y, 1) || this.south(x, y, 1) || this.southWest(x, y, 1) || this.west(x, y, 1) || this.northWest(x, y, 1));
    }

    //checks for 5 in a row at each cardinal direction
    function north(x,y,count){
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && this.getColor(x,y) === this.getColor(x,y-1)){//point must exist
            return this.north(x, y-1, count+1);
        }
        return(count >= 5);
    }

    function northEast(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && x+1 >= 0 && this.getColor(x,y) === this.getColor(x+1,y-1)){//point must exist
            return this.northEast(x+1, y-1, count+1);
        }
        return(count >= 5);
    }

    function east(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(x+1 <= this.boardSize-1 && this.getColor(x,y) === this.getColor(x+1,y)){//point must exist
            return this.east(x+1, y, count+1);
        }
        return(count >= 5);
    }

    function southEast(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= this.boardSize-1 && x+1 <= this.boardSize-1 && this.getColor(x,y) === this.getColor(x+1,y+1)){//point must exist
            return this.southEast(x+1, y+1, count+1);
        }
        return(count >= 5);
    }

    function south(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= this.boardSize-1 && this.getColor(x,y) === this.getColor(x,y+1)){//point must exist
            return this.south(x, y+1, count+1);
        }
        return(count >= 5);
    }

    function southWest(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= this.boardSize-1 && x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y+1)){//point must exist
            return this.southWest(x-1, y+1, count+1);
        }
        return(count >= 5);
    }

    function west(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y)){//point must exist
            return this.west(x-1, y, count+1);
        }
        return(count >= 5);
    }

    function northWest(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y-1)){//point must exist
            return this.northWest(x-1, y-1, count+1);
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


