// managed by hsyoon 2003-05-28
// ��������������
var off_img ,off_menu, off_cnt, off_objid

//pirpor:start
//��ǥ�ͼ������� New��ũ ǥ�ÿ���(�ΰ��� ������ �ϳ����� New��ũ �޾���) ---- 3�� 18�� ���� ������ ������.. 
var blGCOM09Exist; 
blGCOM09Exist = false;
//pirpor:end

function SetCookie(name, value)
{
    document.cookie = name + "=" +escape(value) + ";path=/";
    document.location.href = document.location.href;
}

//�׷��� on/off ��ũ��Ʈ
//grpcnt:��ü�׷��,val:�׷�ID,cnt:�׷쿡���Եȸ޴���
function GroupShow(groupid)
{
	var iconimg = "folder";
	if (off_objid == "GCOM52") {iconimg = "rfolder";}

	//���� ��
	var ImgSrc = "Img" + "Group" + g_groupinfo[groupid][0];
	var Menunm = "Menu" + "Group" + g_groupinfo[groupid][0];

	var total = 0;
	var off_total = 0;

	var imgup = g_imgsvr + "/ComMenu/group/" + iconimg + "_close.gif";
	var imgdown = g_imgsvr + "/ComMenu/group/" + iconimg + "_open.gif";
	var strimg = document.images[ImgSrc].src;

	//Menu Open
	if (strimg.substring(strimg.indexOf("close")) == imgup.substring(imgup.indexOf("close"))){
		if ((off_img != null) && (off_menu != null) || (off_cnt != null)) {
			document.images[off_img].src = imgup;
			for(var i=0; i<off_cnt; i++){
				off_total = off_total + 1;
				document.getElementById(off_menu + "," + off_total).style.display = "none";
				}
		}
		document.images[ImgSrc].src = strimg.substring(0, strimg.indexOf("close")) + "open.gif"; //imgdown;
		for(var i=0; i<g_groupinfo[groupid][1]; i++){
			total = total + 1;
			document.getElementById(Menunm + "," + total).style.display = "";
			}
	}
	//Menu Close
	else if  (strimg.substring(strimg.indexOf("open")) == imgdown.substring(imgdown.indexOf("open"))) {
		if ((off_img != null) && (off_menu != null) || (off_cnt != null)) {
			if (off_menu != Menunm) {
				document.images[off_img].src = imgup;
				for(var i=0; i<off_cnt; i++){
					off_total = off_total + 1;
					document.getElementById(off_total + "," + total).style.display = "none"; }
			}
		}
		document.images[ImgSrc].src = strimg.substring(0, strimg.indexOf("open")) + "close.gif"; //imgup;
		for(var i=0; i<g_groupinfo[groupid][1]; i++){
			total = total + 1;
			//document.getElementById(Menunm + "," + total).style.display = "none";}
			document.getElementById(Menunm + "," + total).style.display = "none";}
		}
	// ���簪�� ����Ŵ
	off_img	= ImgSrc;
	off_menu = Menunm;
	off_cnt = g_groupinfo[groupid][1];
	off_objid = g_groupinfo[groupid][3];
}

