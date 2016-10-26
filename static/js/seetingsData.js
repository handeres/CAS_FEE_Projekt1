/**
 * Created by Hannes on 13.10.2016.
 */


var settingsData = (function($) {

    "use strict"

    var settingType = {currentFilter: null, showOnlyFinished: false, currentStyle: "StyleOrange"};
    var dataStorage = noteDataStorage.createDataStorage();

    function publicLoad() {
        var locSettings = dataStorage.loadSettings();
        if (null === locSettings) {
            /* First time settings are read. Save it first */
            dataStorage.saveSettings(settingType);
            settingType = dataStorage.loadSettings();
        }
        else {
            settingType = locSettings;
        }
    }

    function publicSetCurrentFilter(currentFilter) {
        settingType.currentFilter = currentFilter;
        dataStorage.saveSettings(settingType);
    }

    function publicSetShowOnlyFinished(showOnlyFinished) {
        settingType.showOnlyFinished = showOnlyFinished;
        dataStorage.saveSettings(settingType);
    }

    function publicSetCurrentStyle(currentStyle) {
        settingType.currentStyle = currentStyle;
        dataStorage.saveSettings(settingType);
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