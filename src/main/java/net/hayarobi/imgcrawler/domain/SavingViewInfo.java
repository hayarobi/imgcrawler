package net.hayarobi.imgcrawler.domain;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * DB에 저장될 페이지뷰를 위한 정보
 * @author hayarobi
 *
 */
public class SavingViewInfo {
	private final BBSMetaInfo oldBBS;
	private String newBBSId;
	
	private final PageView pv;
	private long id;
	private long threadId;
	private Date date;
	private long timestamp;
	private String modifiedBody;  
	private Map<String, SavingFile> savingFileMap;
	private List<SavingCommentInfo> savingCommentList;
	
	public SavingViewInfo(BBSMetaInfo oldBBS, PageView pv) {
		super();
		this.oldBBS = oldBBS;
		this.pv = pv;
	}
	
	public BBSMetaInfo getOldBBS() {
		return oldBBS;
	}

	public String getNewBBSId() {
		return newBBSId;
	}

	public void setNewBBSId(String newBBSId) {
		this.newBBSId = newBBSId;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getThreadId() {
		return threadId;
	}
	public void setThreadId(long threadId) {
		this.threadId = threadId;
	}
	
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}
	public PageView getPv() {
		return pv;
	}

	public Map<String, SavingFile> getSavingFileMap() {
		return savingFileMap;
	}

	public void setSavingFileMap(Map<String, SavingFile> savingFileMap) {
		this.savingFileMap = savingFileMap;
	}

	public String getModifiedBody() {
		return modifiedBody;
	}

	public void setModifiedBody(String modifiedBody) {
		this.modifiedBody = modifiedBody;
	}

	public List<SavingCommentInfo> getSavingCommentList() {
		return savingCommentList;
	}

	public void setSavingCommentList(List<SavingCommentInfo> savingCommentList) {
		this.savingCommentList = savingCommentList;
	}

	@Override
	public String toString() {
		String svBase = "SavingView-"+id+":"+threadId+":";
		if( pv == null ) {
			return svBase+"(null PV)";
		} else {
			return svBase + pv.getStep()+":"+pv.getWriter()+":"+pv.getSubject()+":"+pv.getDatetime();
		}
	}
	
}
