<script src="//assets.wwf.org.uk/custom/js/lib/require.js"></script>
<script>
    //Load common code that includes config, then load the app
    //logic for this page. Do the require calls here instead of
    //a separate file so after a build there are only 2 HTTP
    //requests instead of three.
    require(['//assets.wwf.org.uk/custom/js/barometer/common.js'], function (common) {
        //js/common sets the baseUrl to be js/ so
        //can just ask for 'app/main1' here instead
        //of 'js/app/main1'
        require(['app/question']);
    });
</script>
<div class="bodytext">
<p id="question"></p>
<p id="info"></p>	
<table width=80% id="results">
	<thead>
		<tr style="font-weight: bold;">
			<th style="color: rgb(1, 103, 62);" id="country">Country</th>
			<th width="20%" align="left" style="color: rgb(1, 103, 62);" id="score">Score</th>
		</tr>
	</thead>	
	<tbody>
		<tr>Loading</tr>
	<tbody>
</table>


