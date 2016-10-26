var rest = (function($) {

    function publicAjax(metod, url, data, headers) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            headers: headers,
            method: metod,
            url: url,
            data: JSON.stringify(data)
        });
    }
    return {
        ajax: publicAjax
    }
}(jQuery));