package net.hayarobi.imgcrawler.domain;

import java.io.File;

import org.apache.http.Header;

public class FailedAttachFile extends AttachFileInfo {
	private Header[] harr;
	private File filePath;
	public FailedAttachFile(String fileName, String url, Header[] harr, File filePath) {
		super(fileName, url);
		this.harr = harr;
		this.filePath = filePath;
	}
	public Header[] getHarr() {
		return harr;
	}
	public void setHarr(Header[] harr) {
		this.harr = harr;
	}
	public File getFilePath() {
		return filePath;
	}
	public void setFilePath(File filePath) {
		this.filePath = filePath;
	}	
}
