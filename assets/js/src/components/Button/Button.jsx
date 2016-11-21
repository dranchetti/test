import React from 'react';

var Button = React.createClass({
    render: function() {
      return (
        <a href={this.props.link} className="btn">{this.props.title}</a>
      );
    }
});

export default Button;
