// var dt = require('./app');
var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require('formidable');
// var nodemailer = require('nodemailer');


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
