/**
 * Created by Hannes Anderes on 05.10.2016.
 */
var noteDataStorage = (function() {

    "use strict"

    function DataStorage() {
        this.storageKey = "notes";
    }

    /**
     * Saves note list to the storage.
     * @param {note[]} Note object arry
     * @returns {void}
     */
    function publicSaveNoteList(notList) {
        return localStorage.setItem("notes", JSON.stringify(notList));
    }

    /**
     * Reads the note object array
     * @returns {note[]}
     */
    function publicReadNoteList() {
        var notes = JSON.parse(localStorage.getItem("notes"));//this.prototype.loadNotesFromStorage();
        for (var index in notes) {
            if (true === notes[index].done) {
                notes[index].relativeTimeDone = moment(notes[index].finishedDate).fromNow();
            }
        }
        return notes; //For debug reason
    }

    DataStorage.prototype.loadNotesFromStorage = function() {
        return JSON.parse(localStorage.getItem(storageKey));
    }

     DataStorage.prototype.saveNotesToStorage = function(noteList) {
        localStorage.setItem(storageKey, JSON.stringify(notList));
    }

    return {
        saveNoteList : publicSaveNoteList,
        readNoteList : publicReadNoteList,
    };

})();
