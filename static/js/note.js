/**
 * Created by Hannes on 10.10.2016.
 */
var noteRepo = (function($) {

    var showOnlyFinished = false;
    var currentFilter = null;

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
     * Checks if a note already exists
     * @param {note} note object
     * @returns {bool}
     */
    function noteExists(note) {
        // Read object array from local storage
        var notes = publicGetAll();
        if (null == notes) {
            return false;
        }
        for (var index in notes) {
            if (notes[index].uniqueID == note.uniqueID) {
                return true;
            }
        }
        return false;
    }

    /**
     * Saves a new note to the note list
     * @param {note []} Notes array
     * @returns {note []} filtered array list
     */
    function readNodeListFiltered(notesList) {
        var filterdNoteList = $.grep(notesList, function(note, i){
            return (note.done === true);
        });
        return filterdNoteList;
    }

    /**
     * Sets the current filter function
     * @param {function} Filter function
     * @returns {note}
     */
    function publicSetFilter(filter) {
        currentFilter = filter;
    }

    /**
     * Sets the current filter function
     * @param {function} Filter function
     * @returns {note}
     */
    function publicToggleShowOnlyFinished() {
        showOnlyFinished = !showOnlyFinished;
    }

    /**
     * Finds a note object by uniqueID as key
     * @param {string} uniqueID of the note
     * @returns {note}
     */
    function publicGetNoteByUniqueID(uniqueID) {
        var notes = publicGetAll();
        if (null == notes) {
            return null;
        }
        for (var index in notes) {
            if (notes[index].uniqueID === uniqueID) {
                return notes[index];
            }
        }
        return null;
    }


    /**
     * Saves a  note to the note list
     * @param {note} Note object to be saved
     * @returns {void}
     */
    function publicSaveNote(note) {

        /* Check if it is a new entry */
        if (   (undefined === note.uniqueID)
            || ("" === note.uniqueID)) {
            /* genarete a key if the entry is new created */
            note.uniqueID    = $.getUniqueID(10);
            note.createdDate = $.now();
            createNote(note);
        } else {
            /* data was edited. Overwrite data in the list */
            saveEditedNote(note);
        }
    }

    /**
     * Saves a new note to the note list
     * @param {note} Note object to be saved
     * @returns {void}
     */
    function createNote(note) {

        var notes = publicGetAll();
        if (null == notes) {
            notes = [];
        }
        notes.push(note);
        noteDataStorage.saveNoteList(notes);
    }

    /**
     * Saves a edited note to the note list
     * @param {note} Note object to be saved
     * @returns {void}
     */
    function saveEditedNote(note) {
        var notes = publicGetAll();
        if (null != notes) {
            for (var index in notes) {
                if (notes[index].uniqueID === note.uniqueID) {
                    notes[index] = note;
                    break;
                }
            }
        }
        noteDataStorage.saveNoteList(notes);
    }

    /**
     * Gets a note list with all notes
     * @returns {note[]} Note array
     */
    function publicGetAll() {
        var notes = noteDataStorage.readNoteList();
        if (true === showOnlyFinished) {
            notes = readNodeListFiltered(notes);
        }
        if (null != currentFilter) {
            return notes.sort(currentFilter);
        } else {
            return notes;
        }
    }

    return {
        compareNotesByCreatedDate : publicCompareNotesByCreatedDate,
        compareNotesByFinishUntil : publicCompareNotesByFinishUntil,
        compareNotesByImportance: publicCompareNotesByImportance,
        saveNote : publicSaveNote,
        getNoteByUniqueID: publicGetNoteByUniqueID,
        getAll : publicGetAll,
        setFilter : publicSetFilter,
        toggleShowOnlyFinished : publicToggleShowOnlyFinished
    };

})(jQuery);


