var React = require('react');
var ReactDOM = require('react-dom');

import NewsViewer from "./NewsViewer.jsx";

(function(APP) {
  "use strict";

  APP.LATESTNEWS = {
    newsSite: {},
    categoryField: "tempCategory"
  };

  APP.LATESTNEWS.init = function() {

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
                        <RowLimit>3</RowLimit>\
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

      ReactDOM.render(
        <NewsViewer initialitemscount="3" top="3" allData={results} />,
        document.getElementById('latest-news')
      );
    });
  };

})(window.APP = window.APP || {});
