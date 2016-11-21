import $ from 'jquery';

(function(APP) {
    "use strict";

    /**
     * Root of the application
     */
     APP.GLOBAL = {

    };

    $(document).ready(function() {
        APP.GLOBAL.init();
    });

    /**
     * Init the main components and webparts
     */
     APP.GLOBAL.init = function() {
        APP.WEBPARTS.init();

    };


})(window.APP = window.APP || {});