function GetMenuName(spanwidth, objid, objseq, funcnm, isnew, menuicon, linkclassnm, objurl, objimg, objcss) {
	var objidx;
	var menulink;
	var tailimg;
	var xtarget;
	var returnval;
	var menuclass;
    var aryTemp, idx, customerStyle, frontStyle, backStyle;
    customerStyle = "";
    frontStyle = "";
    backStyle = "";
	idx = 0;
	tailimg = "";
	returnval = "";

	if (objid.substr(0,4) == "GCOM") {
		objidx = parseInt(objid.substr(4,2),10)
		switch (objidx) {
			case 1: menulink = g_commsvr + "/ComService/Activity/Notice/CsNoticeList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; menuclass="notice"; break; // ��������
			case 2: menulink = g_bbssvr + "/ComService/Activity/BBS/CsBBSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; menuclass="bbs"; break; // �Խ���
			case 3: menulink = g_commsvr + "/ComService/Activity/PDS/CsPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; menuclass="pds"; break; // �ڷ��
			case 4: menulink = g_commsvr + "/ComService/Activity/GuestBook/CsGuestBookList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; menuclass="visit"; break; // ����
			case 5: menulink = g_commsvr + "/ComService/Activity/Discuss/CsDiscussList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; menuclass="debate"; break; // ��н�
			case 6: menulink = g_commsvr + "/ComService/Activity/Calendar/CsCalViewMonth.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; menuclass="calendar"; break; // ��������
			case 7: menulink = g_commsvr + "/ComService/Activity/Vote/CsVoteList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; menuclass="vote"; break; // ��ǥ
			case 9: menulink = g_commsvr + "/ComService/Activity/Survey/CsSurveyList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="research"; break; // ����
			case 11: menulink = g_playsvr + "/chat/PeCtRoomListComm.asp?grpid=" + g_curgrpid;menuclass="chat"; break; // ä��
			case 13: menulink = g_commsvr + "/ComService/Activity/Album/CsPhotoList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq + "&grpurl=" + g_grpurl;menuclass="album"; break; // �ٹ�
			case 15: menulink = g_commsvr + "/ComService/Activity/CoolSite/CsCoolSites.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; menuclass="site";break; // �����Ʈ
			case 16: menulink = g_bbssvr + "/ComService/Activity/QnA/CsQnAList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="bbs"; break; // Q&A
			case 20: menulink = g_wwwsvr + "/ComService/Activity/SmallGroup/CsAliSmlList.asp?GrpId=" + g_curgrpid;menuclass="somoim";break; // �ұ׷�Ȱ��
			case 22: menulink = g_bbssvr + "/ComService/Activity/EstimBBS/CsBBSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="rmcomm"; break; // ��õ�Խ���
			case 23: menulink = g_bbssvr + "/ComService/Activity/ABBS/CsBBSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="bbs3"; break; // �͸�Խ���
			case 30: menulink = g_commsvr + "/ComService/Activity/Pay/CsPayList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="pay"; break; // ȸ�����
			case 36: menulink = g_commsvr + "/ComService/Activity/Wi/default.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="commsms"; break; // ��������
			case 37: menulink = g_commsvr + "/ComService/Activity/Moim/MoimBBS/MoMain.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="moimbbs"; break; // ��������Խ���
			//case 38: menulink = g_msgrsvr + "/p2p/PCommUserList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; break; // P2P �ڷ��
			case 45: menulink = g_commsvr + "/ComService/Activity/alliance/Csalliancelist.asp?GrpId=" + g_curgrpid + "&ObjSeq=1";menuclass="memberinfo"; break; //ȸ������
			case 51: menulink = "JavaScript:openMemo(" + objseq + ")";menuclass="memo";  break; //�޸���
			case 53: menulink = g_commsvr + "/ComService/Activity/MasterPR/MasterPRDisplay.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="bbs"; break; //������������
			case 55: menulink = g_commsvr + "/ComService/Activity/MPDS/CsMPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="pds2"; break; // ��뷮�ڷ��
			case 58: menulink = g_commsvr + "/ComService/Activity/VPDS/CsMPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="pds2"; break;		// �����̾��ڷ��
			case 59: menulink = g_commsvr + "/ComService/Activity/VPDS/CsVPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="gigapds"; break;		// �Ⱑ�ڷ��
			case 60: menulink = g_commsvr + "/ComService/Activity/VPDS/CsUPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="pds3"; break;		// �����̾��͸�
			case 61: menulink = g_commsvr + "/ComService/Activity/XBBS/CsBBSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;menuclass="bbs4"; break;		// ������Խ���
			default: menulink = ""; break;
		}

		if (menulink != "") {
			returnval += "<li";
			if (menuicon == true) {
			    returnval += " class='" + menuclass + "'";
			}
			returnval += ">";
			
			if ( (objidx >= 1 && objidx <= 5) || objidx == 13 || objidx == 16 || objidx == 22 || objidx == 23 || objidx == 26 || objidx == 31 || objidx == 32 || objidx == 33 || objidx == 45 || objidx == 51 || objidx == 53 || objidx == 58 || objidx == 59 || objidx == 60 || objidx == 61) {
				if (isnew == "1") tailimg = "&nbsp;<img src='" + g_imgsvr + "/community/common/ico_n.gif'>";
			} else {
				if (objidx == 7 || objidx == 9 || objidx == 11 || objidx == 37) {
					if (isnew == "1") tailimg = "&nbsp;<img src='" + g_imgsvr + "/Commenu/ing2.gif' border=0 width=11 height=11 align=texttop>";
				}
			}

            returnval += "<a href='" + menulink + "' class='" + linkclassnm + "'";
			if(objcss != "") {
                returnval += " style='"+ objcss +"'>";
//			    returnval += "<font style='" + objcss + "'>" + funcnm + "</font>";

                aryTemp = objcss.split("; ");

                for(idx = 0; idx<aryTemp.length; idx++) {
                    aryTemp[idx] = aryTemp[idx].replace(";", "");

                    frontStyle = aryTemp[idx].substring(0, aryTemp[idx].indexOf(":"));
                    backStyle  = aryTemp[idx].substring(aryTemp[idx].indexOf(":")+1);

                    customerStyle += "this.style.";
                    if(frontStyle.indexOf("-") >-1) {
                        customerStyle += frontStyle.substring(0,frontStyle.indexOf("-")) + frontStyle.substr(frontStyle.indexOf("-")+1,1).toUpperCase() + frontStyle.substring(frontStyle.indexOf("-")+2) + "='"+ backStyle +"'; ";
                    }
                    else customerStyle += frontStyle + "='"+ backStyle +"'; ";
                }
			}
		    else {
		        returnval += ">";
                customerStyle = "this.style.textDecoration='none';"
		    }

		    returnval += "<span onmouseover=\"this.style.textDecoration='underline'\" onmouseout=\"" + customerStyle +"\">"+ funcnm +"</span></a>";

			if (objimg != "")  tailimg += "&nbsp;<img src='" + g_imgsvr + "/Commenu/Icon/" + objimg + "' border=0>";

			////��ǥ�� ���������϶� New ��ũ �޾���.. pirpor:start
			var now, mm, dd, hh;
			now = new Date();
			mm = now.getMonth()+1;
			dd = now.getDate();
			hh = now.getHours();

			if ((mm==5 && dd==20) || (mm==5 && dd ==21 && hh < 16)) {
				if (blGCOM09Exist == true) {
					if (objidx == 9) tailimg += "<img src='" + g_imgsvr + "/community/common/ico_n.gif'>";
				}
				else if (objidx == 7) {
					tailimg += "<img src='" + g_imgsvr + "/community/common/ico_n.gif'>";
				}
			}
			////Pirpor:End

			returnval += tailimg + "</li>";
		} 
		else if ((menulink == "") && ((objidx == 46) || (objidx == 47) || (objidx == 48) || (objidx == 50))) {    //Ŀ�´�Ƽ �߰��޴�
			if (objidx == 46) { // ��ũ�޴�
				menuclass = "linkmenu";
			}
			// EDIT || HTML
			if (objidx == 47 || objidx == 50) {
				menuclass = "commpage";
			}
            // �Խù�
			if (objidx == 48) {
				menuclass = "commbbs"
			}
			returnval += "<li"
			if (menuicon == true) {
                returnval += " class='" + menuclass + "'"
			}
			returnval += ">"
			if ((objidx == 47) || (objidx == 50)) {
                returnval += "<a href='" + g_wwwsvr + '/' + g_grpurl + '/' + objurl + "' class='" + linkclassnm + "'";
			} 
			else if (objidx == 46) {
			    returnval += "<a href='" + objurl + "' target='_new' class='" + linkclassnm + "'";
			} 
			else if (objidx == 48) {
		        returnval += "<a href='" + objurl + "' class='" + linkclassnm + "'";
			}

//			if (objcss != "") returnval += "<font style='" + objcss + "''>" + funcnm + "</font></a>";
			if(objcss != "") {
                returnval += " style='"+ objcss +"'>";

                aryTemp = objcss.split("; ");

                for(idx = 0; idx<aryTemp.length; idx++) {
                    aryTemp[idx] = aryTemp[idx].replace(";", "");

                    frontStyle = aryTemp[idx].substring(0, aryTemp[idx].indexOf(":"));
                    backStyle  = aryTemp[idx].substring(aryTemp[idx].indexOf(":")+1);

                    customerStyle += "this.style.";
                    if(frontStyle.indexOf("-") >-1) {
                        customerStyle += frontStyle.substring(0,frontStyle.indexOf("-")) + frontStyle.substr(frontStyle.indexOf("-")+1,1).toUpperCase() + frontStyle.substring(frontStyle.indexOf("-")+2) + "='"+ backStyle +"'; ";
                    }
                    else customerStyle += frontStyle + "='"+ backStyle +"'; ";
                }
			}
		    else {
		        returnval += ">";
                customerStyle = "this.style.textDecoration='none';"
		    }
		    
		    returnval += "<span onmouseover=\"this.style.textDecoration='underline'\" onmouseout=\"" + customerStyle +"\">"+ funcnm +"</span></a>";

			if (objimg != "") tailimg += "&nbsp;<img src='" + g_imgsvr + "/Commenu/Icon/" + objimg + "' border=0>"
			
			returnval += tailimg + "</li>";
			
		} else if ((menulink == "") && (objidx == 49)) {
			returnval += "<li class='categoryLine'><!--  -->" ;
			returnval += tailimg + "</li>";
		}

//		if (menulink != "") return Displayfreecommmenu(menulink, Spanwidth)
        return returnval;
	}
	if (objid.substr(0,4) == "XCOM") {
		objidx = parseInt(objid.substr(4,2),10)
		xtarget = " target='_blank'"
		switch (objidx) {
			case 6: menulink = "JavaScript:goNorazo()"; xtarget=""; break;//g_gamesvr + "/ptop/game/community/default.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq; xtarget=""; break; // Ŀ�´�Ƽ ����
			case 9: menulink = g_wwwsvr + "/_market/BV/fc2bv.asp";menuclass="shopping"; break; // ����
			case 15: menulink = g_mallsvr + "/AvtMall/AMMain.asp";menuclass="avata"; break; // �����۸�
			default: menulink = ""; break;
		}
		if (menulink != "") {
			returnval += "<li"
			if (menuicon == true) {
				if (objid == "XCOM06") tailimg = "game.gif"; else tailimg = "contents.gif"
				returnval += " class='" + menuclass + "'"
				tailimg = ""
			}
			returnval += "><a href='" + menulink + "'" + xtarget + ">" + funcnm + "</a></li>"
		}
//		if (menulink != "") return Displayfreecommmenu(menulink, Spanwidth)
        return returnval;
	}
	/* ����� �޴� ����
	if (objid == "KNOU01") {
		if (menuicon == true) {
			returnval += "<img src='" + g_imgsvr + "/Commenu/Info.gif' border=0 align='texttop' width=17 height=18>&nbsp;"
		}
		returnval += "<a href='" + g_wwwsvr + "/_knou/info/info.asp?GrpId=" + g_curgrpid + "' class='" + linkclassnm + "'>����������</a>"

		return returnval;
//		return Displayfreecommmenu(menulink, Spanwidth)
	}*/
	if (objid.substr(0,4) == "GETC") {		//������ �޴�ó��
		objidx = parseInt(objid.substr(4,2),10)
		switch (objidx) {
			case 1: menulink = g_wwwsvr + "/" + objurl + "/"; break;	//��õĿ�´�Ƽ ����Ʈ
			case 3: menulink = "javascript:openSum(\"\",\"" + objurl + "\")"; break;	//������Ʈ
			default: menulink = ""; break;
		}

        returnval += "<tr><td style='padding:0 3px 3px 1px;'><img src='"+ g_imgsvr +"/community/common/white/Ico_d01.gif' hspace='1'>";
		if (menulink != "") {
			if (isnew == "1") tailimg = "&nbsp;<img src='" + g_imgsvr + "/community/common/ico_n.gif' border=0 align=texttop>"

			if (objid=="GETC03") {
			    returnval += "&nbsp;<a href='" + menulink + "' class='" + linkclassnm + "' target='_self'";
            }
			else {
			    returnval += "&nbsp;<a href='" + menulink + "' class='" + linkclassnm + "' target='_commwin'";
			}
            // ����� ��Ÿ�� ����
			if(objcss != "") {
                returnval += " style='"+ objcss +"'>";

                aryTemp = objcss.split("; ");

                for(idx = 0; idx<aryTemp.length; idx++) {
                    aryTemp[idx] = aryTemp[idx].replace(";", "");

                    frontStyle = aryTemp[idx].substring(0, aryTemp[idx].indexOf(":"));
                    backStyle  = aryTemp[idx].substring(aryTemp[idx].indexOf(":")+1);

                    customerStyle += "this.style.";
                    if(frontStyle.indexOf("-") >-1) {
                        customerStyle += frontStyle.substring(0,frontStyle.indexOf("-")) + frontStyle.substr(frontStyle.indexOf("-")+1,1).toUpperCase() + frontStyle.substring(frontStyle.indexOf("-")+2) + "='"+ backStyle +"'; ";
                    }
                    else customerStyle += frontStyle + "='"+ backStyle +"'; ";
                }
			}
		    else {
		        returnval += ">";
                customerStyle = "this.style.textDecoration='none';"
		    }
		    
		    returnval += "<span onmouseover=\"this.style.textDecoration='underline'\" onmouseout=\"" + customerStyle +"\">"+ funcnm +"</span></a>";
/*		    
			if (objcss != "") returnval += "<font style='" + objcss + "'>"  + funcnm + "</font></a>";
		    else returnval += funcnm +"</a>";
*/			
			returnval += tailimg + "</td></tr>";
//			if (menulink != "") return Displayfreecommmenu(menulink, Spanwidth)

            return returnval;
		}
	}
}

//�޴��� ����, ����� ��Ÿ����
function DisplayTopButton(classnm) {
	if (g_mngpermission)
		return;

	if (g_canapply == false) {
		document.write('<a href="' + g_wwwsvr + '/ComService/Activity/ApplyEntry/CsActAplJoinForm.asp?GrpId=' + g_curgrpid + '">');
		(g_leftmenu.indexOf('L03')>-1)? document.write('<img src="' + g_imgsvr + '/ComMenu/btn_03.gif" border="0" align="absmiddle" width="70" height="20" style="position:relative">') : document.write('<img src="' + g_imgsvr + '/ComMenu/btn_join3.gif" border="0" align="absmiddle" width="64" height="20">');
		document.write('</a>&nbsp;<a href="' + g_commsvr + '/MyComm/MyCommunities/MySetFreComAdd2.asp?GrpId=' + g_curgrpid + '&rtnURL=' + escape(document.location.href) + '" target="_new">');
		(g_leftmenu.indexOf('L03')>-1)? document.write('<img src="' + g_imgsvr + '/ComMenu/btn_04.gif" border="0" align="absmiddle" width="70" height="20" style="position:relative">') : document.write('<img src="' + g_imgsvr + '/ComMenu/btn_fre2.gif" border="0" align="absmiddle" width="64" height="20">');
		document.write('</a>')
	}
	else if (g_leftmenu.indexOf('L03')>-1) {
		document.write('<tr><td align=center><a href="' + g_homesvr + '/ComService/Activity/Invite/CsInvItemailForm.asp?GrpId=' + g_curgrpid + '">');
		document.write('<img src="'+ g_imgsvr +'/ComMenu/btn_01.gif" width=50 height=20 style="position:relative">');
		document.write('</a><img src="' + g_imgsvr + '/1by1.gif" width=2><a href="' + g_homesvr + '/ComService/Activity/sum/makesum.asp?grpid=' + g_curgrpid + '">');
		document.write('<img src="'+ g_imgsvr +'/ComMenu/btn_02.gif" width=90 height=20 style="position:relative">');
		document.write('</a>');
	}
}

