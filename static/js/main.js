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
            /* Read note list from the persistance */
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
            //$(".filters").children().toggleClass('btn_defaultBackground');
            //$(".filters").children().addClass('btn_inactive');
            //Set selected target to red
            $(event.target).css({'background':'red'});
           // $(event.target).toggleClass('btn_active');
            //$(event.target.className +  " .btn").toggleClass('btn_background');
            if (null != data) {
                switch(data.filtertype) {
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
                return createNoteList(noteRepo.getAll());
            }
        }

        /**
         *  This function is an button event handler to change the page to the new note
         */
        function newNoteClickEventHandler(event) {
            window.location.href='../notes.html';
        }

        /**
         *  This function is an button event handler to change the page to the edit note
         */
        function editNoteClickEventHandler(event) {
            var data = $(this).data();
            window.location.href='../notes.html?Page=edit&Key=' + data.uniqueid;
        }

        function finishedClickEventHandler(event) {
            /* Change backround color */
            $(".showFinished .btn").toggleClass('btn_active');
            
            noteRepo.toggleShowOnlyFinished();
            createNoteList(noteRepo.getAll());
        }
        
        function changeStyleEventHandler(event) {
            var selectedStyle = $('.styleSelect option:selected').val();
            if ("StyleOrange" == selectedStyle) {
                $(".style").attr('href', "css/styleOrange.css");
            } else if ("StyleBlackWhite" == selectedStyle) {
                $(".style").attr('href', "");
            } else {
                /* Default style */
                $(".style").attr('href', "css/styleOrange.css");
            }                
        }

        init();
    });
})(jQuery, window, document);