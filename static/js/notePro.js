/**
 * Created by Hannes Anderes on 26.09.2016.
 */

'use strict'

var globalNodeList = [];
var noteManager = {};

$(function() {
    
    //Register Handlebar Helperfunction to build a for loop
	Handlebars.registerHelper('for', function(count, options) {
	  var ret = "";
	  for(var i=0; i < count; i++) {
		ret = ret + options.fn(count);
	  }
	  return ret;
	});
});

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
    
function finishedClickEventHandler(event) {
    //Change backround
    $(".showFinished .btn").toggleClass('btn_background');   
    globalNodeList = readNoteList();
                                           
    if (false == noteManager.finishedFillteActive) {
        globalNodeList = readNodeListFiltered(globalNodeList);        
    }
    noteManager.finishedFillteActive = !noteManager.finishedFillteActive;
    createNoteList(globalNodeList.sort(noteManager.currentFilter));
}

function editClickEventHandler(event) {
    //Save current settings
    window.location.href='../notes.html?Page=edit'+'&'+"key=Erste Titel";    
}

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});
