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
			var score;
			for (var j=0;j<results.length;j++){
				score = parseInt(results[j].totalScore);
				if ( !isNaN(score)) {
					results[j].tier= score>37.2 ? 3.0 : score>18.6 ? 2.0 : 1.0;

				}
		}	

		bar.outputResults("#results tbody",results,columns );
		
		}

	},0);

});

//['question', 'answer', 'score', 'comment']