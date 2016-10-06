/**
 * Created by Hannes Anderes on 05.10.2016.
 */

'use strict'

/**
 * Initialized the event handler
 * @returns {void}
 */
function init() {
    $("form").on('submit', saveClickEventHandler);
    $("#cancel").on('click', goBackEventHandler);
    
    /* Same page used for create note and edit note. 
     * Title is dynamically.
     */
    var arlparameters =  $.getUrlVars();
    if (null != arlparameters) {
        if ("edit" == arlparameters.Page) {
            $("h1").text("Edit Note");
            loadNote(arlparameters.Key);
        } else {
            $("h1").text("New Note"); 
        }       
    }
}

/**
 * Save click event handler. Saves the data to a storage
 * @returns {void}
 */
function saveClickEventHandler(event) {
    
    var newNote = {};
     
    newNote.title        = $("#title").val();
    newNote.description  = $("#description").val();
    newNote.importance   = $("#importance").val(); 
    newNote.finishedDate = $("#date").val(); 
    newNote.createdDate  = getCurrentDate();
    newNote.done         = $("#done").is(":checked");   
    newNote.uniqueID     = $("#uniqueID").val();
    
    //Check if it is a new entry
    if (    (undefined === newNote.uniqueID) 
         || ("" === newNote.uniqueID)){
        /* genarete a key if the entry is new created */
        newNote.uniqueID = $.getUniqueID(10);
        saveNewNote(newNote); 
    } else {
        /* data was edited. Overwrite data in the list */
        saveEditedNote(newNote);
    }
    /* go back to main page */
    goBackEventHandler();
}

/**
 * Load note object from the storage by uniqueID as key
 * @returns {void}
 */
function loadNote(titel) {
    var note = getNoteByTitel(titel);
    if (null != note) {
        $("#title").val(note.title)
        $("#description").val(note.description);
        $("#importance").val(note.importance); 
        $("#date").val(note.finishedDate);
        if (true == note.done) {
            $("#done").attr("checked", "true");
        }
        $("#uniqueID").val(note.uniqueID);
    }
}


/**
 * Goes back to the main page
 * @returns {void}
 */
function goBackEventHandler() {  
    window.history.back();
}

/**
 * Gets the current date of today. Format: YYYY-MM-DD
 * @returns {string}
 */
function getCurrentDate() {
    var fullDate = new Date()
    //Thu Otc 15 2014 17:25:38 GMT+1000 {}
    //convert month to 2 digits
    var twoDigitMonth = fullDate.getMonth();
    if (twoDigitMonth < 10) {
        twoDigitMonth = "0" + twoDigitMonth;
    }
    //convert day to 2 digits
    var twoDigitDay = fullDate.getDate();
    if (twoDigitDay < 10) {
        twoDigitDay = "0" + twoDigitDay;
    }
    var currentDate = fullDate.getFullYear() + "-"  + twoDigitMonth + "-"  +  twoDigitDay;
    return currentDate;
}

/**
 *  Extend jQuery with the function getUrlVars to read the url parameters
 */
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

/* Read more: http://jaspreetchahal.org/jquery-javascript-create-unique-id-for-an-element/#ixzz4MIeBs0jm
 * Creates a unique id
 */
$.extend({
   counter:0,
   getUniqueID:function(idlength) {
      var charstoformid = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
        if (! idlength) {
            idlength = Math.floor(Math.random() * charstoformid.length);
        }
        var uniqid = '';
        for (var i = 0; i < idlength; i++) {
            uniqid += charstoformid[Math.floor(Math.random() * charstoformid.length)];
        }
        return uniqid;
}});