//�޴��� Ŀ�´�Ƽ���� ��Ÿ����
function DisplayCommInfo(classnm) {
	var cslink = 'mlink';
	var strImgUrl = g_imgsvr + '/ComMenu';
	var strAlign1 = 'center';
	var strAlign2 = 'center';
	var strMasternm = '';
	var intWidth = 47;
	var intHeight = 14;

	if (g_menuitem == "Y") {
			strImgUrl = g_comitemimgprefix;
			strAlign1 = 'right';
			strAlign2 = 'left';
			intWidth = 49;
			intHeight = 11;
	}
	if (classnm != "menu") {cslink = classnm;}
	if ((g_menuitem == "Y") && (g_userid == "Guest")) {
		strMasternm = g_masternm;
	} else {
		strMasternm = '<span onClick="openHompy(\'' + g_masterid + '\')" style="cursor:hand;">' + g_masternm + '</span>';
	}

	document.writeln('<tr>')
	if (g_leftmenu.indexOf('L03')>-1) {
		if (g_menustyle == "1") {
			document.writeln('<td  width="50" align="right">ȸ���� :</td>')
			document.writeln('<td class="'+ classnm +'" align="left">' + FormatNumber(g_membercnt) + ' ��</td>')
	
		} else if ((g_menustyle == "2") || (g_menustyle == "4")) {
			document.writeln('<td colspan=2></td>')
	
		} else if (g_menustyle == "3") {
			document.writeln('<td width="50" align="right">������ :</td>')
			document.writeln('<td class="'+ classnm +'" align="left">' + strMasternm + '</td>')
	
		} else {
			document.writeln('<td width="50" class="'+ classnm +'" align="right">������ :<br>ȸ���� :</td>')
			document.writeln('<td class="'+ classnm +'" align="left"><b>' + strMasternm + '</b><br>' + FormatNumber(g_membercnt) + ' ��</td>')
		}
	}
	else {
		if (g_menustyle == "1") {
			document.writeln('<td align="right" width="50%"><img src="' + strImgUrl + '/icon_member.gif" border=0 align="absmiddle"></td>')
			document.writeln('<td class="'+ classnm +'" align="left" width="50%" style="padding-top:3px;">&nbsp; ' + FormatNumber(g_membercnt) + ' ��</td>')
	
		} else if ((g_menustyle == "2") || (g_menustyle == "4")) {
			document.writeln('<td colspan=2></td>')
	
		} else if (g_menustyle == "3") {
			document.writeln('<td align="right"><img src="' + strImgUrl + '/icon_master.gif" border=0 align="absmiddle"></td>')
			document.writeln('<td class="'+ classnm +'" align="left" style="padding-top:3px;">&nbsp;' + strMasternm + '&nbsp;</td>')
	
		} else {
			document.writeln('<td align="' + strAlign1 + '"><img src="' + strImgUrl + '/icon_master.gif" border=0></td>')
			document.writeln('<td align="' + strAlign2 + '"><img src="' + strImgUrl + '/icon_member.gif" border=0></td>')
			document.writeln('</tr>')
			document.writeln('<tr>')
			document.write('<td align="right" class="'+ classnm +'" style="padding-left:5px;">' + strMasternm + '&nbsp;</td>')
			if ((g_menuitem == "N") && (g_commtype == "F")) {
				document.writeln('<td class="'+ classnm +'" align="left" style="padding-left:5px; padding-top:3px;">&nbsp;' + FormatNumber(g_membercnt) + ' ��</td>');
			} else {
				document.writeln('<td class="'+ classnm +'" align="left" style="padding-left:5px; padding-top:3px;"><a href="' + g_commsvr + '/ComService/Activity/online/CsOnLineList.asp?grpid=' + g_curgrpid + '" class="'+ cslink +'">' + FormatNumber(g_membercnt) + '</a> ��</td>');
			}
		}
	}
	document.writeln('</tr>')
}

//�̹��� �޴������ϱ�
function DisplayGETCInfo(classnm) {
	if (g_getc02info.length > 0) {

		var imgrate = '100%';
		var objimg	= g_getc02info[0][8];
		var objlink = "";
		var objhelp	= g_getc02info[0][6];

		if (g_menuitem == "N") {imgrate = parseInt(g_menuwidth * 0.9)-10;}
		else {imgrate = 123}

		document.writeln('<tr><td valign=bottom><table border=0 cellpadding=3 cellspacing=0 width="100%">');

		if (objimg != "") {
			document.writeln('<tr><td align=center><span style="overflow:hidden; width:' + imgrate + ';"><img src="' + g_homesvr + '/' + g_grpurl + '/images/' + objimg + '" align=absmiddle></span></td><tr>')
			if (objhelp != "") {
				document.write('<tr><td height=13 valign=bottom><img src="' + g_imgsvr + '/ComMenu/img/comment.gif" border=0 align=absmiddle)>&nbsp;<span id="btn_comment"><');
				document.write('a href="JavaScript:CommentHide();"><img src="' + g_imgsvr + '/ComMenu/img/up.gif" border=0 align=absmiddle id="btn_up"></a></span></td></tr>');
				document.writeln('<tr id="getchelp" style="display:bolck;"><td class="' + classnm + '" style="padding:4px;" valign=top>' + objhelp + '</td></tr>')
			}
		} else {
			document.writeln('<tr><td class="mtitle" align=center><img src="'+ g_imgsvr +'/ComMenu/img/img.gif" border=0 align=absmiddle></td></tr>')
		}

		document.write('<div style="position:relative;"><a href="' + g_homesvr + '/ComService/Management/Menu/Template/CsSetMenuStyle.asp?Grpid=' + g_curgrpid + '"><img src="' + g_imgsvr + '/ComMenu/img/edit.gif" border=0 align=absmiddle style="position:absolute;left:3px;top:3px"></a></div>');
		document.write('</table></td></tr>')
		
	}
}

//�̹��� + Comment����
function CommenuShow() {
	document.getElementById("getchelp").style.display = "";
	document.getElementById("btn_comment").innerHTML = "<a href='JavaScript:CommentHide();'><img src='" + g_imgsvr + "/ComMenu/img/up.gif' border=0 align=absmiddle id='btn_up'></a>";
}

//�̹����� ����
function CommentHide() {
	document.getElementById("getchelp").style.display = "none";
	document.getElementById("btn_comment").innerHTML = "<a href='JavaScript:CommenuShow();'><img src='" + g_imgsvr + "/ComMenu/img/down.gif' border=0 align=absmiddle id='btn_down'></a>";
}

function viewNhide(dividx, folderoffImg) {
    var imgName = folderoffImg.substring(0, folderoffImg.indexOf("."));
    // ��ġ��
    if (eval("document.all.onmenuGroup"+ dividx).style.display == "none") {
        document.getElementById("menuGroupImg"+ dividx).src = g_imgsvr +"/community/common/menu/"+ imgName +"_open.gif";
        eval("document.all.onmenuGroup"+ dividx).style.display = "block";
    }
    // ����
    else if (eval("document.all.onmenuGroup"+ dividx).style.display == "block") {
        document.getElementById("menuGroupImg"+ dividx).src = g_imgsvr +"/community/common/menu/"+ folderoffImg;
        eval("document.all.onmenuGroup"+ dividx).style.display = "none";
    }
}

