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
         * Reads the note object array
         * @returns {note[]}
         */
        readNoteList() {
            return JSON.parse(localStorage.getItem(this.storageKey));
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
