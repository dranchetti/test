import React from 'react' ;
import ReactDOM from 'react-dom';

(function(APP) {
	"use strict";

	APP.INCREMENTWRAPPER = {
	};

	APP.INCREMENTWRAPPER.init = function() {


	var Counter = React.createClass({
			incrementCount: function(){
				this.setState({
					count: this.state.count + 1
				});
			},
			getInitialState: function(){
				return {
					count: 5
				}
			},
			render: function(){
				return (
					<div>
						<h1>Count: {this.state.count}</h1>
						<button type="button" onClick={this.incrementCount}>Increment</button>
					</div>
				);
			}

		});

		ReactDOM.render(
			<Counter />,
			document.getElementById('increment-component')
		);
	};

})(window.APP = window.APP || {});