function getUrlperMenu(objid, objurl, objseq) {
    var objidx;
    var menulink;

    if (objid.substr(0,4) == "GCOM") {
		objidx = parseInt(objid.substr(4,2),10)

		if (objidx == 1) menulink = g_commsvr + "/ComService/Activity/Notice/CsNoticeList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;           // ��������
		else if (objidx == 2) menulink = g_bbssvr + "/ComService/Activity/BBS/CsBBSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;             // �Խ���
		else if (objidx == 3) menulink = g_commsvr + "/ComService/Activity/PDS/CsPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;            // �ڷ��
		else if (objidx == 4) menulink = g_commsvr + "/ComService/Activity/GuestBook/CsGuestBookList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;// ����
		else if (objidx == 5) menulink = g_commsvr + "/ComService/Activity/Discuss/CsDiscussList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;    // ��н�
		else if (objidx == 6) menulink = g_commsvr + "/ComService/Activity/Calendar/CsCalViewMonth.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;  // ��������
		else if (objidx == 7) menulink = g_commsvr + "/ComService/Activity/Vote/CsVoteList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;          // ��ǥ
		else if (objidx == 9) menulink = g_commsvr + "/ComService/Activity/Survey/CsSurveyList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;      // ����
		else if (objidx == 11) menulink = g_playsvr + "/chat/PeCtRoomListComm.asp?grpid=" + g_curgrpid;                                             // ä��
		else if (objidx == 13) menulink = g_commsvr + "/ComService/Activity/Album/CsPhotoList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq + "&grpurl=" + g_grpurl;// �ٹ�
		else if (objidx == 15) menulink = g_commsvr + "/ComService/Activity/CoolSite/CsCoolSites.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;    // �����Ʈ
		else if (objidx == 16) menulink = g_bbssvr + "/ComService/Activity/QnA/CsQnAList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;            // Q&A
		else if (objidx == 20) menulink = g_wwwsvr + "/ComService/Activity/SmallGroup/CsAliSmlList.asp?GrpId=" + g_curgrpid;                        // �ұ׷�Ȱ��
		else if (objidx == 22) menulink = g_bbssvr + "/ComService/Activity/EstimBBS/CsBBSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;       // ��õ�Խ���
		else if (objidx == 23) menulink = g_bbssvr + "/ComService/Activity/ABBS/CsBBSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;           // �͸�Խ���
		else if (objidx == 30) menulink = g_commsvr + "/ComService/Activity/Pay/CsPayList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;           // ȸ�����
		else if (objidx == 36) menulink = g_commsvr + "/ComService/Activity/Wi/Default.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;              // ��������
		else if (objidx == 37) menulink = g_moimsvr + "/ComService/Activity/Moim/MoimBBS/MoMain.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;     // ��������Խ���
		else if (objidx == 38) menulink = g_msgrsvr + "/p2p/PCommUserList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;                           // P2P �ڷ��
		else if (objidx == 45) menulink = g_commsvr + "/ComService/Activity/alliance/Csalliancelist.asp?GrpId=" + g_curgrpid + "&ObjSeq=1";         //ȸ������
		else if (objidx == 51) menulink = "JavaScript:openMemo(" + objseq + ")";                                                                    //�޸���
		else if (objidx == 53) menulink = g_commsvr + "/ComService/Activity/MasterPR/MasterPRDisplay.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;//������������
		else if (objidx == 55) menulink = g_commsvr + "/ComService/Activity/MPDS/CsMPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;         // ��뷮�ڷ��
		else if (objidx == 58) menulink = g_commsvr + "/ComService/Activity/VPDS/CsMPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;	        // �����̾��ڷ��
		else if (objidx == 59) menulink = g_commsvr + "/ComService/Activity/VPDS/CsVPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;         // �Ⱑ�ڷ��
		else if (objidx == 60) menulink = g_commsvr + "/ComService/Activity/VPDS/CsUPDSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;	        // �����̾��͸�
		else if (objidx == 61) menulink = g_commsvr + "/ComService/Activity/XBBS/CsBBSList.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;	        // ������Խ���
        else if ((objidx == 47) || (objidx == 50)) {
            menulink = g_wwwsvr + "/" + g_grpurl + "/" + objurl;
		} 
		else if (objidx == 46) {
		    menulink = objurl;
		} 
		else if (objidx == 48) {
		    menulink = objurl;
		}
    }
    else if (objid.substr(0,4) == "XCOM") {
		objidx = parseInt(objid.substr(4,2),10)

		if (objidx == 6) menulink = "JavaScript:goNorazo()";
		else if(objidx == 9) menulink = g_wwwsvr + "/_market/BV/fc2bv.asp";
		else if(objidx == 15) menulink = g_mallsvr + "/AvtMall/AMMain.asp";
	}
	/* ����� �޴� ����
	else if (objid == "KNOU01") {
		menulink = g_wwwsvr + "/_knou/info/info.asp?GrpId=" + g_curgrpid;
	}*/
	else if (objid.substr(0,4) == "GETC") {		//������ �޴�ó��
		objidx = parseInt(objid.substr(4,2),10)
		
		if (objidx == 1) menulink = g_wwwsvr + "/" + objurl + "/";                      //��õĿ�´�Ƽ����Ʈ
		else if (objidx == 3) menulink = "javascript:openSum(\"\",\"" + objurl + "\")"; //������Ʈ
	}

    return menulink;
}

