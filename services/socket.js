/**
 * Created by Hannes on 31.10.2016.
 */
var io = require('socket.io');


function notifyAllClients() {
    io.emit("Change");
}