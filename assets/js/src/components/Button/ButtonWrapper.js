import React from 'react' ;
import ReactDOM from 'react-dom';
//import Button from './Button.jsx';

(function(APP) {
	"use strict";

	APP.BUTTONWRAPPER = {
	};

	APP.BUTTONWRAPPER.init = function() {

		var Button = React.createClass({
			render: function() {
				if(this.props.link != null){
					if(this.props.imageUrl != null) {
						return(
							<a href={this.props.link} className="btn"><img src="https://facebook.github.io/react/img/logo_og.png" /></a>
							);
					} else {
						return (
							<a href={this.props.link} className='btn'>{this.props.title}</a>
						);
					}
				} else {
					return (
					<a className='btn'>{this.props.title}</a>
					);
				}
			}
		});

		ReactDOM.render(
			<Button title="My Link" link="https://www.google.co.uk" imageUrl="http://www.w3schools.com/html/html5.gif"/>,
			document.getElementById('button-component')
			);
	};

})(window.APP = window.APP || {});
