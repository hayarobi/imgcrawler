function goService()
{
	var gourl = document.GoService.GoMenu[document.GoService.GoMenu.selectedIndex].value;

	if (gourl != "") {
		if (gourl=="MSGR") {
			TopOpenMsgr();
		} else {
			top.location.href = gourl;
		}
	}
}

function goSvc(sel)
{
	var gourl = sel[sel.selectedIndex].value;

	if (gourl != "") {
		if (gourl=="MSGR") {
			TopOpenMsgr();
		} else {
			top.location.href = gourl;
		}
	}
}

function CloseAd()
{
	if (adview.style.display == "none") {
		adview.style.display =  "block";
	} else {
		adview.style.display = "none";
	}
}



/*
** ��ư���� �ɸ� URL�� �����ִ� �Լ� (DisplayButton �Լ�)
** �ۼ���: ���Ե�
*/
function GOURL(strURL, strTarget) {
	switch (strTarget.toLowerCase()) {
		case "_top" :
			top.location.href = strURL;
			break;
		case "_self" :
			self.location.href = strURL;
			break;
		case "_blank" :
			window.open(strURL);
			break;
		default :
			window.location.href = strURL;
			break;
	}
}

/* ����� Ȩ�� ���� Fucntion , FcMsg.js���� freechal.js�� �ű�. 20020627 COM1 monarchi */
/* ����� Ȩ�� ���� : Ȩ�����԰�θ� ����ϱ����� QueryString �߰�(HpAccessLog) 20031201 korean */
/* Q�� ��ũ ���� 20060506 */
function openUserInfoWin(toid, toname, fromid, fromname) {
    window.open(g_qsvr + "/Service/default.asp?id="+toid, "FcQ_"+toid, "width=934, height=700");
}

function TopOpenMsgr() {
	window.open(g_msgrsvr+"/MgStart.asp","FcMessenger","left="+(window.screen.availWidth-300)/2 + ",top="+(window.screen.availHeight-120)/2+",fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=300,height=120");
}


function openNavigator() {
	window.open(g_wwwsvr + "/etc/sitemap/quickMap.asp", "Navigator", "width=487, height=468");
}

/*
** ��¥������ �ùٸ��� �˻�
** �ۼ���: ��Ȯ��
*/
function checkDate(strDate)
{
	var arrDate;
	var chkDate

	if (strDate.indexOf("-") != -1) {
		arrDate = strDate.split("-");
	}
	else {
		arrDate = strDate.split("/");
	}


	if (arrDate.length != 3) {
		return false;
	}

	chkDate = new Date(arrDate[0] + "/" + arrDate[1] + "/" + arrDate[2]);

	if (isNaN(chkDate) == true ||
		(arrDate[1] != chkDate.getMonth() + 1 || arrDate[2] != chkDate.getDate())) {
		return false;
	}

	return true;
}

