/**
 * Created by Hannes on 31.10.2016.
 */
var socket = require('../index').socket;

function publicNotifyAllClients() {
   socket.emit('UpdateNoteList');
}

module.exports = {notifyAllClients : publicNotifyAllClients};