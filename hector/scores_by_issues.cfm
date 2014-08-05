<script src="//assets.wwf.org.uk/custom/js/lib/require.js"></script>
<cfoutput>
<script>
    define('config',function(){return{linkUrl:"#getCMSLink(3303)#"};})
    //Load common code that includes config, then load the app
    //logic for this page. Do the require calls here instead of
    //a separate file so after a build there are only 2 HTTP
    //requests instead of three.
    require(['//assets.wwf.org.uk/custom/js/barometer/common.js'], function (common) {
        //js/common sets the baseUrl to be js/ so
        //can just ask for 'app/main1' here instead
        //of 'js/app/main1'
        require(['app/scores_by_issues']);
    });
</script>
</cfoutput>
<link rel="stylesheet" href="//assets.wwf.org.uk/custom/css/barometer.css" />
<table cellspacing="0" cellpadding="0" border="0" class="bodytext" id="results">

	<thead>
		<tr style="font-weight:bold;">
			<th style="color:#01673E;" id="question">Question</th><th width="96" align="center" style="color:#01673E;" id="score">Score</th>
	</tr>
	</thead>
	<tbody>
		<tr><Loading</td>
	</tbody>
</table>
