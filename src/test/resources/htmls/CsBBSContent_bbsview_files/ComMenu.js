// Main of Community Menu

document.writeln('<!-- 좌측 메뉴 영역 Start -->');
	//원래 있었던 메뉴들 /js/comitem/commenucommon.js 에 있음
	//DisplayCertifyImage() //인증 커뮤니티 이미지 
	//document.writeln(DisplayFreeCommMenu('<a href="' + g_wwwsvr + '/' + g_grpurl + '/" class="mlink">' + g_curgrpnm + '</a>', 123))  //커뮤니티 이름
	/**if (g_canapply == true) {  //가입할수 있으면
		DisplayTopButton('mlink')	 //가입버튼 보이기 또는 숨기기
	}**/
	//DisplayCommInfo('menu') //마스터(회원등급), 회원수
	//DisplayMenuInfo() //실제 기능 메뉴
	if ((g_commtype == "P") && (typeof DisplayCpa == "function")) {		
		DisplayCpa();
	}
	
	//DisplayHomeInfo() //사용자 정의 페이지 나타 내기 => 없어져야 할 페이지
	//DisplayFreechalAD(); //커뮤니티 도우미, 커뮤니티 만들기
	//DisplayMngMenu() //관리상세 메뉴보기
	
	//원래 있었던 메뉴들 끝
	

