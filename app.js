//Yefim Shneyderman and Aryan Singh 2018
// var dt = require('./app');
var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
// var nodemailer = require('nodemailer');

//Yefim Shneyderman and Aryan Singh 2018
class Pente{
    //initializes the 13x13 pente board with all 0's to represent blank spaces
    constructor(){
        this.playerTurn = 1;
        this.hasWinner = false;
        this.winner = 0;
        this.board = [];
        for(let x = 0; x<13; ++x){
            let row = [];
            for(let y = 0; y<13; ++y){
                row.push(0);
            }
            this.board.push(row);
        }
    }

    //prints to the console such that x:0 and y:0 are on top left
    printBoard() {
        let print = "";
        for (let x = 0; x < 13; ++x) {
            for (let y = 0; y < 13; ++y) {
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
        for (let x = 0; x < 13; ++x) {
            for (let y = 0; y < 13; ++y) {
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
    }

    playPiece(x,y){
        if(this.playerTurn === 1){
            this.setWhite(x,y);
        }
        else{
            this.setBlack(x,y);
        }
        this.updateBoard();
    }

    //sets the specified piece to black
    setBlack (x,y) {
        this.board[x][y] = 2;
    }

    //sets the specified piece to white
    setWhite (x,y) {
        this.board[x][y] = 1;
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
        this.constructor();
    }

    //method must be called after every move
    //checks for winners by checking for 5 in a row
    //checks for sandwiches and removes the centers
    //updates the player turn information (however it is designed)
    updateBoard(){
        for(let x = 0; x<13; ++x) {
            if(this.hasWinner){break;}
            for (let y = 0; y < 13; ++y) {
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

    //detects if there are any sandwiches branching off the current piece and then deletes the centers
    removeSandwich(x,y){
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
    hasSandwichNorth(x,y){
        if(y-3 < 0){//checks if all nodes exist
            return false;
        }
        return this.getColor(x, y - 3) === this.getColor(x, y) && this.getColor(x, y - 2) === this.getColor(x, y - 1) && this.oppositeColors(x, y, x, y - 1);
        //base case
    }

    hasSandwichNorthEast(x,y){
        if(y-3 < 0 || x+3 > 18){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y - 3) === this.getColor(x, y) && this.getColor(x + 2, y - 2) === this.getColor(x + 1, y - 1) && this.oppositeColors(x, y, x + 1, y - 1);
        //base case
    }

    hasSandwichEast(x,y){
        if(x+3 > 12){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y) === this.getColor(x, y) && this.getColor(x + 2, y) === this.getColor(x + 1, y) && this.oppositeColors(x, y, x + 1, y);
        //base case
    }

    hasSandwichSouthEast(x,y){
        if(x+3 > 12 || y+3 > 12){//checks if all nodes exist
            return false;
        }
        return this.getColor(x + 3, y + 3) === this.getColor(x, y) && this.getColor(x + 2, y + 2) === this.getColor(x + 1, y + 1) && this.oppositeColors(x, y, x + 1, y + 1);
        //base case
    }

    hasSandwichSouth(x,y){
        if(y+3 > 12){//checks if all nodes exist
            return false;
        }
        return this.getColor(x, y + 3) === this.getColor(x, y) && this.getColor(x, y + 2) === this.getColor(x, y + 1) && this.oppositeColors(x, y, x, y + 1);
        //base case
    }

    hasSandwichSouthWest(x,y){
        if(y+3 > 12 || x-3 < 0){//checks if all nodes exist
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


    //check for 5 in a row in any cardinal direction
    hasFiveInARow(x,y){
        return !!(this.north(x, y, 1) || this.northEast(x, y, 1) || this.east(x, y, 1) || this.southEast(x, y, 1) || this.south(x, y, 1) || this.southWest(x, y, 1) || this.west(x, y, 1) || this.northWest(x, y, 1));
    }

    //checks for 5 in a row at each cardinal direction
    north(x,y,count){
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && this.getColor(x,y) === this.getColor(x,y-1)){//point must exist
            return this.north(x, y-1, count+1);
        }
        return(count >= 5);
    }

    northEast(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && x+1 >= 0 && this.getColor(x,y) === this.getColor(x+1,y-1)){//point must exist
            return this.northEast(x+1, y-1, count+1);
        }
        return(count >= 5);
    }

    east(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(x+1 <= 12 && this.getColor(x,y) === this.getColor(x+1,y)){//point must exist
            return this.east(x+1, y, count+1);
        }
        return(count >= 5);
    }

    southEast(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= 12 && x+1 <= 12 && this.getColor(x,y) === this.getColor(x+1,y+1)){//point must exist
            return this.southEast(x+1, y+1, count+1);
        }
        return(count >= 5);
    }

    south(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= 12 && this.getColor(x,y) === this.getColor(x,y+1)){//point must exist
            return this.south(x, y+1, count+1);
        }
        return(count >= 5);
    }

    southWest(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= 12 && x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y+1)){//point must exist
            return this.southWest(x-1, y+1, count+1);
        }
        return(count >= 5);
    }

    west(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y)){//point must exist
            return this.west(x-1, y, count+1);
        }
        return(count >= 5);
    }

    northWest(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y-1 >= 0 && x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y-1)){//point must exist
            return this.northWest(x-1, y-1, count+1);
        }
        return(count >= 5);
    }
}

