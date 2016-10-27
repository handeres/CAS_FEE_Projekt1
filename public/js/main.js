/**
 * Created by Hannes Anderes on 26.09.2016.
 */
(function($, window, document, undefined) {

    "use strict"

    $(function() {

        /** 
         *  Read notes from persistance and create html view
         */
        function init() {
            /* Read the UI Settings */
            loadUISettingsFromStorage();
            renderNoteList();

            $(".filters").on('click', 'button', filterClickEventHandler);
            $(".showFinished button").on('click', finishedClickEventHandler);
            $(".newNote").on('click', newNoteClickEventHandler);
			$(".styleSelect select").on('change', changeStyleEventHandler);
        }

        /**
         *  This function creates table rows from the handlebar template 'node-template'
         */
        function createNoteList(notesList) {
			if (notesList.length > 0) {
				var createNodeList = Handlebars.compile($("#note-template").html());			
				$(".noteList").empty();
				$(".noteList").append(createNodeList(notesList));
				$(".editNote").on('click', editNoteClickEventHandler);
                $(".deleteNote").on('click', deleteNoteClickEventHandler);
                $(".finishedNote").on('change', finishedNoteClickEventHandler);
			} else {
				showAsEmpty();
			}
        }
		
		/**
		*	This function shows a no note information
		*/
		function showAsEmpty() {
			var noNotes = Handlebars.compile($("#no-note-template").html());
			$(".noteList").empty();
			$(".noteList").append(noNotes);
		}

        /**
         *  This function is an button event handler for the filter functionality
         */
        function filterClickEventHandler(event) {
            var data = $(this).data();
            /* Set all button backgrounds to default */
            $(".filters button").removeClass('btn_active');
            $(event.target).addClass('btn_active');
            if (null != data) {
                createFilteredList(data.filtertype);
            }
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
				});
				createNoteList(notes);		
			} else {
				showAsEmpty();
			}
		}

        /**
         *  This function creates the note list html depending on the current filters
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
         *  This function is an button event handler to change the page to the new note site
         */
        function newNoteClickEventHandler() {
            window.location.href='../notes.html';
        }

        /**
         *  This function is an button event handler to change the page to the edit note site
         */
        function editNoteClickEventHandler() {
			var uniqueId = $(this).closest('.noteEntry').data('uniqueid');
            window.location.href='../notes.html?Page=edit&Key=' + uniqueId;
        }

        /**
         *  This function is an button event handler to change the page to the edit note site
         */
        function deleteNoteClickEventHandler() {
            var uniqueId = $(this).closest('.noteEntry').data('uniqueid');
            noteRepo.deleteNote(uniqueId, function() {
                renderNoteList();
            });
        }

        /**
         *  This function is an button event handler for the finished filter
         */
        function finishedClickEventHandler() {
            /* Save the settings */
            settingsData.setShowOnlyFinished(!settingsData.getShowOnlyFinished());
            renderNoteList();
        }

        /**
         *  This function toggles the color of the button
         */
        function setFinishedButton() {
			if (true === settingsData.getShowOnlyFinished()) {            
				$(".showFinished button").text("Hide Finished");
            }
            else {
				$(".showFinished button").text("Show All");
            }
        }

        /**
         *  This function is an selection event handler to change the style
         */
        function changeStyleEventHandler() {
            var selectedStyle = $('.styleSelect option:selected').val();
            utilities.setStyle(selectedStyle);
            /* Save the settings */
            settingsData.setCurrentStyle(selectedStyle);
        }
		
		 /**
         *  This function is a checkbox eventhandler and sets a note to done or to rework
         */
		function finishedNoteClickEventHandler() {
			var uniqueId = $(this).closest('.noteEntry').data('uniqueid');
			var done =	$(this).is(":checked");	
			if (true === done) {
                noteRepo.finishNote(uniqueId, renderNoteList);
            }else {
                noteRepo.reworkNote(uniqueId, renderNoteList);
            }
		}

        /**
         * Load current UI settings from storage
         */
        function loadUISettingsFromStorage() {
            settingsData.load();			
            $(".styleSelect select").val(settingsData.getCurrentStyle());
            changeStyleEventHandler();
            setFinishedButton();
            var currentFilter = settingsData.getCurrentFilter()
            if (undefined != currentFilter)  {
                $("#" + currentFilter).addClass('btn_active');
            }
        }

        init();
    });
})(jQuery, window, document);