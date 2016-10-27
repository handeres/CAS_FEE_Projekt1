/**
 * Created by Hannes Anderes on 27.10.2016.
 */
(function($, window, document, undefined) {

    "use strict"

    $(function() {

        /**
         *  Register Handlebar helper function to build a for loop
         */
        Handlebars.registerHelper('for', function (count, options) {
            var ret = "";
            for (var i = 0; i < count; i++) {
                ret = ret + options.fn(count);
            }
            return ret;
        });
    });

})(jQuery, window, document);