//�޴� & Grouping ��Ÿ����
function DisplayMenuInfo(classnm)
{
	var intShowWidth;
	var strGroupMenu;
	var strMenuName;
	var intCurGroupIndex;
	var intMenuCnt;
	var linkclassnm;
	var intObjseq, strImgHeader;
    var aryTemp, idx, customerStyle, frontStyle, backStyle;
    customerStyle = "";
    frontStyle = "";
    backStyle = "";
	idx = 0;

	if (g_mngpermission) return;

	if (typeof classnm == "undefined") {
		classnm = "mfunc"
		linkclassnm = "mlink"
	} else {
		linkclassnm = classnm
	}

	/**if (g_menuitem != "Y") {DisplayGETCInfo("menu");}
	else {DisplayGETCInfo(classnm);}
	**/
	/**if(!g_canapply && g_leftmenu.indexOf('L03')==-1) {
		document.write('<tr><td align=center><a href="' + g_homesvr + '/ComService/Activity/Invite/CsInviteMailForm.asp?GrpId=' + g_curgrpid + '">');
		(g_leftmenu.indexOf('L03')>-1)? document.write('<img src="'+ g_imgsvr +'/ComMenu/btn_01.gif" width=50 height=20>') : document.write('<img src="'+ g_imgsvr +'/ComMenu/btn1.gif" width=44 height=20>');
		document.write('</a><img src="' + g_imgsvr + '/1by1.gif" width=2><a href="' + g_homesvr + '/ComService/Activity/sum/makesum.asp?grpid=' + g_curgrpid + '">');
		(g_leftmenu.indexOf('L03')>-1)? document.write('<img src="'+ g_imgsvr +'/ComMenu/btn_02.gif" width=90 height=20>') : document.write('<img src="'+ g_imgsvr +'/ComMenu/btn2.gif" width=85 height=20>');
		document.write('</a>');
	}**/

	//������ �ִ��� Ȯ��.. ������ �������� New�� �޾��ֱ� ���ؼ�..  pirpor:start
	for (var i=0;i<g_menuinfo.length;i++) {
		if((g_menuinfo[i][5] == "" || g_menuinfo[i][5] == "N") && g_menuinfo[i][0] == "GCOM09")
			blGCOM09Exist = true;
	}
	//pirpor:end

    var folderonImg, folderoffImg;

	for (var i=0;i<g_menuinfo.length;i++) {
        if (g_menuinfo[i][0] != "GCOM45") {
    		if (g_menuinfo[i][0] == "GSTR") {//�׷�޴�����
    			intObjseq = g_menuinfo[i][1]
    			intCurGroupIndex = g_menuinfo[i][4]-1;
    			intMenuCnt = 0;
    			intShowWidth = 123;
    
    			
                // �޴��׷�
    			if (intObjseq >=0) {
    			    folderonImg = "ico_folder_open.gif";
    			    folderoffImg = "ico_folder.gif";
    			}
    			// ��õ Ŀ�´�Ƽ
    			else if (intObjseq==-1) {
    			    folderonImg = "ico_comm_open.gif";
    		        folderoffImg = "ico_comm.gif";
    			}
    			// �츮 ��Ƽ ��
    			else if(intObjseq==-2) {
    			    folderonImg = "ico_sum_open.gif";
    		        folderoffImg = "ico_sum.gif";
    			}

                // �޴��׷��̰ų� ��õ ��Ƽ�̸�
                if (g_groupinfo[intCurGroupIndex][1] !=0 && g_groupinfo[intCurGroupIndex][3] != "GCOM57") {
//    			if (g_groupinfo[intCurGroupIndex][1] != 0 && g_groupinfo[intCurGroupIndex][3] != "GCOM57") {
/*******    �޴� ��� ���� 1�� 2006-10-27 ����  *******
					if (g_menuinfo[i][5] == "Y") document.writeln("<li class='folder' style='padding:0 0 0 2Px'>");
					else document.writeln("<li class='folderon' style='padding:0 0 0 2Px'>");
    			    // ���� ����    =======
					document.writeln("  <a href=\"Javascript:viewNhide("+ intCurGroupIndex +", '"+ folderoffImg +"');\">");
    				// �޴��׷��̸鼭 �����̸�, �޴������� �ƴϰ� ���� �޴� �� ���̱���(���� �޴��׷��� ����⸦ �� �� ����)
    				if (g_menuinfo[i][5] == "Y") {
    				    document.write("    <img src='"+ g_imgsvr +"/community/common/Menu/"+ folderoffImg +"' Id='menuGroupImg"+ intCurGroupIndex +"'>");
    				}
    			    else document.write("  <img src='"+ g_imgsvr +"/community/common/Menu/"+ folderonImg +"' Id='menuGroupImg"+ intCurGroupIndex +"'>");
					document.writeln("  </a>");
    				// ��Ÿ�� ����
					document.writeln("  <a href=\"Javascript:viewNhide("+ intCurGroupIndex +", '"+ folderoffImg +"');\">");
    				if (g_menuinfo[i][9] != "") {
    				    document.write("<font style='"+ g_menuinfo[i][9] +"' id='grpTitle" + intCurGroupIndex +"'>"+ g_menuinfo[i][2]+"</font>");
    				}
    			    else document.write(g_menuinfo[i][2]);
					document.writeln("  </a>");
                        // �� �� ������ �̹��� ���̱�
                    if (g_groupinfo[intCurGroupIndex][2] == true) {
                        document.write("&nbsp;<img src='" + g_imgsvr + "/community/common/ico_n.gif'>");
                    }
                    // ��ȣ�� ������ ���̱�
                    if (g_menuinfo[i][8] != "") {
                        document.write("&nbsp;<img src='" + g_imgsvr + "/Commenu/Icon/" + g_menuinfo[i][8] + "' border=0>");
                    }
                    // ���� �޴� ǥ�� =======  
    				// Hideyn�� Y�̸�
    				document.write("<ul class='foldercate' Id='onmenuGroup"+ intCurGroupIndex +"'");
					if (g_menuinfo[i][5] == "Y") {
    				    document.write(" style='display:none'>");
    				}
    			    else document.write(" style='display:block'>");
*******/
                    // objid, objseq, funcnm

                    //===   �޴��׷� �Ǵ� ��Ÿ ���� ����    =======
					if (g_menuinfo[i][5] == "N") document.writeln("<li class='folderon'>");
					else document.writeln("<li class='folder'>");

                    // �׷�� div ���� �� ����� ���� �޴� ��Ÿ�� ����
                    if (g_menuinfo[i][9] != "") {
                        document.writeln("  <div id='groupTitle"+ intCurGroupIndex +"' onClick=\"viewNhide("+ intCurGroupIndex +", '"+ folderoffImg +"');\" style='cursor:hand;" + g_menuinfo[i][9] +"'>");
                    }
                    else document.writeln(" <div id='groupTitle"+ intCurGroupIndex +"' onClick=\"viewNhide("+ intCurGroupIndex +", '"+ folderoffImg +"');\" style='cursor:hand;'>");
    
    				// �޴��׷��̸鼭 �����̸�, �޴������� �ƴϰ� ���� �޴� �� ���̱���.(���� �޴��׷��� ����⸦ �� �� ����)
    				if(g_groupinfo[intCurGroupIndex][3] != "GCOM52") {// ��õ��Ƽ�� �ƴϸ�
    				    // �޴��׷� ��ġ��
                        if (g_menuinfo[i][5] != "Y") {
                            document.writeln("     <img src='"+ g_imgsvr +"/community/common/Menu/"+ folderonImg +"' Id='menuGroupImg"+ intCurGroupIndex +"'>");
        				}
        				// �޴��׷� �����
        			    else document.writeln("     <img src='"+ g_imgsvr +"/community/common/Menu/"+ folderoffImg +"' Id='menuGroupImg"+ intCurGroupIndex +"'>");
        			}
        			// ��õ��Ƽ�� ��ġ��
    			    else document.writeln("      <img src='"+ g_imgsvr +"/community/common/Menu/"+ folderonImg +"' Id='menuGroupImg"+ intCurGroupIndex +"'>");

//    				�޴��׷��� ��� ������ ����, ��õ��Ƽ�� ��ġ��(2006-11-03 By SOH)
/*                    if(g_groupinfo[intCurGroupIndex][3] != "GCOM52") {// ��õ��Ƽ�� �ƴϸ�
                        document.writeln("      <img src='"+ g_imgsvr +"/community/common/Menu/"+ folderoffImg +"' Id='menuGroupImg"+ intCurGroupIndex +"'>");
                    }
                    else document.writeln("     <img src='"+ g_imgsvr +"/community/common/Menu/"+ folderonImg +"' Id='menuGroupImg"+ intCurGroupIndex +"'>");
*/
    			    if (g_menuinfo[i][9].length >0) {
                        aryTemp = g_menuinfo[i][9].split("; ");
    
                        for(idx = 0; idx<aryTemp.length; idx++) {
                            aryTemp[idx] = aryTemp[idx].replace(";", "");

                            frontStyle = aryTemp[idx].substring(0, aryTemp[idx].indexOf(":"));
                            backStyle  = aryTemp[idx].substring(aryTemp[idx].indexOf(":")+1);
    
                            customerStyle += "this.style.";
                            if(frontStyle.indexOf("-") >-1) {
                                customerStyle += frontStyle.substring(0,frontStyle.indexOf("-")) + frontStyle.substr(frontStyle.indexOf("-")+1,1).toUpperCase() + frontStyle.substring(frontStyle.indexOf("-")+2) + "='"+ backStyle +"'; ";
                            }
                            else customerStyle += frontStyle + "='"+ backStyle +"'; ";
                        }
                    }
                    else customerStyle = "this.style.textDecoration='none';"
                    document.writeln("          <span onmouseover=\"this.style.textDecoration='underline'\" onmouseout=\""+ customerStyle + "\">"+ g_menuinfo[i][2] +"</span>");

                    // ��ȣ�� ������ ���̱�
                    if (g_menuinfo[i][8] != "") {
                        document.write("&nbsp;<img src='" + g_imgsvr + "/Commenu/Icon/" + g_menuinfo[i][8] + "' border=0>");
                    }
                    // �� �� ������ �̹��� ���̱�
                    if (g_groupinfo[intCurGroupIndex][2] == true) {
                        document.write("&nbsp;<img src='" + g_imgsvr + "/community/common/ico_n.gif'>");
                    }
                    document.writeln("      </div>");    
                    // ���� �޴� ǥ�� =======  
                    // �޴��׷��� ��� ������ ����, ��õ��Ƽ�� ��ġ��(2006-11-03 By SOH)
                    if(g_groupinfo[intCurGroupIndex][3] != "GCOM52") {// ��õ��Ƽ�� �ƴϸ�
        				// Hideyn�� Y�̸�
        				if (g_menuinfo[i][5] == "Y") {
                            document.writeln("  <div id='onmenuGroup" + intCurGroupIndex +"' style=\"display:none;padding:7px 0 0 0\">");
                            document.writeln("      <table cellpadding='0' cellspacing='2' border='0'>");
                        }
                        else {
                            document.writeln("  <div id='onmenuGroup" + intCurGroupIndex +"' style=\"display:block;padding:7px 0 0 0\">");
                            document.writeln("      <table cellpadding='0' cellspacing='2' border='0'>");
                        }
                    }
                    else {
                        document.writeln("  <div id='onmenuGroup" + intCurGroupIndex +"' style=\"display:block;padding:7px 0 0 0\">");
                        document.writeln("      <table cellpadding='0' cellspacing='2' border='0'>");
                    }
                    customerStyle = "";
    			}
                //===   �޴��׷� �Ǵ� ��Ÿ ���� ��  =======
    		}else if(g_menuinfo[i][0] != "GETC03") { //�Ϲݸ޴�
/*******    �޴� ��� ���� 1�� 2006-10-27 ����  *******
    	        // �޴��׷� ���̸�
    			if (g_menuinfo[i][0] == "GEND") {
					//�޴��׷� �ݴ´�
					if ((g_groupinfo[intCurGroupIndex][1] != 0 && g_groupinfo[intCurGroupIndex][3] != "GCOM57")) { 
					document.writeln("</ul>");
					document.writeln("</li>");
					}
    				continue;
    			}
    			if (g_menuinfo[i][5] == "" || g_menuinfo[i][5] == "N") {
    				strMenuName = GetMenuName(intShowWidth, g_menuinfo[i][0], g_menuinfo[i][1], g_menuinfo[i][2], g_menuinfo[i][3], true, linkclassnm, g_menuinfo[i][7], g_menuinfo[i][8], g_menuinfo[i][9]);
    				// �޴��׷� �� ���� �޴� ǥ��
					if ((g_menuinfo[i][4].length > 0) && (strMenuName != "")) {
						document.writeln("<li class='subcate'><a href='" + getUrlperMenu(g_menuinfo[i][0], g_menuinfo[i][7],g_menuinfo[i][1]) + "'>");
        				if (g_menuinfo[i][9] != "") {
        				    document.write("<font style='"+ g_menuinfo[i][9] +"'>" + g_menuinfo[i][2] +"</font></a>");
        				}
        			    else document.write(g_menuinfo[i][2] +"</a>");
        			    // �� �� ������ �̹��� ���̱�
                        if (g_menuinfo[i][3] == "1") {
                            document.write("&nbsp;<img src='" + g_imgsvr + "/community/common/ico_n.gif'>");
                        }
                        // ��ȣ�� ������ ���̱�
                        if (g_menuinfo[i][8] != "") {
                            document.write("&nbsp;<img src='" + g_imgsvr + "/Commenu/Icon/" + g_menuinfo[i][8] + "' border=0>");
                        }
						document.writeln("</li>");       				
    				}
    				else {
    					if (strMenuName != "" && typeof strMenuName != "undefined") {
    					    if (g_menuinfo[i][0] != "GCOM49") {
    					        document.writeln(strMenuName);
    					    }
    					    else if (g_menuinfo[i][0] == "GCOM49") {
    					        DispalyMenuGbn(strMenuName, g_menuinfo[i][2], classnm, g_menuinfo[i][9]);
    					    }
    					}
    				}
    			}
*******/
                // �޴��׷� ���̸�
    			if (g_menuinfo[i][0] == "GEND") {
					//�޴��׷� �ݴ´�
					if ((g_groupinfo[intCurGroupIndex][1] != 0 && g_groupinfo[intCurGroupIndex][3] != "GCOM57")) { 
    					document.writeln("      </table>");
    					document.writeln("	</div>");
    					document.writeln("</li>");
    			    }
    					continue;
		        }
		        // ����޴��� �ƴϸ�
                if (g_menuinfo[i][5] != "Y") {
    				strMenuName = GetMenuName(intShowWidth, g_menuinfo[i][0], g_menuinfo[i][1], g_menuinfo[i][2], g_menuinfo[i][3], true, linkclassnm, g_menuinfo[i][7], g_menuinfo[i][8], g_menuinfo[i][9]);

    				// �޴��׷� �� ���� �޴� ǥ��
					if ((g_menuinfo[i][4].length > 0) && (strMenuName != "")) {
					    document.writeln("<tr>");
					    document.write("  <td style='padding:0 3px 3px 0;'><img src='" + g_imgsvr + "/community/common/white/ico_d01.gif'>");
					    // ����� ���� ��Ÿ�� ����
					    if (g_menuinfo[i][9] != "") {
					        aryTemp = g_menuinfo[i][9].split("; ");

                            for(idx = 0; idx<aryTemp.length; idx++) {
                                aryTemp[idx] = aryTemp[idx].replace(";", "");

                                frontStyle = aryTemp[idx].substring(0, aryTemp[idx].indexOf(":"));
                                backStyle  = aryTemp[idx].substring(aryTemp[idx].indexOf(":")+1);

                                customerStyle += "this.style.";
                                if(frontStyle.indexOf("-") >=0) {
                                    customerStyle += frontStyle.substring(0,frontStyle.indexOf("-")) + frontStyle.substr(frontStyle.indexOf("-")+1,1).toUpperCase() + frontStyle.substring(frontStyle.indexOf("-")+2);
                                }
                                else customerStyle += frontStyle;

                                customerStyle += "='"+ backStyle +"'; ";
                            }

					        document.write("    <a href='"+ getUrlperMenu(g_menuinfo[i][0], g_menuinfo[i][7],g_menuinfo[i][1]) +"' style='"+ g_menuinfo[i][9] +"'><span onmouseover=\"this.style.textDecoration='underline'\" onmouseout=\""+ customerStyle +"\">"+ g_menuinfo[i][2] +"</span></a>");
					    }
					    else document.write("    <a href='"+ getUrlperMenu(g_menuinfo[i][0], g_menuinfo[i][7],g_menuinfo[i][1]) +"'><span onmouseover=\"this.style.textDecoration='underline';\" onmouseout=\"this.style.textDecoration='none';\">"+ g_menuinfo[i][2] +"</span></a>");

                        // ��ȣ�� ������ ���̱�
                        if (g_menuinfo[i][8] != "") {
                            document.write("&nbsp;<img src='" + g_imgsvr + "/Commenu/Icon/" + g_menuinfo[i][8] + "' border=0>");
                        }
        			    // �� �� ������ �̹��� ���̱�
                        if (g_menuinfo[i][3] == "1") {
                            document.write("&nbsp;<img src='" + g_imgsvr + "/community/common/ico_n.gif'>");
                        }

						document.writeln("</tr>");
						customerStyle = "";
    				}
    				else {
    					if (strMenuName != "" && typeof strMenuName != "undefined") {
    					    if (g_menuinfo[i][0] != "GCOM49") {
    					        document.writeln(strMenuName);
    					    }
    					    else if (g_menuinfo[i][0] == "GCOM49") {
    					        DispalyMenuGbn(strMenuName, g_menuinfo[i][2], classnm, g_menuinfo[i][9]);
    					    }
    					}
    				}
    			}
    		}
			/** �츮 ��Ƽ�� �޴� ���� 061011 by tauris
    		// ������Ƽ�̸鼭 �츮 ��Ƽ���̰ų� ������ �޴��̸�
    		else if(g_commtype =="P" && g_menuinfo[i][0] == "GETC03") {
    			if (g_menuinfo[i][5] == "" || g_menuinfo[i][5] == "N") {
    				if (g_menuinfo[i][4] != "") {intShowWidth = 112;}
    				else {intShowWidth = 123;}
    
    				strMenuName = GetMenuName(intShowWidth, g_menuinfo[i][0], g_menuinfo[i][1], g_menuinfo[i][2], g_menuinfo[i][3], true, linkclassnm, g_menuinfo[i][7], g_menuinfo[i][8], g_menuinfo[i][9]);
    				document.writeln(strMenuName);
    			}
    		}
			**/
    	}
    }
}

