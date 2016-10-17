/**
 * Created by Hannes Anderes on 05.10.2016.
 */
(function($, window, document, undefined) {

    "use strict"

    $(function () {

        /**
         * Initialized the event handler
         * @returns {void}
         */
        function init() {
            /* Current style is saved in the settings */
            settingsData.load();
            utilities.setStyle(settingsData.getCurrentStyle());

            $("form").on('submit', saveClickEventHandler);
            $("#cancel").on('click', goBackEventHandler);
            $("#done").on('click', finishedEventHandler);

            setTitle();
        }

        /**
         * Same page used for create note and edit note.
         * Title is dynamically.
         */
        function setTitle() {
            var arlparameters = $.getUrlVars();
            if (null != arlparameters) {
                if ("edit" == arlparameters.Page) {
                    $("h1").text("Edit Note");
                    loadNote(arlparameters.Key);
                } else {
                    $("h1").text("New Note");
                }
            }
        }

        /**
         * Save click event handler. Saves the data to a storage
         * @returns {void}
         */
        function saveClickEventHandler(event) {

            var newNote = {};

            newNote.title        = $("#title").val();
            newNote.description  = $("#description").val();
            newNote.importance   = $("#importance").val();
            newNote.finishUntil  = $("#date").val();
            newNote.done         = $("#done").is(":checked");
            newNote.uniqueID     = $("#uniqueID").val();
            newNote.finishedDate = $("#finishedDate").val();
            newNote.createdDate  = $("#createdDate").val();

            noteRepo.saveNote(newNote);
            /* go back to main page */
            goBackEventHandler();
        }

        /**
         * Load note object from the storage by uniqueID as key
         * @returns {void}
         */
        function loadNote(uniqueID) {
            var note = noteRepo.getNoteByUniqueID(uniqueID);
            if (null != note) {
                $("#title").val(note.title)
                $("#description").val(note.description);
                $("#importance").val(note.importance);
                $("#date").val(note.finishUntil);
                if (true == note.done) {
                    $("#done").attr("checked", "true");
                }
                $("#uniqueID").val(note.uniqueID);
                $("#createdDate").val(note.createdDate);
                $("#finishedDate").val(note.finishedDate);
            }
        }

        /**
         * Finished event handler. Sets finished date.
         * @returns {void}
         */
        function finishedEventHandler(event) {
            if ($('#done').is(':checked') == true) {
                var date = new Date();
                $("#finishedDate").val(date);
            } else {
                $("#finishedDate").val("");
            }
        }

        /**
         * Goes back to the main page
         * @returns {void}
         */
        function goBackEventHandler() {
            window.history.back();
        }

        init();
    });
})(jQuery, window, document);
