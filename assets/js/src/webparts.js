import $ from 'jquery';

(function(APP) {
    "use strict";

    /**
     * Create links grid object and set default settings
     */
     APP.WEBPARTS = {};

    /**
     * Executes webpart initialization
     */
     APP.WEBPARTS.init = function() {
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
            $('.webpart-display').each(function() {
                var display = $(this).attr('data-display');
                switch (display.toLowerCase()) {
                    case 'latest-news':
                    APP.LATESTNEWS.init();
                    break;
                    case 'all-news':
                    APP.ALLNEWS.init();
                    break;
                    default:
                    break;
                }
            });
        });
    };

})(window.APP = window.APP || {});
