<script src="//assets.wwf.org.uk/custom/js/lib/require.js"></script>
<cfoutput>
    <script>
        define('config',function(){return{linkUrl:"#getCMSLink(3369)#"};})
        //Load common code that includes config, then load the app
        //logic for this page. Do the require calls here instead of
        //a separate file so after a build there are only 2 HTTP
        //requests instead of three.
        require(['//assets.wwf.org.uk/custom/js/barometer/common.js'], function (common) {
            //js/common sets the baseUrl to be js/ so
            //can just ask for 'app/main1' here instead
            //of 'js/app/main1'
            require(['app/country_scores']);
        });
    </script>
</cfoutput>
<link rel="stylesheet" href="//assets.wwf.org.uk/custom/css/barometer.css" />
<h2 id="countryName"></h2>
<p id="info">Loading...</p>
<table id="results">
  <thead>
    <tr style="font-weight: bold;">
    		<td style="color: rgb(1, 103, 62);" id="abstract">Abstract</td>
    		<td align="center" style="color: rgb(1, 103, 62);"  id="score">Score</td>
    </tr>
  </thead>  
  <tbody>
    <tr><td>Loading</td></tr>
  </tbody>
</table>
<p id="totalScore"></p>
<div id="answersLink"></div>