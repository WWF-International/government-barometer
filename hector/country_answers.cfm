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
        require(['app/country_answers']);
    });
</script>
<style type="text/css">
table.TBcountryanwser,table.TBcountryanwser td,table.TBcountryanwser th
{
padding-left:5px;
padding-right:5px;
border:1px solid black;
}
</style>


<div class="bodytext">
<table class="TBcountryanwser" id="results">
	
	  <thead>
	    <tr>
	      <th id="question">Question</th><th id="answer">Answering option selected</th><th id="score">Score</th><th id="comments">Comments</th>	
	    </tr>
	  </thead>
	<tbody>
		<tr><td>Loading</td></tr>
	</tbody>
</table>
</div>


