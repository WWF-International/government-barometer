<script src="//assets.wwf.org.uk/custom/js/lib/require.js"></script>
<script>
    define('config',function(){return{linkUrl:"country_scores.cfm"};})
    //Load common code that includes config, then load the app
    //logic for this page. Do the require calls here instead of
    //a separate file so after a build there are only 2 HTTP
    //requests instead of three.
    require(['//assets.wwf.org.uk/custom/js/barometer/common.js'], function (common) {
        //js/common sets the baseUrl to be js/ so
        //can just ask for 'app/main1' here instead
        //of 'js/app/main1'
        require(['app/scores_by_country']);
    });
</script>
<style>
    .tier1{background-color: red}
    .tier2{background-color: yellow}
    .tier3{background-color: green}
</style>
<table id="results">
  <thead>
    <tr style="font-weight: bold;">
    		<td style="color: rgb(1, 103, 62);" id="country">Country</td>
    		<td align="center" style="color: rgb(1, 103, 62);" collspan="4" id="score">Score</td>
    </tr>
    <tr>
    		<td></td>

        <td align="center">2014</td>		
    		
    		<td align="center" >2012</td>
    		
    		<td align="center" >2007</td>
    		
    		<td align="center" >2006*</td>

    </tr>
  </thead>  
  <tbody>
    <tr><td>Loading</td></tr>
  </tbody>
</table>
