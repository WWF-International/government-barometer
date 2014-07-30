define(["app/barometer"], function(bar) {

    //the d3 and the barometer (with dependencies) have been loaded.
	"use strict";

	var country = decodeURIComponent(bar._utils.GetQueryVariable(location.search,"country"));
	country = country || "United Kingdom";

	bar.getCountryAnswers(country,function (status, results) {
		var i;
		if (status == "OK") {
		/*	for(i = 0; i < results.length; i++) {
				console.log(results[i]);
			}*/
		var columns=[
			{columnName:"question",columnSelector:"#question",defaultOrder:"ASC",sortType:"delegated",sortProxy:"question number"},
			{columnName:"answer",columnSelector:"#answer",defaultOrder:"DESC", sortType:"alpha"},
			{columnName:"score",columnSelector:"#score",defaultOrder:"DESC"},
			{columnName:"comment",columnSelector:"#comment",defaultOrder:"ASC",sortType:"delegated",sortProxy:"question number"}
			
			]	;
		
		bar.outputResults("#results tbody",results,columns );
		
		}

	},0);

});

//['question', 'answer', 'score', 'comment']