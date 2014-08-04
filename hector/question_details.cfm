<cfparam name="url.bar_doc_id" default="24">
<cfparam name="url.bar_year" default="2012">
<cfobject name="barometer" component="#request.rootCFC#.barometer_scores">
<cfset CTquery=barometer.getIssueScores(url.bar_doc_id)>
<cfset CTqueryGen=barometer.getIssueGeneralById(url.bar_doc_id,url.bar_year)>
<cfoutput>
	<h2>Question: #CTqueryGen.abstract#</h2>
	<br/>
	<div class="bodytext">
		<span class="subheading">Total #numberFormat(CTqueryGen.totalScore,'_._')#</span>
		<br/>
		<br/>
		<span class="bodytext">(2 points - #CTqueryGen['TOTAL_SCORE>1.4'][1]# countries,1 points - #CTqueryGen['0.8<TOTAL_SCORE<1.4'][1]# countries,0 points - #CTqueryGen['TOTAL_SCORE<0.8'][1]# countries)
		<br/>
		<br/>
		<p>#CTqueryGen.comment#</p>
		</span>
	</div>
	<br/>
</cfoutput>
<table width=80%>
<tbody>
		<tr style="font-weight: bold;">
			<td style="color: rgb(1, 103, 62);"><p>Country</p></td>
			<td width="20%" align="left" style="color: rgb(1, 103, 62);"><p>Score</p></td>
			<td width="19"></td>
		</tr>
   <cfloop query="CTquery">
	<cfoutput>
	      <tr>  
	            <td style="color:##66836D;font-weight:bold;font-size:150%;" style="margin-buttom:5px;">
	            #CTquery.countryName#
	            </td>
	            <td>
	            #numberFormat(CTquery.score,'_._')#
	            </td>
	      	    <td>
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
		    <img src="#gifadd#" style="border:0px;float:left;margin:0;"/>
		</cfoutput>
	      	    </td>
	      </tr>   
   </cfloop >  
<tbody>
</table>


