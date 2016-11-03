/**
 * Created by Hannes on 13.10.2016.
 */


var settingsData = (function($) {

    "use strict"

    var settings = {currentFilter: null, showOnlyFinished: false, currentStyle: "StyleOrange"};

    function publicLoad() {
        var locSettings = loadSettings();
        if (null === locSettings) {
            /* First time settings are read. Save it first */
            saveSettings(settings);
            settings = loadSettings();
        }
        else {
            settings = locSettings;
        }
    }

    function publicSetCurrentFilter(currentFilter) {
        settings.currentFilter = currentFilter;
        saveSettings(settings);
    }

    function publicSetShowOnlyFinished(showOnlyFinished) {
        settings.showOnlyFinished = showOnlyFinished;
        saveSettings(settings);
    }

    function publicSetCurrentStyle(currentStyle) {
        settings.currentStyle = currentStyle;
        saveSettings(settings);
    }

    function publicGetCurrentFilter() {
        return settings.currentFilter;
    }

    function publicGetShowOnlyFinished() {
        return settings.showOnlyFinished;
    }

    function publicGetCurrentStyle() {
        return settings.currentStyle;
    }

    /**
     * Save the settings
     * @param {settings} settings object
     * @returns {void}
     */
    function saveSettings(settings) {
        return localStorage.setItem("settings", JSON.stringify(settings));
    }
    /**
     * Reads the settings
     * @returns {settings}
     */
    function loadSettings() {
        return JSON.parse(localStorage.getItem("settings"));
    }

    return {
         load: publicLoad,
         setCurrentFilter: publicSetCurrentFilter,
         setShowOnlyFinished: publicSetShowOnlyFinished,
         setCurrentStyle: publicSetCurrentStyle,
         getCurrentFilter: publicGetCurrentFilter,
         getShowOnlyFinished: publicGetShowOnlyFinished,
         getCurrentStyle: publicGetCurrentStyle
    };

})(jQuery);