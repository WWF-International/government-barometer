define(["app/barometer"], function(bar) {

    //the d3 and the barometer (with dependencies) have been loaded.
	"use strict";

	bar.getScoresByCountry(function (status, results) {
		var i;
		if (status == "OK") {
		/*	for(i = 0; i < results.length; i++) {
				console.log(results[i]);
			}*/
		var columns=[
			{columnName:"country",columnSelector:"#country",defaultOrder:"ASC",sortType:"alpha"},
			{columnName:"score",columnSelector:"#score",defaultOrder:"DESC"},
			{columnName:"y2012",columnSelector:"#y2012",defaultOrder:"DESC"},
			{columnName:"y2007",columnSelector:"#y2007",defaultOrder:"DESC"},
			{columnName:"y2006",columnSelector:"#y2006",defaultOrder:"DESC"},
			
			]	;
		
		bar.outputResults("#results tbody",results,columns );
		
		}

	},0);

});

// target, columns:sortIds, default order
// select target
// for each column output a cell
// for each colum output a sort 