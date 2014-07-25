define(["d3","app/barometer"], function(d3,bar) {

    //the d3 and the barometer (with dependencies) have been loaded.
	"use strict";

	bar.getScoresByCountry(function (status, results) {
		var i;
		if (status == "OK") {
		/*	for(i = 0; i < results.length; i++) {
				console.log(results[i]);
			}*/
		var columns=[{columnName:"country",columnSelector:"#country",defaultOrder:"ASC"},
			{columnName:"score",columnSelector:"#score",defaultOrder:"DESC"}]	;
		
		bar.outputResults("#results tbody",results,columns );
		
		}

	},0);

});

// target, columns:sortIds, default order
// select target
// for each column output a cell
// for each colum output a sort 