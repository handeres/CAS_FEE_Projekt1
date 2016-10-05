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
}


function saveClickEventHandler(event) {
    
    var newNote = {};

    newNote.title        = $("#title").val();
    if (true == noteExists(newNote.title)) {
        alert("Titel Already exist!")
        return;
    }
    newNote.description  = $("#description").val();
    newNote.importance   = $("#importance").val(); 
    newNote.finishedDate = $("#date").val(); 
    newNote.createdDate  = getCurrentDate();
    newNote.done         = $("#done").is(":checked") ;  
    /* save data */
    saveNote(newNote);  
    /* go back to main page */
    goBackEventHandler();
}


/**
 * Goes back to the main page
 * @returns {void}
 */
function goBackEventHandler() {
    //window.location.href='../index.html';
     window.history.back();
}

/**
 * Gets the current date of today. Format: DD.MM.YY
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