import React from 'react' ;
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker.jsx';

var NewsFilter = React.createClass({
	render: function(){
		return (
			<div className="newsFilter">
			  <h3>{this.props.filterText}</h3>
	          <DatePicker onDateChange={this.handleStartDateChange} selected={this.props.startDate}  />
	         </div>
              );
	},
	handleStartDateChange: function(date){
      this.props.onStartDateChange(date);
    }
});

export default NewsFilter;
