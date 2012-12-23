package net.hayarobi.imgcrawler.domain;

import net.hayarobi.imgcrawler.worker.AlbumBBSCrawler;
import net.hayarobi.imgcrawler.worker.BBSCrawler;
import net.hayarobi.imgcrawler.worker.NotiBBSCrawler;
import net.hayarobi.imgcrawler.worker.PDSBBSCrawler;
import net.hayarobi.imgcrawler.worker.PlainBBSCrawler;
import net.hayarobi.imgcrawler.worker.VPDSBBSCrawler;

/**
 * @author hayarobi
  * 공지, 일반게시판, 자료실, 사진게시판, EstimBBS(특수 게시판?) 다섯 가지가 파악되었다.
 */
public enum BBSType {
	
	
	// 우왕 여기서 부터 김주현 코딩. 
	soriImg(PlainBBSCrawler.class
			, "http://cafe.gongdong.or.kr/cafe.php?p1=%s&sort=%s&page=%d&startpage=1"
			, "http://cafe.gongdong.or.kr/cafe.php?p1=%s&sort=%s&page=%d&startpage=1&mode=view"
			)
	, noti(NotiBBSCrawler.class
			, "http://community.freechal.com/ComService/Activity/Notice/CsNoticeList.asp?GrpId=%s&ObjSeq=%s&PageNo=%d"
			, "http://community.freechal.com/ComService/Activity/Notice/CsNoticeContent.asp?GrpId=%s&ObjSeq=%s&DocId=%s&PageNo=%d")	
	,bbs(PlainBBSCrawler.class
			,"http://bbs.freechal.com/ComService/Activity/BBS/CsBBSList.asp?GrpId=%s&ObjSeq=%s&PageNo=%d"
			,"http://bbs.freechal.com/ComService/Activity/BBS/CsBBSContent.asp?GrpId=%s&ObjSeq=%s&DocId=%s&PageNo=%d")
	, est(PlainBBSCrawler.class
			,"http://bbs.freechal.com/ComService/Activity/EstimBBS/CsBBSList.asp?GrpId=%s&ObjSeq=%s&PageNo=%d"
			,"http://bbs.freechal.com/ComService/Activity/EstimBBS/CsBBSContent.asp?GrpId=%s&ObjSeq=%s&DocId=%s&PageNo=%d")
			// EstimBBS 라고 나오는데, 추천수가 추가된 듯 하다
	, pds(PDSBBSCrawler.class
			,"http://community.freechal.com/ComService/Activity/PDS/CsPDSList.asp?GrpId=%s&ObjSeq=%s&PageNo=%d"
			,"http://community.freechal.com/ComService/Activity/PDS/CsPDSContent.asp?GrpId=%s&ObjSeq=%s&DocId=%s&PageNo=%d")
	,pic(AlbumBBSCrawler.class,
			"http://community.freechal.com/ComService/Activity/Album/CsPhotoList.asp?GrpId=%s&ObjSeq=%s&PageNo=%d"
			,"http://community.freechal.com/ComService/Activity/Album/CsPhotoView.asp?GrpId=%s&ObjSeq=%s&SeqNo=%s&PageNo=%d")
	, vpds(VPDSBBSCrawler.class
			,"http://community.freechal.com/ComService/Activity/VPDS/CsMPDSList.asp?GrpId=%s&ObjSeq=%s&PageNo=%d"
			,"http://community.freechal.com/ComService/Activity/VPDS/CsMPDSContent.asp?GrpId=%s&ObjSeq=%s&DocId=%s&PageNo=%d")
	;
	
	private final Class<? extends BBSCrawler> crawlerClass;
	private final String listUrl;
	private final String viewUrl; 
 
	private BBSType(Class<? extends BBSCrawler> crawlerClass, String listUrl, String viewUrl) {
		this.crawlerClass = crawlerClass;
		this.listUrl = listUrl;
		this.viewUrl = viewUrl;
	}
	
	public BBSCrawler createCrawler() {
		try {
			BBSCrawler cr = (BBSCrawler)crawlerClass.newInstance();
			return cr;
			
		} catch (Exception e) {
			throw new RuntimeException("Failed to create crawler object", e);
		}
	}

	public String getListUrl() {
		return listUrl;
	}

	public String getViewUrl() {
		return viewUrl;
	}
}
