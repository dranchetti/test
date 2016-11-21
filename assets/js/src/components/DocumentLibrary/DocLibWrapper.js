import React from 'react' ;
import ReactDOM from 'react-dom';
import DocumentLibrary from './DocumentLibrary.jsx';

(function(APP) {
	"use strict";

	APP.DOCLIBWRAPPER = {
	};

	APP.DOCLIBWRAPPER.init = function() {

        ReactDOM.render(
           <DocumentLibrary title="Documents" />,
           document.getElementById('document-library-component')
           );
    };

})(window.APP = window.APP || {});
