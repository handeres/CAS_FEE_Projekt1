var Datastore = require('nedb');
var db = new Datastore({ filename: './data/order.db', autoload: true });

function Note(id, title, description, importance, createdDate, finishUntilDate, finishedDate, done) {
    this.uniqueId = id;
    this.title = title;
    this.description = description;
	this.importance = importance;
	this.createdDate = createdDate;
	this.finishUntilDate = finishUntilDate;
	this.finishedDate = finishedDate;
	this.done = done;	
}


function publicAdd(id, title, description, importance, createdDate, finishUntilDate, finishedDate, done, callback) {
	console.log(`publicAdd`);
    var note = new Note(id, title, description, importance, createdDate, finishUntilDate, finishedDate, done);
    db.insert(note, function(err, newDoc){
        if(callback){
            callback(err, newDoc);
        }
    });
}

function publicUpdate(id, title, description, importance, createdDate, finishUntilDate, finishedDate, done, callback) {
    var note = new Note(id, title, description, importance, createdDate, finishUntilDate, finishedDate, done);
    db.update({_id: id}, {$set: note}, {}, function (err, count){
       
    });
}

function publicRemove(id, currentUser, callback) {
 /*  db.update({_id: id, {$set: {"state": "DELETED"}}, {}, function (err, count) {
        publicGet(id,currentUser, callback);
    })*/
}

function publicGet(id, callback) {
    db.findOne({ _id: id}, function (err, doc) {
        callback( err, doc);
    });
}

function publicAll(callback) {
	console.log(`publicAll`);
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

module.exports = {add : publicAdd, update : publicUpdate, get : publicGet, all : publicAll};