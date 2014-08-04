<cfparam name="url.bar_year" default="2012">
<cfobject name="barometer" component="#request.rootCFC#.barometer_scores">
<cfset CTquery=barometer.getIssueTotals(url.bar_year)>
<cfif request.bPublic>
  <cfset qString="?">
<cfelse>
  <cfset qString="&">
</cfif>    
 <h2>Scores by issues</h2>
	
<table cellspacing="0" cellpadding="0" border="0" class="bodytext">
<tbody>

	<tr style="font-weight:bold;">
		<td style="color:#01673E;"><p>Question</p></td>
		<td width="96" align="center" style="color:#01673E;"><p>Score</p></td>
	</tr>
	<cfloop query="CTquery">
  	<cfoutput>
        <tr>
		<td width="320">
		<p>
			 <a href="#getCMSLink(3303)##qString#bar_doc_id=#CTquery.docID#">#CTquery.abstract#</a>
		</p> 
		</td>
		<td width="96" align="center">#numberFormat(CTquery.totalScore,'_._')#</td>
		<td>
		</cfoutput>
            	<cfset gifadd="">
		<cfif #numberFormat(CTquery.totalScore,'_._')# lt 37 && #numberFormat(CTquery.totalScore,'_._')# gte 19>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/yellowsmall.gif">
		<cfelseif #numberFormat(CTquery.totalScore,'_._')# gt 36>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/greensmall.gif">
		<cfelse>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/redsmall.gif">
		</cfif> 
		<cfoutput>
		    <img src="#gifadd#" style="border:0px;float:left;margin:0;"/>
		</cfoutput>
            <cfoutput>
		</td>
        </tr>
        </cfoutput>
	</cfloop>

</tbody></table>

       
<!---<cfdump var="#CTquery#">--->
<!---<cfdump var="#legacyScores#">---> 