//����� ���� ������ ��Ÿ����
function DisplayHomeInfo(classnm)
{
	var linkclassnm;

	if (typeof classnm == "undefined") {
		classnm = "mtitle"
		linkclassnm = "mlink"
	} else {
		linkclassnm = classnm
	}

	for (var i=0;i<g_homeinfo.length;i++) {
		document.writeln('<tr height=18><td class="' + classnm + '">&nbsp;<img src="' + g_imgsvr + '/ComMenu/home.gif" border="0" align="texttop" width="12" height="12">&nbsp;<a href="' + g_wwwsvr + '/' + g_grpurl + '/' + g_homeinfo[i][0] + '" class="' + linkclassnm + '">' + g_homeinfo[i][1] + '</a></td></tr>')
	}
}

function GetMngMenuName(spanwidth, objid, objseq, funcnm, isnew, linkclassnm, objimg, objcss)
{
	var objidx;
	var menulink;
	var tailimg;
	var returnval;

	tailimg = ""
	returnval = ""

	if (objid == "GCOM14") {funcnm = "ȸ������"; spanwidth = (spanwidth/2)-12}
	else if (objid == "GCOM54") {funcnm = "Ŀ�´�Ƽĳ��";}

	if ((objid.substr(0,4) == "GCOM") || (objid.substr(0,4) == "GMAN"))  {
		objidx = parseInt(objid.substr(4,2),10)
		switch (objidx) {
			case 14: menulink = g_commsvr + "/ComService/Activity/Address/CsAddrAll.asp?grpid=" + g_curgrpid;menuclass="memberinfo";break; //ȸ�������˻�
			//case 19: menulink = g_homesvr + "/ComService/Activity/MyData/CsActNfoModify.asp?GrpId=" + g_curgrpid;menuclass="memberinfo"; break;  //�ڱ���������
			case 54: menulink = g_homesvr + "/ComService/Management/Manage/CommunityHP/Support/GetPointMaster.asp?grpid=" + g_curgrpid;menuclass="commcash"; break;  //�������Ŀ��ϱ�
			case 56: menulink = g_commsvr + "/ComService/Activity/birthzone/CsBirthZone.asp?grpid=" + g_curgrpid;menuclass="birthday"; break; //������
			default: menulink = ""; break;
		}
		
		if (menulink != "") {
			returnval += "<li class='" + menuclass + "'>"
			
			if ((objidx == "00") && (g_mngnew == "1")) {
				tailimg = "&nbsp;<img src='" + g_imgsvr + "/community/common/ico_n.gif' border=0 align='texttop'>"
			} else {
				if (isnew == "1") {
					if (objidx == "56") tailimg = "&nbsp;<img src='" + g_imgsvr + "/comservice/activity/birthmsg/birth_ico_b.gif' border=0 width=11 height=11 align='texttop'>";
					else tailimg = "&nbsp;<img src='" + g_imgsvr + "/community/common/ico_n.gif' border=0 align='texttop'>";
				}
			}
			returnval += "<a href='" + menulink + "' class='" + linkclassnm + "' style='" + objcss + "' align='texttop'>" + funcnm + "</a>"
			returnval += tailimg
			returnval += "</li>"

		}else{
			//returnval += "<li>"
		}	
		
		if ((objid == "GCOM14")) return returnval;
		else if (returnval != "") return DisplayFreeCommMenu(returnval, spanwidth);
	}
}

//Ŀ�´�Ƽ �����޴� ��Ÿ����
function DisplayGeneralInfo(classnm)
{
	var linkclassnm;
	var strobjinfo;

	if (g_mngpermission)
		return;

	if (typeof classnm == "undefined") {
		classnm = "mtitle"
		linkclassnm = "mlink"
	} else {
		linkclassnm = classnm
	}

	//Ŀ�´�Ƽ ���̺� ���� - js/commitem/commenu.js�� �ű� 20060907 by korean
	/*if ((g_login == true) && (g_freechalon == "2") && (g_menuitem != "Y")) {
		DisplayCommLive("mtitle", "mfunc", "mlink", g_frameheight);
	}*/
	if (g_mngmenuinfo.length > 0) {
		for (var i=0;i<g_mngmenuinfo.length;i++) {
			if (g_mngmenuinfo[i][4] != "Y") {
				if (g_mngmenuinfo[i][0] == "GCOM54" && g_grpcatGbn != "G") {
					document.writeln('<li class="commcash"><a href="' + g_homesvr + '/ComService/Management/Manage/CommunityHP/Support/GetPointMaster.asp?grpid=' + g_curgrpid + '">Ŀ�´�Ƽ ĳ��</a>&nbsp;<img src="' + g_imgsvr + '/community/common/ico_n.gif" border=0 align="texttop"></li>');
				}
				
				strobjinfo = GetMngMenuName(123, g_mngmenuinfo[i][0], g_mngmenuinfo[i][1], g_mngmenuinfo[i][2], g_mngmenuinfo[i][3], linkclassnm, g_mngmenuinfo[i][6], g_mngmenuinfo[i][7]);
				if ((g_mngmenuinfo[i][0] == "GCOM14")) {
					document.write(strobjinfo);
					
				} else {
					
					if ((g_mngmenuinfo[i][0] == "GCOM56"))
					{
						document.write(strobjinfo);
					}
					if ((g_mngmenuinfo[i][0] == "GCOM21"))
					{
						document.writeln('<li class="invite"><a href="' + g_commsvr + '/ComService/CommTextAD/FreeADLogCheck.asp?grpurl=' + g_grpurl + '&logurl=' + g_homesvr + '/ComService/Activity/Invite/CsInviteMailForm.asp?GrpId=' + g_curgrpid + '">�ʴ��ϱ�</a></li>');
					}
					

				}
			}
		}
	} else {
		document.writeln('<li class="birthday"><a href="' + g_commsvr + '/ComService/Activity/birthzone/CsBirthZone.asp?grpid=' + g_curgrpid + '" class="' + linkclassnm + '">��ī��ī!</a></li>');
		if (g_grpcatGbn != "G"){
			document.writeln('<li class="commcash"><a href="' + g_wwwsvr + '/ComService/Management/Manage/CommunityHP/Support/GetPointMaster.asp?grpid=' + g_curgrpid + '" class="' + linkclassnm + '">Ŀ�´�Ƽĳ��</a></li>');
		}
		document.writeln('<li class="invite"><a href="' + g_commsvr + '/ComService/CommTextAD/FreeADLogCheck.asp?grpurl=' + g_grpurl + '&logurl=' + g_homesvr + '/ComService/Activity/Invite/CsInviteMailForm.asp?GrpId=' + g_curgrpid + '">�ʴ��ϱ�</a></li>');
		document.writeln('<li class="memberinfo"><a href="' + g_commsvr + '/ComService/Activity/Address/CsAddrAll.asp?grpid=' + g_curgrpid + '" class="' + linkclassnm + '">ȸ������</a></li>');
	}
}

