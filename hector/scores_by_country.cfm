<script src="//assets.wwf.org.uk/custom/js/lib/require.js"></script>
<cfoutput>
<script>
    define('config',function(){return{linkUrl:"#getCMSLink(3268)#"};})
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
</cfoutput>
<link rel="stylesheet" href="//assets.wwf.org.uk/custom/css/barometer.css" />

<table id="results">
  <thead>
    <tr style="font-weight: bold;">
        <th style="color: rgb(1, 103, 62);" id="country">Country</th>
        <th style="color: rgb(1, 103, 62);" colspan="4" id="score">Score</th>
    </tr>
    <tr>
        <th></th>

        <th align="center">2014</th>    
        
        <th align="center" >2012</th>
        
        <th align="center" >2007</th>
        
        <th align="center" >2006*</th>

    </tr>
  </thead>  
  <tbody>
    <tr><td>Loading</td></tr>
  </tbody>
</table>
