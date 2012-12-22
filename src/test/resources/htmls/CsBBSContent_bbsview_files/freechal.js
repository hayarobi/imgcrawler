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
** 버튼에서 걸린 URL로 보내주는 함수 (DisplayButton 함수)
** 작성자: 문규동
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

/* 사용자 홈피 오픈 Fucntion , FcMsg.js에서 freechal.js로 옮김. 20020627 COM1 monarchi */
/* 사용자 홈피 오픈 : 홈피유입경로를 기록하기위한 QueryString 추가(HpAccessLog) 20031201 korean */
/* Q로 링크 변경 20060506 */
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
** 날짜형식이 올바른지 검사
** 작성자: 이확영
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
** email 주소형식이 올바른지 검사
** 작성자: 이확영
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
// String 길이를 구하는 Script By Moon
//
//      * CheckStrLen(obj, MaxLen, ErrorMessage)
//	    - obj : text or textarea object
//		--> MaxLen 보다 문자열이 짧으면 true, 길면 false 리턴
//      - FieldName : Error가 발생한 필드의 이름
//		--> "" 로 넣으면..Alert 띄우지 않음. (비우면 안됨..)
//////////////////////////////////////////////////////////////////////////////////////////////
function CheckStrLen(obj, MaxLen, FieldName) {
	var i, len=0;
// added by ayasiee
	if (typeof obj == "undefined") {
		return true
	}
// added by ayasiee
	var s = obj.value;

	// String 길이를 구하는 부분..
	for(i=0;i < s.length; i++) (s.charCodeAt(i) > 255)? len+=2:len++;

	// 길이 확인.
	if (MaxLen < len) {
		if (FieldName != "") alert(FieldName + "은(는) " + MaxLen + "자를 넘을 수 없습니다(한글은 글자당 2자로 계산됩니다.)");
		obj.focus();
		return false;
	}
	return true;
}

// added by minux 포커스주지 않는 길이 체크 추가
function CheckLenNoFocus(obj, MaxLen, FieldName) {
	var i, len=0;

	if (typeof obj == "undefined") {
		return true
	}

	var s = obj.value;

	// String 길이를 구하는 부분..
	for(i=0;i < s.length; i++) (s.charCodeAt(i) > 255)? len+=2:len++;

	// 길이 확인.
	if (MaxLen < len) {
		if (FieldName != "") alert(FieldName + "은(는) " + MaxLen + "자를 넘을 수 없습니다(한글은 글자당 2자로 계산됩니다.)");
	//	obj.focus(); <- 이 부분
		return false;
	}
	return true;
}


//onchange,onkeyup Event Check
function CheckInputStrLen(obj, MaxLen, FieldName)
{
	var temp; //들어오는 문자값...
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
			alert(FieldName + "은(는) 총 영문 " + MaxLen + "자까지 입력하실 수 있습니다.(한글은 글자당 2자로 계산됩니다.)");
			obj.value = tmpstr;
			break;
		}
		else
		{
			tmpstr += temp;
		}
	}
}

