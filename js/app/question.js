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
		var prop = "comment";
		var total=0;
		var score;
		for (var j=0;j<results.length;j++){
			score = parseInt(results[j].score);
			if ( !isNaN(score)) {
				results[j].tier= score+1;
				total+=score;
			}
		}
		
		bar.outputResults("#results tbody",results,columns );
		
		}
		bar.getQuestionInfo(question,function(status,results){
			console.log(status, results)
			if (status == "OK") {
				bar.outputInfo("#info", results, prop );
				bar.outputInfo("#question", results, "question" )}
			})

				
	},0);

});

//['question', 'answer', 'score', 'comment']