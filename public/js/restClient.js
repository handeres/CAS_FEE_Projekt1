/**
 * Created by Hannes Anderes on 05.10.2016.
 */
var noteDataStorage = (function() {

    "use strict"

    class RestClient {

        constructor() {

        }

		/**
         * Saves note to the storage.
         * @param {note} Note object to be stored
         * @returns {void}
         */
        saveNote(note, callback) {
			rest.ajax("POST", "/notes/create/", note, {}).done(function () {
                callback();
            }) .fail(function() {
                alert( "Couldn't not access to the server!" );
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
            }).fail(function() {
                alert( "Couldn't not access to the server!");
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
            }).fail(function() {
                alert( "Couldn't not access to the server!");
            });
        };

        /**
         * Delete the note
         * @param {note} Note object to be deleted
         * @returns {void}
         */
        deleteNote(id, callback) {
            rest.ajax("POST", "/notes/remove/" + id + "/", "", {}).done(function () {
                callback();
            }).fail(function() {
                alert( "Couldn't access to the server!");
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
            }).fail(function() {
                alert( "Couldn't not access to the server!");
            });
        };
    };

	/**
	 * Creates a RestClient object
	 * @returns {RestClient}
	 */
    function publicCreateRestClient() {
        return new RestClient();
    }

    return {
        createRestClient: publicCreateRestClient
    }
})();
