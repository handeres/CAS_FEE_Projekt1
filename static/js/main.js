/**
 * Created by Hannes Anderes on 26.09.2016.
 */
(function($, window, document, undefined) {

    "use strict"

    $(function() {

        var settings = {currentFilter : null, showOnlyFinished : false, currentStyle: "StyleOrange"};
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
            settings = loadUISettingsFromStorage();

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
            settings.currentFilter = filterType;
            saveSettingsToStorage();
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
            settings.showOnlyFinished = !settings.showOnlyFinished;
            saveSettingsToStorage();
            createNoteList(noteRepo.getAll());
        }

        /**
         *  This function is an selection event handler to change the style
         */
        function changeStyleEventHandler() {
            var selectedStyle = $('.styleSelect option:selected').val();
            utilities.setStyle(selectedStyle);
            /* Save the settings */
            settings.currentStyle = selectedStyle;
            saveSettingsToStorage();
        }

        /* Load current UI settings from storage */
        function loadUISettingsFromStorage() {
            var locSettings = noteDataStorage.loadSettings();
            if (null === locSettings) {
                /* First time settings are read. Save it first */
                noteDataStorage.saveSettings(settings);
                locSettings = noteDataStorage.loadSettings();
            }

            $(".styleSelect select").val(locSettings.currentStyle);
            changeStyleEventHandler();
            if (true === locSettings.showOnlyFinished) {
                finishedClickEventHandler();
            }
            if (undefined != locSettings.currentFilter)  {
                createFilteredList(locSettings.currentFilter)
                $("#" + locSettings.currentFilter).css({'background':'red'});
            }
            return locSettings;
        }

        function saveSettingsToStorage() {
            noteDataStorage.saveSettings(settings);
        }

        init();
    });
})(jQuery, window, document);