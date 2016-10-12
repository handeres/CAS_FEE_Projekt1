/**
 * Created by Hannes Anderes on 10.10.2016.
 */
/**
 * Gets the current date of today. Format: YYYY-MM-DD
 * @returns {string}
 */

var utilities = (function($) {

    function publicGetCurrentDate() {
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
     * Sets the css style
     * @returns {void}
     */
    function publicSetStyle(style) {
        if ("StyleOrange" == style) {
            $(".style").attr('href', "css/styleOrange.css");
        } else if ("StyleBlackWhite" == style) {
            $(".style").attr('href', "css/styleBlackWhite.css");
        } else {
            /* Default style */
            $(".style").attr('href', "css/styleOrange.css");
        }
    }

    return {
        getCurrentDate: publicGetCurrentDate,
        setStyle: publicSetStyle
    }

})(jQuery);
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
