/**
 * Created by Hannes Anderes on 26.09.2016.
 */

'use strict'

var globalNodeList = [];
var noteManager = {};


function init() {
    /* Read note list from the persistance */
    globalNodeList = readNoteList();
    noteManager.finishedFillteActive = false;
    if (null != globalNodeList) {
        createNoteList(globalNodeList);
    }
    $(".filters").on('click', 'button', filterClickEventHandler);
    $(".newNote").on('click', 'button', newNoteClickEventHandler);
    $(".showFinished .btn").on('click', finishedClickEventHandler);   
}

/*
    This function creates table rows from the handlebar template 'node-template'
 */
function createNoteList(notesList) {
    var createNodeList = Handlebars.compile($("#note-template").html());
    $(".noteList").empty();
    $(".noteList").append(createNodeList(notesList));
}


function readNodeListFiltered(notesList) {
    var filteredNoteList = jQuery.grep(notesList, function(note, i){
        return (note.done === true);
    });
    return filteredNoteList;
}

/*
 This function compares two nodes by the created date
 */
function compareNotesByCreatedDate(s1, s2) {
    if (s1.createdDate > s2.createdDate) {
        return -1;
    }
    else if (s1.createdDate < s2.createdDate) {
        return 1;
    }
    return 0;
}

/*
    This function compares two nodes by the finished date
 */
function compareNotesByFinishedDate(s1, s2) {
    if (s1.finishedDate > s2.finishedDate) {
        return -1;
    }
    else if (s1.finishedDate < s2.finishedDate) {
        return 1;
    }
    return 0;
}

/*
    This function compares two nodes by date the importance
 */
function compareNotesByImportance(s1, s2) {
    if (s1.importance > s2.importance) {
        return -1;
    }
    else if (s1.importance < s2.importance) {
        return 1;
    }
    return 0;
}


/*

 */
function sortNotList(noteList) {
    createNoteList(globalNodeList.sort(compareNotesByDate));
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
    //$(event.target).toggleClass('btn_background');
    if (null != data) {
        switch(data.filtertype) {
            case "createdDate":
                noteManager.currentFilter = compareNotesByCreatedDate;  
                break;
            case "finishedDate":
                noteManager.currentFilter = compareNotesByFinishedDate;
                break;
            case "importance":
                noteManager.currentFilter = compareNotesByImportance;
                break;
            default:
                noteManager.currentFilter = compareNotesByCreatedDate; 
                break;
        }
        return createNoteList(globalNodeList.sort(noteManager.currentFilter));
    }
}

function newNoteClickEventHandler(event) {
    //Save current settings
    window.location.href='../notes.html';
}
    
function finishedClickEventHandler(event) {$
    //Change backround
    $(".showFinished .btn").toggleClass('btn_background');   
    globalNodeList = readNoteList();
                                           
    if (false == noteManager.finishedFillteActive) {
        globalNodeList = readNodeListFiltered(globalNodeList);        
    }
    noteManager.finishedFillteActive = !noteManager.finishedFillteActive;
    createNoteList(globalNodeList.sort(noteManager.currentFilter));
}
