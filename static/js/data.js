/**
 * Created by Hannes Anderes on 05.10.2016.
 */

'use strict'

var storageKey = "notes";

function noteExists(note) {  
    // Read object array from local storage
    var notes = readNoteList();
    if (null == notes) {
        return false;
    }
    for (iterNote in notes) {
        if(iterNote.title == note.title) {
            return true;
        }
    }
    return false;   
}

/**
 * Saves a note to the note list
 * @param {note} Note object to be saved
 * @returns {void}
 */
function saveNote(note) {  
    var notes = readNoteList();
    if (null == notes) {
        notes = [];
    }
    notes.push(note);
    saveNoteList(notes);
}

/**
 * Reads the note object list
 * @returns {noteList[]}
 */
function readNoteList() {
    var notes = JSON.parse(localStorage.getItem(storageKey));
    return notes; //For debug reason
}
  
/**
 * Saves note list to the storage.
 * @param {noteList[]} Note object list
 * @returns {void} 
 */
function saveNoteList(notList) {
    return localStorage.setItem(storageKey, JSON.stringify(notList));
}
    