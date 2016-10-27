/**
 * Created by Hannes on 10.10.2016.
 */
var noteRepo = (function($) {

    "use strict"

    var dataStorage = noteDataStorage.createDataStorage();

    /**
     * This function compares two nodes by the created date
     * @param {note} note object
     * @param {note} note object
     */
    function publicCompareNotesByCreatedDate(s1, s2) {
        if (s1.createdDate > s2.createdDate) {
            return -1;
        }
        else if (s1.createdDate < s2.createdDate) {
            return 1;
        }
        return 0;
    }

    /**
     * This function compares two nodes by the finished date
     * @param {note} note object
     * @param {note} note object
     */
    function publicCompareNotesByFinishUntil(s1, s2) {
        if (s1.finishUntil > s2.finishUntil) {
            return -1;
        }
        else if (s1.finishUntil < s2.finishUntil) {
            return 1;
        }
        return 0;
    }

    /**
     * This function compares two nodes by date the importance
     * @param {note} note object
     * @param {note} note object
     */
    function publicCompareNotesByImportance(s1, s2) {
        if (s1.importance > s2.importance) {
            return -1;
        }
        else if (s1.importance < s2.importance) {
            return 1;
        }
        return 0;
    }
    /**
     * Saves a new note to the note list
     * @param {note []} Notes array
     * @returns {note []} filtered array list
     */
    function publicReadNodeListFiltered(callback) {
		publicGetAll(function (notes) {
				if (null != notes) {
				var filteredNoteList = $.grep(notes, function(note, i){
					return (note.done === false);
				});
				callback(filteredNoteList);
			}
		});
    }

    /**
     * Finds a note object by uniqueID as key
     * @param {string} uniqueID of the note
     * @returns {note}
     */
    function publicGetNoteByUniqueID(uniqueID, callback) {
		dataStorage.getNoteById(uniqueID, callback);
    }
	
	/**
     * This function updates a note member value 
     * @param {string} uniqueID of the note
	 * @param {string} Name of the member
	 * @param {object} Value for the member
     * @returns {void}
     */
	function publicUpdateNoteMember(uniqueID, member, value, callback) {
        publicGetNoteByUniqueID(uniqueID, function (note) {
			if (null != note) {
				note[member] = value;
				publicSaveNote(note, callback);
			}
		});
	}

    /**
     * Set note as finished
     * @param {string} Id of the note
     * @returns {void}
     */
    function publicFinishNote(id, callback) {
        publicGetNoteByUniqueID(id, function (note) {
            if (null != note) {
                note.done = true;
                var newDate = new Date();
                note.finishedDate = newDate;
                publicSaveNote(note, callback);
            }
        });
    }

    /**
     * Set note to rework
     * @param {string} Id of the note
     * @returns {void}
     */
    function publicReworkNote(id, callback) {
        publicGetNoteByUniqueID(id, function (note) {
            if (null != note) {
                note.done = false;
                note.finishedDate = "";
                publicSaveNote(note, callback);
            }
        });
    }
    
    /**
     * Saves a  note to the note list
     * @param {note} Note object to be saved
     * @returns {void}
     */
    function publicSaveNote(note, callback) {
        /* Check if it is a new entry */
        if (  (undefined === note._id)
			|| ("" === note._id)) {
            note.createdDate = $.now();
            createNote(note, callback);
        } else {
            /* data was edited. Overwrite data in the list */
            saveEditedNote(note, callback);
        }
    }

    /**
     * delete note
     * @param {string} Id of the note
     * @returns {void}
     */
    function publicDeleteNote(id, callback) {
        dataStorage.deleteNote(id, callback)
    }

    /**
     * Gets a note list with all notes
     * @returns {note[]} Note array
     */
    function publicGetAll(callback) {
        return dataStorage.readNoteList(callback);
    }

    /**
     * Saves a new note to the note list
     * @param {note} Note object to be saved
     * @returns {void}
     */
    function createNote(note, callback) {
		dataStorage.saveNote(note, callback);
    }

    /**
     * Saves a edited note to the note list
     * @param {note} Note object to be saved
     * @returns {void}
     */
    function saveEditedNote(note, callback) {
		dataStorage.updateNote(note._id, note, callback);
    }

    return {
        compareNotesByCreatedDate : publicCompareNotesByCreatedDate,
        compareNotesByFinishUntil : publicCompareNotesByFinishUntil,
        compareNotesByImportance: publicCompareNotesByImportance,
        readNodeListFiltered : publicReadNodeListFiltered,
        saveNote : publicSaveNote,
        deleteNote: publicDeleteNote,
        finishNote: publicFinishNote,
        reworkNote: publicReworkNote,
        getNoteByUniqueID: publicGetNoteByUniqueID,
        getAll : publicGetAll,
		updateNoteMember: publicUpdateNoteMember
    };

})(jQuery);


