/**
 * Created by Hannes Anderes on 05.10.2016.
 */
(function($, window, document, undefined) {

    "use strict"

    $(function () {

        var view = noteView.createView();

        /**
         * Initialized the event handler
         * @returns {void}
         */
        function init() {
            /* Current style is saved in the settings */
            settingsData.load();
            view.setStyle(settingsData.getCurrentStyle());
            view.registrySaveEvent(saveClickEventHandler);
            view.setTitle(loadNote);
        }

        /**
         * Click event handler to save data to a storage
         * @returns {void}
         */
        function saveClickEventHandler() {
            var newNote = view.getValuesFromForm();
            noteRepo.saveNote(newNote, view.goBackToMainPage);
        }

        /**
         * Load note object from the storage by uniqueID as key
         * @returns {void}
         */
        function loadNote(uniqueID) {
            noteRepo.getNoteByUniqueID(uniqueID, function(note) {
                view.setValuesToForm(note);
            });
        }

        init();
    });
})(jQuery, window, document);
