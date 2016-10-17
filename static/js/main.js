/**
 * Created by Hannes Anderes on 26.09.2016.
 */
(function($, window, document, undefined) {

    "use strict"

    $(function() {

        /** 
         *  Register Handlebar Helperfunction to build a for loop 
         */
        Handlebars.registerHelper('for', function(count, options) {
          var ret = "";
          for(var i=0; i < count; i++) {
            ret = ret + options.fn(count);
          }
          return ret;
        });

        /** 
         *  Read notes from persistance and create html view
         */
        function init() {
            /* Read the UI Settings */
            loadUISettingsFromStorage();
            renderNoteList();

            $(".filters").on('click', 'button', filterClickEventHandler);
            $(".showFinished .btn").on('click', finishedClickEventHandler);
            $(".newNote").on('click', newNoteClickEventHandler);
        }

        /**
         *  This function creates table rows from the handlebar template 'node-template'
         */
        function createNoteList(notesList) {
            var createNodeList = Handlebars.compile($("#note-template").html());
            $(".noteList").empty();
            $(".noteList").append(createNodeList(notesList));
            $(".editNote").on('click', editNoteClickEventHandler);            
            $(".styleSelect select").on('change', changeStyleEventHandler);          
        }

        /**
         *  This function is an button event handler for the filter functionality
         */
        function filterClickEventHandler(event) {
            var data = $(this).data();
            //Set all button backgrounds to default
            //With toggleClass function not possible. add- and removeClass must be used
            $(".filters .btn").removeClass('btn_active');
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
        function renderNoteList() {
            var notes  = noteRepo.getAll();
            if (true === settingsData.getShowOnlyFinished()) {
                notes = noteRepo.readNodeListFiltered(notes);
            }
            else {
                notes = noteRepo.getAll();
            }
            var filter = getFilterByType(settingsData.getCurrentFilter());
            if (null != filter) {
                notes = notes.sort(filter);
            }
            for (var index in notes) {
                if (true === notes[index].done) {
                    notes[index].relativeTimeDone = moment(notes[index].finishedDate).fromNow();
                }
            }
            createNoteList(notes);
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
            var data = $(this).data();
            window.location.href='../notes.html?Page=edit&Key=' + data.uniqueid;
        }

        /**
         *  This function is an button event handler for the finished filter
         */
        function finishedClickEventHandler() {
            /* Change backround color */
            setFinishedButton();
            /* Save the settings */
            settingsData.setShowOnlyFinished(!settingsData.getShowOnlyFinished());
            renderNoteList();
        }

        /**
         *  This function toggles the color of the button
         */
        function setFinishedButton() {
            $(".showFinished .btn").toggleClass('btn_active');
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
         * Load current UI settings from storage
         */
        function loadUISettingsFromStorage() {
            settingsData.load();

            $(".styleSelect select").val(settingsData.getCurrentStyle());
            changeStyleEventHandler();
            var showOnlyFinished = settingsData.getShowOnlyFinished();
            if (true === showOnlyFinished) {
                setFinishedButton();
            }
            var currentFilter = settingsData.getCurrentFilter()
            if (undefined != currentFilter)  {
                $("#" + currentFilter).addClass('btn_active');
            }
        }

        init();
    });
})(jQuery, window, document);