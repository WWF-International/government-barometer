define(["gapi"], function() {

    function barometer(apiKey) {
        //"use strict";
        var baseURL  = '/fusiontables/v1';
        var columns = [ "Country", "ID" ];
        var lastDate = null;
        var ui_parent = null;
        var tables= {countryInfo:'1CNENI_tWA8VKB69Z5G__1th3tavlOtw8KNyUTp9A', answerJOINquestions:'1EZYLsZFLj6ZdzvP8TIl4NCmbxn0Gsx8_ykaXdQPK'};
        var sortedBy = null;

        gapi.client.setApiKey(apiKey);

        this.getSortedBy=function(){return sortedBy;};
        this.setSortedBy=function(newVal){sortedBy=newVal;};

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

        
        this.outputResults = function (target, results, columns, cb){
            passThis=this;
            var p = d3.select(target).selectAll("tr")
            .data(results)
            .html(buildCells(columns));

            p.enter().append("tr")
            .html(buildCells(columns));

            for (i=0;i<columns.length;i++){ 
                var column=columns[i];
                d3.select(column.columnSelector).on("click",clickHandler(passThis,column,p));
            }
        if (typeof cb==="function") {cb();}
        };

        function buildCells(columns){
            return function(d) {
                var str=""; 
                for (i=0;i<columns.length;i++){
                    str=str+ "<td>" +d[columns[i].columnName]+"</td>" ;
                } return str;
            };
        }

        function clickHandler(passThis,column,p){
            return function(){
                var newOrder = column.defaultOrder;
                if (sortedBy.column===column.columnName){
                    newOrder = sortedBy.order ==="ASC" ? "DESC" : "ASC";
                }
                p.sort(passThis._utils.sortByPropFunc(column.columnName,newOrder));
                sortedBy={column:column.columnName,order:newOrder};
            };
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


        };

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

            sortedBy = {column:"country",order:"ASC"};
        };

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


        };

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


        };          

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


        };

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
            sortedBy = {column:"country",order:"ASC"};

        };  

        function getQuery (sqlArgs, cb, amt){
            var req;
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
        };

        this._utils={};

        this._utils.sortByProp = function(list,prop){
            var res;
            res=list.sort(function(a,b){return toIntforSort(b[prop])-toIntforSort(a[prop]);});
            return res;
        };

        this._utils.sortByPropFunc = function(prop,order){
            var swap=1;
            if (order === "DESC")   {swap=-1;}
            if (prop==="score"){
                return function(a,b){return swap*(toIntforSort(a[prop])-toIntforSort(b[prop]));};
            }else{
                return function(a,b){return swap===-1? (b[prop] > a[prop]) : (b[prop] < a[prop]);};
            }   
        };

        function toIntforSort(numberorString){
            return parseInt(numberorString).toString()===numberorString.toString() ? parseInt(numberorString) : Number.NEGATIVE_INFINITY;
        }


    }

    return new barometer('AIzaSyAO3KXQiVzbyaEAgDSxSeX2krQAERxJslY');    

});