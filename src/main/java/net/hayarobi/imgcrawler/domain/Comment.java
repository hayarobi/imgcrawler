package net.hayarobi.imgcrawler.domain;

/**
 * @author hayarobi
 * 게시물에 대한 코멘트 정보
 */
public class Comment {
	private String commenter;
	private String datetime;
	private String commentBody;
	public String getCommenter() {
		return commenter;
	}
	public void setCommenter(String commenter) {
		this.commenter = commenter;
	}
	public String getDatetime() {
		return datetime;
	}
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}
	public String getCommentBody() {
		return commentBody;
	}
	public void setCommentBody(String commentBody) {
		this.commentBody = commentBody;
	}
	
	
}