//Ŀ�´�Ƽ �뷮����
function buyStorage()
{
	if (g_login == true) {
		window.open("/common/storage/CsBuyStoragePrev.asp?grpid="+g_curgrpid+"&returnurl=no", "buyprocess", "fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=500,height=300");
	} else {
		alert("�α����ϼ���.")
		return;
	}
}

//���� �̹��� ��Ÿ����
function DisplayCertifyImage()
{
	var arrCertifyImage = Array("o", "c", "a", "d", "m")
	var arrCertifyLink = Array("CerResultOfficial.asp", "CerResultActivity.asp?ApplyGbn=C", "CerResultActivity.asp?ApplyGbn=A", "CerResultActivity.asp?ApplyGbn=D", "CerResultMania.asp")
	document.write('<div class="fl" style="padding:8px 0px 0px 5px;">');
	if (g_trialyn == "Y") {
		document.write('<a href="' + g_homesvr + '/etc/3thousand/MembershipLounge/JoinInfo.asp" target=_blank><img src="' + g_imgsvr + '/ComMenu/trial.gif" width=81 height=15></a>') // ask ayasiee
	} else {
		for (var i=0;i<g_certinfo.length;i++) {
			if (g_certinfo.substr(i,1) == "Y") {
				document.write('<a href="'+ g_commsvr + '/Certify/' + arrCertifyLink[i] + '" target=_blank><img src="' + g_imgsvr + '/community/common/ico_attest_' + arrCertifyImage[i] + '.gif" border="0" align=absmiddle></a>');
			}
		}
	}
	document.write('</div>')
}

//���� �󼼸޴� ǥ��
function DisplayMngMenu()
{
	var linkclassnm;
	var strObjid = g_objid.substring(0, 4);
	var strMngUrl = g_homesvr + "/ComService/Management";

	if (g_mngpermission == true) {
                          
		document.writeln('<li class="admintitle">�ʱ�ȭ�� ����</li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Menu/HtmlUpload/free_mngsite.asp?grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ �ʱ�ȭ���� �ٹ̰� �����մϴ�.">���� ���ø� ����</a></li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Menu/Color/makeSkin.asp?Grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ ��Ų�� ���콺ȿ�� �������� ����մϴ�.">��Ų/������ ����</a>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/CoverStory/CoverStoryList.asp?GrpId=' + g_curgrpid + '" title="Ŀ�´�Ƽ Ŀ�����丮 �ٹ̰� �����մϴ�.">Ŀ�����丮 ����</a></li>')
//		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Menu/Color/makeMenu.asp?grpid=' + g_curgrpid + '" title="�Խ����� ������ �����մϴ�.">�Խ��� ���� ����</a></li>')
//		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Menu/CommLive/CsCommBGM.asp?Grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ ��������� �����մϴ�.">��� ���� ����</a></li>')
		document.writeln('<li class="categoryBGLine"><!--  --></li>')
		
		document.writeln('<li class="admintitle">Ŀ�´�Ƽ ���� ����</li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Information/GeneralInfo/CsMngBasGeneral.asp?Grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ �̸�, �Ұ���, ���Ģ ���� ������ �����մϴ�.">�⺻ ���� ����</a></li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Manage/Capacity/CsBuyComm.asp?Grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ �뷮 ��� ��Ȳ�� Ȯ���մϴ�.">Ŀ�´�Ƽ �뷮 ����</a></li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Information/Statistics/CsStatisticsList.asp?Grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ �湮�� �� �Խù� Ȱ�� ��� ������ Ȯ���մϴ�.">Ŀ�´�Ƽ ��� ����</a></li>')
		if (g_grpcatGbn != "G") //Ŭ���� ���� ������ �ƴ� �Ϲ� Ŀ�´�Ƽ���� ����
		{
			document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Information/MasterChange/CsMngBasSysop.asp?Grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ �����͸� �ٸ� ȸ������ �����մϴ�.">������ �����ϱ�</a></li>');
			document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Information/CommunityClose/CsMngClose.asp?Grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ�� ����մϴ�.">Ŀ�´�Ƽ ���</a></li>');
		}	
		document.writeln('<li class="categoryBGLine"><!--  --></li>')

		document.writeln('<li class="admintitle">�޴� ��� ����</li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Menu/Setting/CsMngFuncMain.asp?grpid=' + g_curgrpid + '" title="�޴��� �߰�/����/�̸����� �� ���� ������ �ٹ̱� �����մϴ�.">�޴� ����</a></li>')
		document.writeln('<li class="catetitle"><a href="' + g_bbssvr + '/ComService/Activity/delBBS/CsBBSDeleteList.asp?GrpId=' + g_curgrpid + '" title="���� ���ѿ� ���� ������ �Խù��� Ȯ���ϰ� ������ �� �ֽ��ϴ�.">���� �Խù� ����</a></li>')
		//document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Menu/CommLive/CsCommLive.asp?Grpid=' + g_curgrpid + '" title="�ǽð� ����ȸ�� ���� ������ �̿뿩�ο� ���¸� �����մϴ�.">Ŀ�´�Ƽ���̺� ����</a></li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Menu/ADYN/CsADYNMenu.asp?Grpid=' + g_curgrpid + '" title="ȸ�������˻� �޴��� �̿뿩�θ� �����մϴ�.">ȸ������ �˻� ����</a></li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Menu/ADYN/CsBirthYNMenu.asp?Grpid=' + g_curgrpid + '" title="��ī��ī �޴��� �˾� �˸��� �̿뿩�θ� �����մϴ�.">��ī��ī ����</a></li>')
		//document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Information/Mobile/CsMobileMng.asp?Grpid=' + g_curgrpid + '" title="�ڵ������� Ŀ�´�Ƽ �����Ͽ��� ��� �������� �޴� ������ �����մϴ�.">���� ��Ƽ �޴� ����</a></li>')
		document.writeln('<li class="categoryBGLine"><!--  --></li>')
		
        document.writeln('<li class="admintitle">ȸ�� ����</li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Member/ApplyAndModify/CsMngMemList.asp?grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ ȸ��, ���Խ�û��, Ż���� ������ �����մϴ�.">Ŀ�´�Ƽ ȸ�� ����</a></li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Member/Entry/CsMngMemEntMethod.asp?grpid=' + g_curgrpid + '" title="ȸ�����Թ���� �����Է��׸��� �����մϴ�.">���� ��� ����</a></li>')
		document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Member/GroupSend/CsGroupMsg.asp?grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ ȸ������ ��ü ����, ����, ���ڸ޼����� �����ϴ�.">��ü �޼��� ������</a></li>')
		if (g_grpcatGbn != "G") { 
			document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Member/Greeting/CsMngMemGreeting.asp?grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ Ȱ���� �����Ͽ� �ڵ��߼۵Ǵ� �ȳ� ������ �����մϴ�.">�ȳ� ���� ����</a></li>')
		}
		document.writeln('<li class="categoryBGLine"><!--  --></li>')
		
		if (g_grpcatGbn != "G") //Ŭ���� ���� ������ �ƴ� �Ϲ� Ŀ�´�Ƽ���� ����
		{
				document.writeln('<li class="admintitle">���ޱ׷�/�ұ׷�</li>')
				document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Manage/Alliance/Parallel/AlListatusList.asp?Grpid=' + g_curgrpid + '" title="�ٸ� Ŀ�´�Ƽ�� ���޸� ��û�ϰ� ���� ��Ȳ�� �����մϴ�.">���� ����</a></li>')
				document.writeln('<li class="catetitle"><a href="' + strMngUrl + '/Manage/SmallGroup/CsAliSmlMngList.asp?grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ ���� �ұ׷��� ����, ����, �����մϴ�.">�ұ׷� ����</a></li>')
		}
	}
}

// ���� ǥ��
function FormatNumber(nNumber)
{
	var nMod, nDiv, bMinus;
	var strNumber;

	if (nNumber == 0) return "0";
	strNumber = "";

	nDiv = nNumber;
	bMinus = (nDiv < 0);
	if (bMinus) nDiv = -1 * nDiv;

	while (nDiv >= 1000) {
		var tmp;

		nMod = nDiv % 1000;
		nDiv = Math.floor(nDiv / 1000);
		if (strNumber.length > 0) strNumber = "," + strNumber;
		tmp = "000" + nMod;
		strNumber = tmp.substring(tmp.length-3, tmp.length) + strNumber;
	}

	if (nDiv > 0) {
		if (strNumber.length > 0) strNumber = "," + strNumber;
		strNumber = "" + nDiv + strNumber;
	}
	if (bMinus) strNumber = "-" + strNumber;
	return strNumber;
}

//Ŀ�´�Ƽ����
function goNorazo()
{
    var goGame = confirm("���� ���� ���� ������ ���� Ŀ�´�Ƽ ���� ����� �����˴ϴ�.\n�پ��� ������ ���� �� �ִ� ����� Ȩ���� �̵��Ͻðڽ��ϱ�?")

    if (goGame == true) document.location.href = g_norazosvr;
}

