var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


function errorHandler(err, req, res, next) {
    res.status(500).end(err.message);
}

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(errorHandler);

app.get("/", function(req, res){
    res.sendFile("/index.html",  {root: __dirname + '/public/'});
});


const hostname = '127.0.0.1';
const port = 3333;

http.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });


module.exports = {socket: io};

app.use("/notes", require('./routes/noteRoutes.js'));