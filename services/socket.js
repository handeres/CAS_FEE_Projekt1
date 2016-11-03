/**
 * Created by Hannes on 31.10.2016.
 */
/*var io = require('socket.io');*/
var socket = require('../index').socket;


function publicNotifyAllClients() {
    socket.emit('Change');
}

module.exports = {notifyAllClients : publicNotifyAllClients};