<cfset legacyScores = ['(11.2)','(11.4)','(4.8)','(8)','(8.8)','(8)','(6)','(9.6)','(9)','(7.4)','()','()','()','(3.2)','(8)','(4)','(3)','(2)','()','()','()','(4.8)','(5.8)','(4.2)','(5)','(3)','(7.4)','(6.6)'] >

<cfobject name="barometer" component="#request.rootCFC#.barometer_scores">
<cfset CTquery=barometer.getCountryTotals(2007)>
<cfset CTquery2012=barometer.getCountryTotals(2012)>
<cfset allTotals=barometer.getCountryTotals()>
<cfscript>
queryAddColumn( allTotals, "legacy" , "VarChar" , legacyScores ); 
</cfscript>
<cfif request.bPublic>
  <cfset qString="?">
<cfelse>
  <cfset qString="&">
</cfif>  
<table>
<tbody>
<tr style="font-weight: bold;">
		<td style="color: rgb(1, 103, 62);"><p>Country</p></td>
		<td width="96" align="center" style="color: rgb(1, 103, 62);"><p>Score</p></td>
</tr>
<tr>
		<td width="132">		
		</td>
		<td align="center" width="96">2012</td>
		
		<td align="center" width="96">2007</td>
		
		<td align="center" width="96">2006*</td>
		<!--
		<td width="48" align="center">2005</td>
		-->
		<td width="48"></td>
</tr>
<!---<cfloop index="x" from="1" to="#arrayLen(legacyScores)#">--->
<cfloop query="allTotals">
  <cfoutput>
      <cfif countryID neq 13 ><tr>  
            <td>
            <p><cfif countryID eq 13 >
                 #countryName#
               <cfelse>
                 <a href="#getCMSLink(3268)##qString#bar_country_id=#countryID#&bar_year=2012">#countryName#</a>
               </cfif>
            </p>  
            </td>
            <td align="center">
            <cfif countryID neq 13 >
              #numberFormat(score2012,'_._')#
            <cfelse>
              ()
            </cfif>
            
            </td>
            <td align="center">
            #numberFormat(score2007,'_._')#
            </td>
            <td align="center">
            #legacy#
            </td>
            <td align="center">

            	<cfset gifadd="">
		<cfif #numberFormat(score2012,'_._')# lt 13 && #numberFormat(score2012,'_._')# gte 7>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/yellowsmall.gif">
		<cfelseif #numberFormat(score2012,'_._')# gte 13>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/greensmall.gif">
		<cfelse>
		<cfset gifadd="http://assets.wwf.org.uk/img/normal/redsmall.gif">
		</cfif> 
		
		    <img src="#gifadd#" style="border:0px;float:left;margin:0;"/>

            </td>
      
      </tr>
      </cfif>      
            </cfoutput>
</cfloop>
<tbody></table>
<!---<cfdump var="#CTquery#">
<cfdump var=#allTotals#>--->
<!---<cfdump var="#legacyScores#">--->

