	function LayerMiddle(subMenu, bgcolor, menuID){
		document.writeln(
			"<TR ID="+menuID+" BGCOLOR="+bgcolor+" VALIGN=bottom HEIGHT=16>"+
			"<TD><a href='"+subMenu[0]+"' target='_top'><img src='"+subMenu[1]+"' border='0'></a></td>"+
			"</TR>");
	}

	// æ∆¿Ã≈€∏Ù
	function MakeLayer(ArrSubMenu){
		var bgcolor = "#E6E6E6";

		document.writeln(
			"<DIV ID=\"AvataMenuSub\" ONMOUSEOVER=\"javascript:showSubMenuLayer()\" ONMOUSEOUT=\"javascript:hideSubMenuLayer()\" STYLE=\"position:absolute; display:none; z-index:99\">"+
			"<TABLE CELLPADDING=0 CELLSPACING=0 BORDER=0>");
		document.writeln(
			"<tr><td height=9><img src='"+g_imgsvr+"/common/newtop/itemmall01.gif'></td></tr>");

		for (key in ArrSubMenu){
        	LayerMiddle(ArrSubMenu[key], bgcolor, "AvataMenuSub_"+key);
		}
		document.writeln(
			"<tr><td height=5><img src='"+g_imgsvr+"/common/newtop/itemmall05.gif'></td></tr>");

		document.writeln("</TABLE></DIV>");
	}

	var curMenu = '';

	function showSubMenuLayer(){
		if (curMenu != '')
			return;
		
		curMenu = 'AvataMenu';
		document.all("AvataMenuSub").style.posTop = document.all("AvataMenu").offsetTop + document.all("AvataMenu").offsetHeight;
		document.all("AvataMenuSub").style.posLeft = document.all("AvataMenu").offsetLeft;
		document.all("AvataMenuSub").style.display = "inline";
	}

	function hideSubMenuLayer(force){
		if (curMenu == '')
			return;

		curMenu = '';
		document.all("AvataMenuSub").style.display = "none";
	}


	var ArrAvataSub = new Array();
	ArrAvataSub[0] = new Array();
	ArrAvataSub[0][0] = g_mallsvr + "/avtmall/AMMain.asp";
	ArrAvataSub[0][1] = g_imgsvr + "/common/newtop/topicon/itemmall02.gif";
	ArrAvataSub[1] = new Array();
	ArrAvataSub[1][0] = g_mallsvr + "/avtmall/itemshop/IMPyCCShop.asp";
	ArrAvataSub[1][1] = g_imgsvr + "/common/newtop/topicon/itemmall03.gif";
	ArrAvataSub[2] = new Array();
	ArrAvataSub[2][0] = g_mallsvr + "/avtmall/itemshop/AMItemshop.asp";
	ArrAvataSub[2][1] = g_imgsvr + "/common/newtop/topicon/itemmall04.gif";

	MakeLayer(ArrAvataSub);

	// ∞‘¿”
	function MakeGameLayer(ArrSubMenu){
		var bgcolor = "#E6E6E6";

		document.writeln(
			"<DIV ID=\"GameMenuSub\" ONMOUSEOVER=\"javascript:showGameMenuLayer()\" ONMOUSEOUT=\"javascript:hideGameMenuLayer()\" STYLE=\"position:absolute; display:none; z-index:99\">"+
			"<TABLE CELLPADDING=0 CELLSPACING=0 BORDER=0>");
		document.writeln(
			"<tr><td height=9><img src='"+g_imgsvr+"/common/newtop/game01_2.gif'></td></tr>");

		for (key in ArrSubMenu){
        	LayerMiddle(ArrSubMenu[key], bgcolor, "GameMenuSub_"+key);
		}
		document.writeln(
			"<tr><td height=5><img src='"+g_imgsvr+"/common/newtop/game07_2.gif'></td></tr>");

		document.writeln("</TABLE></DIV>");
	}

	var curMenu2 = '';

	function showGameMenuLayer(){
		if (curMenu2 != '')
			return;
		
		curMenu2 = 'GameMenu';
		document.all("GameMenuSub").style.posTop = document.all("GameMenu").offsetTop + document.all("GameMenu").offsetHeight;
		document.all("GameMenuSub").style.posLeft = document.all("GameMenu").offsetLeft;
		document.all("GameMenuSub").style.display = "inline";
	}

	function hideGameMenuLayer(force){
		if (curMenu2 == '')
			return;

		curMenu2 = '';
		document.all("GameMenuSub").style.display = "none";
	}

	var ArrGameSub = new Array();
	ArrGameSub[0] = new Array();
	ArrGameSub[0][0] = getHostInfo() + "/common/FcCommonLogGate.asp?gbn=T&RedirUrl=" + escape(g_norazosvr + "/_gametown/default.asp?tssn=9") + "&MenuNm=GAME&Referer=" + escape(getScriptInfo());
	ArrGameSub[0][1] = g_imgsvr + "/common/newtop/game_sub01.gif";
	ArrGameSub[1] = new Array();
	ArrGameSub[1][0] = getHostInfo() + "/common/FcCommonLogGate.asp?gbn=T&RedirUrl=" + escape(g_norazosvr + "/_gametown/default_cardgame.asp?tssn=4") + "&MenuNm=GAME&Referer=" + escape(getScriptInfo());
	ArrGameSub[1][1] = g_imgsvr + "/common/newtop/game_sub02.gif";
	ArrGameSub[2] = new Array();
	ArrGameSub[2][0] = getHostInfo() + "/common/FcCommonLogGate.asp?gbn=T&RedirUrl=" + escape(g_norazosvr + "/_gametown/default_card.asp?tssn=5") + "&MenuNm=GAME&Referer=" + escape(getScriptInfo());
	ArrGameSub[2][1] = g_imgsvr + "/common/newtop/game_sub03.gif";

	MakeGameLayer(ArrGameSub);

	// ºÓ«Œ
	function MakeShopLayer(ArrSubMenu){
		var bgcolor = "#E6E6E6";

		document.writeln(
			"<DIV ID=\"ShopMenuSub\" ONMOUSEOVER=\"javascript:showShopMenuLayer()\" ONMOUSEOUT=\"javascript:hideShopMenuLayer()\" STYLE=\"position:absolute; display:none; z-index:99\">"+
			"<TABLE CELLPADDING=0 CELLSPACING=0 BORDER=0>");
		document.writeln(
			"<tr><td height=9><img src='"+g_imgsvr+"/common/newtop/topicon/shopping01.gif'></td></tr>");

		for (key in ArrSubMenu){
        	LayerMiddle(ArrSubMenu[key], bgcolor, "ShopMenuSub_"+key);
		}
		document.writeln(
			"<tr><td height=5><img src='"+g_imgsvr+"/common/newtop/topicon/shopping07.gif'></td></tr>");

		document.writeln("</TABLE></DIV>");
	}

	var curMenu3 = '';

	function showShopMenuLayer(){
		if (curMenu3 != '')
			return;
		
		curMenu3 = 'ShopMenu';
		document.all("ShopMenuSub").style.posTop = document.all("ShopMenu").offsetTop + document.all("ShopMenu").offsetHeight;
		document.all("ShopMenuSub").style.posLeft = document.all("ShopMenu").offsetLeft;
		document.all("ShopMenuSub").style.display = "inline";
	}

	function hideShopMenuLayer(force){
		if (curMenu3 == '')
			return;

		curMenu3 = '';
		document.all("ShopMenuSub").style.display = "none";
	}

	var ArrShopSub = new Array();
	ArrShopSub[0] = new Array();
	ArrShopSub[0][0] = getHostInfo() + "/common/FcCommonLogGate.asp?gbn=T&RedirUrl=" + escape("http://shop.freechal.com") + "&MenuNm=SHOPPING&Referer=" + escape(getScriptInfo());
	ArrShopSub[0][1] = g_imgsvr + "/common/newtop/topicon/gmarket.gif";
	ArrShopSub[1] = new Array();
	ArrShopSub[1][0] = getHostInfo() + "/common/FcCommonLogGate.asp?gbn=T&RedirUrl=" + escape(g_mallsvr + "/avtmall/itemmall.asp") + "&MenuNm=ITEMMALL&Referer=" + escape(getScriptInfo());
	ArrShopSub[1][1] = g_imgsvr + "/common/newtop/topicon/shopping06.gif";

	MakeShopLayer(ArrShopSub);
	
	function getHostInfo() {
		var url = top.location.href.toLowerCase();
		var strHostInfo = "";
		if (url.substr(0, 7) == "http://")
		{
			strHostInfo = "http://";
			url = url.substr(7);
		}
		if ("search".indexOf(url.substr(0, url.indexOf("."))) >= 0) {
			return "http://home.freechal.com";
		} else if( url.indexOf("music2") >= 0 ) {
			return "http://home.freechal.com";
		} else {
			return strHostInfo + url.substr(0, url.indexOf("/"));
		}
	}
	
	function getScriptInfo() {
		var url = top.location.href.toLowerCase();
		if (url.substr(0, 7) == "http://")
		{
			url = url.substr(7);
		}
		if (url.indexOf("?") >= 0)
		{
			return "http://" + url.substr(0, url.indexOf("?"));
		} else {
			return "http://" + url;
		}
	}
