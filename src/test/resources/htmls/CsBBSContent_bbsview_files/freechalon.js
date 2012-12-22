
var g_HandlerFcOnEvents = new Array();

function GetFreechalOnCookie()
{
	var aCookie = document.cookie.split("; ");
  	for (var i = 0; i < aCookie.length; ++i)
  	{
    		var aCrumb = aCookie[i].split("=");
    		if ("FreechalOn" == aCrumb[0])
      			return aCrumb[1];
	}
	return null;
}

function IsFreechalOnInstalled()
{
	var strCookie = GetFreechalOnCookie();
	if ("1" != strCookie && "2" != strCookie)
		return false;
	if ("object" != typeof(document.getElementById("FreechalOn")))	
		return false;
	return (document.getElementById("FreechalOn") && null != document.getElementById("FreechalOn").object);
}

function IsFreechalOnConnected()
{
	var strCookie = GetFreechalOnCookie(); 
	return ("2" == strCookie);
}

function IsFreechalOnChecked()
{
	var strCookie = GetFreechalOnCookie(); 
	return (null != strCookie);
}

function GetFreechalOnCLSID()
{
	if (document.location.hostname.indexOf(".co.kr") >= 0)
		return "B62B1BC7-6764-45bc-B21C-A571CC0140E6";
	else
		return "6F4863C1-482C-4744-8946-4AEA34DF1A16";
}

function CreateFreechalOn(strInitUrl, strCookieUrl, strUserID, nService, nLocation, strNickName)
{
	var strCookie = GetFreechalOnCookie();
	if (strCookie == "0")
		return;
	document.write("<object style=\"display:none;\" id=\"FreechalOn\" classid=\"CLSID:" + GetFreechalOnCLSID() + "\" width=\"0\" height=\"0\"></object>");
	if (document.getElementById("FreechalOn") && null != document.getElementById("FreechalOn").object)
	{
		document.getElementById("FreechalOn").Init(strInitUrl, strUserID);
		if (arguments.length >= 4)
			document.getElementById("FreechalOn").SetLocation(strUserID, nService, nLocation, strNickName);
		document.getElementById("FreechalOn").attachEvent("OnEvent", OnFreechalOnEvent);
	}
	else
	{
		var strUrl;
		strUrl = document.location;
		strUrl = strUrl.toString();
		strUrl = strUrl.toLowerCase();
		strUrl = strUrl.substr(0, strUrl.lastIndexOf("?"))

		//아래 파일들은 는 Frameset파일인데, Frameset태그 위에 이미지태그가 로드돼서
		//IE7이후 버전에서는 Frame 안에 파일이 로드돼지않아서 하얗게 뜨는 현상 막음
		if(strUrl != g_qsvr + "/service/movie/qsmovie.asp" &&
			strUrl != g_qsvr + "/service/album/qsalb.asp" &&
			strUrl != g_qsvr + "/service/bbs/qsbbs.asp" &&
			strUrl != g_qsvr + "/service/cartoon/qscartoon.asp" &&
			strUrl != g_qsvr + "/service/diary/qsdiary.asp" &&
			strUrl != g_qsvr + "/service/gbk/qsgbk.asp")
			document.write("<img style=\"display:none;\" src=\"" + strCookieUrl + "\" height=\"0\" width=\"0\">");
	}
}

function SetFreechalOnBand(strUserID, strChatUrl, nChatSize)
{
	if ("undefined" == typeof(document.getElementById("FreechalOn")) || null == document.getElementById("FreechalOn").object)
		return;
	document.getElementById("FreechalOn").SetChatBand(strUserID, strChatUrl, nChatSize);
}

function CheckFreechalOnVersion(strVersion)
{
	document.write("<object id=\"FcInstaller\" classid=\"CLSID:34A8635C-D92C-44C6-87E2-F5FA2DC4EB04\" width=\"0\" height=\"0\"></object>");
	if (null == FcInstaller.object)
		return 0;
	document.getElementById("FcInstaller").Install(0, "", "1.0.0.2", g_loginsvr + "/freechalon/FcInstallerEx2.cab", "");
	return (document.getElementById("FcInstaller").GetVersion(1, "{" + GetFreechalOnCLSID() + "}") < strVersion ? 1 : 2);
}

function OnFreechalOnEvent(eventtype, eventparam, eventid)
{
//	document.all.FreechalOn.SetEventProcessed(eventid);
	if (document.getElementById("FreechalOn").SetEventProcessed(eventid) == 0) return;
	for (var i = 0; i < g_HandlerFcOnEvents.length; ++i)
	{
		if (eventtype == g_HandlerFcOnEvents[i][0])
			g_HandlerFcOnEvents[i][1](eventparam);
	}
}

function AttatchFreechalOnEvent(eventtype, fnEventHandler)
{
	g_HandlerFcOnEvents[g_HandlerFcOnEvents.length] = new Array(eventtype, fnEventHandler);	
}

function InstallComponent(strCLSID, strVersion, strFileUrl)
{
	document.write("<object style=\"display:none;\" id=\"FcInstaller\" classid=\"CLSID:34A8635C-D92C-44C6-87E2-F5FA2DC4EB04\" width=\"0\" height=\"0\"></object>");
	if (null == document.getElementById("FcInstaller").object)
		return false;
	document.getElementById("FcInstaller").Install(0, "", "1.0.0.2", g_loginsvr + "/freechalon/FcInstallerEx2.cab", "");
	return document.getElementById("FcInstaller").Install(1, strCLSID, strVersion, strFileUrl, "");
}

function GetSysInfoString()
{
	var strCookie = GetFreechalOnCookie();
	if (strCookie == "0")
		return "";
	document.write("<object style=\"display:none;\" id=\"FreechalOn\" classid=\"CLSID:" + GetFreechalOnCLSID() + "\" width=\"0\" height=\"0\"></object>");
	return document.getElementById("FreechalOn").GetSysInfo();
}
