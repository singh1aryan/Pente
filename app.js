// var dt = require('./app');
var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
// var nodemailer = require('nodemailer');

//Pente board
/*
Pente is denoted by a double array with x axis and y axis like so:
0  .  .  x
.
.
y
 */
*/
 */
class Pente{
    constructor(){
        this.board = [];
        for(let x = 0; x<19; ++x){
            let row = [];
            for(let y = 0; y<19; ++y){
                row.push(0);
            }
            this.board.push(row);
        }
    }
    printBoard() {
        for (let x = 0; x < 19; ++x) {
            console.log(this.board[x]);
        }
    }

    getBoard(){
        return this.board;
    }

    toString(){
        let boardString = "";
        for (let x = 0; x < 19; ++x) {
            boardString += this.board[x].toString() + "\r\n";
        }
        return boardString;
    }

    setBlack (x,y) {
        this.board[x][y] = 2;
    }

    setWhite (x,y) {
        this.board[x][y] = 1;
    }

    getColor(x,y) {
        return this.board[x][y];
    }

    resetBoard(){
        this.constructor();
    }
    updateBoard(){
        let hasWinner = false;
        for(let x = 0; x<19; ++x) {
            if(hasWinner){break;}
            for (let y = 0; y < 19; ++y) {
                if(hasWinner){break;}
                if(this.getColor(x,y) !== 0){
                    if (this.hasFiveInARow(x,y)) {
                        hasWinner = true;
                        console.log(this.getColor(x,y) + " wins the game!");
                    }
                }
            }
        }

        //check for any 5 in a row
        //check if it is of the color
        //count +1
        //check if it has neighbors that are that color and repeat if it does
        //if count gets to 5, then declare winner
        //check for any that could be eaten eaten
    }

    hasFiveInARow(x,y){
        if(this.north(x,y,1) || this.northEast(x,y,1) || this.east(x,y,1) || this.southEast(x,y,1) || this.south(x,y,1) || this.southWest(x,y,1) || this.west(x,y,1) || this.northWest(x,y,1)){
            return true;
        }
        return false;
    }

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
        else if(x+1 <= 18 && this.getColor(x,y) === this.getColor(x+1,y)){//point must exist
            return this.east(x+1, y, count+1);
        }
        return(count >= 5);
    }

    southEast(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= 18 && x+1 <= 18 && this.getColor(x,y) === this.getColor(x+1,y+1)){//point must exist
            return this.southEast(x+1, y+1, count+1);
        }
        return(count >= 5);
    }

    south(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= 18 && this.getColor(x,y) === this.getColor(x,y+1)){//point must exist
            return this.south(x, y+1, count+1);
        }
        return(count >= 5);
    }

    southWest(x,y,count) {
        if(count >= 5){
            return true;
        }
        else if(y+1 <= 18 && x-1 >= 0 && this.getColor(x,y) === this.getColor(x-1,y+1)){//point must exist
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
pente.board[0][0] = 2;
pente.board[0][1] = 2;
pente.board[0][2] = 2;
pente.board[0][3] = 2;
pente.board[0][4] = 2; //fills the slots
pente.updateBoard(); //should print "2 wins the game!"

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
