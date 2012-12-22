package net.hayarobi.imgcrawler.db;

/**
 * 새로 저장할 DB에 관한 정보를 저장.
 * @author hayarobi
 *
 */
public class DBSequenceGenerator {
	private long currentIdOffset;
	private long currentThreadOffset;
	private long currentCommentOffset;
	
	public DBSequenceGenerator(long currentIdOffset, long currentThreadOffset, long currentCommentOffset) {
		super();
		this.currentIdOffset = currentIdOffset;
		this.currentThreadOffset = currentThreadOffset;
		this.currentCommentOffset = currentCommentOffset;
	}

	public long nextIdOffset() {
		return currentIdOffset++;
	}

	public long nextThreadOffset() {
		return currentThreadOffset++;
	}

	public long nextCommentOffset() {
		return currentCommentOffset++;
	}

}
