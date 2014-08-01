<cfparam name="url.bar_year" default="2012">
<cfparam name="url.bar_country_id" default="1">
<cfobject name="barometer" component="#request.rootCFC#.barometer_scores">
<cfset CTquery=barometer.getCountryScores(url.bar_year,url.bar_country_id)>
<cfset CTqueryCountry=barometer.getCountryGeneralById(url.bar_year,url.bar_country_id)>

<cfif request.bPublic>
  <cfset qString="?">
<cfelse>
  <cfset qString="&">
</cfif> 

<cfoutput>
<h2>#CTqueryCountry['countryName'][1]#</h2>

	<span class="bodytext" style="font-size:140%;
line-height:150%;">#CTqueryCountry['description'][1]#</span>
	</cfoutput>
	<br/>
	<br/>
	<br/>
	<table class="bodytext" cellspacing="0" cellpadding="0" border="0">
	<tbody>
	<tr style="font-weight: bold;">
		<td style="color: rgb(1, 103, 62);"><p>Country</p></td>
		<td width="96" align="center" style="color: rgb(1, 103, 62);"><p>Score</p></td>
	</tr>
	<cfset total_score=0>
	<cfloop query="CTquery">
	<cfset total_score = total_score+CTquery.score>
	  <cfoutput>
		<tr>
			<td width="396" style="font-weight:bold;color:##66836D;">
			<p>
			 #CTquery.abstract#
			</p> 
			</td>
			<td width="60" align="center">
			#numberFormat(CTquery.score,'_._')#
			</td>
			<td align="center" >
	   </cfoutput>
            	<cfset gifadd="">
		<cfif #numberFormat(CTquery.score,'_._')# lt 1.4 && #numberFormat(CTquery.score,'_._')# gte 0.8>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/yellowsmall.gif">
		<cfelseif #numberFormat(CTquery.score,'_._')# gt 1.4>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/greensmall.gif">
		<cfelse>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/redsmall.gif">
		</cfif> 
		<cfoutput>
		    <img src="#gifadd#" style="border:0px;float:left;margin:0;" />
		</cfoutput>
            <cfoutput>
			</td>
		</tr>
	</cfoutput>
	</cfloop>
	</tbody>
</table>

<cfoutput>
<p>
<b>Total rating of #CTquery['countryName'][1]#  is #total_score# points</b>
</p>
<p>
  <a href="#getCMSLink(3369)##qString#bar_country_id=#url.bar_country_id#&bar_year=#url.bar_year#">View the full details of the scoring of #CTquery['countryName'][1]#</a>
</p>
</cfoutput>
<!---<cfdump var="#CTquery#">--->
<!---<cfdump var="#legacyScores#">---> 