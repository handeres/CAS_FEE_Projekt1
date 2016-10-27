var rest = (function($) {

    function publicAjax(metod, url, data, headers) {
        if ("" === data) {
            return $.ajax({
                dataType: "json",
                contentType: "application/json",
                headers: headers,
                method: metod,
                url: url,
                cache: false
        });
        } else {
            return $.ajax({
                dataType: "json",
                contentType: "application/json",
                headers: headers,
                method: metod,
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