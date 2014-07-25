define(["d3","app/barometer"], function(d3,bar) {

    //the d3 and google api client plugins have been loaded.
	"use strict"
//	var bar = new barometer(
		//'18OLTUYNKvmyyDgIjulFwhSnG0kOgYbic8K4pvU3J', //1j0qHYRu5sT4lU76zozNVeMG3Pz3UaXQ2PkboIHkb', // tableid
//		'AIzaSyAO3KXQiVzbyaEAgDSxSeX2krQAERxJslY'); // apikey

		bar.getScoresByCountry(function (status, results) {
		var i;
		if (status == "OK") {
			for(i = 0; i < results.length; i++) {
				console.log(results[i]);
			}
			var p = d3.select("#results tbody").selectAll("tr")
				.data(results)
				.html(function(d){return "<td>" + d.country +"</td><td>" + d.score+ "</td>"})

				p.enter().append("tr")
				.html(function(d){return "<td>" + d.country +"</td><td>" + d.score+ "</td>"})


				d3.select("#score").on("click",function(){
					var sortedBy=bar.getSortedBy()
					var newOrder = "DESC";
					if (sortedBy.column==="score"){
						var newOrder = sortedBy.order ==="ASC" ? "DESC" : "ASC"}
						p.sort(bar._utils.sortByPropFunc('score',newOrder))
					bar.setSortedBy({column:"score",order:newOrder})

					
				})

				d3.select("#country").on("click",function(){
					var sortedBy=bar.getSortedBy()
					console.log(sortedBy)
					var newOrder = "ASC";
					if (sortedBy.column==="country"){
						var newOrder = sortedBy.order ==="ASC" ? "DESC" : "ASC"}
						p.sort(bar._utils.sortByPropFunc('country',newOrder))
					bar.setSortedBy({column:"country",order:newOrder})

				})

			}
		}
	,0)

});

