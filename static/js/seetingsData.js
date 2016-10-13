/**
 * Created by Hannes on 13.10.2016.
 */


var settingsData = (function($) {

    var settingType = {currentFilter: null, showOnlyFinished: false, currentStyle: "StyleOrange"};

    function publicLoad() {
        var locSettings = noteDataStorage.loadSettings();
        if (null === locSettings) {
            /* First time settings are read. Save it first */
            noteDataStorage.saveSettings(settingType);
            settingType = noteDataStorage.loadSettings();
        }
        else {
            settingType = locSettings;
        }
    }

    function publicSetCurrentFilter(currentFilter) {
        settingType.currentFilter = currentFilter;
        noteDataStorage.saveSettings(settingType);
    }

    function publicSetShowOnlyFinished(showOnlyFinished) {
        settingType.showOnlyFinished = showOnlyFinished;
        noteDataStorage.saveSettings(settingType);
    }

    function publicSetCurrentStyle(currentStyle) {
        settingType.currentStyle = currentStyle;
        noteDataStorage.saveSettings(settingType);
    }

    function publicGetCurrentFilter() {
        return settingType.currentStyle;
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