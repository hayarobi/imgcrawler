var BrowserDetect = {
	init:function(){
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "An unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString:function(data){
		for(var i=0;i<data.length;i++){
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if(dataString){
				if(dataString.indexOf(data[i].subString)!=-1)
					return data[i].identity;
			}
			else if(dataProp)
				return data[i].identity;
		}
	},
	searchVersion:function(dataString){
		var index = dataString.indexOf(this.versionSearchString);
		if(index==-1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser:[
		{
			string: navigator.userAgent, subString:"Chrome", identity:"Chrome"
		},
		{
			string: navigator.userAgent, subString:"OmniWeb", versionSearch:"OmniWeb/", identity:"OmniWeb"
		},
		{
			string: navigator.vendor, subString:"Apple", identity:"Safari", versionSearch:"Version"
		},
		{
			prop: window.opera, identity:"Opera"
		},
		{
			string: navigator.vendor, subString: "iCab", identity: "iCab"
		},
		{
			string: navigator.vendor, subString: "KDE", identity: "Konqueror"
		},
		{
			string: navigator.userAgent, subString:"Firefox",identity:"Firefox"
		},
		{
			string: navigator.vendor, subString: "Camino", identity: "Camino"
		}
		,
		{
			string: navigator.userAgent, subString: "Netscape", identity: "Netscape"
		},
		{
			string: navigator.userAgent, subString: "MSIE", identity : "Explorer", versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"
		},
		{
			string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform, subString: "Win", identity: "Windows"
		},
		{
			string: navigator.platform, subString: "Mac", identity: "Mac"
		},
		{
			string: navigator.userAgent, subString: "iPhone", identity:"iPhone/iPod"
		},
		{
			string: navigator.platform, subString: "Linux", identity: "Linux"
		}
	]
};

BrowserDetect.init();
var formName;
/*
var menuOn = false;
var overMenu = false;
var formName

var menuInfo = {
	MenuWidth: MenuWidth = 100,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "QsQsmyhompy", "마이Q 가기", true ],
		[ "Qsaddbuddy", "프렌드맺기", true ],
		[ "sendmemo", "쪽지 보내기", true ],
		[ "sendsms", "문자 보내기", true ],
		[ "sendmail", "메일 보내기", true ]
	]
};

var miniInfo = {
	MenuWidth: MenuWidth = 100,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "QsQsmyhompy", "마이Q 가기", true ],
		[ "Qsaddbuddy", "프렌드맺기", true ],
		[ "sendmemo", "쪽지 보내기", true ],
		[ "sendsms", "문자 보내기", true ],
		[ "sendmail", "메일 보내기", true ]
	]
};


var QsWebMenuInfo = {
	MenuWidth: MenuWidth = 100,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "QsQsmyhompy", "마이Q 가기", true ],
		[ "Qssendgift", "선물하기", true ],
		[ "Qssendmemo", "쪽지 보내기", true ],
		[ "Qsaddbuddy", "프렌드맺기", true ]
	]
};

var QsbuddyMenuInfo = {
	MenuWidth: MenuWidth = 100,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "QsQsmyhompy", "마이Q 가기", true ],
		[ "Qssendgift", "선물하기", true ],
		[ "Qssendmemo", "쪽지 보내기", true ],
		[ "Qsaddbuddy", "프렌드맺기", true ],
		[ "Qsmovebuddy", "그룹이동", true ],
		[ "Qscancelbuddy", "Q삭제", true ]
	]
};

var QsFamilyMenuInfo = {
	MenuWidth: MenuWidth = 100,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "QsQsmyhompy", "마이Q 가기", true ],
		[ "Qssendgift", "선물하기", true ],
		[ "Qssendmemo", "쪽지 보내기", true ],
		[ "QsReNamebuddy", "관계명 변경", true ],
		[ "Qsmovefamily", "그룹이동", true ],
		[ "Qscancelfamily", "프렌드끊기", true ]
	]
};

var QsRNickMenuInfo = {
	MenuWidth: MenuWidth = 100,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "QsQsmyhompy", "마이Q 가기", true ],
		[ "Qssendgift", "선물하기", true ],
		[ "Qssendmemo", "쪽지 보내기", true ],
		[ "Qsaddbuddy", "프렌드맺기", true ],
		[ "Qssendmemo", "놀이하기", true ],
		[ "Qsaddbuddy", "강퇴하기", true ]
	]
};

var QsRCharMenuInfo = {
	MenuWidth: MenuWidth = 100,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "QsQsmyhompy", "마이Q 가기", true ],
		[ "Qssendgift", "선물하기", true ],
		[ "Qssendmemo", "귓말하기", true ],
		[ "Qsaddbuddy", "프렌드맺기", true ],
		[ "Qssendmemo", "놀이하기", true ],
		[ "Qsaddbuddy", "강퇴하기", true ]
	]
};
var QsFOnMenuInfo =  {
	MenuWidth: MenuWidth = 100,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "QsQsmyhompy", "마이Q 가기", true ],
		[ "Qsaddbuddy", "프렌드맺기", true ],
		[ "sendmemo", "쪽지 보내기", true ],
		[ "talk", "채팅하기", true ],
		[ "sendsms", "문자 보내기", true ],
		[ "sendmail", "메일 보내기", true ]
	]
};
var userInfo = {
	UserId: UserId = "",
	NickNm: NickNm = "",
	ToUserId: ToUserId = "",
	ToNickNm: ToNickNm = ""
};

var scrapBBSInfo = {
	MenuWidth: MenuWidth = 30,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "ScrapComm", "커뮤니티로 스크랩", true ],
		[ "ScrapMyQ", "마이Q로 스크랩", true ],
		[ "ScrapSum", "섬으로 스크랩", true ]
	]
};

var scrapAlbumInfo = {
	MenuWidth: MenuWidth = 30,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "ScrapComm", "커뮤니티로 스크랩", true ],
		[ "ScrapSum", "섬으로 스크랩", true ]
	]
};

var scrapMovieInfo = {
	MenuWidth: MenuWidth = 130,
	MenuHeight: MenuHeight = 0,
	FontSize: FontSize = "9pt",
	FontColor: FontColor = "#444444",
	BgColor: BgColor = "#FFFFFF",
	FontColorOver: FontColor = "#4D6585",
	BgColorOver: BgColor = "#F4F4F4",
	BorderColor: BorderColor = "#ACACAC",
	MenuItem: MenuItem = [
		[ "ScrapMyQ", "마이Q로 스크랩", true ],
		[ "ScrapComm", "커뮤니티로 스크랩", true ]
	]
};

function makeMenu() {
	var sHTML;

	sHTML = "<div id=\"userMenu\" style=\"position:absolute;width:"+menuInfo.MenuWidth+"px;border:1px "+menuInfo.BorderColor+" solid;bgcolor:"+menuInfo.BgColor+";border:none;z-index:9999;display:none\" onMouseOver=\"menuOver(this)\" onMouseOut=\"menuOut(this)\"></div>"

	document.write(sHTML);
}

makeMenu();

function showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, sMenuType, iTopPos, iLeftPos) {
	var oMenuInfo;
	switch (sMenuType) {
		case "M" : oMenuInfo = miniInfo; break;
		case "S" : oMenuInfo = menuInfo; break;
		case "V" : oMenuInfo = menuInfo; break;
		case "L" : oMenuInfo = menuInfo; break;
		case "W" : oMenuInfo = QsWebMenuInfo;  break;
		case "F" : oMenuInfo = QsFamilyMenuInfo; break;
		case "B" : oMenuInfo = QsbuddyMenuInfo;  break;
		case "N" : oMenuInfo = QsRNickMenuInfo; break;
		case "C" : oMenuInfo = QsRCharMenuInfo; break;
		case "O" : oMenuInfo = QsFOnMenuInfo; break;
			default  : oMenuInfo = menuInfo; break;
	}

	overMenu = true;
	if (menuOn)
		return;

	var oMenu = document.getElementById("userMenu");
	var sHTML;
	var left;
	var top;
	var oParentPositionedElement;

	userInfo.UserId = sUserId;
	userInfo.NickNm = sNickNm;
	userInfo.ToUserId = sToUserId;
	userInfo.ToNickNm = sToNickNm;

	oMenuInfo.MenuHeight = 20;
	if (sMenuType == "V") oMenuInfo.MenuHeight = 105;

	if (sMenuType == "L"){
		sHTML = "<div style=\"_float:left;padding-left:5px;width:90px;line-height:4px;position:relative;height:4px;overflow:hidden;\"><img src='" + g_imgsvr + "/q/common/layer_top.gif' border=\"0\" align=\"absbottom\"></div>";
	}else{
		sHTML = "<div style=\"_float:left;_padding-left:1px;width:90px;line-height:4px;position:relative;height:4px;overflow:hidden;\"><img src='" + g_imgsvr + "/q/common/layer_top.gif' border=\"0\" align=\"absbottom\"></div>";
	}
	sHTML += "<div style=\"position:relative;width:90px;background:url('" + g_imgsvr + "/q/common/layer_bg.gif') 0 0 repeat-y;padding:2px 4px\" align=left>";
	for (var i = 0; i < oMenuInfo.MenuItem.length; i++) {
		if (sMenuType == "V" || (window.top.name == "__QSECTION__" && sMenuType == "W"))
		{
			sHTML += "<div style=\"width:75px;position:relative;line-height:17px;padding:2px 0px 0px 6px;font-size:"+oMenuInfo.FontSize+";color:"+oMenuInfo.FontColor+";font-weight:normal;cursor:hand;\"";
		}else{
			sHTML += "<div style=\"position:relative;line-height:17px;padding:2px 0px 0px 6px;font-size:"+oMenuInfo.FontSize+";color:"+oMenuInfo.FontColor+";font-weight:normal;cursor:hand;\"";
		}
		if (oMenuInfo.MenuItem[i][2] == true || userInfo.UserId != "Guest")
			sHTML += " onclick=\"javascript:menuAction('" + oMenuInfo.MenuItem[i][0] + "')\"";
			sHTML += " onMouseOver=\"itemOver(this)\" onMouseOut=\"itemOut(this)\""
			sHTML += " >" + oMenuInfo.MenuItem[i][1] + "</div>";
	}
	sHTML += "</div>";
	if (sMenuType == "L"){
		sHTML += "<div style=\"_float:left;padding-left:5px;width:90px;line-height:4px;position:relative;height:4px;overflow:hidden;\"><img src='" + g_imgsvr + "/q/common/layer_bttm.gif' border=0></div>"
	}else{
		sHTML += "<div style=\"_float:left;_padding-left:1px;width:90px;line-height:4px;position:relative;height:4px;overflow:hidden;\"><img src='" + g_imgsvr + "/q/common/layer_bttm.gif' border=0></div>"
	}
	oMenu.innerHTML = sHTML;

	for (var i=oMenu.parentElement;i!=null;i=i.parentElement) if (i.style.position != "") oParentPositionedElement = i
	if (oParentPositionedElement == null) oParentPositionedElement = document.body
	if (sMenuType == "V" || (window.top.name == "__QSECTION__" && sMenuType == "W")) oParentPositionedElement = document.documentElement;

	left = event.clientX + oParentPositionedElement.scrollLeft;
	if (left < 10) {
		left = 10;
	}
	else if (left + oMenuInfo.MenuWidth + 10 > oParentPositionedElement.scrollLeft + oParentPositionedElement.clientWidth) {
		left = oParentPositionedElement.clientWidth + oParentPositionedElement.scrollLeft - oMenuInfo.MenuWidth - 10;
	}

	top = event.clientY + oParentPositionedElement.scrollTop + 10;
	if (top < 10) {
		top = 10;
	}
	else if (top + oMenuInfo.MenuHeight > oParentPositionedElement.scrollTop + oParentPositionedElement.clientHeight) {
		top = oParentPositionedElement.clientHeight + oParentPositionedElement.scrollTop - oMenuInfo.MenuHeight - 10;
	}


	if (oParentPositionedElement.style.top != "") top = top - parseInt(oParentPositionedElement.style.top,10);

	if (typeof(g_curgrpid) != "undefined" && g_curgrpid > 0 )
	{
			//커뮤니티 개편 디자인 구조를 맞추기 위해 -22,-185 를 해줌 060922 by tauris
			oMenu.style.left = left - 22;
			oMenu.style.top = event.clientY + oParentPositionedElement.scrollTop + 10 - 185;
	}else{
			oMenu.style.left = left;
			oMenu.style.top = event.clientY + oParentPositionedElement.scrollTop + 10;
	}

	if ( sMenuType == "V" && event.clientY +  oMenuInfo.MenuHeight > oParentPositionedElement.clientHeight + oParentPositionedElement.scrollTop -10)
	{
		oMenu.style.top = event.clientY - oMenuInfo.MenuHeight;
	}

	if(!isNaN(iTopPos)) {
		oMenu.style.pixelTop += iTopPos;
	}

	if(!isNaN(iLeftPos)) {
		oMenu.style.pixelLeft += iLeftPos;
	}

	oMenu.style.display = "inline";

	if (document.onmousedown != null) {
		document.onmousedown();
	}
	document.onmousedown = pageClick;
}

function showScrapMenu(formnm, scrapType, blnDisplay) {
	var scrapInfo;
	switch (scrapType) {
		case "BBS" : scrapInfo = scrapBBSInfo; break;
		case "BBSQ" : scrapInfo =  ""; break;
		case "ALBUM" : scrapInfo = scrapAlbumInfo; break;
		case "ALBUMQ" : scrapInfo = ""; break;
		case "MOVIE" : scrapInfo = scrapMovieInfo;  break;
		case "MOVIEV" : scrapInfo = scrapMovieInfo;  break;
			default  : scrapInfo = scrapBBSInfo; break;
	}

	formName = formnm;

	if(arguments.length==3 && !blnDisplay) {
		return;
	}

	overMenu = true;
	if (menuOn)
		return;

	var oMenu = document.getElementById("userMenu");
	var sHTML;
	var left;
	var top;
	var oParentPositionedElement;

	scrapInfo.MenuHeight = 20;

	for (var i=oMenu.parentElement;i!=null;i=i.parentElement) if (i.style.position != "") oParentPositionedElement = i
	if (oParentPositionedElement == null) oParentPositionedElement = document.body

	if (scrapType == "MOVIEV"){
		oParentPositionedElement = document.documentElement;
		scrapType = "MOVIE";
	}

	if (scrapType == "BBSQ" || scrapType == "ALBUMQ")
	{
		scrapType = scrapType.substring(0, scrapType.length -1);
		menuAction(scrapType + "_ScrapMyQ");
		return;
	}

	sHTML = "<div id='MyIDLayerBox'>";
	sHTML += "<div id='IDLayer'><ul>";
	for (var i = 0; i < scrapInfo.MenuItem.length; i++) {
		if (scrapInfo.MenuItem[i][2] == true) {
			if (i == 0) {
				sHTML += "<li class='first'>";
			} else {
				sHTML += "<li>";
			}
			sHTML += "<a href=\"javascript:menuAction('" + scrapType + "_" + scrapInfo.MenuItem[i][0] + "')\">" + scrapInfo.MenuItem[i][1] + "</a></li>";
		}
	}
	sHTML += "</ul></div></div>";

	oMenu.innerHTML = sHTML;



	left = event.clientX + oParentPositionedElement.scrollLeft;
	if (left < 10) {
		left = 10;
	}
	else if (left + scrapInfo.MenuWidth + 10 > oParentPositionedElement.scrollLeft + oParentPositionedElement.clientWidth) {
		left = oParentPositionedElement.clientWidth + oParentPositionedElement.scrollLeft - scrapInfo.MenuWidth - 10;
	}

	top = event.clientY + oParentPositionedElement.scrollTop + 10;
	if (top < 10) {
		top = 10;
	}
	else if (top + scrapInfo.MenuHeight > oParentPositionedElement.scrollTop + oParentPositionedElement.clientHeight) {
		top = oParentPositionedElement.clientHeight + oParentPositionedElement.scrollTop - scrapInfo.MenuHeight - 10;
	}

	if (oParentPositionedElement.style.top != "") top = top - parseInt(oParentPositionedElement.style.top,10);


	if (typeof(g_curgrpid) != "undefined" && g_curgrpid > 0 )
	{
		//커뮤니티 개편 디자인 구조를 맞추기 위해 -22,-185 를 해줌 060922 by tauris
		oMenu.style.left = left - 22;
		oMenu.style.top = event.clientY + oParentPositionedElement.scrollTop + 10 - 185;
	}else{
		oMenu.style.left = left - 10;
		if (scrapType == "ALBUM") {
			oMenu.style.top = event.clientY + oParentPositionedElement.scrollTop;
		} else {
			oMenu.style.top = event.clientY + oParentPositionedElement.scrollTop - 25;
		}
	}

	oMenu.style.display = "inline";

	if (document.onmousedown != null) {
		document.onmousedown();
	}
	document.onmousedown = pageClick;
}

function showMiniMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "M", iTopPos, iLeftPos);
}
function showMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "S", iTopPos, iLeftPos);
}
function showVMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "V", iTopPos, iLeftPos);
}
function showWMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "W", iTopPos, iLeftPos);
}
function showFMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "F", iTopPos, iLeftPos);
}
function showBMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "B", iTopPos, iLeftPos);
}
function showNMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "N", iTopPos, iLeftPos);
}
function showCMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "C", iTopPos, iLeftPos);
}
function showOMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "O", iTopPos, iLeftPos);
}
function showLMenu(sUserId, sNickNm, sToUserId, sToNickNm, iTopPos, iLeftPos) {
	showMenuEx(sUserId, sNickNm, sToUserId, sToNickNm, "L", iTopPos, iLeftPos);
}

function showBBSScrap(formnm) {
	showScrapMenu(formnm, "BBS");
}
function showBBSScrapQ(formnm) {
	showScrapMenu(formnm, "BBSQ");
}
function showAlbumScrap(formnm) {
	showScrapMenu(formnm, "ALBUM");
}
function showAlbumScrapQ(formnm) {
	showScrapMenu(formnm, "ALBUMQ");
}
function showMovieScrap(formnm) {
	showScrapMenu(formnm, "MOVIE");
}
function showMovieScrapV(formnm) {
	showScrapMenu(formnm, "MOVIEV");
}

function hideMenu() {
	if (menuOn == true && overMenu == false) {
		menuOn = false;
		document.all.userMenu.style.display = "none";
		document.onmousedown = null;
	}
}

function delayedHideMenu()
{
	overMenu = false;
	setTimeout("hideMenu()", 1000);
}

function menuOver() {
	menuOn = true;
	overMenu = true;
}

function menuOut() {
	if (event.srcElement.contains(event.toElement))	return;
	overMenu = false;
	delayedHideMenu();
}

function itemOver(objItem) {
	itemOn = true;
	overMenu = true;
	objItem.style.color = "#4D6585";
	objItem.style.backgroundColor = "#E9E9E9";
	objItem.style.fontWeight = "bold";
	objItem.style.textDecoration = "none";
}

function itemOut(objItem) {
	objItem.style.color = "#444444";
	objItem.style.backgroundColor = "#FFFFFF";
	objItem.style.fontWeight = "normal";
	objItem.style.textDecoration = "none";
}


function pageClick() {
	if (menuOn == true && overMenu == false) {
		hideMenu();
	}
}
*/
var strHpLog;
function setHpAccessLog(strAccessLog){
	strHpLog=strAccessLog;
}

function menuAction(strAction) {
	//overMenu = false;
	//hideMenu();

	switch (strAction) {
	case "Qsmyhompy": // 사용자 홈피 오픈 : 홈피유입경로를 기록하기위한 QueryString 추가(HpAccessLog) 20031201 korean //
		openHompy(userInfo.ToUserId);
//			window.open(g_hompysvr + "/hm/default.asp?Id="+userInfo.ToUserId+"&HpAccessLog="+strHpLog, "FcHompy_"+userInfo.ToUserId, "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=660,height=480");
		break;
	case "userinfo":
		window.open(g_memosvr + "/MoUserDetail.asp?fromid="+userInfo.UserId+"&toid="+userInfo.ToUserId+"&fromnm="+fcEscape(userInfo.NickNm)+"&toname="+fcEscape(userInfo.ToNickNm), "_blank", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=550");
		break;
	case "addbuddy":
		if (userInfo.UserId.toLowerCase() == "guest")
		{
			alert("먼저 로그인하세요.");
			return;
		}
		if (userInfo.UserId == userInfo.ToUserId)
		{
			alert("자신을 친구로 추가할 수 없습니다.");
			return;
		}
		window.open(g_hompysvr + "/hm/Manage/Buddy/AddBuddyForm.asp?id=" + userInfo.UserId + "&buddyid=" + userInfo.ToUserId + "&dontreload=Y", "AddBuddyWin", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=490,height=280");
		break;
	case "sendmemo":
		//window.open(g_memosvr + "/MoUserInfo.asp?fromid="+userInfo.UserId+"&toid="+userInfo.ToUserId+"&fromnm="+fcEscape(userInfo.NickNm)+"&toname="+fcEscape(userInfo.ToNickNm), "_blank", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=300");
		window.open(g_memosvr + "/NsMemo/MoNsUserInfo.asp?fromid="+userInfo.UserId+"&toid="+userInfo.ToUserId+"&fromnm="+fcEscape(userInfo.NickNm)+"&toname="+fcEscape(userInfo.ToNickNm), "_blank", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=270");
		break;
	case "sendsms":
		Mobile_PopEmotUp(userInfo.NickNm, '', '', '');
//			window.open(g_mobilesvr + "/message/mmsg.asp");
		break;
	case "sendmail":
		window.open(g_mailsvr + "/MessageCenter/Email/McSendMailForm.asp?toid="+userInfo.ToUserId);
		break;
	case "talk":
		var today = new Date();
		window.open(g_playsvr + "/chat/PeCtCreateIMChat.asp?chatIDType=U&touserid="+userInfo.ToUserId+"&tonickname="+fcEscape(userInfo.ToNickNm),
					"FcChatDateWindow_"+today.getTime(),
					"fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=630,height=500");
		break;
	case "invite":
		window.open(g_memosvr + "/MoSelectInviteChatRoom.asp?fromid="+userInfo.UserId+"&fromname="+fcEscape(userInfo.NickNm)+"&toid="+userInfo.ToUserId, "SelectInviteChatRoomWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=340,height=240");
		break;
	case "sendgift":
		window.open(g_pimssvr + "/myfreechal/pims/gift/digital/SelectItemCatPopUp.asp?OrgSelVal1=||"+userInfo.ToUserId, "SendGiftWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=606,height=340");
		break;
	case "block":
		window.open(g_memosvr + "/MoBlock.asp?userid="+userInfo.UserId+"&blackid="+userInfo.ToUserId, "BlockWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=240,height=240");
		break;
	case "telephone":
		window.open(g_msgrsvr + "/Dialpad/DialpadCall.asp?phonenum=","pop","toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=280");
		break;
	// 개인미디어 Q 레이어 액션추가 Qs-
	case "QsQsmyhompy":
		openQ(userInfo.ToUserId);
		break;
	case "Qsaddbuddy":
		if (userInfo.UserId.toLowerCase() == "guest")
		{
			alert("먼저 로그인하세요.");
			return;
		}
		if (userInfo.UserId == userInfo.ToUserId)
		{
			alert("자신을 친구로 추가할 수 없습니다.");
			return;
		}
		window.open(g_qsvr + "/service/Manage/Buddy/QsFamilyAddContactForm.asp?id=" + userInfo.UserId + "&buddyid=" + userInfo.ToUserId + "&dontreload=Y", "AddBuddyWin", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=270,height=325");
		break;
	case "QsReNamebuddy":
		if (userInfo.UserId.toLowerCase() == "guest")
		{
			alert("먼저 로그인하세요.");
			return;
		}
		if (userInfo.UserId == userInfo.ToUserId)
		{
			alert("관계명을 변경할 수 없습니다.");
			return;
		}
		window.open(g_qsvr + "/service/Manage/Buddy/QsFamilyRenameForm.asp?id=" + userInfo.UserId + "&buddyid=" + userInfo.ToUserId + "&dontreload=Y", "AddBuddyWin", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=270,height=325");
		break;
	case "Qssendmemo":
		//window.open(g_memosvr + "/MoQsUserInfo.asp?fromid="+userInfo.UserId+"&toid="+userInfo.ToUserId+"&fromnm="+fcEscape(userInfo.NickNm)+"&toname="+fcEscape(userInfo.ToNickNm), "_blank", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=270");
		window.open(g_memosvr + "/NsMemo/MoNsUserInfo.asp?fromid="+userInfo.UserId+"&toid="+userInfo.ToUserId+"&fromnm="+fcEscape(userInfo.NickNm)+"&toname="+fcEscape(userInfo.ToNickNm), "_blank", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=270");
		break;
	case "Qssendgift":
		//아이템 선물시 아이디 쿠키 저장
		setCookie("Qssendgift", userInfo.ToUserId, "/")
		openWin = window.open(g_qsvr + "/Base/Item/QbItemMallMain.asp?sid=301", "QsSendGiftWindow","");
		openWin.focus();
		break;
	case "Qsmovebuddy":
		window.open(g_qsvr + "/service/Manage/Buddy/QsBuddyMoveForm.asp?id="+userInfo.UserId+"&buddyid="+userInfo.ToUserId+"&type=B", "BlockWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=250");
		break;
	case "Qsmovefamily":
		window.open(g_qsvr + "/service/Manage/Buddy/QsBuddyMoveForm.asp?id="+userInfo.UserId+"&buddyid="+userInfo.ToUserId+"&type=F", "BlockWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=250");
		break;
	case "Qscancelbuddy":
		window.open(g_qsvr + "/service/Manage/Buddy/QsBuddyDeleteForm.asp?id="+userInfo.UserId+"&buddyid="+userInfo.ToUserId, "BlockWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=250,height=160");
		break;
	case "Qscancelfamily":
		window.open(g_qsvr + "/service/Manage/Buddy/QsFamilyDeleteForm.asp?id="+userInfo.UserId+"&buddyid="+userInfo.ToUserId, "BlockWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=250,height=160");
		break;
	case "BBS_ScrapMyQ":
		formName.action = "/Common/bbs/copy/bbs_scrap_myq.asp";
		SendContent3(formName);
		break;
	case "BBS_ScrapComm":
		formName.action = "/Common/bbs/copy/bbs_scrap_comm.asp";
		SendContent3(formName);
		break;
	case "BBS_ScrapSum":
		formName.action = "/Common/bbs/copy/bbs_scrap_sum.asp";
		SendContent3(formName);
		break;
	case "ALBUM_ScrapComm":
		formName.action = "/common/album/album_scrap_comm.asp";
		ScrapAlbum(formName);
		break;
	case "ALBUM_ScrapSum":
		formName.action = "/common/album/album_scrap_sum.asp";
		ScrapAlbum(formName);
		break;
	case "ALBUM_ScrapMyQ":
		formName.action = "/Common/album/album_scrap_myq.asp";
		//formName.action = "/Common/album/PhotoScrapFormQ.asp";
		ScrapAlbum(formName);
		break;
	case "MOVIE_ScrapMyQ":
		formName.SelScope.value = "Q";
		SendContent3(formName);
		break;
	case "MOVIE_ScrapComm":
		formName.SelScope.value = "C";
		SendContent3(formName);
		break;
	}
}

// 볼륨쿠키설정
function setCookie(name, value, path) {
	var expireDate = new Date();
	expireDate.setDate(expireDate.getDate() +10000000);

	document.cookie = name + "=" + escape(value) +"; expires="+ expireDate.toGMTString() +((path == null) ? "" : "; path="+ path);

}

// 볼륨쿠키정보얻기
function getCookie(name) {
  var argv = getCookie.arguments;
  var argc = getCookie.arguments.length;
  var value = (argc > 1) ? argv[1] : null;

	var cookies = document.cookie.split("; ");

	for (i=0;i<cookies.length;i++) {
		var arr = cookies[i].split("=");
		if (name == arr[0]) return unescape(arr[1]);
	}

	return value;
}

// 쿠키삭제
function delCookie(name, value, path)
{
	 var expireDate = new Date();
	 expireDate.setDate(expireDate.getDate() - 1);
	 document.cookie = name + "=" + escape(value) + "; expires=" + expireDate.toGMTString() +((path == null) ? "" : "; path="+ path);
}


//사용자 메뉴
var ContextMenu = {
	Config:{
		MenuWidth:100,
		MenuHeight:0,
		FontSize:'9pt',
		FontColor:'#444444',
		BgColor:'',
		OverFontColor:'#4D6585',
		OverBgcolor:'#F4F4F4',
		BorderColor:'#ACACAC',
		itemOn:false,
		menuOn:false,
		overMenu:false,
		clickObjs:''
	},
	MenuItem:{
		MSLV : {
			menuId: ["GoMyQ", "MakeBuddy", "SendMemo", "SendSms", "SendMail"],
			menuName:["마이Q 가기","프렌드맺기","쪽지 보내기","문자 보내기","메일 보내기"]
		},
		W : {
			menuId: ["GoMyQ", "QsSendGift", "SendMemo", "MakeBuddy"],
			menuName:["마이Q 가기","선물하기","쪽지 보내기","프렌드맺기"]
		},
		F : {
			menuId:["GoMyQ","QsSendGift","SendMemo","RelNameBuddy","MoveFamily","BrokenFamily"],
			menuName:["마이Q 가기","선물하기","쪽지 보내기","관계명 변경","그룹이동","프렌드끊기"]
		},
		B :{
			menuId:["GoMyQ","QsSendGift","SendMemo","MakeBuddy","MoveFamily","BrokenFamily"],
			menuName:["마이Q 가기","선물하기","쪽지 보내기","프렌드맺기","그룹이동","Q삭제"]
		},
		N : {
			menuId:["GoMyQ","QsSendGift","SendMemo","MakeBuddy","SendMemo","MakeBuddy"],
			menuName:["마이Q 가기","선물하기","쪽지 보내기","프렌드맺기","놀이하기","강퇴하기"]
		},
		C : {
			menuId:["GoMyQ","QsSendGift","SendMemo","MakeBuddy","SendMemo","MakeBuddy"],
			menuName:["마이Q 가기","선물하기","귓말하기","프렌드맺기","놀이하기","강퇴하기"]
		},
		O : {
			menuId:["GoMyQ","MakeFriend","SendMemo","MakeTalk","SendSms","SendMail"],
			menuName:["마이Q 가기","프렌드맺기","쪽지보내기","채팅하기","문자 보내기","메일 보내기"]
		},
		ScrapBBSinfo : {
			menuId : ["ScrapComm", "ScrapMyQ"],
			menuName : ["커뮤니티로 스크랩", "마이Q로 스크랩"]
		},
		ScrapAlbumInfo: {
			menuId : ["ScrapComm"],
			menuName : ["커뮤니티로 스크랩"]
		},
		ScrapMovieInfo : {
			menuId : ["ScrapMyQ", "ScrapComm"],
			menuName : ["마이Q로 스크랩","커뮤니티로 스크랩"]
		}
	},
	UserInfo:
		{
			UserId: '',
			NickNm: '',
			ToUserId:'',
			ToNickNm:''
		}
	,
	initMenu:function(sUserID, sNickNm, sToUserId, sToNickNm, sMenuType, obj){
		this.UserInfo.UserId = sUserID;
		this.UserInfo.NickNm = sNickNm;
		this.UserInfo.ToUserId = sToUserId;
		this.UserInfo.ToNickNm = sToNickNm;
		if(!document.getElementById('userMenu')){
			this.MakeMenu(sMenuType,obj);
		}

		objMenu = document.getElementById('userMenu');
		if (BrowserDetect.browser == "Explorer") {
			objMenu.onmouseleave = function(event){
				oEvent = event || window.event;
				if (oEvent.type == "mouseleave") {
					ContextMenu.menuDestroy();
				}
			}
		}else {
			objMenu.onmouseout = objMenu.onmouseover = function(event){
				oEvent = event || window.event;
				if (oEvent.type == "mouseover") {
					ContextMenu.menuOver();
				}
				if (oEvent.type == "mouseout") {
					ContextMenu.menuOut();
				}
			}
		}
		this.pageClick(true);
		this.Config.clickObjs = obj;
		this.reSize();
	},
	initScrap:function(FormNm,scMenuType,obj){
	//스크랩 메뉴
		if(!document.getElementById('userMenu')){
			this.MakeScrapMenu(FormNm,scMenuType,obj);
		}

		objMenu = document.getElementById('userMenu');
		if (BrowserDetect.browser == "Explorer") {
			objMenu.onmouseleave = function(event){
				oEvent = event || window.event;
				if (oEvent.type == "mouseleave") {
					ContextMenu.menuDestroy();
				}
			}
		}else {
			objMenu.onmouseout = objMenu.onmouseover = function(event){
				oEvent = event || window.event;
				if (oEvent.type == "mouseover") {
					ContextMenu.menuOver();
				}
				if (oEvent.type == "mouseout") {
					ContextMenu.menuOut();
				}
			}
		}
		this.pageClick(true);
		this.Config.clickObjs = obj;
		this.reSize('scraps');
	},
	MakeScrapMenu:function(FormNm,scMenuType,obj){
		var arPosition = this.computePosition(obj,"scraps");
		var pageX = arPosition[0];
		var pageY = arPosition[1];

		if(scMenuType == "MOVIEV"){
			scMenuType = "MOVIE";
		}

		if(scMenuType == "BBSQ" || scMenuType == "ALBUMQ"){
			scMenuType = scMenuType.substring(0, scMenuType.length-1);
			this.Actions(scMenuType + "_ScrapMyQ",FormNm);
			return;
		}

		var oDiv = document.createElement("div");
		oDiv.id='userMenu';
		oDiv.style.position='absolute';
		oDiv.style.width = this.Config.MenuWidth +' px';
		oDiv.style.border = '1px';
		oDiv.style.borderStyle = 'solid';
		oDiv.style.backgroundColor = '#FFFFFF';
		oDiv.style.border = 'none';
		oDiv.style.zIndex = 9999;
		oDiv.style.left = pageX + 'px';
		oDiv.style.top = pageY + 'px';
		document.body.appendChild(oDiv);

		var oDiv2 = document.createElement("div");
		oDiv2.id = "MyIDLayerBox";
		oDiv.appendChild(oDiv2);

		var oDiv3 = document.createElement("div");
		oDiv3.id = "IDLayer";
		oDiv2.appendChild(oDiv3);

		var oUL = document.createElement("ul");
		oDiv3.appendChild(oUL);

		switch (scMenuType) {
			case "BBS" : scrapInfo = ContextMenu.MenuItem.ScrapBBSinfo; break;
			case "BBSQ" : scrapInfo =  ""; break;
			case "ALBUM" : scrapInfo = ContextMenu.MenuItem.ScrapAlbumInfo; break;
			case "ALBUMQ" : scrapInfo = ""; break;
			case "MOVIE" : scrapInfo = ContextMenu.MenuItem.ScrapMovieInfo; break;
			case "MOVIEV" : scrapInfo = ContextMenu.MenuItem.ScrapMovieInfo; break;
			default  : scrapInfo = ContextMenu.MenuItem.ScrapBBSInfo; break;
		}

		for(var i=0;i<scrapInfo.menuId.length;i++){

			var oLI = document.createElement("li");
			if (i == 0) {
				oLI.className = "first";
			}
			oUL.appendChild(oLI);

			var oA = document.createElement("a");
			oA.setAttribute('id',scrapInfo.menuId[i]);
			oA.href = "javascript://"
			oLI.appendChild(oA);
			oA.appendChild(document.createTextNode(scrapInfo.menuName[i]));
			var lnks = scrapInfo.menuId[i];

			oA.onmousedown = oA.onclick = function(event){
				oEvent = event || window.event;
				if (oEvent.type == 'mousedown') {
					ContextMenu.Actions(scMenuType + "_" + this.id, FormNm);
				}
			}
		}
	},
	MakeMenu:function(sMenuType,obj){
		var arPosition = this.computePosition(obj);
		var pageX = arPosition[0];
		var pageY = arPosition[1];

		var oDiv = document.createElement("div");
		oDiv.id = "userMenu";
		oDiv.style.cssText = "position:absolute;top:"+pageY+"px;left:"+pageX+"px;padding:4px 0 2px;width:89px;letter-spacing:-1px;border:1px solid #bababa;background:#fff;z-index:100;";
		document.body.appendChild(oDiv);

		var oUl = document.createElement("ul");
		oUl.style.cssText = "margin:0 0 0 0;padding:0 0 0 0;";
		//oUl.style.marginBottom = "0";
		oDiv.appendChild(oUl);

		switch(sMenuType){
			case "W":
				oMenuInfo = this.MenuItem.W;
				break;
			case "B":
				oMenuInfo = this.MenuItem.B;
				break;
			case "F":
				oMenuInfo = this.MenuItem.F;
				break;
			case "N":
				oMenuInfo = this.MenuItem.N;
				break;
			case "C":
				oMenuInfo = this.MenuItem.C;
				break;
			case "O":
				oMenuInfo = this.MenuItem.O;
				break;
			default://case "M","S","L","V"
				oMenuInfo = this.MenuItem.MSLV;
				break;
		}

		for (var i=0; i<oMenuInfo.menuId.length; i++) {

			var oLi = document.createElement("li");
			oLi.id = oMenuInfo.menuId[i];
			oLi.style.cssText = "text-align:left;margin:0;padding:0;font:12px/1.1 돋움,Dotum,AppleGothic,Sans-serif;.line-height:1.2;padding:0 2px;list-style:none;display:block;padding:4px 7px 0;height:15px;color:#444;text-decoration:none;cursor:pointer;";
			oLi.appendChild(document.createTextNode(oMenuInfo.menuName[i]));
			oUl.appendChild(oLi);

			oLi.onmouseover = oLi.onmouseout = oLi.onclick = function(event){
				oEvent = event || window.event;
					document.onmousedown = null;
					document.onmouseup = null;
				if(oEvent.type=="mouseover"){
					ContextMenu.menuHighLight(true,this);
				}else if(oEvent.type=="mouseout"){
					ContextMenu.menuHighLight(false, this);
				}else if(oEvent.type=="click"){
					ContextMenu.Actions(this.id);
				}
			}
		}
	},
	menuHighLight:function(blnBool,oThis){
		if(blnBool){
			this.Config.itemOn = true;
			this.Config.overMenu = true;
			this.Config.menuOn = false;
			oThis.style.textDecoration = "none";
			oThis.style.backgroundColor = "#E9E9E9";
			oThis.style.fontWeight = "bold";
			oThis.style.color="#4D6585";
		}else{
			oThis.style.backgroundColor = "#FFFFFF";
			oThis.style.fontWeight = "normal";
			oThis.style.textDecoration = "none";
			oThis.style.color="#444444";
		}
	},
	delayHideMenu:function(){
		setTimeout("ContextMenu.menuDestroy()",500);
	},
	menuDestroy:function(){
		var objTag = document.getElementById('userMenu');
		if (BrowserDetect.browser != "Explorer") {
			if (this.Config.menuOn == true && this.Config.overMenu == false) {
				if (objTag)
					document.body.removeChild(objTag);
			}
		}else{
			if (objTag)
				document.body.removeChild(objTag);
		}
	},
	Actions:function(val,formName){
		switch(val){
			case "GoMyQ":
				openQ(this.UserInfo.ToUserId);
				break;
			case "MakeBuddy":
				if (this.UserInfo.UserId.toLowerCase() == "guest"){
					alert("먼저 로그인하세요.");
					return;
				}
				if (this.UserInfo.UserId == this.UserInfo.ToUserId){
					alert("자신을 친구로 추가할 수 없습니다.");
					return;
				}
				window.open(g_qsvr + "/service/Manage/Buddy/QsFamilyAddContactForm.asp?id=" + this.UserInfo.UserId + "&buddyid=" + this.UserInfo.ToUserId + "&dontreload=Y", "AddBuddyWin", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=270,height=325");
				break;
			case "SendMemo":
				window.open(g_memosvr + "/NsMemo/MoNsUserInfo.asp?fromid="+this.UserInfo.UserId+"&toid="+this.UserInfo.ToUserId+"&fromnm="+fcEscape(this.UserInfo.NickNm)+"&toname="+fcEscape(this.UserInfo.ToNickNm), "_blank", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=270");
				break;
			case "SendSms":
				Mobile_PopEmotUp(this.UserInfo.NickNm, '', '', '');
				break;
			case "SendMail":
				window.open(g_mailsvr + "/MessageCenter/Email/McSendMailForm.asp?toid="+this.UserInfo.ToUserId);
				break;
			case "MoveFamily":
				window.open(g_qsvr + "/service/Manage/Buddy/QsBuddyMoveForm.asp?id="+ this.UserInfo.UserId+"&buddyid="+this.UserInfo.ToUserId+"&type=F", "BlockWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=250");
				break;
			case "BrokenFamily":
				window.open(g_qsvr + "/service/Manage/Buddy/QsFamilyDeleteForm.asp?id="+ this.UserInfo.UserId+"&buddyid="+this.UserInfo.ToUserId+"&type=F", "BlockWindow","fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=250");
				break;
			case "MakeTalk":
				var today = new Date();
				window.open(g_playsvr + "/chat/PeCtCreateIMChat.asp?chatIDType=U&touserid="+this.UserInfo.ToUserId+"&tonickname="+fcEscape(this.UserInfo.ToNickNm),"FcChatDateWindow_"+today.getTime(),"fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=630,height=500");
				break;
			case "RelNameBuddy":
				if (this.UserInfo.UserId.toLowerCase() == "guest"){
					alert("먼저 로그인하세요.");
					return;
				}
				if (this.UserInfo.UserId == userInfo.ToUserId){
					alert("관계명을 변경할 수 없습니다.");
					return;
				}
				window.open(g_qsvr + "/service/Manage/Buddy/QsFamilyRenameForm.asp?id=" + this.UserInfo.UserId + "&buddyid=" + this.UserInfo.ToUserId + "&dontreload=Y", "AddBuddyWin", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=270,height=325");
				break;
			case "QsSendGift":
				this.setCookie("QsSendGift", this.UserInfo.ToUserId, "/")
				openWin = window.open(g_qsvr + "/Base/Item/QbItemMallMain.asp?sid=301", "QsSendGiftWindow","");
				openWin.focus();
				break;
			case "BBS_ScrapMyQ":
				formName.action = "/Common/bbs/copy/bbs_scrap_comm.asp";
				SendContent3(formName);
				break;
			case "BBS_ScrapComm":
				formName.action = "/Common/bbs/copy/bbs_scrap_comm.asp";
				SendContent3(formName);
				break;
			case "BBS_ScrapSum":
				formName.action = "/Common/bbs/copy/bbs_scrap_sum.asp";
				SendContent3(formName);
				break;
			case "ALBUM_ScrapComm":
				formName.action = "/common/album/album_scrap_comm.asp";
				ScrapAlbum(formName);
				break;
			case "ALBUM_ScrapSum":
				formName.action = "/common/album/album_scrap_sum.asp";
				ScrapAlbum(formName);
				break;
			case "ALBUM_ScrapMyQ":
				formName.action = "/Common/album/album_scrap_myq.asp";
				ScrapAlbum(formName);
				break;
			case "MOVIE_ScrapMyQ":
				formName.SelScope.value = "Q";
				SendContent3(formName);
				break;
			case "MOVIE_ScrapComm":
				formName.SelScope.value = "C";
				SendContent3(formName);
				break;
		}
		this.menuDestroy();
	},
	menuOver:function(){
		this.Config.menuOn = true;
		this.Config.overMenu = true;
	},
	menuOut:function(){
		if (BrowserDetect.browser != "Firefox") {
			var tg = event.srcElement;
			if (tg.contains(event.toElement))
				return;
			ContextMenu.Config.overMenu = false;
			ContextMenu.delayHideMenu();
		}else{
			ContextMenu.Config.overMenu = false;
			ContextMenu.delayHideMenu();
		}
	},
	computePosition:function(obj,types){
		var objs = obj;
		if (obj.offsetParent) {
			var vTop = vLeft = 0;
			do{
				vTop += obj.offsetTop;
				vLeft += obj.offsetLeft;
			} while (obj = obj.offsetParent);
			if(types!='scraps'){
				vTop = vTop+objs.offsetHeight;
			}
			return [vLeft, vTop];
		}
	},
	setCookie:function(name,value,path){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate() + 10000000);
		document.cookie = name + "=" + escape(value) + "; expires=" + expireDate.toGMTString() + ((path == null) ? "" : "; path" + path);
	},
	getCookie:function(name){
		var argv = this.getCookie.arguments;
		var argc = this.getCookie.arguments.length;
		var value = (argc > 1) ? argv[1] : null;
		var cookies = document.cookie.split("; ");

		for(var i=0;i<cookies.length;i++){
			var arr = cookies[i].split("=");
			if(name==arr[0]) return unescape(arr[1]);
		}
		return value;
	},
	delCookie:function(name,value,path){
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate()-1);
		document.cookie = name + "=" + escape(value) + "; expires=" + expireDate.toGMTString() + ((path == null) ? "" : "; path=" + path);
	},
	pageClick:function(bool){
		if (bool) {
			document.onmousedown = function(){
				ContextMenu.menuDestroy();
			}
		}else{
			document.onmousedown = null;
		}
	},
	reSize : function(types){
		window.onresize = function(types){
			if(document.getElementById('userMenu')){
				var obj = document.getElementById("userMenu");
				var objs = ContextMenu.Config.clickObjs;
				var arPosition = ContextMenu.computePosition(objs,types);
				var pageX = arPosition[0];
				var pageY = arPosition[1];

				if (obj) {
					if (BrowserDetect.browser != 'Explorer') {
						obj.style.left = pageX + 'px';
						obj.style.top = pageY + 'px';
					}
					else {
						obj.style.left = pageX + 'px';
						obj.style.top = pageY + 'px';
					}
				}
			}
		};
	}
};