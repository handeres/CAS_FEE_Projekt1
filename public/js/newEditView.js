/**
 * Created by Hannes on 28.10.2016.
 */

/**
 * Created by Hannes Anderes on 05.10.2016.
 */
var noteView = (function($) {

    "use strict"

    class NewEditView {

        constructor() {

            $("#cancel").on('click', this.goBackToMainPage);
            $("#done").on('click', this.setFinishedDate);
        }

        /**
         *  This function registries the save event handler
         *  @param {function} Save event handler
         *  @returns {void}
         */
        registrySaveEvent(saveClickEventHandler) {
            $("#save").on('click', saveClickEventHandler);
        }

        /**
         *  This function sets the current style
         *  @param {string} Current style
         *  @returns {void}
         */
        setStyle(style) {
            utilities.setStyle(style);
        }

        /**
         *  This function sets the title of the page
         *  @param {string} Current style
         *  @returns {void}
         */
        setTitle(callback) {
            var arlparameters = $.getUrlVars();
            if (null != arlparameters) {
                if ("edit" == arlparameters.Page) {
                    $("h1").text("Edit Note");
                    callback(arlparameters.Key);
                } else {
                    $("h1").text("New Note");
                }
            }
        }

        /**
         *  This function sets the note object to the formular
         *  @returns {void}
         */
        setValuesToForm(note) {
            if (null != note) {
                $("#title").val(note.title);
                $("#description").val(note.description);
                $("#importance").val(note.importance);
                $("#date").val(note.finishUntil);
                if (true == note.done) {
                    $("#done").attr("checked", "true");
                }
                $("#uniqueID").val(note._id);
                $("#createdDate").val(note.createdDate);
                $("#finishedDate").val(note.finishedDate);
            }
        }

        /**
         *  This function gets the note object from the formular
         *  @returns {Note} Note object with data from the formular
         */
        getValuesFromForm() {

            var newNote = {};

            newNote.title        = $("#title").val();
            newNote.description  = $("#description").val();
            newNote.importance   = $("#importance").val();
            newNote.finishUntil  = $("#date").val();
            newNote.done         = $("#done").is(":checked");
            newNote._id          = $("#uniqueID").val();
            newNote.finishedDate = $("#finishedDate").val();
            newNote.createdDate  = $("#createdDate").val();

            return newNote;
        }

        /**
         *  This function sets the finished date
         *  @returns {void}
         */
        setFinishedDate() {
            if ($('#done').is(':checked') == true) {
                var date = new Date();
                $("#finishedDate").val(date);
            } else {
                $("#finishedDate").val("");
            }
        }

        /**
         *  Go back to the main page
         *  @returns {void}
         */
        goBackToMainPage() {
           // window.history.back();
            window.location.href = '../';
        }
    }

    /**
     * Creates a NewEditView object
     * @returns {NewEditView}
     */
    function publicCreateNewEditView() {
        return new NewEditView();
    }

    return {
        createView: publicCreateNewEditView
    }

})(jQuery);