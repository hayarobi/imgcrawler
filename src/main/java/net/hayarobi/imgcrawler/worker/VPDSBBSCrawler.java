package net.hayarobi.imgcrawler.worker;

import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.parser.PDSListParser;
import net.hayarobi.imgcrawler.parser.PageParser;
import net.hayarobi.imgcrawler.parser.VPDSPageParser;


/**
 * 아마도 앨범 게시판 정보를 추출할 때 사용할 객체. 쓰레드 세이프가 아니다.
 * 
 * @author hayarobi
 */
public class VPDSBBSCrawler extends BBSCrawler {
	protected PageParser app;

	public VPDSBBSCrawler() {
		super();
	}

	@Override
	protected ListParser createListParser() {
		return new PDSListParser();
	}

	@Override
	protected PageParser getPageParser(PageView pageView) {
		return new VPDSPageParser(pageView);
	}
	
	
}
