package net.hayarobi.imgcrawler.domain;

import net.hayarobi.imgcrawler.worker.BBSCrawler;

/**
 * @author hayarobi
 * 게시판의 메타 정보와 (그 정보로부터 추출이 가능한) 목록과 게시물의 url주소를 가져올 수 있다.
 */
public class BBSMetaInfo {
	private final String communityId;
	private final String bbsName;
	private final BBSType type;
	private final String objSeq;
	
	private final String dirName;
	/** 
	 * 게시판의 추가 정보. 재주껏 사용하자. ex) 새로 옮길 커뮤니티의 게시판 아이디 등...
	 */
	private String portingParameter;

	public BBSMetaInfo(BBSType type, String communityId, String objSeq, String bbsName) {
		super();
		this.type = type;
		this.objSeq = objSeq;
		this.bbsName = bbsName;
		this.communityId = communityId;
		this.dirName = type.name()+objSeq; 
	}
	
	public BBSCrawler getCrawler() {
		BBSCrawler crawler = type.createCrawler();
		crawler.setMeta(this);
		return crawler;
	}
	
	public String getListUrl(int pagenum) {
		return String.format(type.getListUrl(), communityId, objSeq, pagenum);
	}
	
	public String getViewUrl(String itemId, int pagenum) {
		return String.format(type.getViewUrl(), communityId, objSeq, itemId, pagenum);
	}

	public String getBBSDirName() {
		return dirName;
	}

	public String getObjSeq() {
		return objSeq;
	}

	public String getBbsName() {
		return bbsName;
	}

	public boolean hasPortingParameter() {
		return portingParameter != null;
	}
	public String getPortingParameter() {
		return portingParameter;
	}

	public void setPortingParameter(String portingParameter) {
		this.portingParameter = portingParameter;
	}

	public BBSType getBBSType() {
		return type;
	}

}
