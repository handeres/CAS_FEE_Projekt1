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
    for (var index in notes) {
        if(notes[index].uniqueID == note.uniqueID) {
            return true;
        }
    }
    return false;   
}

/**
 * Finds a note object by uniqueID as key
 * @param {string} Title of the note
 * @returns {note}
 */
function getNoteByTitel(uniqueID) {
    var notes = readNoteList();
    if (null == notes) {
        return null;
    }
    for (var index in notes) {
        if(notes[index].uniqueID === uniqueID) {
            return notes[index];
        }
    }
    return null;   
}

/**
 * Saves a new note to the note list
 * @param {note} Note object to be saved
 * @returns {void}
 */
function saveNewNote(note) {  
    var notes = readNoteList();
    if (null == notes) {
        notes = [];
    }
    notes.push(note);
    saveNoteList(notes);
}

/**
 * Saves a edited note to the note list
 * @param {note} Note object to be saved
 * @returns {void}
 */
function saveEditedNote(note) {  
    var notes = readNoteList();
    if (null != notes) {
        for (var index in notes) {
            if(notes[index].uniqueID === note.uniqueID) {
                notes[index] = note;
                break;
            }
        }
    }
    saveNoteList(notes);
}

/**
 * Reads the note object array
 * @returns {note[]}
 */
function readNoteList() {
    var notes = JSON.parse(localStorage.getItem(storageKey));
    return notes; //For debug reason
}
  
/**
 * Saves note list to the storage.
 * @param {note[]} Note object arry
 * @returns {void} 
 */
function saveNoteList(notList) {
    return localStorage.setItem(storageKey, JSON.stringify(notList));
}
    