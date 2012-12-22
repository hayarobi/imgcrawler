package net.hayarobi.imgcrawler.loader;

import net.hayarobi.imgcrawler.domain.PageView;

/**
 * pageview 저장 파일을 읽어 {@link PageView} 객체를 만든다.
 * @author hayarobi
 *
 */
public abstract class PageViewLoader {
	private PageView loadedPv;	
	
	public PageView getLoadedPv() {
		return loadedPv;
	}
	
	public abstract PageView loadPageView();
	
}
