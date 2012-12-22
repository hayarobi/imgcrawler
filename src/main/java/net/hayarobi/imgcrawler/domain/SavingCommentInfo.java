package net.hayarobi.imgcrawler.domain;

import java.util.Date;

/**
 * DB에 저장될 페이지뷰를 위한 정보
 * @author hayarobi
 *
 */
public class SavingCommentInfo {
	private long viewId;
	private long commentid;
	private Date date;
	private long timestamp;
	private String writer;
	private String body;
	
	public SavingCommentInfo() {
		
	}
	
	public long getViewId() {
		return viewId;
	}
	public void setViewId(long viewId) {
		this.viewId = viewId;
	}
	public long getCommentid() {
		return commentid;
	}
	public void setCommentid(long commentid) {
		this.commentid = commentid;
	}
	public long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "CommentInfo-"+viewId+":"+commentid+":"+writer+":"+date;
	}
}
