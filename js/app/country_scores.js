define(["app/barometer"], function(bar) {

    //the d3 and the barometer (with dependencies) have been loaded.
	"use strict";

	bar.getCountryScores("Germany",function (status, results) {
		var i;
		if (status == "OK") {
		/*	for(i = 0; i < results.length; i++) {
				console.log(results[i]);
			}*/
		var columns=[
			{columnName:"abstract",columnSelector:"#abstract",defaultOrder:"ASC",sortType:"delegated",sortProxy:"question number"},
			{columnName:"score",columnSelector:"#score",defaultOrder:"DESC"},

			
			]	;
		
		bar.outputResults("#results tbody",results,columns );
		
		}

	},0);

});

// target, columns:sortIds, default order
// select target
// for each column output a cell
// for each colum output a sort 