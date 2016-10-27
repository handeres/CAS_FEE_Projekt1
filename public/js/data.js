/**
 * Created by Hannes Anderes on 05.10.2016.
 */
var noteDataStorage = (function() {

    "use strict"

    class DataStorage {

        constructor() {
            this.settingsKey = "settings";
        }

		/**
         * Saves note to the storage.
         * @param {note} Note object to be stored
         * @returns {void}
         */
        saveNote(note, callback) {
			rest.ajax("POST", "/notes/create/", note, {}).done(function () {
                callback();
            });
        };
		
		/**
         * Update note to the storage.
         * @param {note} Note object to be updated in the storage
         * @returns {void}
         */
        updateNote(id, note, callback) {
			rest.ajax("POST", "/notes/update/" + id, note, {}).done(function () {
                callback();
            });
        };
		
		/**
         * Gets a note by  unique ID
         * @param {note} Note object to be stored
         * @returns {note}
         */
        getNoteById(id, callback) {
			return rest.ajax("GET", "/notes/" + id, "" , {}).done(function (msg) {
				callback(msg);
			});
        };

        /**
         * Delete the note
         * @param {note} Note object to be deleted
         * @returns {void}
         */
        deleteNote(id, callback) {
            rest.ajax("POST", "/notes/delete/" + id, "", {}).done(function () {
                callback();
            });
        };
		
        /**
         * Reads the note object array
         * @returns {note[]}
         */
        readNoteList(callback) {
			rest.ajax("GET", "/notes/all/", "", {}).done(function (msg) {
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