//playGame
let pente = new Pente(); //creates a board
//call playPiece on the coordinates from (0-12, 0-12)
//playPiece will alternate from player 1 to 2 (player 1 goes first)
//
pente.playPiece(0,0); //fills the slots
pente.playPiece(1,1);
pente.playPiece(1,0);
pente.playPiece(2,2);
pente.playPiece(2,0);
pente.playPiece(3,3);
pente.playPiece(3,0);
pente.playPiece(4,4);
pente.playPiece(4,0)
pente.printBoard(); //should print the board


//create a server object:


exports.myDateTime = function () {
    return Date();
};

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write("The date and time are currently: " + dt.myDateTime());
//     res.write(req.url);
//     res.end();
// }).listen(8080);

// var http = require('http');

// create a server object:
// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080); //the server object listens on port 8080

// var url = require('url');

// this is parsing the url into year and the month
// so if the url has it, then it will show that
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   var q = url.parse(req.url, true).query;
//   var txt = q.year + " " + q.month;
//   res.end(txt);
// }).listen(8080);

/*
CREATING THE SERVER USING THE READ FILE FUNCTION
*/
// http.createServer(function (req, res) {
//   fs.readFile('first.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(html);
//     res.end();
//   });
// }).listen(8080);

fs.readFile('./first.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8080);
});

// new file which has the content which you give here
// fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved2!');
//   });
  
//   // this is a new file for writing
// fs.open('mynewfile2.txt', 'w', function (err, file) {
//     if (err) throw err;
//     console.log('Saved2!');
//   });

//   fs.unlink('mynewfile1.txt', function (err) {
//     if (err) throw err;
//     console.log('File deleted!');
//   });
  
//   fs.unlink('mynewfile2.txt', function (err) {
//     if (err) throw err;
//     console.log('File deleted!');
//   });

var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

// console.log(q.host); //returns 'localhost:8080'
// console.log(q.pathname); //returns '/default.htm'
// console.log(q.search); //returns '?year=2017&month=february'

// var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
// console.log(qdata.month); //returns 'february'

// !-- ---------------------------!
//  THIS IS FOR WINTER AND SUMMER TOGGLE
// http.createServer(function (req, res) {
//     var q = url.parse(req.url, true);
//     var filename = "." + q.pathname;
//     fs.readFile(filename, function(err, data) {
//       if (err) {
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         return res.end("404 Not Found");
//       }  
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       return res.end();
//     });
//   }).listen(8080);

//   var uc = require('upper-case');
//   http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(uc("Hello World!"));
//     res.end();
// }).listen(8080);

// var events = require('events');
// var eventEmitter = new events.EventEmitter();

// //Create an event handler:
// var myEventHandler = function () {
//   console.log('I hear a scream!');
// }

// //Assign the eventhandler to an event:
// eventEmitter.on('scream', myEventHandler);

// //Fire the 'scream' event:
// eventEmitter.emit('scream');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//     res.write('<input type="file" name="filetoupload"><br>');
//     res.write('<input type="submit">');
//     res.write('</form>');
//     return res.end();
//   }).listen(8080);

// TO MOVE THE FILE TO YOUR PLACE OF CHOICE IN THE NEW PATH
// http.createServer(function (req, res) {
//     if (req.url == '/fileupload') {
//       var form = new formidable.IncomingForm();
//       form.parse(req, function (err, fields, files) {
//         var oldpath = files.filetoupload.path;
//         var newpath = 'C:/Users/Aryan/' + files.filetoupload.name;
//         fs.rename(oldpath, newpath, function (err) {
//           if (err) throw err;
//           res.write('File uploaded and moved!');
//           res.end();
//         });
//    });
//     } else {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//       res.write('<input type="file" name="filetoupload"><br>');
//       res.write('<input type="submit">');
//       res.write('</form>');
//       return res.end();
//     }
//   }).listen(8080);

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'aspiringaryan@gmail.com',
//     pass: 'aryan@fbd'
//   }
// });

// var mailOptions = {
//   from: 'aspiringaryan@gmail.com',
//   to: 'aryansingh@umass.edu',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

// http.createServer(function (req, res) {
//         var q = url.parse(req.url, true);
//         var filename = "." + q.pathname;
//         fs.readFile(filename, function(err, data) {
//           if (err) {
//             res.writeHead(404, {'Content-Type': 'text/html'});
//             return res.end("404 Not Found");
//           }  
//           res.writeHead(200, {'Content-Type': 'text/html'});
//           res.write(data);
//           return res.end();
//         });
//       }).listen(8080);