if (g_mngpermission == true) {
	//관리 메뉴 시작
	document.writeln('<div id="CL_wrap">');
	document.writeln('<div id="MA">');
	document.writeln('<samp id="MA1"></samp><samp id="MA2"></samp><samp id="MA3"></samp>');
	document.writeln('	<div id="MA6">');
	if (g_certinfo.substr(0,1) == "Y")
	{
		document.writeln('        <div id="cMyInfo" class="representative"><span class="ico"><img src="' + g_imgsvr + '/community/common/ico_representative.png" width="42" height="51" alt="프리챌 대표"></span>');
		document.writeln('        	<div class="b p12"  style="margin-left:57px;text-align:left;">' + g_hname + '</div>');							
		document.writeln('	  	<div class="cl" style="margin-left:57px;text-align:left;">[' + g_memberGbnNm + ']</div>');
	}else{
		document.writeln('        <div id="cMyInfo">');
		document.writeln('        	<div class="b p12">' + g_hname + '</div>');							
		document.writeln('	  	<div class="cl" style="padding-top:3px">[' + g_memberGbnNm + ']</div>');
	}
	
	document.writeln('        </div>');
	document.writeln('        <div id="cCommBt">');
	document.writeln('        	<a href="' + g_homesvr + '/ComService/Activity/MyData/CsActNfoModify.asp?GrpId=' + g_curgrpid + '"><img src="' + g_imgsvr + '/community/common/btn_myinfo.gif" align="absmiddle"></a>');
	document.writeln("    		<a href=\"\" onClick=\"javascript:window.open('" + strFreComUrl +  "', 'pop_favorite', 'fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,left='+strFreComl+',top='+strFreComt+',width=260,height=170'); return false;\"><img src='" + g_imgsvr + "/community/common/btn_favorite.gif' align='absmiddle'></a>");
	document.writeln('	  </div>');
	
	document.writeln('		<div class="cl h5"><!-- 공백 --></div>');
	document.writeln('		<div id="Category">');
	document.writeln('		<ul>');
	DisplayMngMenu();
	document.writeln('		</ul>');
	document.writeln('		</div>');
	document.writeln('		<div id="CategoryBttm">');
	document.writeln('		<ul id="CategoryBtn">');
	DisplayFreechalLink();
	document.writeln('		</ul>');
	document.writeln('		</div>');
	document.writeln('	</div>');
	document.writeln('<samp id="MA7"></samp><samp id="MA8"></samp><samp id="MA9"></samp>');
	document.writeln('     </div>');
	document.writeln('</div>');
	
}else{
	//일반 메뉴 시작
	document.writeln('<div id="CL_wrap">');
	document.writeln('<div id="MD">');
	document.writeln('<samp id="MD1"></samp><samp id="MD2"></samp><samp id="MD3"></samp>');
	document.writeln('	<div id="MD6">');
	if (g_canapply==true){
		if (g_certinfo.substr(0,1) == "Y")
		{
			document.writeln('	  <div id="cGuestInfo" class="representative"><span class="ico"><img src="' + g_imgsvr + '/community/common/ico_representative.png" width="42" height="51" alt="프리챌 대표"></span><span><strong>손님</strong>으로<br>입장하셨습니다.</span></div>');
		}else{
			document.writeln('	  <div id="cGuestInfo"><span class="b">손님</span>으로 입장하셨습니다.</div>');
		}
		document.writeln('	  <div id="cCommBt"><a href="' + g_wwwsvr + '/ComService/Activity/ApplyEntry/CsActAplJoinForm.asp?GrpId=' + g_curgrpid + '"><img src="' + g_imgsvr + '/community/common/btn_community_regist.gif" align="absmiddle"></a></div>');	
		
	}else{
		if (g_certinfo.substr(0,1) == "Y")
		{
			document.writeln('        <div id="cMyInfo" class="representative"><span class="ico"><img src="' + g_imgsvr + '/community/common/ico_representative.png" width="42" height="51" alt="프리챌 대표"></span>');
		    document.writeln('        	<div class="b p12" style="margin-left:57px;text-align:left;">' + g_hname + '</div>');								
			document.writeln('	  	<div class="cl" style="margin:3px 0 0 57px;text-align:left;">[' + g_memberGbnNm + ']</div>');
		}else{
			document.writeln('        <div id="cMyInfo">');
			document.writeln('        	<div class="b p12" style="text-align:center;">' + g_hname + '</div>');		
			document.writeln('	  	<div class="cl" style="padding-top:3px">[' + g_memberGbnNm + ']</div>');
		}
	

	document.writeln('        </div>');
	document.writeln('        <div id="cCommBt">');
	document.writeln('        	<a href="' + g_homesvr + '/ComService/Activity/MyData/CsActNfoModify.asp?GrpId=' + g_curgrpid + '"><img src="' + g_imgsvr + '/community/common/btn_myinfo.gif" align="absmiddle"></a>');
	document.writeln("    		<a href=\"\" onClick=\"javascript:window.open('" + strFreComUrl +  "', 'pop_favorite', 'fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,left='+strFreComl+',top='+strFreComt+',width=260,height=170'); return false;\"><img src='" + g_imgsvr + "/community/common/btn_favorite.gif' align='absmiddle'></a>");
	document.writeln('	  </div>');
	}					
	document.writeln('		<div style="height:5px;"><!-- 공백 --></div>');
	document.writeln('		<div id="Category">');
	document.writeln('			<ul>');
	DisplayMenuInfo()
	document.writeln('			<li class="categoryLine"><!--  --></li>');
	DisplayGeneralInfo()
	document.writeln('			</ul>');
	document.writeln('		</div>');
	document.writeln('	</div>');
	document.writeln('<samp id="MD7"></samp><samp id="MD10"></samp><samp id="MD8"></samp><samp id="MD9"></samp>');
	document.writeln('</div>');
	document.writeln('<div class="cl h5"><!-- 공백 --></div>');

	/*document.writeln('<!--## 컴티 접속 회원 Start ##-->');	
	if (navigator.appName != "Netscape") {
		if ((g_login == true) && (g_freechalon == "2")) {
	document.writeln('<div id="MM">');
	document.writeln('	<samp id="MM1"></samp><samp id="MM2"></samp><samp id="MM7"></samp><samp id="MM3"></samp>');
	document.writeln('	<div id="MM6">');
	document.writeln('		  <div id="ConnectMemberTit">');
		
	document.writeln('접속중 회원');
		
	document.writeln('				<span class="v10">(<a id="userCnt"></a>)</span>');
	document.writeln('        </div>');
	document.writeln('		  <div id="ConnectMember">');
	document.writeln('			<ul>');	
	document.writeln('				<li><a href="#"></a></li>');
	document.writeln('			</ul>');
	document.writeln('		</div>');
	document.writeln('		<div style="height:8px;"><!--  --></div>');
	document.writeln('	</div>');
	document.writeln('	<samp id="MM8"></samp><samp id="MM7"></samp><samp id="MM4"></samp><samp id="MM5"></samp>');
	document.writeln('</div>');
	document.writeln('<div class="cl h5"><!-- 공백 --></div>');	
			//커뮤니티온
			g_layername = document.all['ConnectMember'];
			g_layerusercnt = document.all['userCnt'];    
			makeList(g_userid, g_hname, g_layername, g_layerusercnt, "");		
		}
	}
	document.writeln('<!--## 컴티 접속 회원 End ##-->');
	*/
	document.writeln('<!--## 소모임 & 제휴커뮤니티 Start ##-->');
	document.writeln('<div id="MC">');
	document.writeln('<samp id="MC1"></samp><samp id="MC3"></samp>');
	document.writeln('	<div id="MC5">');
	document.writeln(g_allianceComm);   // 제휴 커뮤니티(2006-09-14 By SOH)
	document.writeln('		<div class="cl fl"><!-- 공백 --></div>');
	document.writeln('	</div>');
	document.writeln('<samp id="MC3"></samp><samp id="MC1"></samp>');
	document.writeln('</div>');
	document.writeln('<!--## 소모임 & 제휴커뮤니티 End ##-->');
	
	document.writeln('<div class="cl h5"><!-- 공백 --></div>');
	document.writeln('<!--## Count ##-->');
	document.writeln('<div id="TotalCount">');
	document.writeln('	today&nbsp;<span id="accessdcnt" class="num orange"></span>');
	document.writeln('	<span class="g_C4">|</span>');
	document.writeln('	total&nbsp;<span id="accesscnt" class="num"></span>');
	document.writeln('</div>');
	document.writeln('<!--## Count End##-->');
	document.writeln('<div id="Since">since ' + g_createdt + '</div>');
	document.writeln('<!--## Count End##-->');
	document.writeln('<!--## 탈퇴하기 Start ##-->');
	document.writeln('<div id="TotalCountLine"><!--  --></div>');
	document.writeln('<div style="padding:7px 6px;font-size:11px;vertical-align:top;">');
	
	document.writeln('	<a href="' + g_homesvr + '/Comservice/Activity/Out/CsActOutForm.asp?grpid=' + g_curgrpid  + '" class="out">커뮤니티 탈퇴하기 <span style="font-size:8px;vertical-align:top">▶</span></a>');
	
	document.writeln('</div>');
	document.writeln('<!--## 탈퇴하기 End ##-->');
	document.writeln('</div>');
}
document.writeln('<!-- 좌측 메뉴 영역  End -->');	

if (g_mngpermission != true) {
	function callback() {
	    if (xmlHttp.readyState == 4) {
	        if (xmlHttp.status == 200) {
	        	var accesscnt = xmlHttp.responseXML.getElementsByTagName("accesscnt").item(0).firstChild.data;
				var accessdcnt = xmlHttp.responseXML.getElementsByTagName("accessdcnt").item(0).firstChild.data;
			
				document.all.accesscnt.innerText = accesscnt;
				document.all.accessdcnt.innerText = accessdcnt;
			
	        } else if (xmlHttp.status == 204){	//데이터가 존재하지 않을 경우
	        	document.all.accesscnt.innerText = 0;
				document.all.accessdcnt.innerText = o;
	        }
	    }
	}
	var xmlHttp;

	if (window.ActiveXObject) {
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if (window.XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	}

	xmlHttp.open("post", "/common/GetAccessLogToMenu.asp?grpid=" + g_curgrpid , true);
	xmlHttp.onreadystatechange = callback;
	xmlHttp.send(null);	
	
}