// textarea 라인 제한
function CheckInputBox(obj, MaxLen, MaxNewLine, FieldName)
{
	var temp; //들어오는 문자값...
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
			alert(FieldName + "은(는) 총 " + MaxNewLine + " 줄까지 입력하실 수 있습니다.");
			obj.value = tmpstr;
			break;
		}

		if(msglen < 0) {
			alert(FieldName + "은(는) 총 영문 " + MaxLen + "자까지 입력하실 수 있습니다.(한글은 글자당 2자로 계산됩니다.)");
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
// 팝업창 쿠키 세팅....                        //
// function setPopCookie( name, expiredays )  //
// name : 쿠키 이름					          //
// cvalue : 쿠키 값 					          //
// expiredays : 유효 날짜        	          //
// 작성자 : kdmoon (2002-09-16)       	      //
////////////////////////////////////////////////

function setPopCookie( name, cvalue, expiredays ) {
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + cvalue + ";path=/;expires=" + todayDate.toGMTString() + ";domain=." + g_domain
}

////////////////////////////////////////////////
// 쿠키확인해서 팝업창 닫기               	  //
// name : 쿠키 이름으로 값은 "Y" 로 세팅 		  //
// closeYN : 쿠키 존재하면 창닫음      	      //
// 작성자 : kdmoon (2002-09-16)            	  //
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


// 프로필 팝업 by kdmoon
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
//오르골 팝업 by minux
function OpenOrgel(){
	window.open (g_chatsvr + "/CtOrgel.asp","song_select","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=550,height=500");
}
////////////////////////////////////////////////
// SMS 전송 팝업창 열기		            	  //
// strReceiverName : 받는 사람 이름 			  //
// strReceiverPhoneNo : 받는 사람 휴대폰 번호	  //
// strEmotData : 전송할 SMS 내용				  //
// intEmotDocId : 추천 게시판 DocId			  //
// *SMS를 보내려면, strReceiverPhoneNo와 함께,  //
//  strReceiverName 값을 넣어줘야 합니다.		  //
// 담당자:popcorn21(이선희)2004-04-06            	  //
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

// 작성자 : 김신규 (2003-09-08)
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
		alert('팝업차단 프로그램에 의해 ‘홈피’ 팝업이 뜨지 않네요.\n‘홈피’ 서비스를 페이지 형태로 자동 변경하도록 하겠습니다.') ;
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

// 메인에서 사용함. made by andrew (2004/11/10)
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

/** 함수 수정시 툴바 개발자와 상의 요망 */
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
		if (confirm('팝업차단 프로그램에 의해 ‘섬’ 팝업이 뜨지 않아 페이지형으로 보여줍니다...\n‘섬’ 서비스를 항상 페이지형태로 변경 하시겠습니까?.') ) {
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

/* 시작 - SP2 대비 resize 함수 */
var g_resizeWidth, g_resizeHeight;

////////////////////////////////////////////////////////////////////////////////
// 프레임 내에서 윈도우 사이즈 조절
// function resizeToTop(width, height)
// width : 폭
// height : 높이
// 작성자 : arcanian (2004-09-17)
////////////////////////////////////////////////////////////////////////////////
function resizeToTop(width, height)
{
	if (typeof(top.resizeToBody) == "function")
		top.resizeToBody(width, height);
}

////////////////////////////////////////////////////////////////////////////////
// body 기준 윈도우 사이즈 조절
// function resizeToBody(width, height)
// width : 폭
// height : 높이
// 작성자 : arcanian (2004-09-17)
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
// Helper - body 기준 윈도우 사이즈 조절
// function resizeToBodyEx()
// 작성자 : arcanian (2004-09-17)
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


/* 시작 - 웹표준화 resize 함수 */
/*   
   - 작성자 : 지혜숙/포털개발2팀
   - 작성일 : 2007.05.25.  
*/
////////////////////////////////////////////////////////////////////////////////
// body 기준 윈도우 사이즈 조절
// function resizeToBody(width, height)
// width : 폭
// height : 높이
// 작성자 : arcanian (2004-09-17)
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
// Helper - body 기준 윈도우 사이즈 조절
// function resizeToBodyEx()
// 작성자 : arcanian (2004-09-17)
// 수정자 : 지혜숙 (2007-05-25)
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
// width : 폭
// height : 높이
// 작성자 : arcanian (2004-09-17)
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
// 쿠키 세팅....
// function GFcSetCookie(cookieName, cookieValue, days, domain)
// cookieName : 쿠키 이름
// cookieValue : 쿠키 값
// days : 유효 일수
// domain : 쿠키 도메인
// 작성자 : arcanian (2004-09-16)
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
// 쿠키 불러오기
// function GFcGetCookie(cookieName)
// cookieName : 쿠키 이름
// return value : 쿠키 존재하면 그 쿠키 값, 존재하지 않으면 ""
// 작성자 : arcanian (2004-09-16)
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

/* 시작 - 자동 팝업 차단 해제 안내를 위한 모듈 */
var g_Popup = new Object();
g_Popup.iconWidth = 116;
g_Popup.iconHeight = 141;
g_Popup.confirmed = false;
g_Popup.list = new Array();

////////////////////////////////////////////////////////////////////////////////
// Constructor - 팝업 Object 생성
// function GFcCreatePopup(url, target, opt, title)
// url : 팝업 페이지 URL
// target : 팝업 윈도우 target
// opt : 팝업 윈도우 feature
// title : 차단되었을 경우 안내를 위한 팝업 타이틀
// 작성자 : arcanian (2004-09-16)
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
// 자동 팝업 차단될 경우 해제 안내 모듈 들어 있는 팝업 띄우기
// function GFcOpenWindow(url, target, opt, title)
// url : 팝업 페이지 URL
// target : 팝업 윈도우 target
// opt : 팝업 윈도우 feature
// title : 차단되었을 경우 안내를 위한 팝업 타이틀
// return value : 성공하면 팝업 윈도우 객체, 실패하면 null
// 작성자 : arcanian (2004-09-16)
// 수정: 2008.07.17 by 최형진
// 문서가 완전히 로드되지 않은 상태에서 Dom insert로 인한 작업이 중단되었다는 오류 발생 (IE에서만)
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
// Helper - 팝업 차단되었을 경우 설정 유지 여부를 묻는다.
// function GFcPopupConfirm()
// 작성자 : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcPopupConfirm()
{
	GFcSetCookie("fcpopupguide", "1", 1, g_domain);
	var msg = "";
	if (g_Popup.list[0].title != "")
		msg = "[" + g_Popup.list[0].title + "] ";
	msg += "[Q] 팝업이 차단되었습니다.\n팝업창 차단 설정을 해지하시겠습니까?";
	if (confirm(msg))
		top.location.href = g_memosvr + "/MoPopupCheck.asp";
	else
		GFcDisplayPopupIcons();
}

////////////////////////////////////////////////////////////////////////////////
// Helper - 팝업 차단을 유지할 경우 수동 팝업 위한 아이콘들을 Display
// function GFcDisplayPopupIcons()
// 작성자 : arcanian (2004-09-16)
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
// Method - 팝업 차단을 유지할 경우 수동 팝업 위한 아이콘을 Display
// function GFcDisplayPopupIcon()
// 작성자 : arcanian (2004-09-16)
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
	innerHTML += "팝업 보기" +
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
// Helper - 수동 팝업 위한 아이콘을 위로 스크롤한다.
// function GFcScrollUpPopupIcon()
// 작성자 : arcanian (2004-09-16)
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
// 수동 팝업
// function GFcPopupWin(idx)
// idx : 팝업 인덱스
// 작성자 : arcanian (2004-09-16)
////////////////////////////////////////////////////////////////////////////////
function GFcPopupWin(idx)
{
	var popup = g_Popup.list[idx];
	popup.iconDiv.style.display = "none";
//	popup.iconDiv.style.filter = "Alpha(Opacity=10)";
//	popup.iconDiv.detachEvent("onclick", GFcPopupWin);
	window.open(popup.url, popup.target, popup.option);
}
/* 종료 - 자동 팝업 차단 해제 안내를 위한 모듈 */

////////////////////////////////////////////////////////////////////////////////
// activeX 패치 관련 <object>, <applet>, <embed> 태그 사용시 js 에서 쓰기
// function GFcActiveWrite(idx)
// 작성자 : jmun (2006-02-13)
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


/* 플래시 */
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
// 운영체제 조회
// function referOS()
// 작성자 : hhope777 (2007-03-13)
////////////////////////////////////////////////////////////////////////////////
function referOS()
{
	if (navigator.appVersion.indexOf("Windows NT 5.1")!=-1)			// XP인경우
		return "xp"
	else if (navigator.appVersion.indexOf("Windows NT 6.0")!=-1)	// OS가 비스타인경우
		return "vista";
	else if (navigator.appVersion.indexOf("Windows NT 6.1")!=-1)	// OS가 Windows7인 경우
		return "win7";
	else
		return "etc"
}

//이벤트 등록
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
// 게시물 저작권관련 블라인드 처리
// function blindPopUp()
// 작성자 : hhope777 (2007-07-23)
////////////////////////////////////////////////////////////////////////////////
function blindPopUp()
{
	var url = "/common/blind/blindNotice.asp";
	var iWidth = 380;
	var iHeight = 185;

	window.open(url, "blindInfo", "width=" + iWidth + ", height=" + iHeight + ", top=" +(screen.Height-iHeight)/2+ ",left=" +(screen.Width-iWidth)/2).focus();
}


////////////////////////////////////////////////////////////////////////////////
// 시간비교 알림
// fcAlertMsg(시작시간,종료시간,메시지)
// ex) fcAlertMsg("2010-10-12-02-00","2010-10-12-10-00","빌링 시스템 점검으로 10/12 02시부터 10/12 10시까지 구매,결제 기능을 차단합니다.\n이용에 불편을 드려 죄송합니다")
// 작성자 :icefox (2010-10-08)
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
// 날짜형식변환
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
// IE6 백그라운드 이미지 반복 호출 버그를 회피하기 위한 코드
////////////////////////////////////////////////////////////////////////////////
 if (document && document.execCommand) {
	try { document.execCommand("BackgroundImageCache",false,true); }
	catch (e) { }
}