/*
** email �ּ������� �ùٸ��� �˻�
** �ۼ���: ��Ȯ��
*/
function checkEmail(strEmail) {
	var arrMatch = strEmail.match(/^(\".*\"|[A-Za-z0-9_-]([A-Za-z0-9_-]|[\+\.])*)@(\[\d{1,3}(\.\d{1,3}){3}]|[A-Za-z0-9][A-Za-z0-9_-]*(\.[A-Za-z0-9][A-Za-z0-9_-]*)+)$/);
	if (arrMatch == null) {
		return false;
	}

	var arrIP = arrMatch[2].match(/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/);
	if (arrIP != null) {
		for (var i = 1; i <= 4; i++) {
			if (arrIP[i] > 255) {
				return false;
      		}
   		}
	}
	return true;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// String ���̸� ���ϴ� Script By Moon
//
//      * CheckStrLen(obj, MaxLen, ErrorMessage)
//	    - obj : text or textarea object
//		--> MaxLen ���� ���ڿ��� ª���� true, ��� false ����
//      - FieldName : Error�� �߻��� �ʵ��� �̸�
//		--> "" �� ������..Alert ����� ����. (���� �ȵ�..)
//////////////////////////////////////////////////////////////////////////////////////////////
function CheckStrLen(obj, MaxLen, FieldName) {
	var i, len=0;
// added by ayasiee
	if (typeof obj == "undefined") {
		return true
	}
// added by ayasiee
	var s = obj.value;

	// String ���̸� ���ϴ� �κ�..
	for(i=0;i < s.length; i++) (s.charCodeAt(i) > 255)? len+=2:len++;

	// ���� Ȯ��.
	if (MaxLen < len) {
		if (FieldName != "") alert(FieldName + "��(��) " + MaxLen + "�ڸ� ���� �� �����ϴ�(�ѱ��� ���ڴ� 2�ڷ� ���˴ϴ�.)");
		obj.focus();
		return false;
	}
	return true;
}

// added by minux ��Ŀ������ �ʴ� ���� üũ �߰�
function CheckLenNoFocus(obj, MaxLen, FieldName) {
	var i, len=0;

	if (typeof obj == "undefined") {
		return true
	}

	var s = obj.value;

	// String ���̸� ���ϴ� �κ�..
	for(i=0;i < s.length; i++) (s.charCodeAt(i) > 255)? len+=2:len++;

	// ���� Ȯ��.
	if (MaxLen < len) {
		if (FieldName != "") alert(FieldName + "��(��) " + MaxLen + "�ڸ� ���� �� �����ϴ�(�ѱ��� ���ڴ� 2�ڷ� ���˴ϴ�.)");
	//	obj.focus(); <- �� �κ�
		return false;
	}
	return true;
}


//onchange,onkeyup Event Check
function CheckInputStrLen(obj, MaxLen, FieldName)
{
	var temp; //������ ���ڰ�...
	var msglen;
	msglen = MaxLen;

	l = obj.value.length;
	tmpstr = "" ;

	for(k=0;k<l;k++)
	{
		temp = obj.value.charAt(k);

		if (escape(temp).length > 4)
			msglen -= 2;
		else
			msglen--;

		if(msglen < 0)
		{
			alert(FieldName + "��(��) �� ���� " + MaxLen + "�ڱ��� �Է��Ͻ� �� �ֽ��ϴ�.(�ѱ��� ���ڴ� 2�ڷ� ���˴ϴ�.)");
			obj.value = tmpstr;
			break;
		}
		else
		{
			tmpstr += temp;
		}
	}
}

// textarea ���� ����
function CheckInputBox(obj, MaxLen, MaxNewLine, FieldName)
{
	var temp; //������ ���ڰ�...
	var msglen;
	var newlinecnt;
	msglen = MaxLen;
	newlinecnt = MaxNewLine;

	l = obj.value.length;
	tmpstr = "" ;

	for(k=0;k<l;k++) {
		temp = obj.value.charAt(k);

		if(temp=='\r') {
			newlinecnt--;
		}

		if (escape(temp).length > 4) {
			msglen -= 2;
		} else {
			msglen--;
		}

		if(newlinecnt <= 0) {
			alert(FieldName + "��(��) �� " + MaxNewLine + " �ٱ��� �Է��Ͻ� �� �ֽ��ϴ�.");
			obj.value = tmpstr;
			break;
		}

		if(msglen < 0) {
			alert(FieldName + "��(��) �� ���� " + MaxLen + "�ڱ��� �Է��Ͻ� �� �ֽ��ϴ�.(�ѱ��� ���ڴ� 2�ڷ� ���˴ϴ�.)");
			obj.value = tmpstr;
			break;
		} else {
			tmpstr += temp;
		}
	}
}


function Trim(strSrc, intMaxLen) {
	var i;
	var intLen = 0;

	for (i = 0; i < strSrc.length; i++) {
		(strSrc.charCodeAt(i) > 255) ? intLen += 2 : intLen++;

		if (intLen > intMaxLen) {
			strSrc = strSrc.substring(0, i);
			break;
		}
	}

	return strSrc;
}

function fcEscape(s)
{
	s = s.split("<").join("&lt;").split(">").join("&gt;")
	var ch;
	var val;
	var ret = "";
	var len = s.length;

	for (var i = 0; i < len ; i++)
	{
		val = s.charCodeAt(i);
		ch = val.toString(16);

		if (val < 0x80)
		{
			ret += "%" + (ch.length < 2 ? "0" + ch : ch);
		}
		else if (val <= 0xFF)
		{
			ret += "%u00" + (ch.length < 2 ? "0" + ch : ch);
		}
		else
		{
			ret += "%u" + (ch.length < 4 ? "0" + ch : ch);
		}
	}
	return ret;
}

////////////////////////////////////////////////
// �˾�â ��Ű ����....                        //
// function setPopCookie( name, expiredays )  //
// name : ��Ű �̸�					          //
// cvalue : ��Ű �� 					          //
// expiredays : ��ȿ ��¥        	          //
// �ۼ��� : kdmoon (2002-09-16)       	      //
////////////////////////////////////////////////

function setPopCookie( name, cvalue, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + cvalue + ";path=/;expires=" + todayDate.toGMTString() + ";domain=." + g_domain
}

////////////////////////////////////////////////
// ��ŰȮ���ؼ� �˾�â �ݱ�               	  //
// name : ��Ű �̸����� ���� "Y" �� ���� 		  //
// closeYN : ��Ű �����ϸ� â����      	      //
// �ۼ��� : kdmoon (2002-09-16)            	  //
////////////////////////////////////////////////
function checkCookie(name, closeYN) {
	var isFound, start, end, strCookie
	strCookie = name + '=Y'
	isFound = false;
	for (i=0; i <= document.cookie.length ; i++) {
		start = i;
		end = start + strCookie.length;
		
		if(document.cookie.substring(start,end) == strCookie) {
			isFound = true;
			break;
		}
	}
	if(isFound && closeYN == 'Y') top.close();
	else return isFound;
}

function setPopCookieLy( name, cvalue, expiredays, layerID) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + cvalue + ";path=/;expires=" + todayDate.toGMTString() + ";domain=." + g_domain

	if(layerID != "")
		eval("document.getElementById('" + layerID + "')").style.display = "none";
}

function checkCookieLy(name, closeYN, layerID) {
	var isFound, start, end, strCookie
	strCookie = name + '=Y'
	isFound = false;
	for (i=0; i <= document.cookie.length ; i++) {
		start = i;
		end = start + strCookie.length;

		if(document.cookie.substring(start,end) == strCookie) {
			isFound = true;
			break;
		}
	
	}
	if(isFound && closeYN == 'Y')
	{
		eval("document.getElementById('" + layerID + "')").style.display = "none";
	}
	else
	{
		return isFound;
	}
}


// ������ �˾� by kdmoon
function OpenProfileWin(strParam, mode) {
	var strURL
	if (mode == "U")	strURL = g_lovesvr + "/plaza/freeting/ProfWinForm.asp?userid=" + strParam;
	else strURL = g_lovesvr + "/plaza/freeting/ProfWinForm.asp?nickid=" + fcEscape(strParam);
	window.open(strURL, "ProfileWin", "scrollbars=no,directories=no,location=no,menubar=no,status=no,toolbar=no,resizable=no,width=540,height=405, left=" + (window.screen.availWidth/2 - 270) + ",top=" + (window.screen.availHeight/2 - 200));
}
function OpenProfileWinEx(strParam, mode, strURL) {
	var strURL
	if (mode == "U")	strURL = g_lovesvr + "/plaza/freeting/ProfWinForm.asp?url=" + fcEscape(strURL) + "&userid=" + strParam;
	else strURL = g_lovesvr + "/plaza/freeting/ProfWinForm.asp?url=" + fcEscape(strURL) + "&nickid=" + fcEscape(strParam);
	window.open(strURL, "ProfileWin", "scrollbars=no,directories=no,location=no,menubar=no,status=no,toolbar=no,resizable=no,width=540,height=405, left=" + (window.screen.availWidth/2 - 270) + ",top=" + (window.screen.availHeight/2 - 200));
}
function OpenZZimWin(strParam) {
	var strURL
	strURL = g_lovesvr + "/plaza/freeting/ProfZZimForm.asp?nickid=" + fcEscape(strParam);
	window.open(strURL, "ZZimWin", "scrollbars=no,directories=no,location=no,menubar=no,status=no,toolbar=no,resizable=no,width=350,height=200, left=" + (window.screen.availWidth/2 - 175) + ",top=" + (window.screen.availHeight/2 - 100));
}
function OpenFrndsWin(strParam) {
	var strURL
	strURL = g_lovesvr + "/plaza/freeting/ProfFrndsRegForm.asp?nickid=" + fcEscape(strParam);
	window.open(strURL, "friends", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=300, left=" + (window.screen.availWidth/2 - 250) + ",top=" + (window.screen.availHeight/2 - 150));
}
function openFreetingMsgr()
{
	window.open(g_loginsvr + "/FtMsgr.asp", "FreetingMsgrWin", "width=120,height=135,top=0,left=" + (window.screen.availWidth - 130));
	window.focus();
}
function HelpPopUp(strParam)
{
 window.open("http://help.freechal.com/popup/pop.asp?oid=" + strParam, "helpwin", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes, width=641, height=500");
}
//������ �˾� by minux
function OpenOrgel(){
	window.open (g_chatsvr + "/CtOrgel.asp","song_select","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=550,height=500");
}
////////////////////////////////////////////////
// SMS ���� �˾�â ����		            	  //
// strReceiverName : �޴� ��� �̸� 			  //
// strReceiverPhoneNo : �޴� ��� �޴��� ��ȣ	  //
// strEmotData : ������ SMS ����				  //
// intEmotDocId : ��õ �Խ��� DocId			  //
// *SMS�� ��������, strReceiverPhoneNo�� �Բ�,  //
//  strReceiverName ���� �־���� �մϴ�.		  //
// �����:popcorn21(�̼���)2004-04-06            	  //
////////////////////////////////////////////////
function Mobile_PopEmotUp(strReceiverName, strReceiverPhoneNo, strEmotData, intEmotDocId)
{
 var mobile_emotfilepath;
 var mobile_emotvleft, mobile_emotvtop, mobile_emotoption;

 mobile_emotfilepath = g_mobilesvr + "/sms/popsmspad.asp";

 mobile_emotfilepath = mobile_emotfilepath + "?name=" + strReceiverName;
 mobile_emotfilepath = mobile_emotfilepath + "&phoneno=" + strReceiverPhoneNo;
 mobile_emotfilepath = mobile_emotfilepath + "&insertEmotDocId=" + intEmotDocId;
 mobile_emotfilepath = mobile_emotfilepath + "&insertEmot=" + strEmotData;

 mobile_emotvleft = (screen.width - 615 - 10);
 mobile_emotvtop = 0;
 mobile_emotoption = "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=615,height=415,top="+mobile_emotvtop+",left="+mobile_emotvleft;
 window.open(mobile_emotfilepath,'MobilePopEmot',mobile_emotoption);

}

// �ۼ��� : ��ű� (2003-09-08)
function HTMLDecode(strHtml) {
	var strRetVal = "";

	strRetVal = strHtml.replace(/&gt;/gi, ">");
	strRetVal = strRetVal.replace(/&lt;/gi, "<");
	strRetVal = strRetVal.replace(/&quot;/gi, "\"");
	strRetVal = strRetVal.replace(/&amp;/gi, "&");

	return strRetVal;
}

function openHompy(userID)
{
	openHompyEx2(userID, "__FCHOMPY_OTHER__", "");
}

function openMyHompy(userID)
{
	openHompyEx2(userID, "__FCHOMPY_SELF__", "");
}

function openHompyEx(userID, url)
{
	openHompyEx2(userID, "__FCHOMPY_OTHER__", url);
}

function openHompyEx2(userID, windowName, hompyURL)
{
	var left = (window.screen.availWidth-934) / 2;
	var top = (window.screen.availHeight-700) / 2;
	var opt = "left=" + left + ",top=" + top + ",width=934,height=700,resizable=yes";
	var url = g_qsvr + "/Service/default.asp?id=" + userID;
	if (hompyURL != "")
		url += "&url=" + escape(hompyURL);
	try{
		var win = window.open(url, windowName, opt);
		win.focus();
	} catch (e) {
		alert('�˾����� ���α׷��� ���� ��Ȩ�ǡ� �˾��� ���� �ʳ׿�.\n��Ȩ�ǡ� ���񽺸� ������ ���·� �ڵ� �����ϵ��� �ϰڽ��ϴ�.') ;
		document.location.href = url;
	}
}
function openMyQ(userID){
	openQ(userID);
}

function openSum(ogrpid, ogrpurl)
{
	openSumEx2(ogrpid, ogrpurl, "__FCSUM__", "");
}

function openSumEx(ogrpid, ogrpurl, SumURL)
{
	openSumEx2(ogrpid, ogrpurl, "__FCSUM__", SumURL);
}


function openSumEx2(ogrpid, ogrpurl, windowName, SumURL)
{
	var left = (window.screen.availWidth-1024) / 2;
	var top = (window.screen.availHeight-738) / 2;
	var opt = "left=" + left + ",top=" + top + ",width=1012,height=678,resizable=yes";
	var url = g_sumsvr + "/SumService/SumFrame.asp?ogrpid=" + ogrpid + "&ogrpurl=" + ogrpurl;

	if (SumURL != "")
		url += "&nexturl=" + escape(SumURL);

	if (g_sumwindow == "PAGE")
		opt = "";

	var win = window.open(url, windowName, opt);
	window.opener = win;
	win.focus();

}

// ���ο��� �����. made by andrew (2004/11/10)
function openSumExForMain(ogrpid, ogrpurl, SumURL, strSection)
{
	var left = (window.screen.availWidth-1024) / 2;
	var top = (window.screen.availHeight-738) / 2;
	var opt = "left=" + left + ",top=" + top + ",width=1012,height=678,resizable=yes";
	var url = g_sumsvr + "/SumService/SumFrame.asp?ogrpid=" + ogrpid + "&ogrpurl=" + ogrpurl;

	if (SumURL != "")
		url += "&nexturl=" + escape(SumURL);

	url = g_sumsvr + "/common/FcCommonLogGate.asp?Gbn=N&RedirUrl=" + escape(url) + "&section=" + strSection;

	if (g_sumwindow == "PAGE")
		opt = "";

	var win = window.open(url, "__FCSUM__", opt);
	window.opener = win;
	win.focus();

}

/** �Լ� ������ ���� �����ڿ� ���� ��� */
function openSumForToolbar(ogrpid, ogrpurl)
{
	try{
		if (g_sumwindow == "PAGE") {
			document.location.href = g_sumsvr+"/SumService/SumFrame.asp?ogrpurl="+ogrpurl;
		} else {
			openSum(ogrpid, ogrpurl);
		}
	} catch (e) {
		var pagetype;
		if (confirm('�˾����� ���α׷��� ���� ������ �˾��� ���� �ʾ� ������������ �����ݴϴ�...\n������ ���񽺸� �׻� ���������·� ���� �Ͻðڽ��ϱ�?.') ) {
			pagetype = "PAGE"
		} else {
			pagetype = "POPUP"
		}
		window.opener = "_blank";
		document.location.href = g_sumsvr+"/SumService/SumFrame.asp?ogrpurl="+ogrpurl+"&pagetype="+pagetype;
	}
}


function showMobileHelp(layernm, opt) {


	layer=document.all[layernm];

	if (opt == 1) {
		layer.style.posLeft = document.body.scrollLeft + event.clientX;
		layer.style.posTop = document.body.scrollTop + event.clientY;
		layer.style.visibility = 'visible';
	}
	else {
		layer.style.visibility = 'hidden';
	}

}

/* ���� - SP2 ��� resize �Լ� */
var g_resizeWidth, g_resizeHeight;

////////////////////////////////////////////////////////////////////////////////
// ������ ������ ������ ������ ����
// function resizeToTop(width, height)
// width : ��
// height : ����
// �ۼ��� : arcanian (2004-09-17)
////////////////////////////////////////////////////////////////////////////////
function resizeToTop(width, height)
{
	if (typeof(top.resizeToBody) == "function")
		top.resizeToBody(width, height);
}

////////////////////////////////////////////////////////////////////////////////
// body ���� ������ ������ ����
// function resizeToBody(width, height)
// width : ��
// height : ����
// �ۼ��� : arcanian (2004-09-17)
////////////////////////////////////////////////////////////////////////////////
function resizeToBody(width, height)
{
	try{
		g_resizeWidth = width;
		g_resizeHeight = height;
		if (document.layers || document.body)
			resizeToBodyEx();
		else if (window.addEventListener)
			window.addEventListener("load", resizeToBodyEx, false);
		else if (window.attachEvent)
			window.attachEvent("onload", resizeToBodyEx);
	}catch(e){}
}

////////////////////////////////////////////////////////////////////////////////
// Helper - body ���� ������ ������ ����
// function resizeToBodyEx()
// �ۼ��� : arcanian (2004-09-17)
////////////////////////////////////////////////////////////////////////////////
function resizeToBodyEx()
{
	try{
		var sw, sh;

		if (document.layers)
		{
			sw = window.innerWidth;
			sh = window.innerHeight;
		}
		else
		{
			sw = document.body.clientWidth;
			sh = document.body.clientHeight;
		}

		window.resizeBy(g_resizeWidth - sw, g_resizeHeight - sh);
	}catch(e){}
}


/* ���� - ��ǥ��ȭ resize �Լ� */
/*   
   - �ۼ��� : ������/���а���2��
   - �ۼ��� : 2007.05.25.  
*/
////////////////////////////////////////////////////////////////////////////////
// body ���� ������ ������ ����
// function resizeToBody(width, height)
// width : ��
// height : ����
// �ۼ��� : arcanian (2004-09-17)
////////////////////////////////////////////////////////////////////////////////
function resizeToBodyNew(width, height)
{
	g_resizeWidth = width;
	g_resizeHeight = height;
	if (document.layers || document.body)
		resizeToBodyExNew();
	else if (window.addEventListener)
		window.addEventListener("load", resizeToBodyExNew, false);
	else if (window.attachEvent)
		window.attachEvent("onload", resizeToBodyExNew);
}

////////////////////////////////////////////////////////////////////////////////
// Helper - body ���� ������ ������ ����
// function resizeToBodyEx()
// �ۼ��� : arcanian (2004-09-17)
// ������ : ������ (2007-05-25)
////////////////////////////////////////////////////////////////////////////////
function resizeToBodyExNew()
{
	var sw, sh;

	if (document.layers)
	{
		sw = window.innerWidth;
		sh = window.innerHeight;
	}
	else
	{
		sw = document.documentElement.clientWidth;
		sh = document.documentElement.clientHeight;
	}

	window.resizeBy(g_resizeWidth - sw, g_resizeHeight - sh);
}

////////////////////////////////////////////////////////////////////////////////
// Overriding - window.resizeTo
// function resizeTo(width, height)
// width : ��
// height : ����
// �ۼ��� : arcanian (2004-09-17)
////////////////////////////////////////////////////////////////////////////////
function resizeTo(width, height)
{
	resizeToBody(width - 12, height - 31);
}

function resizeToBodyDlg(iWidth, iHeight) {
	window.dialogWidth = iWidth + "px";
	window.dialogHeight = iHeight + "px";

	window.dialogWidth = (iWidth * 2 - document.body.clientWidth) + "px";
	window.dialogHeight = (iHeight * 2 - document.body.clientHeight) + "px";
}

////////////////////////////////////////////////////////////////////////////////
// ��Ű ����....
// function GFcSetCookie(cookieName, cookieValue, days, domain)
// cookieName : ��Ű �̸�
// cookieValue : ��Ű ��
// days : ��ȿ �ϼ�
// domain : ��Ű ������
// �ۼ��� : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcSetCookie(cookieName, cookieValue, days, domain)
{
	var today = new Date();
	today.setDate(today.getDate() + days);
	var cookieString = cookieName + "=" + cookieValue + ";path=/;expires=" + today.toGMTString();
	if (domain != null)
		cookieString += ";domain=." + domain;
	document.cookie = cookieString;
}

////////////////////////////////////////////////////////////////////////////////
// ��Ű �ҷ�����
// function GFcGetCookie(cookieName)
// cookieName : ��Ű �̸�
// return value : ��Ű �����ϸ� �� ��Ű ��, �������� ������ ""
// �ۼ��� : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcGetCookie(cookieName)
{
	var nameOfCookie = cookieName + "=";
	var x = 0;
	while (x <= document.cookie.length)
	{
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie)
		{
			if ((endOfCookie = document.cookie.indexOf( ";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}

/* ���� - �ڵ� �˾� ���� ���� �ȳ��� ���� ��� */
var g_Popup = new Object();
g_Popup.iconWidth = 116;
g_Popup.iconHeight = 141;
g_Popup.confirmed = false;
g_Popup.list = new Array();

////////////////////////////////////////////////////////////////////////////////
// Constructor - �˾� Object ����
// function GFcCreatePopup(url, target, opt, title)
// url : �˾� ������ URL
// target : �˾� ������ target
// opt : �˾� ������ feature
// title : ���ܵǾ��� ��� �ȳ��� ���� �˾� Ÿ��Ʋ
// �ۼ��� : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcCreatePopup(url, target, option, title)
{
	// property
	this.index = g_Popup.list.length;
	this.url = url;
	this.target = target;
	this.option = option;
	this.title = title;
	this.displayed = false;

	// object
	this.iconDiv;
	this.iconTable;

	// method
	this.displayIcon = GFcDisplayPopupIcon;

	// initialization
	g_Popup.list[this.index] = this;
}

////////////////////////////////////////////////////////////////////////////////
// �ڵ� �˾� ���ܵ� ��� ���� �ȳ� ��� ��� �ִ� �˾� ����
// function GFcOpenWindow(url, target, opt, title)
// url : �˾� ������ URL
// target : �˾� ������ target
// opt : �˾� ������ feature
// title : ���ܵǾ��� ��� �ȳ��� ���� �˾� Ÿ��Ʋ
// return value : �����ϸ� �˾� ������ ��ü, �����ϸ� null
// �ۼ��� : arcanian (2004-09-16)
// ����: 2008.07.17 by ������
// ������ ������ �ε���� ���� ���¿��� Dom insert�� ���� �۾��� �ߴܵǾ��ٴ� ���� �߻� (IE������)
////////////////////////////////////////////////////////////////////////////////
function GFcOpenWindow(url, target, opt, title)
{
	var win = window.open(url, target, opt);
	if (win == null)
	{
		var popup = new GFcCreatePopup(url, target, opt, (title ? title : ""));
		if (GFcGetCookie("fcpopupguide") == "")
		{
			if (!g_Popup.confirmed)
			{
				g_Popup.confirmed = true;
				if (window.addEventListener)
					window.addEventListener("load", GFcPopupConfirm, false);
				else if (window.attachEvent)
					window.attachEvent("onload", GFcPopupConfirm);
			}
		}
		else
		{
			if (window.addEventListener)
				window.addEventListener("load", GFcDisplayPopupIcons, false);
			else if (window.attachEvent)
				window.attachEvent("onload", GFcDisplayPopupIcons);
		}
	}
	return win;
}

////////////////////////////////////////////////////////////////////////////////
// Helper - �˾� ���ܵǾ��� ��� ���� ���� ���θ� ���´�.
// function GFcPopupConfirm()
// �ۼ��� : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcPopupConfirm()
{
	GFcSetCookie("fcpopupguide", "1", 1, g_domain);
	var msg = "";
	if (g_Popup.list[0].title != "")
		msg = "[" + g_Popup.list[0].title + "] ";
	msg += "[Q] �˾��� ���ܵǾ����ϴ�.\n�˾�â ���� ������ �����Ͻðڽ��ϱ�?";
	if (confirm(msg))
		top.location.href = g_memosvr + "/MoPopupCheck.asp";
	else
		GFcDisplayPopupIcons();
}

////////////////////////////////////////////////////////////////////////////////
// Helper - �˾� ������ ������ ��� ���� �˾� ���� �����ܵ��� Display
// function GFcDisplayPopupIcons()
// �ۼ��� : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcDisplayPopupIcons()
{
	for (var i = 0; i < g_Popup.list.length; i++)
	{
		if (!g_Popup.list[i].displayed)
			g_Popup.list[i].displayIcon();
	}
}

////////////////////////////////////////////////////////////////////////////////
// Method - �˾� ������ ������ ��� ���� �˾� ���� �������� Display
// function GFcDisplayPopupIcon()
// �ۼ��� : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcDisplayPopupIcon()
{
	var sTag = "<div id='fcPopupIconDiv' style='position:absolute; z-index:0; padding:0px; margin:0px; left:expression(document.body.clientWidth + document.body.scrollLeft - g_Popup.iconWidth - 2); top:expression(document.body.clientHeight + document.body.scrollTop - (g_Popup.iconHeight + 2) * " + (this.index + 1) + "); width:" + g_Popup.iconWidth + "px; height:" + g_Popup.iconHeight + "px; overflow:hidden; cursor:hand' onclick='GFcPopupWin(" + this.index + ")'></div>";
	var div = document.createElement(sTag);
	var innerHTML = "<table id='fcPopupIcon' width='" + g_Popup.iconWidth + "' cellpadding='0' cellspacing='0' border='0' bgcolor='#FFFFFF' style='position:relative; top:" + g_Popup.iconHeight + "px'>" +
		"<tr height='38'><td colspan='3'><img src='" + g_imgsvr + "/common/popupicon/top1.gif'/></td></tr>" +
		"<tr height='33'>" +
			"<td width='18' background='" + g_imgsvr + "/common/popupicon/left1.gif'><img src='" + g_imgsvr + "/1by1.gif' width='1' height='1'/></td>" +
			"<td width='80' align='center' style='color:#000000; line-height:120%'>" +
			"<img src='" + g_imgsvr + "/1by1.gif' width='1' height='2'/><br/>";
	if (this.title != "")
		innerHTML += "[" + this.title + "]<br/>";
	innerHTML += "�˾� ����" +
			"</td>" +
			"<td width='18' background='" + g_imgsvr + "/common/popupicon/right.gif'><img src='" + g_imgsvr + "/1by1.gif' width='1' height='1'/></td>" +
		"</tr>" +
		"<tr height='70'><td colspan='3'><img src='" + g_imgsvr + "/common/popupicon/under1.gif'/></td></tr>" +
		"</table>";
	div.innerHTML = innerHTML;
	this.iconDiv = div;
	this.iconTable = div.children(0);
	document.body.insertBefore(div);
	this.displayed = true;
	GFcScrollUpPopupIcon(this.index);
}

////////////////////////////////////////////////////////////////////////////////
// Helper - ���� �˾� ���� �������� ���� ��ũ���Ѵ�.
// function GFcScrollUpPopupIcon()
// �ۼ��� : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcScrollUpPopupIcon(idx)
{
	var scrollAmount = 2;
	var scrollInterval = 10;

	var top = parseInt(g_Popup.list[idx].iconTable.style.top, 10);
	if (top <= 0)
		return;
	if (top < scrollAmount)
		top = scrollAmount;
	g_Popup.list[idx].iconTable.style.top = "" + (top - scrollAmount) + "px";
	window.setTimeout("GFcScrollUpPopupIcon(" + idx + ")", scrollInterval);
}

////////////////////////////////////////////////////////////////////////////////
// ���� �˾�
// function GFcPopupWin(idx)
// idx : �˾� �ε���
// �ۼ��� : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcPopupWin(idx)
{
	var popup = g_Popup.list[idx];
	popup.iconDiv.style.display = "none";
//	popup.iconDiv.style.filter = "Alpha(Opacity=10)";
//	popup.iconDiv.detachEvent("onclick", GFcPopupWin);
	window.open(popup.url, popup.target, popup.option);
}
/* ���� - �ڵ� �˾� ���� ���� �ȳ��� ���� ��� */

////////////////////////////////////////////////////////////////////////////////
// activeX ��ġ ���� <object>, <applet>, <embed> �±� ���� js ���� ����
// function GFcActiveWrite(idx)
// �ۼ��� : jmun (2006-02-13)
////////////////////////////////////////////////////////////////////////////////
function GFcActiveXWrite(s) {
    document.write (s);
}

function openQ(quserid, nexturl, objid, objseq, docid) {
	var arglen = arguments.length;
	var userid = GFcGetCookie("Wsn%5Fid");
	
	if(arglen==0) quserid = userid;
	if(quserid.length==0 || quserid=='Guest') return;
	
	var url = g_qsvr + "/Service/default.asp?id=" + quserid;
	if(arglen==2)  url += "&qnexturl=" + escape(nexturl);
	if(arglen>=3) url = url + "&objid=" + objid;
	if(arglen>=4) url = url + "&objseq=" + objseq;
	if(arglen>=5) url = url + "&docid=" + docid;
	
	var wName = (quserid.toLowerCase()==userid.toLowerCase()?"__QSMY__":"__QSYOUR__");
	var iWidth = 934, iHeight = 700;

	GFcOpenWindow(url, wName, "width=" +iWidth+ ",height=" +iHeight+ ",top=" +(screen.Height-iHeight)/2+ ",left=" +(screen.Width-iWidth)/2, "Q").focus();
}


/* �÷��� */
function ObjFlash(src, width, height, param, addParam) {
	param = param || "";
	addParam = addParam || "";
	document.writeln("<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0\" width=\"" + width + "\" height=\"" + height + "\">");
	document.writeln("	<param name=\"movie\" value=\"" + src + "\">");
	document.writeln("	<param name=\"flashVars\" value=\"" + param + "\">");
	document.writeln("  <param name='allowScriptAccess' value='always' />");
	document.writeln("	<param name='quality' value='high' />");
	document.writeln("	<param name='scale' value='noscale' />");
	document.writeln("	<param name='salign' value='lt' />");
	document.writeln("	<param name='menu' value='false' />");
	document.writeln("	<param name='wmode' value='transparent' />");
	document.writeln("	<embed wmode='transparent' src=\"" + src + "?" + param + "\" quality=\"high\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"" + width + "\" height=\"" + height + "\"></embed>");
	document.writeln("</object>");
}

function Gohome()
{            
   location.href = g_wwwsvr;
}

function ID(elementID) {
	try {
		return document.getElementById(elementID);
	}
	catch(e) {
		return document;
	}
}

////////////////////////////////////////////////////////////////////////////////
// �ü�� ��ȸ
// function referOS()
// �ۼ��� : hhope777 (2007-03-13)
////////////////////////////////////////////////////////////////////////////////
function referOS()
{
	if (navigator.appVersion.indexOf("Windows NT 5.1")!=-1)			// XP�ΰ��
		return "xp"
	else if (navigator.appVersion.indexOf("Windows NT 6.0")!=-1)	// OS�� ��Ÿ�ΰ��
		return "vista";
	else if (navigator.appVersion.indexOf("Windows NT 6.1")!=-1)	// OS�� Windows7�� ���
		return "win7";
	else
		return "etc"
}

//�̺�Ʈ ���
function addEvent(obj, evType, fn){
	if (obj.addEventListener) {
		obj.addEventListener(evType, fn, true);
		return true;
	} else if (obj.attachEvent) {
		var r = obj.attachEvent("on" + evType, fn);
		return r;
	} else {
		return false;
	}
}

////////////////////////////////////////////////////////////////////////////////
// �Խù� ���۱ǰ��� ����ε� ó��
// function blindPopUp()
// �ۼ��� : hhope777 (2007-07-23)
////////////////////////////////////////////////////////////////////////////////
function blindPopUp()
{
	var url = "/common/blind/blindNotice.asp";
	var iWidth = 380;
	var iHeight = 185;

	window.open(url, "blindInfo", "width=" + iWidth + ", height=" + iHeight + ", top=" +(screen.Height-iHeight)/2+ ",left=" +(screen.Width-iWidth)/2).focus();
}


////////////////////////////////////////////////////////////////////////////////
// �ð��� �˸�
// fcAlertMsg(���۽ð�,����ð�,�޽���)
// ex) fcAlertMsg("2010-10-12-02-00","2010-10-12-10-00","���� �ý��� �������� 10/12 02�ú��� 10/12 10�ñ��� ����,���� ����� �����մϴ�.\n�̿뿡 ������ ��� �˼��մϴ�")
// �ۼ��� :icefox (2010-10-08)
////////////////////////////////////////////////////////////////////////////////
function fcAlertMsg(minDate, maxDate, strMsg)
{
	var date = new Date()
	var min = minDate == ''?date:fncMakeDate(minDate);
	var max = maxDate == ''?date:fncMakeDate(maxDate);
	if(date >= min && date <= max){	
	alert(strMsg);	
	return false;
	}
	return true;
}
// ��¥���ĺ�ȯ
function fncMakeDate(strDate)
{
	var date = new Date()
	var arrDate = strDate.split("-");			
	if(arrDate.length == 5)
	{
		date.setFullYear(arrDate[0]);
		date.setMonth(arrDate[1]-1);
		date.setDate(arrDate[2]);
		date.setHours(arrDate[3]);
		date.setMinutes(arrDate[4]);
	}			
	return date;
}

////////////////////////////////////////////////////////////////////////////////
// IE6 ��׶��� �̹��� �ݺ� ȣ�� ���׸� ȸ���ϱ� ���� �ڵ�
////////////////////////////////////////////////////////////////////////////////
 if (document && document.execCommand) {
	try { document.execCommand("BackgroundImageCache",false,true); }
	catch (e) { }
}