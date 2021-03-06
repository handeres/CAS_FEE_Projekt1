var noteStore = require("../services/noteStore.js");
var socket = require("../services/socket.js");

module.exports.createNote = function(req, res) {
      
    noteStore.add(req.body.title,
				  req.body.description,
				  req.body.importance,
				  req.body.createdDate,
				  req.body.finishUntil,
				  req.body.finishedDate,
				  req.body.done,
				  function(err, note) {
		res.json(note);
		socket.notifyAllClients();
    });
};

module.exports.getNote = function(req, res){
    noteStore.get(req.params.id, function(err, note) {
        res.json(note);
    });
};

module.exports.getAll = function(req, res){
    noteStore.all(function(err, notes) {
        res.json(notes);
    });
};

module.exports.delete = function(req, res){
	noteStore.delete(req.params.id, function(err, numRemoved) {
		res.send({});
		socket.notifyAllClients();
	});
};

module.exports.updateNote = function (req, res) {

	 noteStore.update(req.params.id,
					  req.body.title,
					  req.body.description,
					  req.body.importance,
					  req.body.createdDate,
					  req.body.finishUntil,
					  req.body.finishedDate,
					  req.body.done,
					  function(err, note) {
	 	res.send({});
		socket.notifyAllClients();
    });
};
