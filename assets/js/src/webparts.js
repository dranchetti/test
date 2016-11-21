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
            $('.webpart-display').each(function() {
                var display = $(this).attr('data-display');
                switch (display.toLowerCase()) {
                    case 'button-component':
                    APP.BUTTONWRAPPER.init();
                    break;
                    case 'increment-component':
                    APP.INCREMENTWRAPPER.init();
                    break;
                    case 'filter-component':
                    APP.FILTERWRAPPER.init();
                    break;
                    case 'document-library-component':
                    APP.DOCLIBWRAPPER.init();
                    break;
                    default:
                    break;
                }
            });
    };

})(window.APP = window.APP || {});
