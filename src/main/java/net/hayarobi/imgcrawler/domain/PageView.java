package net.hayarobi.imgcrawler.domain;

import java.util.List;
import java.io.FileWriter;

/**
 * @author hayarobi
 * 게시물 본문의 정보. 이 정보를 DB에 저장하든, 파일로 떨구든 알아서 하자.
 * 
 * 
 * 
 * 
 * 제목: 제목을 문자로 저장합니다.
작성자: 별명
시각: 2011년 3월 11일 16:10:15
본문: [[!!**
<div …>
**!!]]
코멘트:
\나는새\2011-03-07 15:44:54\3월 19일 토요아마 가능한가요? 가능하면 저도 올려주세요. 그리고 4월 1일 아마 신청합니다
\고양이twin맘\2011/3/6 23:19\^^ 진심으로 고양이도 리현이와 은호 생일 많이 많이 축하했었어~~^^ 귀연 넘들(이요)...ㅋㅋㅋ




 */
public class PageView {
	private String pageUri;
	private String itemId;
	private String threadId; 
	private int depth=0;
	private int step=0;
	
	private String writer;
	private String datetime;
	private String subject;
	private String contentBody;
	private String fileName;
	
	private String hitCount;
	private List<Comment> commentlist;
	private List<AttachFileInfo> attachFileList;
	
	
	/**********************************************
	 * 여기서부터는 상수 
	 **********************************************/

	public PageView(String itemId, int depth) {
		super();
		this.itemId = itemId;
		this.depth = depth;
	}
	
	public PageView() {
		this(null, 0);
	}

	public String getThreadId() {
		return threadId;
	}

	public void setThreadId(String refererId) {
		this.threadId = refererId;
	}

	public int getDepth() {
		return depth;
	}

	public void setDepth(int depth) {
		this.depth = depth;
	}

	public String getHitCount() {
		return hitCount;
	}

	public void setHitCount(String hitCount) {
		this.hitCount = hitCount;
	}
	
	public String getPageUri() {
		return pageUri;
	}

	public void setPageUri(String pageUri) {
		this.pageUri = pageUri;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public String getDatetime() {
		return datetime;
	}

	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContentBody() {
		return contentBody;
	}

	public void setContentBody(String contentBody) {
		this.contentBody = contentBody;
	}
	public void setFileName(String fileName){
		this.fileName = fileName;
	}
	
	public String getFileName(){
		return fileName;
	}

	public List<Comment> getCommentlist() {
		return commentlist;
	}

	public void setCommentlist(List<Comment> commentlist) {
		this.commentlist = commentlist;
	}

	public List<AttachFileInfo> getAttachFileList() {
		return attachFileList;
	}

	public void setAttachFileList(List<AttachFileInfo> attachFileList) {
		this.attachFileList = attachFileList;
	}

	public int getStep() {
		return step;
	}

	public void setStep(int step) {
		this.step = step;
	}
	
}
