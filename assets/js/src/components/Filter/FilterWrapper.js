import React from 'react' ;
import ReactDOM from 'react-dom';

(function(APP) {
	"use strict";

	APP.FILTERWRAPPER = {
	};

	APP.FILTERWRAPPER.init = function() {


	var FilteredList = React.createClass({
			filterList: function(event){
				var updatedList = this.state.initialItems;
				updatedList = updatedList.filter(function(item){
					return item.toLowerCase().search(
						event.target.value.toLowerCase()) !== -1;
				});
				this.setState({items: updatedList})
			},
			getInitialState: function(){
				return {
					initialItems: [
					"Breadcrumb",
					"Buttons",
					"Callout",
					"Checkbox",
					"ChoiceGroup",
					"ColorPicker",
					"CommandBar",
					"Contextual Menu"
					],
					items: [],
					selected:""
				}
			},
			componentWillMount: function(){
				this.setState({selected: "please select a component"});
				this.setState({items: this.state.initialItems});
			},
			render: function(){
				return (
					<div className="filter-list">
						<input type="text" placeholder="Search Components" onChange={this.filterList} />
						<List items={this.state.items} />
						<p>Selected: {this.state.selected}</p>
					</div>
				);
			}

		});
		var List = React.createClass({
			render: function(){
				return (
					<ul>
					{
						this.props.items.map(function(item){
							return <li key={item}><ListButton item={item} /></li>
						})
					}
					</ul>
					)
			}
		});

		var ListButton = React.createClass({
			selectComponent: function(comp_){
				console.log(comp_);
			},
			render: function(){
				return(
						<a type="button" onClick={() => {this.selectComponent(this.props.item)}}>{this.props.item}</a>
					)

			}
		});

		ReactDOM.render(
			<FilteredList />,
			document.getElementById('filter-component')
		);
	};

})(window.APP = window.APP || {});
