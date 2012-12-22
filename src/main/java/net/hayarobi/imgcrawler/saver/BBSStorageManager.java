package net.hayarobi.imgcrawler.saver;

import java.io.File;

import net.hayarobi.imgcrawler.cache.ListCacheLoader;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.http.FileDownloader;
import net.hayarobi.imgcrawler.parser.ListParser;

/**
 * 크롤링한 것을 저장하는 저장소를 관리한다.
 * @author hayarobi
 *
 */
public interface BBSStorageManager {
	public ListCacheLoader getLoader();
	
	public PageSaver getViewPageSaver(PageView pv);
	public FileDownloader getAttachSaver(PageView pv);

	public File getPagePath();
	
	/**
	 * 사전 검사용. 해당 리스트 페이지를 이미 저장했는지 조사.
	 * @param page
	 * @return
	 */
	public abstract boolean isSavedList(int page);
	/**
	 * 사전 검사용. 해당 게시물 페이지를 이미 저장했는지 조사.
	 * @param page
	 * @return
	 */
	public abstract boolean isSavedView(String itemId);	
	/**
	 * 사전 검사용. 해당 게시물 페이지에 첨부파일이 등록되어 있는지 조사한다. 실제 파일이 저장되었는지는 확인하지 않는다.
	 * 게시물 페이지가 미리 저장되어 있지 않은 경우면 당연히 첨부파일 유무도 알 수 없다. 이럴 때는 false를 반환한다.
	 * 실제 파일 존재 여부는 신경쓰지 않는다.
	 * @param page
	 * @return
	 */
	public abstract boolean isAttachRegistered(String itemId);

	public abstract void saveListInfo(int page, ListParser listParser);
}
