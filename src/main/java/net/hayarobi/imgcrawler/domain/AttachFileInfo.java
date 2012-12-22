package net.hayarobi.imgcrawler.domain;

/**
 * @author hayarobi
 * 첨부파일에 대한 정보를 담고 있는 클래스. 여기 있는 url로 요청을 해서 들어오는 데이터를 fileName의 이름으로 저장하면 된다.
 */
public class AttachFileInfo {
	public static enum AttachType {
		file, img
	}
	private AttachType attachType = AttachType.file; 
	private String fileName;
	private String url;
	public AttachFileInfo(String fileName, String url) {
		super();
		this.fileName = fileName;
		this.url = url;
	}
	public String getFileName() {
		return fileName;
	}
	public String getUrl() {
		return url;
	}
	public AttachType getAttachType() {
		return attachType;
	}
	public void setAttachType(AttachType attachType) {
		this.attachType = attachType;
	}
}
