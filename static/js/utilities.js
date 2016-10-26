/**
 * Created by Hannes Anderes on 10.10.2016.
 */
/**
 * Gets the current date of today. Format: YYYY-MM-DD
 * @returns {string}
 */

var utilities = (function($) {

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


