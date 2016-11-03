var express = require('express');
var bodyParser = require('body-parser');
var io = require('socket.io');

var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());


app.get("/", function(req, res){
    res.sendFile("/index.html",  {root: __dirname + '/public/'});
});

app.use("/notes", require('./routes/noteRoutes.js'));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else {
        next(error);
    }
});

const hostname = '127.0.0.1';
const port = 3333;
var server = app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });
io.listen(server);

module.exports = {socket: io};