package net.hayarobi.imgcrawler.worker;

import net.hayarobi.imgcrawler.cache.ListCacheLoader;

/**
 * 크롤러가 크롤링중에 페이지 목록을 로딩할 필요가 있는지 검사하는 클래스
 * @author hayarobi
 *
 */
public abstract class ListSkipChecker {
	protected BBSCrawler bbsCrawler;
	protected ListCacheLoader listCacheLoader;
	
 	public void setBBSCrawler(BBSCrawler bbsCrawler) {
		this.bbsCrawler = bbsCrawler;
	}
	
	public abstract boolean canSkipList(int page);
}
