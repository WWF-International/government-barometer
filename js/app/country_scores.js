define(["config", "app/barometer"], function(config,bar) {

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
		var prop="description";
		var total=0;
		var score;
		for (var j=0;j<results.length;j++){
			score = parseInt(results[j].score);
			if ( !isNaN(score)) {
				results[j].tier= score+1;
				total+=score;
			}
		}

		bar.outputResults("#results tbody",results,columns);

		}
		
		var linkUrl=config.linkUrl;
		bar.getCountryInfo(country,function(status,results){
			console.log(linkUrl);
		if (status == "OK") {
			bar.outputInfo("#info", results, prop );
			bar.outputInfo("#countryName", [{country:country}], "country" );
			bar.outputInfo("#totalScore", [{totalScore:"Total rating of "+country+" is "+ total}], "totalScore" );
			
			var join = linkUrl.indexOf('?')===-1 ? '?': '&';
			bar.outputInfo("#answersLink", [{answersLink:'<a href="'+linkUrl+ join+ 'country=' + country + '"">Full details for ' +country + '</a>'}], "answersLink" );
		}
	});

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