//�޴����� Display �ϱ�
function DispalyMenuGbn(str, fnm, classnm, fontcss) {
    //if (g_menuwidth < str.length*15) str = str.substr(0, Number(g_menuwidth)/15);

    if (g_menuitem == "N") {
        if (fnm == "default") document.writeln('<li class="categoryLine"><!--  --></li>');
        else document.writeln('<tr><td align=center class="' + classnm + '" style="' + fontcss + '" vAlign=baseline>' + str + '</td></tr>');


    } else {
        if (fnm != "default") document.writeln('<tr><td height=18 align=center class="' + classnm + '" style="' + fontcss + '" vAlign=baseline>' + str + '</td></tr>');
    }
}

//����Ŀ�´�Ƽ g_menuwidth�� ���缭 �޴��ڸ���
function DisplayFreeCommMenu(str, width) {
	if ((g_commtype == "F") && (g_menuitem == "N")) {
		if (g_menuwidth != 150) width += (g_menuwidth-150);
		//return "<span style='overflow:hidden; width:" + width + ";'>" + str + "</span>";
		return str;
	} else {
		return str;
	}
}

//����Ŀ�´�Ƽ�� �̹�������
function DisplayFreechalAD() {
	document.writeln('<table border=0 cellpadding=0 cellspacing=0 width="100%">');
	document.writeln('<tr><td height=18 style="padding-left:7px"><img src="' + g_imgsvr + '/ComMenu/Advertise/ad_help.gif" width=12 height=12 align=texttop>&nbsp;<a href="' + g_helpsvr + '/HdSearchByCat.asp?lcat=2&mcat=3&scat=1" class="mlink" target="_new">Ŀ�´�Ƽ �����</a></td></tr>');
	document.writeln('<tr><td height=18 style="padding-left:7px"><img src="' + g_imgsvr + '/ComMenu/Advertise/ad_make.gif" width=12 height=12 align=texttop>&nbsp;<a href="' + g_commsvr + '/MakeComm/Default.asp" target="_new" class="mlink" target="_new">Ŀ�´�Ƽ �����</a>&nbsp;<img src="' + g_imgsvr + '/ComMenu/up2.gif" border=0 width=11 height=11 align="texttop"></td></tr>');
	//document.writeln('<tr><td height=18 style="padding-left:7px"><img src="' + g_imgsvr + '/ComMenu/won.gif" width=12 height=12 align=texttop>&nbsp;<a href="' + g_homesvr + '/ComService/Management/PayService/Product/CsPayInformation.asp?grpid='+ g_curgrpid + '" class="mlink">Ŀ�´�Ƽ ���������</a></td></tr>');
	document.writeln('</table>');
}

//�޸��� �˾�����
function openMemo(objseq) {
	var strUrl = g_commsvr + "/ComService/Activity/Memo/CsMemoView.asp?GrpId=" + g_curgrpid + "&ObjSeq=" + objseq;
	var winoption = 'width=640,height=385,fullscreen=no,titlebar=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes';

	window.open(strUrl, 'memowindow', winoption);
}

//Ŀ�´�Ƽ ���̺�
function DisplayCommLive(titleclassnm, funcclassnm, linkclassnm, frameheight) {

	if (g_mngpermission)
		return;

	if (navigator.appName == "Netscape") return;

	var lngDivWidth;
	var strStyle;

	if (g_menuitem  == "Y") {
		lngDivWidth = "97%"
	}

	strStyle = ".commlive_scroll{" & +
			   " scrollbar-arrow-color: #666666; " +
			   " scrollbar-3dlight-color: #666666; " +
			   " scrollbar-highlight-color: #ffffff;" +
			   " scrollbar-face-color: #ebebeb; " +
			   " scrollbar-shadow-color: #666666; " +
			   " scrollbar-track-color: #ffffff;" +
			   " scrollbar-darkshadow-color: #ffffff;" +
			   "}";
	document.writeln("<style type='text/css'>" + strStyle + "</style>");

	//Ŀ�´�Ƽ ���̺� ����
	if ((g_login == true) && (g_freechalon == "2")) {
		document.writeln('<tr><td valign=top class="' + funcclassnm + '">');
		document.writeln('<table border=0 cellpadding=0 cellspacing=0 class="' + funcclassnm + '" width="100%" height="' + frameheight + '">')
		document.writeln('<tr>')
		document.writeln('<td height=24 class="' + titleclassnm + '">&nbsp;<img src="' + g_imgsvr + '/ComMenu/freechalon/member.gif" border=0 width=12 height=12 align="texttop">&nbsp;<font style="font-weight:bold;">����ȸ��(<a id="userCnt" class="' + titleclassnm + '"></a>)</font>')

		if (navigator.appName != "Netscape") {
			document.write('&nbsp;<a ')
			if (g_hidecommlive == true) {
				document.write('href="javascript:SetCookie(\'CommLive\', \'Y\');"><img src="' + g_imgsvr + '/ComMenu/freechalon/down_s.gif"')
			} else {
				document.write('href="javascript:SetCookie(\'CommLive\', \'N\');"><img src="' + g_imgsvr + '/ComMenu/freechalon/up_s.gif"')
			}
			document.write('align="texttop" border=0 width=11 height=10></a>')
		}

		document.writeln('</td>')
		document.writeln('</tr>')
		if (g_hidecommlive != true) {
			document.writeln('<tr><td class="' + funcclassnm + '" align=left valign=top height=63>')
			document.writeln('<div id="FL_userList" class="commlive_scroll" style="width:' + lngDivWidth + ';height:62px;overflow:auto;text-align:left;padding:5px;"></div>');
			document.writeln('</td></tr>')
			document.writeln('<tr><td background="' + g_imgsvr + '/ComMenu/freechalon/bg_dot.gif" height=1></td></tr>')
			document.writeln('<tr>')
			document.write('<td height=20 align=right valign=bottom>')
			if (g_chatmenu == true) {
				document.write('<a href="' + g_playsvr + '/chat/PeCtRoomListComm.asp?grpid=' + g_curgrpid + '" class="' + linkclassnm + '" target="_top"><img src="' + g_imgsvr + '/ComMenu/freechalon/btn_chat.gif" border=0 width=41 height=14 align=absmiddle></a><img src="' + g_imgsvr + '/1by1.gif" border=0 width=3 height=1>')
			}
			document.write('<a href="' + g_homesvr + '/ComService/Management/Menu/CommLive/CsCommLive.asp?Grpid=' + g_curgrpid + '" title="Ŀ�´�Ƽ ���̺� ���� ����"><img src="' + g_imgsvr + '/ComMenu/freechalon/btn_modify.gif" border=0 width=16 height=14 align=absmiddle></a><img src="' + g_imgsvr + '/1by1.gif" border=0 width=3 height=1>');
			document.write('<a href="javascript:HelpPopUp(\'2|5|1|6\');" title="����"><img src="' + g_imgsvr + '/ComMenu/freechalon/btn_qa.gif" border=0 width=16 height=14 align=absmiddle></a><img src="' + g_imgsvr + '/1by1.gif" border=0 width=3 height=1>');
			document.write('</td>')
			document.writeln('</tr>')
			document.writeln('<tr><td height=2></td></tr>')
		}
		document.writeln('</table>')

		document.writeln('</td></tr>');
		if ((g_menuitem != "Y") || ((g_menuitem  == "Y") && (navigator.appName == "Netscape"))) {
			document.writeln('<tr><td class="menu" height=6><img src="' + g_imgsvr + '/1by1.gif" border=0 width=1 height=1></td></tr>');
		} else {
			if (g_menuitem != "Y") document.writeln('<tr><td height=5><img src="' + g_imgsvr + '/1by1.gif" border=0 width=1 height=1></td></tr>');
		}

		if (navigator.appName != "Netscape") {
			g_layername = document.all['FL_userList'];
			g_layerusercnt = document.all['userCnt'];
		}

		makeList(g_userid, g_hname, g_layername, g_layerusercnt, linkclassnm);
	}
}

// ����ç���� �����
function DisplayFreechalLink() {
	if (g_grpcatGbn != "G")
	{
		//document.writeln('		<li><a href="' + g_commsvr + '/Base/AfterBBS/FCCMBBSList.asp?GrpId=0&ObjSeq=44"><img src="' + g_imgsvr + '/community/admin/btn_pr.gif" width="130" height="21" alt="" border="0"></a></li>')
		//document.writeln('		<li><a href="' + g_commsvr + '/certify/CerSubmitForm.asp"><img src="' + g_imgsvr + '/community/admin/btn_certify.gif" width="130" height="21" alt="" border="0"></a></li>')

	}
	document.writeln('		<li><a href="' + g_homesvr + '/Comservice/Management/Manage/MPDS/CsMpdsRequestForm.asp?GrpId=' + g_curgrpid + '"><img src="' + g_imgsvr + '/community/admin/btn_mpds.gif" width="130" height="21" alt="" border="0"></a></li>')
		
	//document.writeln("<tr><td align='center'><a href='" + g_homesvr + "/ComService/Community/anounce/bbs/FcCmBBSList.asp?GrpId=0&ObjSeq=44'><img src='" + g_imgsvr + "/ComMenu/left_btn1.gif' border='0'/></a></td></tr>");
	//document.writeln("<tr><td align='center'><a href='" + g_helpsvr + "'><img src='" + g_imgsvr + "/ComMenu/left_btn2.gif' border='0'/></a></td></tr>");
	//document.writeln("<tr><td align='center'><a href='" + g_commsvr + "/certify/CerSubmitForm.asp'><img src='" + g_imgsvr + "/ComMenu/left_btn3.gif' border='0'/></a></td></tr>");
	//document.writeln("<tr><td align='center'><a href='" + g_homesvr + "/Comservice/Management/Manage/MPDS/CsMpdsRequestForm.asp?GrpId=" + g_curgrpid + "'><img src='" + g_imgsvr + "/ComMenu/left_btn4.gif' border='0'/></a></td></tr>");
}
