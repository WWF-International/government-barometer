define(["app/barometer"], function(bar) {

    //the d3 and the barometer (with dependencies) have been loaded.
	"use strict";

	var country = decodeURIComponent(bar._utils.GetQueryVariable(location.search,"country"));
	country = country || "United Kingdom";

	bar.getCountryScores(country,function (status, results) {
		var i;
		if (status == "OK") {
		/*	for(i = 0; i < results.length; i++) {
				console.log(results[i]);
			}*/
		var columns=[
			{columnName:"abstract",columnSelector:"#abstract",defaultOrder:"ASC",sortType:"delegated",sortProxy:"question number"},
			{columnName:"score",columnSelector:"#score",defaultOrder:"DESC"},

			
			]	;
		
		bar.outputResults("#results tbody",results,columns);

		}
		bar.getCountryInfo(country,function(status,results){
		console.log(status, results)
		if (status == "OK") {
			bar.outputInfo("#info", results )
		}
	})

	},0);



});

/*
		bar.getCountryInfo(country,function(status,results){
		console.log('gotifo')
		if (status == "OK") {
			bar.outputInfo("#info", results )
		}
	})

	*/