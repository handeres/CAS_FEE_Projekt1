/**
 * Created by Hannes on 26.09.2016.
 */

var testData = [
    {"id":"01", "title":"Titel1", "description":"Dies ist ein Text", "importance":7, "createdDate":"2016-10-26", "finishedDate":"2016-09-26", "done":false},
    {"id":"02", "title":"Titel2", "description":"Dies ist auch ein Text", "importance":5, "createdDate":"2016-11-30", "finishedDate":"2016-09-26", "done":false},
];


function init() {
    addNoteList(testData);
    $("#filters").on('click', 'button', filterClickEventHandler);
}

/*
    This function creates table rows from the handlebar template 'node-template'
 */
function addNoteList(notesList) {
    var createNodeList = Handlebars.compile($("#note-template").html());
    $("#noteList").empty();
    $("#noteList").append(createNodeList(notesList));
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
    else if (s1.importance < s2.importance ) {
        return 1;
    }
    return 0;
}

/*

 */
function sortNotList(noteList) {
    addNoteList(noteList.sort(compareNotesByDate));
}

/*
    This function is an button event handler for the filter functionality
 */
function filterClickEventHandler(event) {
    var data = $(this).data();
    if (null != data) {
        switch(data.filtertype) {
            case "createdDate":
                return addNoteList(testData.sort(compareNotesByCreatedDate));
            case "finishedDate":
                return addNoteList(testData.sort(compareNotesByFinishedDate));
            case "importance":
                return addNoteList(testData.sort(compareNotesByImportance));
            default:
                return addNoteList(testData.sort(compareNotesByCreatedDate));
        }
    }
}

