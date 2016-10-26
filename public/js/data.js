/**
 * Created by Hannes Anderes on 05.10.2016.
 */
var noteDataStorage = (function() {

    "use strict"

    class DataStorage {

        constructor() {
            this.storageKey  = "notes"
            this.settingsKey = "settings";
        }

        /**
         * Saves note list to the storage.
         * @param {note[]} Note object arry
         * @returns {void}
         */
        saveNoteList(notList) {
            return localStorage.setItem(this.storageKey, JSON.stringify(notList));
        };
		
		/**
         * Saves note to the storage.
         * @param {note} Note object to be stored
         * @returns {void}
         */
        saveNote(note) {
            /*return localStorage.setItem(this.storageKey, JSON.stringify(notList));*/
			rest.ajax("POST", "/notes/create/", note, {}).done(function (msg) {
				console.log(msg);
			});
        };
		
		/**
         * Update note to the storage.
         * @param {note} Note object to be updated in the storage
         * @returns {void}
         */
        updateNote(note) {
            /*return localStorage.setItem(this.storageKey, JSON.stringify(notList));*/
			rest.ajax("POST", "/notes/update/" + note.id, note, {});
        };
		
		/**
         * Gets a note by  unique ID
         * @param {note} Note object to be stored
         * @returns {note}
         */
        getNoteById(id, callback) {
            /*return localStorage.setItem(this.storageKey, JSON.stringify(notList));*/
			return rest.ajax("GET", "/" + id, "" , {}).done(function (msg) {
				console.log(msg);
				callback(msg);
			});
        };
		
        /**
         * Reads the note object array
         * @returns {note[]}
         */
        readNoteList(callback) {
            /*return JSON.parse(localStorage.getItem(this.storageKey));*/
			rest.ajax("GET", "/notes/all/", "", {}).done(function (msg) {
				console.log(msg);
				callback(msg);
			});
        };

        /**
         * Save the settings
         * @param {settings} Settings object
         * @returns {void}
         */
        saveSettings(settings) {
            return localStorage.setItem(this.settingsKey, JSON.stringify(settings));
        }

        /**
         * Reads the settings
         * @returns {settings}
         */
        loadSettings() {
            return JSON.parse(localStorage.getItem(this.settingsKey));
        }
    };

	/**
	 * Creates a DataStorage object
	 * @returns {DataStorage}
	 */
    function publicCreateDataStorage() {
        return new DataStorage();
    }

    return {
        createDataStorage: publicCreateDataStorage
    }
})();
