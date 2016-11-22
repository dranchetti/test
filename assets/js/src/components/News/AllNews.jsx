var React = require('react');
var ReactDOM = require('react-dom');
import NewsViewer from "./NewsViewer.jsx";
import NewsFilter from './NewsFilter.jsx';

(function(APP) {
  "use strict";

  APP.ALLNEWS = {
    newsSite: {},
    categoryField: "tempCategory"
  };

  APP.ALLNEWS.init = function() {

    var AllNews = React.createClass({
      getItems: function(where) {  
        var savedThis = this,
            site = new SPOC.SP.Site(),
            caml = '<View>\
                         <Query>\
                            <Where>\
                                <Eq>\
                                    <FieldRef Name="ContentType" />\
                                    <Value Type="Computed">Article Page</Value>\
                                  </Eq>\
                                </Where>\
                                <OrderBy><FieldRef Name="ArticleStartDate" Ascending="False" /></OrderBy>\
                        </Query>\
                        <RowLimit>' + (this.props.top || '100') + '</RowLimit>\
                        <ViewFields>\
                            <FieldRef Name="Id" />\
                            <FieldRef Name="FileRef" />\
                            <FieldRef Name="Title" />\
                            <FieldRef Name="ArticleByLine" />\
                            <FieldRef Name="ArticleStartDate" />\
                            <FieldRef Name="PublishingPageImage" />\
                        </ViewFields>\
                        <ViewFieldsOnly>1</ViewFieldsOnly>\
                    </View>';
        site.ListItems("Pages").queryCSOM(caml).then(function(results) {
          savedThis.setState({allData: results});
        });  
    },
    getInitialState: function() {
        return {allData: []};
    },
    componentDidMount: function() {
        this.getItems();
    },
      render: function() {
        var start = new Date();
        start.setDate(start.getDate() - 7);
        return (
          <div className="allNews">
            <NewsFilter onStartDateChange={this.onStartDateChange} startDate={start} filterText="Display news from:"/>
            <NewsViewer startDate={this.state.startDate} allData={this.state.allData}/>
          </div>
        );
      },
      onStartDateChange: function(date){
        var dateChanged = new Date(date.split('-').reverse().join('-'));
        this.setState({startDate:dateChanged});
      }
    });
    ReactDOM.render(
      <AllNews />,
      document.getElementById('all-news')
    );
  };

})(window.APP = window.APP || {});
