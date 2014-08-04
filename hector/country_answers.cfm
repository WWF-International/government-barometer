<head>
<style type="text/css">
table.TBcountryanwser,table.TBcountryanwser td,table.TBcountryanwser th
{
padding-left:5px;
padding-right:5px;
border:1px solid black;
}
</style>
<cfparam name="url.bar_year" default="2012">
<cfparam name="url.bar_country_id" default="6">
<cfobject name="barometer" component="#request.rootCFC#.barometer_scores">
<cfset CTquery=barometer.getCountryDetails(url.bar_year,url.bar_country_id)>

<div class="bodytext">
<table class="TBcountryanwser">
	
	  <thead>
	    <tr>
	      <th><p>
		<b>Question</b>
		</p></th>
	      <th><p>
		<b>Answering option selected</b>
		</p></th>
	      <th><p>
		<b>Score</b>
		</p></th>
	      <th><p>
		<b>Comments</b>
		</p></th>	
	    </tr>
	  </thead>
	<tbody>
		<tr>
			
			<td valign="top" colspan="4">
			<p>
			<b>FLEGT:</b>
			</p>
			</td>
		</tr>
		<cfset total_score = 0>     
		<cfloop query="CTquery">
			<cfset total_score = total_score+CTquery.score>  
		  	<cfoutput>
			        <tr>
					<td width="270" valign="top">
						<p>
							#CTquery.questionDescription#
						</p> 
					</td>
					<td width="45" valign="top">
						<p align="center">
				                #CTquery.sel_opt#
						</p>
			                </td>
					<td width="50" valign="top">
						 <p align="center">
				                 #numberFormat(CTquery.score,'_._')#
						 </p>
			                </td>
					<td width="290" valign="top">    
						<p align="left"> 
						 #CTquery.comments#
						</p>
			                 </td>
			        </tr>
		        </cfoutput>
		</cfloop>                  
		<tr>
			<td valign="top">
			<p>
			<b>Total score</b>
			</p>
			</td>
			<td valign="top">
			</td>
			<td valign="top">
			<p>
			<cfoutput><b>#numberFormat(total_score,'_._')#</b> </cfoutput>
			</p>
			</td>
			<td valign="top">  
			</td>
		</tr>
	</tbody>
</table>
</div>

       
<!---<cfdump var="#CTquery#">--->
<!---<cfdump var="#legacyScores#">--->


