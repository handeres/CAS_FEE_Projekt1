
var rest = (function($) {

    function publicAjax(method, url, data, headers) {
      if ("" === data) {
            return $.ajax({
                dataType: "json",
                contentType: "application/json",
                headers: headers,
                method: method,
                url: url,
                cache: false
        });
        } else {
            return $.ajax({
                dataType: "json",
                contentType: "application/json",
                headers: headers,
                method: method,
                url: url,
                data: JSON.stringify(data),
                cache: false
            });
         }
    }
    return {
        ajax: publicAjax
    }
}(jQuery));