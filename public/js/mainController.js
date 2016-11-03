/**
 * Created by Hannes Anderes on 26.09.2016.
 */
(function($, window, document, undefined) {

    "use strict"

    $(function() {

        var view = mainView.createView();

        /**
         * This function initializes the main controller
         */
        function init() {
            settingsData.load();

            presetViewValues();

            view.bindGlobalEvents(filterClickEventHandler,
                                  finishedClickEventHandler,
                                  newNoteClickEventHandler,
                                  changeStyleEventHandler);
            renderNoteList();
        }

        /**
         *  This function is an button event handler for the filter functionality
         * @param {Event} Click event
         * @returns {void}
         */
        function filterClickEventHandler(event) {
            var data = $(this).data();
            view.setActiveFilterBtnBackground(event.target);
            if (null != data) {
                createFilteredList(data.filtertype);
            }
        }

        /**
         *  This function is an button event handler for new note
         * @returns {void}
         */
        function newNoteClickEventHandler() {
            view.gotToEditNoteSite(this);
        }

        /**
         *  This function is an button event handler to edit the note
         * @returns {void}
         */
        function editClickEventHandler() {
            view.gotToEditNoteSite(this);
        }

        /**
         * This function creates the filtered list
         * @param {string} Type of filter
         * @returns {void}
         */
        function createFilteredList(filterType) {
            settingsData.setCurrentFilter(filterType);
            renderNoteList();
        }

        /**
         *  This function gets the filter function by the name
         *  @param {string} Type of filter
         *  @returns {function}
         */
        function getFilterByType(filterType) {
            switch(filterType) {
                case "finishedDate":
                    return noteRepo.compareNotesByFinishUntil;
                case "createdDate":
                    return noteRepo.compareNotesByCreatedDate;
                case "importance":
                    return noteRepo.compareNotesByImportance;
                default:
                    return null;
            }
        }
		
		/**
         *  This function creates the note list html depending on the current filters
         *  @param {note[]} Array of notes
         *  @returns {void}
         */
		function createListCallback(notes) {		
			if (null != notes) {		
				var filter = getFilterByType(settingsData.getCurrentFilter());
				if (null != filter) {
					notes = notes.sort(filter);
				}
				notes.forEach(function(note) {
					if (true === note.done) {
                        note.relativeTimeDone = moment(note.finishedDate).fromNow();
                    }
                    note.finishUntil = moment(note.finishUntil).format('ll');
				});
                view.renderNoteList(notes,
                    editClickEventHandler,
                    deleteNoteClickEventHandler,
                    finishedNoteClickEventHandler);
			} else {
                view.renderAsEmpty();
			}
		}

        /**
         *  This function creates the note list html depending on the current filters
         *  @returns {void}
         */
        function renderNoteList() {
			setFinishedButton();
            var notes = {};
            if (true === settingsData.getShowOnlyFinished()) {
                notes = noteRepo.getAll(createListCallback);		
            }
            else {
                notes = noteRepo.readNodeListFiltered(createListCallback);
            }		
        }

        /**
         *  This function is an button event handler to change the page to the edit note site
         *  @returns {void}
         */
        function deleteNoteClickEventHandler() {
            var uniqueId = view.getNoteEntryUniqueID(this);
            noteRepo.deleteNote(uniqueId, renderNoteList);
        }

        /**
         *  This function is an button event handler for the finished filter
         *  @returns {void}
         */
        function finishedClickEventHandler() {
            settingsData.setShowOnlyFinished(!settingsData.getShowOnlyFinished());
            renderNoteList();
        }

        /**
         *  This function toggles text of the finish button
         *  @returns {void}
         */
        function setFinishedButton() {
			if (true === settingsData.getShowOnlyFinished()) {
                view.setFinishFilterBtnText("Hide Finished");
            }
            else {
                view.setFinishFilterBtnText("Show All");
            }
        }

        /**
         *  This function is an selection event handler to change the style
         *  @returns {void}
         */
        function changeStyleEventHandler() {
            view.setSelectedStyle(function (selectedStyle) {
                settingsData.setCurrentStyle(selectedStyle);
            });
        }
		
        /**
         *  This function is a checkbox event handler and sets a note to done or to rework
         *  @returns {void}
         */
		function finishedNoteClickEventHandler() {
			var uniqueId = view.getNoteEntryUniqueID(this);
			var done =	view.isNoteEntryFinished(this);
			if (true === done) {
                noteRepo.finishNote(uniqueId, renderNoteList);
            }else {
                noteRepo.reworkNote(uniqueId, renderNoteList);
            }
		}

        /**
         * Preset the view values
         * @returns {void}
         */
        function presetViewValues() {
            view.setStyle(settingsData.getCurrentStyle());
            view.setFilterAsActiveByName(settingsData.getCurrentFilter());
            changeStyleEventHandler();
            setFinishedButton();
        }

        init();
    });
})(jQuery, window, document);