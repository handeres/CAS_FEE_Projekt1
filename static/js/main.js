/**
 * Created by Hannes Anderes on 26.09.2016.
 */
(function($, window, document, undefined) {

    "use strict"


    $(function() {

        /* Register Handlebar Helperfunction to build a for loop */
        Handlebars.registerHelper('for', function(count, options) {
          var ret = "";
          for(var i=0; i < count; i++) {
            ret = ret + options.fn(count);
          }
          return ret;
        });


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

        /*
            This function creates table rows from the handlebar template 'node-template'
         */
        function createNoteList(notesList) {
            var createNodeList = Handlebars.compile($("#note-template").html());
            $(".noteList").empty();
            $(".noteList").append(createNodeList(notesList));
            $(".editNote").on('click', editNoteClickEventHandler);
        }


        /*
           This function is an button event handler for the filter functionality
         */
        function filterClickEventHandler(event) {
            var data = $(this).data();
            //Set all button backgrounds to default
            $(".filters").children().css({'background':'#3d94f6'});
            //Set selected target to red
            $(event.target).css({'background':'red'});
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

        function newNoteClickEventHandler(event) {
            window.location.href='../notes.html';
        }

        function editNoteClickEventHandler(event) {

            var data = $(this).data();
            window.location.href='../notes.html?Page=edit&Key=' + data.uniqueid;
        }

        function finishedClickEventHandler(event) {
            /* Change backround color */
            $(".showFinished .btn").toggleClass('btn_background');
            noteRepo.toggleShowOnlyFinished();
            createNoteList(noteRepo.getAll());
        }

        init();
    });
})(jQuery, window, document);