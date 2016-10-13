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

            var notes = noteRepo.getAll();
            if (null != notes) {
                createNoteList(notes);
            }
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
            $(".filters").children().css({'background':'#3d94f6'});
            $(event.target).css({'background':'red'});
            if (null != data) {
                createFilteredList(data.filtertype)
            }
        }

        function createFilteredList(filterType) {
            switch(filterType) {
                case "createdDate":
                    noteRepo.setFilter(noteRepo.compareNotesByCreatedDate);
                    break;
                case "finishedDate":
                    noteRepo.setFilter(noteRepo.compareNotesByFinishUntil);
                    break;
                case "importance":
                    noteRepo.setFilter(noteRepo.compareNotesByImportance);
                    break;
                default:
                    noteRepo.setFilter(noteRepo.compareNotesByCreatedDate);
                    break;
            }
            settingsData.setCurrentFilter(filterType);
            createNoteList(noteRepo.getAll());
        }

        /**
         *  This function is an button event handler to change the page to the new note
         */
        function newNoteClickEventHandler() {
            window.location.href='../notes.html';
        }

        /**
         *  This function is an button event handler to change the page to the edit note
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
            $(".showFinished .btn").toggleClass('btn_active');
            noteRepo.toggleShowOnlyFinished();
            /* Save the settings */
            settingsData.setShowOnlyFinished(!settingsData.getShowOnlyFinished());
            createNoteList(noteRepo.getAll());
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

        /* Load current UI settings from storage */
        function loadUISettingsFromStorage() {
            settingsData.load();

            $(".styleSelect select").val(settingsData.getCurrentStyle());
            changeStyleEventHandler();
            if (true === settingsData.getShowOnlyFinished()) {
                finishedClickEventHandler();
            }

            var currentFilter = settingsData.getCurrentFilter()
            if (undefined != currentFilter)  {
                createFilteredList(currentFilter)
                $("#" + currentFilter).css({'background':'red'});
            }
        }

        init();
    });
})(jQuery, window, document);