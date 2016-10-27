/**
 * Created by Hannes on 13.10.2016.
 */


var settingsData = (function($) {

    "use strict"

    var settingType = {currentFilter: null, showOnlyFinished: false, currentStyle: "StyleOrange"};


    function publicLoad() {
        var locSettings = loadSettings();
        if (null === locSettings) {
            /* First time settings are read. Save it first */
            saveSettings(settingType);
            settingType = loadSettings();
        }
        else {
            settingType = locSettings;
        }
    }

    function publicSetCurrentFilter(currentFilter) {
        settingType.currentFilter = currentFilter;
        saveSettings(settingType);
    }

    function publicSetShowOnlyFinished(showOnlyFinished) {
        settingType.showOnlyFinished = showOnlyFinished;
        saveSettings(settingType);
    }

    function publicSetCurrentStyle(currentStyle) {
        settingType.currentStyle = currentStyle;
        saveSettings(settingType);
    }

    function publicGetCurrentFilter() {
        return settingType.currentFilter;
    }

    function publicGetShowOnlyFinished() {
        return settingType.showOnlyFinished;
    }

    function publicGetCurrentStyle() {
        return settingType.currentStyle;
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