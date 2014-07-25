define(["jquery", "gapi"], function($) {

       		function barometer(apiKey) {
				"use strict";
				var baseURL  = '/fusiontables/v1';
				var columns = [ "Country", "ID" ];
				var lastDate = null;
				var ui_parent = null;
				var tables= {countryInfo:'1CNENI_tWA8VKB69Z5G__1th3tavlOtw8KNyUTp9A', answerJOINquestions:'1EZYLsZFLj6ZdzvP8TIl4NCmbxn0Gsx8_ykaXdQPK'}
				var sortedBy = null;

				gapi.client.setApiKey(apiKey);

				this.getSortedBy=function(){return sortedBy}
				this.setSortedBy=function(newVal){sortedBy=newVal;}

				function makeSql(params) {
					var args;
					if (!params.cmd || !params.tableid) {
						throw "Could not generate SQL statement, missing param ('cmd' or 'tableid')";
					}
					args = [
						params.cmd.toUpperCase(), Array.isArray(params.cols) ?
							params.cols.join(",") : "*",
							"FROM", params.tableid
						];
					if (params.where) {
						args.push("WHERE", params.where);
					}
					if (params.orderby) {
						args.push("ORDER BY", params.orderby);
					}
					if (params.limit) {
						args.push("LIMIT", params.limit);
					}
					console.log (args.join(" "));
					return args.join(" ");
				}

				// return an array of objects which the headers as the property names
				function parseResults(cb, res) {
					var ret = [];
					var row_obj, row, col;
					var status = "OK";
					try {
						// sanity checking...
						if (!res.kind || res.kind != "fusiontables#sqlresponse") {
							throw "Unexpected response to sql request from google";
						}
						if (!res.columns || !Array.isArray(res.columns) || res.columns.length < 1) {
							throw "Empty column set return from google";
						}
						if (res.rows) {
							for (row = 0; row < res.rows.length; row++) {
								row_obj = {};
								for (col = 0; col < res.columns.length; col++) {
									row_obj[res.columns[col]] = res.rows[row][col];
									if (res.columns[col] == 'DateAdded') {
										if (lastDate == null || res.rows[row][col]
												> lastDate) {
											lastDate = res.rows[row][col];
										}
									}
								}
								ret.push(row_obj);
							}
						}
					} catch (err) {
						// was it our error? if so save it for passing to the callback
						if (typeof err == "string") {
							status = err;
						} else {
							// not our problem ...
							throw err;
						}
					}
					cb(status, ret);
				}

				// gets the 'amt' latest results and calls the callback with them as first
				// arg

				
				this.getCountries = function(cb, amt) {
					var sqlArgs;

					sqlArgs = {
						cmd    : 'select',
						tableid: tableID,
						cols   : columns,
						orderby: "Country ASC",
						
					};

					if (arguments.length === 3){
						getQuery(sqlArgs,cb,amt);
					} else {
						getQuery(sqlArgs, cb);
					}


				}

				this.getScoresByCountry = function(cb, amt) {
					var sqlArgs;

					sqlArgs = {
						cmd    : 'select',
						tableid: tables.countryInfo,
						cols   : ['country', 'score'],
						orderby: "score DESC",
						
					};

					if (arguments.length === 2){
						getQuery(sqlArgs,cb,amt);
					} else {
						getQuery(sqlArgs, cb);
					}


				}

				this.getCountryScores = function(country, cb, amt) {
					var sqlArgs;

					sqlArgs = {
						cmd    : 'select',
						tableid: tables.answerJOINquestions,
						cols   : ['abstract', 'score'],
						orderby: "'question number' ASC",
						where: 'country = ' + "'" +country+"'"
					};

					if (arguments.length === 3){
						getQuery(sqlArgs,cb,amt);
					} else {
						getQuery(sqlArgs, cb);
					}


				}

				this.getCountryAnswers = function(country, cb, amt) {
					var sqlArgs;

					sqlArgs = {
						cmd    : 'select',
						tableid: tables.answerJOINquestions,
						cols   : ['question', 'answer', 'score', 'comment'],
						orderby: "'question number' ASC",
						where: 'country = ' + "'" +country+"'"
					};

					if (arguments.length === 3){
						getQuery(sqlArgs,cb,amt);
					} else {
						getQuery(sqlArgs, cb);
					}


				}				

				this.getScoresbyIssues = function(country, cb, amt) {
					var sqlArgs;

					sqlArgs = {
						cmd    : 'select',
						tableid: tables.answerJOINquestions,
						cols   : ['question', 'answer', 'totalScore', 'comment'],
						orderby: "'question number' ASC",
						where: 'country = ' + "'" +country+"'"
					};

					if (arguments.length === 3){
						getQuery(sqlArgs,cb,amt);
					} else {
						getQuery(sqlArgs, cb);
					}


				}

				this.getQuestion = function(question, cb, amt) {
					var sqlArgs;

					sqlArgs = {
						cmd    : 'select',
						tableid: tables.answerJOINquestions,
						cols   : ['country', 'score'],
						orderby: "country ASC",
						where: "'question number' = " +  question 
					};

					if (arguments.length === 3){
						getQuery(sqlArgs,cb,amt);
					} else {
						getQuery(sqlArgs, cb);
					}
					sortedBy = {column:"country",order:"ASC"}

				}				

				function getQuery (sqlArgs, cb, amt){
										var sqlArgs, req;
					if (arguments.length < 3) {
						amt = 0;
					}

					if (amt>0) sqlArgs.limit = amt;

					var sql = makeSql(sqlArgs);
					req = gapi.client.request({
						path: baseURL + "/query",
						params: {
							sql: sql,
							typed: false
						},
						// create a new function to use as the callback that always passes in
						// 'cb' as it's first arg
						callback: parseResults.bind(null, cb)
					});

				}


				this.reset = function (resetdate) {
					if (arguments.length < 1) {
						resetdate = null;
					}
					lastDate = resetdate;
				}

				this._utils={};

				this._utils.sortByProp = function(list,prop){
					var res;
						res=list.sort(function(a,b){return toIntforSort(b[prop])-toIntforSort(a[prop])});
					return res;
				}

				this._utils.sortByPropFunc = function(prop,order){
					var swap=1;
					if (order === "DESC")	{swap=-1}
					if (prop==="score"){
						return function(a,b){return swap*(toIntforSort(b[prop])-toIntforSort(a[prop]))};
					}else{
						return function(a,b){return swap===-1? (b[prop] > a[prop]) : !(b[prop] > a[prop])};
					}	
				}

				function toIntforSort(numberorString){
					return parseInt(numberorString).toString()===numberorString.toString() ? parseInt(numberorString) : Number.NEGATIVE_INFINITY;
				}

				// UI functions and data
				// ---

				// replace this callback if you want to change the transition. It is passed
				// with the current list of signups as a jQuery object, plus the new object,
				// plus the parent that it should be appended to. Return value should be the
				// new selection.
				this.ui_signups_limit = 3;
				this.ui_transition = function (signups, parent, new_elm) {
					new_elm.hide();
					parent.append(new_elm);
					if (signups.length >= this.ui_signups_limit) {
						signups.first().slideUp({
								complete: function () {
									$(this).remove();
								}
							}
						);
						signups = signups.not(signups.first());
					}
					new_elm.slideDown();
					return signups.add(new_elm);
				}

				function snipString(str, max) {
					// if the string is shortened, and this is non-null, it will
					// be appended to the shortened string (to indicate that it
					// has been shortened). Defaults to HTML ellispis entity.
					var marker = (arguments.length > 2) ? arguments[2] : "&hellip;";
					if (str.length <= max) {
						return str;
					} else {
						return str.substring(0,max) + (marker == null ? "" : marker);
					}
				}

				var ui_classes = {
					signup	  : "ehlivefeed_signup",
					name	  : "ehlivefeed_signup_name",
					whatdoing : "ehlivefeed_signup_whatdoing",
					timestamp : "ehlivefeed_signup_timestamp",
					region	  : "ehlivefeed_signup_region",
					label	  : "ehlivefeed_signup_label",
					content   : "ehlivefeed_signup_content"
				};
				var signups = $("");
				this.ui_parent = function (elm) {
					if (arguments.length > 0) {
						ui_parent = elm;
					}
					return ui_parent;
				}


				}

return new barometer('AIzaSyAO3KXQiVzbyaEAgDSxSeX2krQAERxJslY')	
})