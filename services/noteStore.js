var Datastore = require('nedb');
var db = new Datastore({ filename: './data/order.db', autoload: true });

function Note(title, description, importance, createdDate, finishUntil, finishedDate, done) {
    this.title = title;
    this.description = description;
	this.importance = importance;
	this.createdDate = createdDate;
	this.finishUntil = finishUntil;
	this.finishedDate = finishedDate;
	this.done = done;	
}

function publicAdd(title, description, importance, createdDate, finishUntilDate, finishedDate, done, callback) {
    var note = new Note(title, description, importance, createdDate, finishUntilDate, finishedDate, done);
    db.insert(note, function(err, note){
        if(callback){
            callback(err, note);
        }
    });
}

function publicUpdate(id, title, description, importance, createdDate, finishUntilDate, finishedDate, done, callback) {
    var note = new Note(title, description, importance, createdDate, finishUntilDate, finishedDate, done);
    db.update({_id: id}, {$set: note}, {}, function (err, note) {
        callback(err, note);
    });
}

function publicRemove(id, callback) {
    db.remove({ _id: id },function (err, numRemoved) {
        callback(err, numRemoved);
    });
}

function publicGet(id, callback) {
    db.findOne({ _id: id}, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(callback) {
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAdd, update : publicUpdate, delete: publicRemove, get : publicGet, all : publicAll};