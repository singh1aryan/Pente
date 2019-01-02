//Yefim Shneyderman and Aryan Singh 2018
class Pente{
    //initializes the board with all 0's to represent blank spaces
    constructor(){
        this.initialize();
    }

    //prints a friendly message at the start of the round
    initialize(){
        this.playerTurn = 1;
        this.hasWinner = false;
        this.winner = 0;
        this.board = [];
        this.boardSize = 13;
        this.blackCapture = 0;
        this.whiteCapture = 0;
        for(let x = 0; x<this.boardSize; ++x){
            let row = [];
            for(let y = 0; y<this.boardSize; ++y){
                row.push(0);
            }
            this.board.push(row);
        }
        console.log("Welcome to Pente!");
    }

    //prints to the console such that x:0 and y:0 are on top left
    printBoard() {
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
    getBoard(){
        return this.board;
    }

    //returns a string formatted such that x:0 and y:0 are on top left of the string
    toString(){
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
    delete(x,y){
        this.board[x][y] = 0;
        board[x][y].style.backgroundColor = '#D3D3D3'
    }

    //plays a piece at the correct spot and calls updateBoard to update player turn and update board
    //only does so if place is not occupied by any other piece
    playPiece(x,y) {
        if (!this.isOccupied(x, y)) {
            if (this.playerTurn === 1) {
                this.setBlack(x, y);
                board[x][y].style.backgroundColor = '#000000'
            }
            else {
                this.setWhite(x, y);
                board[x][y].style.backgroundColor = '#FFFFFF'
            }
            this.updateBoard();
        }
        else{
            console.log("That square is already occupied.");
        }
    }

    //returns true if (x,y) is occupied by player 1 or 2
    //returns false if the spot is empty and a new piece can be played there
    isOccupied(x,y){
        return(this.getColor(x,y) === 1 || this.getColor(x,y) === 2);
    }

    //sets the specified piece to black
    setBlack (x,y) {
        this.board[x][y] = 1;
    }

    //sets the specified piece to white
    setWhite (x,y) {
        this.board[x][y] = 2;
    }

    //returns the color of the specified piece
    getColor(x,y) {
        return this.board[x][y];
    }

    //returns true if the two specified pieces are opposite player colors and neither is blank
    oppositeColors(x1,y1,x2,y2){
        if(this.getColor(x1,y1) !== 0 && this.getColor(x2,y2) !== 0 && this.getColor(x1,y1) !== this.getColor(x2,y2)){
            return true;
        }
        return false;
    }

    //resets the game board to all blank
    resetBoard(){
        this.initialize();
    }

    //method must be called after every move
    //checks for winners by checking for 5 in a row
    //checks for sandwiches and removes the centers
    //updates the player turn information (however it is designed)
    updateBoard(){
        for(let x = 0; x<this.boardSize; ++x) {
            if(this.hasWinner){break;}
            for (let y = 0; y < this.boardSize; ++y) {
                if(this.hasWinner){break;}
                if(this.getColor(x,y) !== 0){
                    this.removeSandwich(x,y);
                    if(this.blackCapture >= 5){
                        this.hasWinner = true;
                        this.declareWinner(1);
                    }
                    else if(this.whiteCapture >= 5){
                        this.hasWinner = true;
                        this.declareWinner(2);
                    }
                    //if has 5 in a row
                    else if (this.hasSumInARow(x,y,5)) {
                        this.hasWinner = true;
                        this.declareWinner(x,y);
                    }
                    else if (this.hasSumInARow(x,y,4)) {
                        this.declareTessera(x,y);
                    }
                    else if (this.hasSumInARow(x,y,3)) {
                        this.declareTria(x,y);
                    }
                }
            }
        }
        this.updateTurn();
    }

    updateTurn(){
        if(this.playerTurn === 1){
            this.playerTurn = 2;
        }
        else{
            this.playerTurn = 1;
        }
    }

    //declares a winner and ends the game
    declareWinner(x,y){
        console.log(this.getColor(x,y) + " wins the game!");
        this.winner = this.getColor(x,y);
    }

    //declares a winner and ends the game
    declareWinner(num){
        console.log(num + " wins the game!");
        this.winner = num;
    }

    declareTessera(x,y){
        console.log(this.getColor(x,y) + " has Tessera!");
    }

    declareTria(x,y){
        console.log(this.getColor(x,y) + " has Tria!");
    }

    //detects if there are any sandwiches branching off the current piece and then deletes the centers
    removeSandwich(x,y){
        if(this.hasSandwichNorth(x,y)){
            this.delete(x,y-1);
            this.delete(x,y-2);
            if(this.getColor(x,y) === 1){
                this.blackCapture += 1;
            }
            else{
                this.whiteCapture += 1;
            }
        }
        if(this.hasSandwichNorthEast(x,y)){
            this.delete(x+1,y-1);
            this.delete(x+2,y-2);
            if(this.getColor(x,y) === 1){
                this.blackCapture += 1;
            }
            else{
                this.whiteCapture += 1;
            }
        }
        if(this.hasSandwichEast(x,y)){
            this.delete(x+1,y);
            this.delete(x+2,y);
            if(this.getColor(x,y) === 1){
                this.blackCapture += 1;
            }
            else{
                this.whiteCapture += 1;
            }
        }
        if(this.hasSandwichSouthEast(x,y)){
            this.delete(x+1,y+1);
            this.delete(x+2,y+2);
            if(this.getColor(x,y) === 1){
                this.blackCapture += 1;
            }
            else{
                this.whiteCapture += 1;
            }
        }
        if(this.hasSandwichSouth(x,y)){
            this.delete(x,y+1);
            this.delete(x,y+2);
            if(this.getColor(x,y) === 1){
                this.blackCapture += 1;
            }
            else{
                this.whiteCapture += 1;
            }
        }
        if(this.hasSandwichSouthWest(x,y)){
            this.delete(x-1,y+1);
            this.delete(x-1,y+2);
            if(this.getColor(x,y) === 1){
                this.blackCapture += 1;
            }
            else{
                this.whiteCapture += 1;
            }
        }
        if(this.hasSandwichWest(x,y)){
            this.delete(x-1,y);
            this.delete(x-2,y);
            if(this.getColor(x,y) === 1){
                this.blackCapture += 1;
            }
            else{
                this.whiteCapture += 1;
            }
        }
        if(this.hasSandwichNorthWest(x,y)){
            this.delete(x-1,y-1);
            this.delete(x-2,y-2);
            if(this.getColor(x,y) === 1){
                this.blackCapture += 1;
            }
            else{
                this.whiteCapture += 1;
            }
        }
    }

    //checks for sandwiches in each cardinal direction
    hasSandwichNorth(x,y){
        if(y-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x, y - 3) === this.getColor(x, y) && this.getColor(x, y - 2) === this.getColor(x, y - 1) && this.oppositeColors(x, y, x, y - 1);
        //base case
    }

    hasSandwichNorthEast(x,y){
        if(y-3 < 0 || x+3 > this.boardSize-1){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y - 3) === this.getColor(x, y) && this.getColor(x + 2, y - 2) === this.getColor(x + 1, y - 1) && this.oppositeColors(x, y, x + 1, y - 1);
        //base case
    }

    hasSandwichEast(x,y){
        if(x+3 > this.boardSize-1){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y) === this.getColor(x, y) && this.getColor(x + 2, y) === this.getColor(x + 1, y) && this.oppositeColors(x, y, x + 1, y);
        //base case
    }

    hasSandwichSouthEast(x,y){
        if(x+3 > this.boardSize-1 || y+3 > this.boardSize-1){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y + 3) === this.getColor(x, y) && this.getColor(x + 2, y + 2) === this.getColor(x + 1, y + 1) && this.oppositeColors(x, y, x + 1, y + 1);
        //base case
    }

    hasSandwichSouth(x,y){
        if(y+3 > this.boardSize-1){//checks if all nodes exist
            return false;
        }
        return this.getColor(x, y + 3) === this.getColor(x, y) && this.getColor(x, y + 2) === this.getColor(x, y + 1) && this.oppositeColors(x, y, x, y + 1);
        //base case
    }

    hasSandwichSouthWest(x,y){
        if(y+3 > this.boardSize-1 || x-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x - 3, y + 3) === this.getColor(x, y) && this.getColor(x - 2, y + 2) === this.getColor(x - 1, y + 1) && this.oppositeColors(x, y, x - 1, y + 1);
        //base case
    }

    hasSandwichWest(x,y){
        if(x-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x - 3, y) === this.getColor(x, y) && this.getColor(x - 2, y) === this.getColor(x - 1, y) && this.oppositeColors(x, y, x - 1, y);
        //base case
    }

    hasSandwichNorthWest(x,y){
        if(x-3 < 0 || y-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x - 3, y - 3) === this.getColor(x, y) && this.getColor(x - 2, y - 2) === this.getColor(x - 1, y - 1) && this.oppositeColors(x, y, x - 1, y - 1);
        //base case
    }


    //check for targetCount in a row in any cardinal direction
    hasSumInARow(x,y,targetCount){
        return (this.north(x, y, 1,targetCount) || this.northEast(x, y, 1,targetCount) || this.east(x, y, 1,targetCount) || this.southEast(x, y, 1,targetCount) || this.south(x, y, 1,targetCount) || this.southWest(x, y, 1,targetCount) || this.west(x, y, 1,targetCount) || this.northWest(x, y, 1,targetCount));
    }

    //checks for targetCount in a row at each cardinal direction
    north(x,y,count,targetCount){
        if(count >= targetCount){
            return true;
        }
        else if(y-1 >= 0 && this.getColor(x,y) === this.getColor(x,y-1)){//point must exist
            return this.north(x, y-1, count+1, targetCount);
        }
        return(count >= targetCount);
    }

    northEast(x,y,count,targetCount) {
        if(count >= targetCount){
            return true;
        }
        else if(y-1 >= 0 && x+1 <= this.boardSize-1 && this.getColor(x,y) === this.getColor(x+1,y-1)){//point must exist
            return this.northEast(x+1, y-1, count+1, targetCount);
        }
        return(count >= targetCount);
    }

    east(x,y,count,targetCount) {
        if(count >= targetCount){
            return true;
        }
        else if(x+1 <= this.boardSize-1 && this.getColor(x,y) === this.getColor(x+1,y)){//point must exist
            return this.east(x+1, y, count+1, targetCount);
        }
        return(count >= targetCount);
    }

    southEast(x,y,count,targetCount) {
        if(count >= targetCount){
            return true;
        }
        else if(y+1 <= this.boardSize-1 && x+1 <= this.boardSize-1 && this.getColor(x,y) === this.getColor(x+1,y+1)){//point must exist
            return this.southEast(x+1, y+1, count+1, targetCount);
        }
        return(count >= targetCount);
    }

    south(x,y,count,targetCount) {
        if(count >= targetCount){
            return true;
        }
        else if(y+1 <= this.boardSize-1 && this.getColor(x,y) === this.getColor(x,y+1)){//point must exist
            return this.south(x, y+1, count+1, targetCount);
        }
        return(count >= targetCount);
    }

    southWest(x,y,count,targetCount) {
        if(count >= targetCount){
            return true;
        }
        else if(y+1 <= this.boardSize-1 && x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y+1)){//point must exist
            return this.southWest(x-1, y+1, count+1, targetCount);
        }
        return(count >= targetCount);
    }

    west(x,y,count,targetCount) {
        if(count >= targetCount){
            return true;
        }
        else if(x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y)){//point must exist
            return this.west(x-1, y, count+1, targetCount);
        }
        return(count >= targetCount);
    }

    northWest(x,y,count,targetCount) {
        if(count >= targetCount){
            return true;
        }
        else if(y-1 >= 0 && x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y-1)){//point must exist
            return this.northWest(x-1, y-1, count+1, targetCount);
        }
        return(count >= targetCount);
    }
}

    let board = []
    let pente = new Pente();

    //initializes board
    for(let i=0;i<13;++i){
        let c= [];
        for(let j=0;j<13;++j){
            document.getElementById('btn' + i + ',' + j).style.backgroundColor = '#D3D3D3';
            c.push(document.getElementById('btn' + i + ',' + j));
        }
        board.push(c);
    }

    function buttonclick(id){
        let splitArray = id.split(',');
        let y = splitArray[1];
        let x = splitArray[0].substring(3, splitArray[0].length);
        if(!pente.hasWinner) {
            pente.playPiece(x, y);
        }
    }