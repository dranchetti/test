import React from 'react' ;
import ReactDOM from 'react-dom';
import moment from 'moment';
import * as SPOC from 'SPOC';

'use strict';

var NewsViewer = React.createClass({

    selectSrcValue: function(imageString) {
        if(imageString){
            var imgArray = imageString.split(' ');

            for(var i = 0; i < imgArray.length; i++){
                if(imgArray[i].startsWith("src")){
                    var srcArray = imgArray[i].split('\"');
                    return srcArray.length > 0 ? srcArray[1] : "";    
                }
            } 
        }

       return "";
    },
    
    render: function() {
        var savedThis = this,
            content = this.props.allData.map(function(item, i) {
                if(savedThis.isValid(item)){
                var imageSrc = savedThis.selectSrcValue(item.PublishingPageImage);
                var title = item.Title && item.Title.length > 45 ? 
                                item.Title.substr(0, 40).trim() + "..." : item.Title,
                    articleDate = item.ArticleStartDate ? 
                                    moment(item.ArticleStartDate).format('D MMMM, YYYY') : "",
                    strapline = item.ArticleByLine && item.ArticleByLine.length > 160 ? 
                                    item.ArticleByLine.substr(0, 155).trim() + "..." : item.ArticleByLine;

                var mainContent = <div className="newsraw-tile">
                                    <div className="newsraw-image">
                                        <a href={item.FileRef}>
                                            <img src={imageSrc + "?RenditionID=5"} />
                                        </a>
                                    </div>
                                    <div className="newsraw-articledate">
                                        <p>{articleDate}</p>
                                    </div>
                                    <div className="newsraw-title">
                                        <a href={item.FileRef}>{title}</a>
                                    </div>
                                    <div className="newsraw-strapline">
                                        {strapline}
                                    </div>
                                  </div>;
                return (
                    <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg6 ms-u-xl4" key={i}>
                        {mainContent}
                    </div>
                );
                }
                else return null;
            });   
        
        return (
            <div className="newsraw">
	            <div className="even">
	                <div className="ms-Grid container"> 
	                    <div className="ms-Grid-row">
	                        {content} 
	                    </div>
	                </div>
	            </div>
            </div>
        );
    },

    isValid: function(item){
        var itemDate = new Date(item.ArticleStartDate);
        return this.props.startDate ? this.props.startDate < itemDate : true;
    }
});

export default NewsViewer;
