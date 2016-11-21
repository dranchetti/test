import React from 'react' ;
import ReactDOM from 'react-dom';
import moment from 'moment';
import * as SPOC from 'SPOC';

var DocumentRow = React.createClass({

      render: function() {
        var date = moment(this.props.item.Created, 'YYYY/MM/DD');
        var day = date.format('D');
        var month = date.format('MMMM');
        var year = date.format('YYYY');
        return (
          <li className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm6 ms-u-xl6 ms-u-l6">
              <img src="/Style%20Library/SupplierNet/_img/svg/file.svg" />
              <a href={this.props.item.FileRef}>{this.props.item.Title}</a>
            </div>
            <div className="ms-Grid-col ms-u-sm3 ms-u-xl3 ms-u-l3">
              <span>{day} {month}, {year}</span>
            </div>
            <div className="ms-Grid-col ms-u-sm3 ms-u-xl3 ms-u-l3 authorColumn">
              <h2>{this.props.item.Author.Title}</h2>
            </div>
          </li>
          );
      }
});

var DocumentsView = React.createClass({

      render: function() {
        var myObj = this;
        if(this.props.items && this.props.items.length>0){
          var docs = this.props.items.map(function(value, index) {
            return (
              <DocumentRow item={value}/>
              );
          });
          return (
            <div className="container documentLibrary docLib">
              <h2>{this.props.title}</h2>
              <div className="ms-Grid-row header-row">
                <div className="ms-Grid-col ms-u-sm6 ms-u-xl6 ms-u-l6">
                  <h3>Name</h3>
                </div>
                <div className="ms-Grid-col ms-u-sm3 ms-u-xl3 ms-u-l3">
                  <h3>Modified</h3>
                </div>
                <div className="ms-Grid-col ms-u-sm3 ms-u-xl3 ms-u-l3">
                  <h3>Modified by</h3>
                </div>
              </div>
              <ul className="documents">{docs}</ul>
            </div>
            );
          }
          else{
            return null;
          }
      }
    });

var DocumentLibrary = React.createClass({
       getInitialState: function() {
            return {
                documents: [],
            };
        },
      componentDidMount: function(){
        var savedThis = this,
            site = new SPOC.SP.Site();

            var listItems = site.ListItems("Documents");
            var querySettings= {
              orderBy: 'Created desc'
          };
          listItems.query(querySettings).then(function(results) {
            savedThis.setState({documents: results});
            console.log(results);
        });
      },
      render: function() {
          return (
            <DocumentsView items={this.state.documents}/>
            );
      }
    });

export default DocumentLibrary;
