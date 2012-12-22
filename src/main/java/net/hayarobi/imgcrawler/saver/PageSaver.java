package net.hayarobi.imgcrawler.saver;

import java.util.List;

import org.apache.http.impl.client.DefaultHttpClient;

import net.hayarobi.imgcrawler.domain.PageView;

/**
 * 페이지 저장을 위한 클래스. 세이브 작업을 하기 전에 필요한 파라메터를 입력하고 초기화를 해 주어야한다. 
 * @author hayarobi
 *
 */
public abstract class PageSaver {
	protected DefaultHttpClient hc;
	protected boolean overwrite;
	
	public PageSaver(DefaultHttpClient hc, boolean overwrite) {
		super();
		this.hc = hc;
		this.overwrite = overwrite;
	}

	/**
	 * 페이지를 저장한다. DB에 넣던지 파일로 만들던지 그 때마다 다르다.
	 * @param pv
	 * @return true 저장 성공
	 * @return false 저장을 안 하였음. (이미 파일, 레코드가 존재하던가 하는 이유로)
	 * @throws Exception 저장 실패.
	 */
	public abstract boolean savePageInfo(PageView pv) throws Exception ;
	
	/**
	 * 해당 페이지가 이미 저장이 되어 있는 페이지인지 결과 반환.
	 * @param itemId
	 * @return
	 */
	public abstract boolean isSavedPage(String itemId);

	public abstract List<String> extractAttachFileList(String itemId);


	public void setHc(DefaultHttpClient hc) {
		this.hc = hc;
	}

	public boolean isOverwrite() {
		return overwrite;
	}

	public void setOverwrite(boolean overwrite) {
		this.overwrite = overwrite;
	}
}
