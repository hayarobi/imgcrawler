// Main of Community Menu

document.writeln('<!-- ���� �޴� ���� Start -->');
	//���� �־��� �޴��� /js/comitem/commenucommon.js �� ����
	//DisplayCertifyImage() //���� Ŀ�´�Ƽ �̹��� 
	//document.writeln(DisplayFreeCommMenu('<a href="' + g_wwwsvr + '/' + g_grpurl + '/" class="mlink">' + g_curgrpnm + '</a>', 123))  //Ŀ�´�Ƽ �̸�
	/**if (g_canapply == true) {  //�����Ҽ� ������
		DisplayTopButton('mlink')	 //���Թ�ư ���̱� �Ǵ� �����
	}**/
	//DisplayCommInfo('menu') //������(ȸ�����), ȸ����
	//DisplayMenuInfo() //���� ��� �޴�
	if ((g_commtype == "P") && (typeof DisplayCpa == "function")) {		
		DisplayCpa();
	}
	
	//DisplayHomeInfo() //����� ���� ������ ��Ÿ ���� => �������� �� ������
	//DisplayFreechalAD(); //Ŀ�´�Ƽ �����, Ŀ�´�Ƽ �����
	//DisplayMngMenu() //������ �޴�����
	
	//���� �־��� �޴��� ��
	

if (g_mngpermission == true) {
	//���� �޴� ����
	document.writeln('<div id="CL_wrap">');
	document.writeln('<div id="MA">');
	document.writeln('<samp id="MA1"></samp><samp id="MA2"></samp><samp id="MA3"></samp>');
	document.writeln('	<div id="MA6">');
	if (g_certinfo.substr(0,1) == "Y")
	{
		document.writeln('        <div id="cMyInfo" class="representative"><span class="ico"><img src="' + g_imgsvr + '/community/common/ico_representative.png" width="42" height="51" alt="����ç ��ǥ"></span>');
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
	
	document.writeln('		<div class="cl h5"><!-- ���� --></div>');
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
	//�Ϲ� �޴� ����
	document.writeln('<div id="CL_wrap">');
	document.writeln('<div id="MD">');
	document.writeln('<samp id="MD1"></samp><samp id="MD2"></samp><samp id="MD3"></samp>');
	document.writeln('	<div id="MD6">');
	if (g_canapply==true){
		if (g_certinfo.substr(0,1) == "Y")
		{
			document.writeln('	  <div id="cGuestInfo" class="representative"><span class="ico"><img src="' + g_imgsvr + '/community/common/ico_representative.png" width="42" height="51" alt="����ç ��ǥ"></span><span><strong>�մ�</strong>����<br>�����ϼ̽��ϴ�.</span></div>');
		}else{
			document.writeln('	  <div id="cGuestInfo"><span class="b">�մ�</span>���� �����ϼ̽��ϴ�.</div>');
		}
		document.writeln('	  <div id="cCommBt"><a href="' + g_wwwsvr + '/ComService/Activity/ApplyEntry/CsActAplJoinForm.asp?GrpId=' + g_curgrpid + '"><img src="' + g_imgsvr + '/community/common/btn_community_regist.gif" align="absmiddle"></a></div>');	
		
	}else{
		if (g_certinfo.substr(0,1) == "Y")
		{
			document.writeln('        <div id="cMyInfo" class="representative"><span class="ico"><img src="' + g_imgsvr + '/community/common/ico_representative.png" width="42" height="51" alt="����ç ��ǥ"></span>');
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
	document.writeln('		<div style="height:5px;"><!-- ���� --></div>');
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
	document.writeln('<div class="cl h5"><!-- ���� --></div>');

	/*document.writeln('<!--## ��Ƽ ���� ȸ�� Start ##-->');	
	if (navigator.appName != "Netscape") {
		if ((g_login == true) && (g_freechalon == "2")) {
	document.writeln('<div id="MM">');
	document.writeln('	<samp id="MM1"></samp><samp id="MM2"></samp><samp id="MM7"></samp><samp id="MM3"></samp>');
	document.writeln('	<div id="MM6">');
	document.writeln('		  <div id="ConnectMemberTit">');
		
	document.writeln('������ ȸ��');
		
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
	document.writeln('<div class="cl h5"><!-- ���� --></div>');	
			//Ŀ�´�Ƽ��
			g_layername = document.all['ConnectMember'];
			g_layerusercnt = document.all['userCnt'];    
			makeList(g_userid, g_hname, g_layername, g_layerusercnt, "");		
		}
	}
	document.writeln('<!--## ��Ƽ ���� ȸ�� End ##-->');
	*/
	document.writeln('<!--## �Ҹ��� & ����Ŀ�´�Ƽ Start ##-->');
	document.writeln('<div id="MC">');
	document.writeln('<samp id="MC1"></samp><samp id="MC3"></samp>');
	document.writeln('	<div id="MC5">');
	document.writeln(g_allianceComm);   // ���� Ŀ�´�Ƽ(2006-09-14 By SOH)
	document.writeln('		<div class="cl fl"><!-- ���� --></div>');
	document.writeln('	</div>');
	document.writeln('<samp id="MC3"></samp><samp id="MC1"></samp>');
	document.writeln('</div>');
	document.writeln('<!--## �Ҹ��� & ����Ŀ�´�Ƽ End ##-->');
	
	document.writeln('<div class="cl h5"><!-- ���� --></div>');
	document.writeln('<!--## Count ##-->');
	document.writeln('<div id="TotalCount">');
	document.writeln('	today&nbsp;<span id="accessdcnt" class="num orange"></span>');
	document.writeln('	<span class="g_C4">|</span>');
	document.writeln('	total&nbsp;<span id="accesscnt" class="num"></span>');
	document.writeln('</div>');
	document.writeln('<!--## Count End##-->');
	document.writeln('<div id="Since">since ' + g_createdt + '</div>');
	document.writeln('<!--## Count End##-->');
	document.writeln('<!--## Ż���ϱ� Start ##-->');
	document.writeln('<div id="TotalCountLine"><!--  --></div>');
	document.writeln('<div style="padding:7px 6px;font-size:11px;vertical-align:top;">');
	
	document.writeln('	<a href="' + g_homesvr + '/Comservice/Activity/Out/CsActOutForm.asp?grpid=' + g_curgrpid  + '" class="out">Ŀ�´�Ƽ Ż���ϱ� <span style="font-size:8px;vertical-align:top">��</span></a>');
	
	document.writeln('</div>');
	document.writeln('<!--## Ż���ϱ� End ##-->');
	document.writeln('</div>');
}
document.writeln('<!-- ���� �޴� ����  End -->');	

if (g_mngpermission != true) {
	function callback() {
	    if (xmlHttp.readyState == 4) {
	        if (xmlHttp.status == 200) {
	        	var accesscnt = xmlHttp.responseXML.getElementsByTagName("accesscnt").item(0).firstChild.data;
				var accessdcnt = xmlHttp.responseXML.getElementsByTagName("accessdcnt").item(0).firstChild.data;
			
				document.all.accesscnt.innerText = accesscnt;
				document.all.accessdcnt.innerText = accessdcnt;
			
	        } else if (xmlHttp.status == 204){	//�����Ͱ� �������� ���� ���
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