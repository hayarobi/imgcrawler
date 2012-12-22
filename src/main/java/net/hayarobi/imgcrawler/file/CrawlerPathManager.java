package net.hayarobi.imgcrawler.file;

import java.io.File;

import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;

/**
 * 디렉토리 가져오는 것은 이걸로 해결
 * @author hayarobi
 *
 */
public interface CrawlerPathManager {
	/**
	 * 크롤링한 결과물을 저장하는 디렉토리 
	 * @return
	 */
	public File getCrawlDirectory();
	/**
	 * 크롤링한 게시판 정보 저장하는 디렉토리
	 * @param meta
	 * @return
	 */
	public File getCrawlBBSDirectory(BBSMetaInfo meta);
	/**
	 * 첨부파일 위치 디렉토리
	 * @param meta
	 * @param pv
	 * @return
	 */
	public File getCrawlAttachDirectory(BBSMetaInfo meta, PageView pv);
	
	/**
	 * db저장할 때 첨부파일이 저장될 기반 디렉토리
	 * @return
	 */
	public File getSavingDirectory();
	/**
	 * 게시물의 첨부파일이 실제로 저장될 디렉토리
	 * @param sv
	 * @return
	 */
	public File getSavingAttachDirectory(SavingViewInfo sv);
	
	public File getSavingAttachDirectory(PageView pv);
	public abstract String getSavingDirString(String datetimeStr);

	public String getSavingImgUrlPrefix();
}
