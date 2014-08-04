define(["config","app/barometer"], function(config, bar) {

    //the d3 and the barometer (with dependencies) have been loaded.
	"use strict";

	var country = decodeURIComponent(bar._utils.GetQueryVariable(location.search,"country"));
	country = country || "United Kingdom";

	bar.getScoresbyIssues(country,function (status, results) {
		var i;
		if (status == "OK") {
		/*	for(i = 0; i < results.length; i++) {
				console.log(results[i]);
			}*/
		var columns=[
			{columnName:"abstract",columnSelector:"#question",defaultOrder:"ASC",sortType:"delegated",sortProxy:"question number",linkUrl:config.linkUrl,linkParams:{param:"issue",value:"question number"}},
			{columnName:"totalScore",columnSelector:"#score",defaultOrder:"DESC"}
			
			]	;
		
		bar.outputResults("#results tbody",results,columns );
		
		}

	},0);

});

//['question', 'answer', 'score', 'comment']