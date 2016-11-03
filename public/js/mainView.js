/**
 * Created by Hannes Anderes on 28.10.2016.
 */

var mainView = (function($) {

    "use strict"

    class MainView {

        constructor() {

        }

        /**
         *  This function registries global event handler
         *  @param {function} Filter event handler
         *  @param {function} Finish event handler
         *  @param {function} New note event handler
         *  @param {function} Change style event handler
         *  @returns {void}
         */
        bindGlobalEvents(filterClickEventHandler,
                         finishedClickEventHandler,
                         newNoteClickEventHandler,
                         changeStyleEventHandler) {

            $(".filters").on('click', 'button', filterClickEventHandler);
            $(".showFinished button").on('click', finishedClickEventHandler);
            $(".newNote").on('click', newNoteClickEventHandler);
            $(".styleSelect select").on('change', changeStyleEventHandler);
        }

        /**
         *  This function changes to the new note page
         *  @returns {void}
         */
        gotToNewNoteSite() {
            window.location.href = '../notes.html';
        }

        /**
         *  This function changes to the edit note page
         *  @param {object} Note entry object
         *  @returns {void}
         */
        gotToEditNoteSite(entry) {
            var uniqueId = this.getNoteEntryUniqueID(entry);
            window.location.href = '../notes.html?Page=edit&Key=' + uniqueId;
        }

        /**
         *  This function sets style
         *  @param {string} style
         *  @returns {void}
         */
        setStyle(style) {
            $(".styleSelect select").val(style);
        }

        /**
         *  This function sets filter button background to active
         *  @param {object} Event target
         *  @returns {void}
         */
        setActiveFilterBtnBackground(eventTarget) {
            $(".filters button").removeClass('btn_active');
            $(eventTarget).addClass('btn_active');
        }

        /**
         *  This function sets filter button active by name
         *  @param {sting} Name of the filter
         *  @returns {void}
         */
        setFilterAsActiveByName(filterName) {
            if (undefined != filterName) {
                $("#" + filterName).addClass('btn_active');
            }
        }

        /**
         *  This function sets the finish button text
         *  @param {sting} Text of the finished button
         *  @returns {void}
         */
        setFinishFilterBtnText(text) {
            $(".showFinished button").text(text);
        }

        /**
         *  This function gets the unique ID
         *  @param {object} Note entry object
         *  @returns {string} unique ID
         */
        getNoteEntryUniqueID(entry) {
            return $(entry).closest('.noteEntry').data('uniqueid');
        }

        /**
         *  This function check if the note is finished
         *  @param {object} Note entry object
         *  @returns {bool} TRUE == finished, FALSE == work
         */
        isNoteEntryFinished(entry) {
            return $(entry).is(":checked");
        }

        /**
         *  This function sets the current selected style
         *  @returns {string}
         */
        setSelectedStyle(callback) {
            var selectedStyle = $('.styleSelect option:selected').val()
            utilities.setStyle(selectedStyle);
            if (null != callback) {
                callback(selectedStyle);
            }
        }

        /**
         *  This function renders the note list
         *  @param {note[]} Array of notes to be rendered
         *  @param {function} Delete event handler
         *  @param {function} Finish event handler
         *  @returns {void}
         */
        renderNoteList(notesList, editEventHandler, deleteEventHandler, finishEventHandler) {
            if (null != notesList) {
                if (notesList.length > 0) {
                    var createNodeList = Handlebars.compile($("#note-template").html());
                    $(".noteList").empty();
                    $(".noteList").append(createNodeList(notesList));
                    $(".editNote").on('click', editEventHandler);
                    $(".deleteNote").on('click', deleteEventHandler);
                    $(".finishedNote").on('change', finishEventHandler);
                    return;
                }
            }
            this.renderAsEmpty();
        }

        /**
         *  This function shows a no note information
         *  @returns {void}
         */
        renderAsEmpty() {
            var noNotes = Handlebars.compile($("#no-note-template").html());
            $(".noteList").empty();
            $(".noteList").append(noNotes);
        }
    }


    /**
     * Creates a MainView object
     * @returns {MainView}
     */
    function publicCreateMainView() {
        return new MainView();
    }

    return {
        createView: publicCreateMainView
    }

})(jQuery);