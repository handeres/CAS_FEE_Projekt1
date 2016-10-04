/**
 * Created by Hannes on 26.09.2016.
 */

var testData = [
    {"id":"01", "title":"Titel1", "description":"Dies ist ein Text", "importance":7, "createdDate":"2016-10-26", "finishedDate":"2016-09-26", "done":false},
    {"id":"02", "title":"Titel2", "description":"Dies ist auch ein Text", "importance":5, "createdDate":"2016-11-30", "finishedDate":"2016-09-26", "done":false},
];

var defaultData = {"id":"01", "title":"New Title", "description":"Add your Text here", "importance":8, "createdDate":"2016-12-26", "finishedDate":"2016-02-26", "done":false};


function init() {
    createNoteList(testData);
    $(".filters").on('click', 'button', filterClickEventHandler);
    $(".newNote").on('click', 'button', addNewNoteClickEventHandler);
}

/*
    This function creates table rows from the handlebar template 'node-template'
 */
function createNoteList(notesList) {
    var createNodeList = Handlebars.compile($("#note-template2").html());
    $(".noteList").empty();
    $(".noteList").append(createNodeList(notesList));
}

/*
 This function adds a node to the list
 */
function addNoteToList(note) {
    testData.push(note);
    createNoteList(testData);
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

function sortListOnlyFinished() {

}

/*

 */
function sortNotList(noteList) {
    createNoteList(noteList.sort(compareNotesByDate));
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
                return createNoteList(testData.sort(compareNotesByCreatedDate));
            case "finishedDate":
                return createNoteList(testData.sort(compareNotesByFinishedDate));
            case "importance":
                return createNoteList(testData.sort(compareNotesByImportance));
            default:
                return createNoteList(testData.sort(compareNotesByCreatedDate));
        }
    }
}


/*
    This function adds a new note to the list
 */
function addNewNoteClickEventHandler(event) {

    addNoteToList(defaultData);
}