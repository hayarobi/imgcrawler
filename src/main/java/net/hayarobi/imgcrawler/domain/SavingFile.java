package net.hayarobi.imgcrawler.domain;

public class SavingFile {
	private long size;
	private String filename;
	private String fileUrl;
	public SavingFile(String filename, long size) {
		super();
		this.filename = filename;
		this.size = size;
	}
	public String getFilename() {
		return filename;
	}
	public String getFileUrl() {
		return fileUrl;
	}
	public void setFileUrl(String contextPath) {
		this.fileUrl = contextPath;
	}
	public long getSize() {
		return size;
	}
	
	
}
