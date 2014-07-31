define(["app/barometer"], function(bar) {

    //the d3 and the barometer (with dependencies) have been loaded.
	"use strict";

	var question = decodeURIComponent(bar._utils.GetQueryVariable(location.search,"issue"));
	question = question || 1;

	bar.getQuestion(1,function (status, results) {
		var i;
		if (status == "OK") {
		/*	for(i = 0; i < results.length; i++) {
				console.log(results[i]);
			}*/
		var columns=[
			{columnName:"country",columnSelector:"#country",defaultOrder:"ASC",sortType:"alpha"},
			{columnName:"score",columnSelector:"#score",defaultOrder:"DESC"}
			
			]	;
		
		bar.outputResults("#results tbody",results,columns );
		
		}

	},0);

});

//['question', 'answer', 'score', 'comment']