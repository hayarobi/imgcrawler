package net.hayarobi.imgcrawler.worker;

import java.util.List;

import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.http.FileDownloader;
import net.hayarobi.imgcrawler.parser.AlbumListParser;
import net.hayarobi.imgcrawler.parser.AlbumPageParser;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.parser.PDSListParser;
import net.hayarobi.imgcrawler.parser.PDSPageParser;
import net.hayarobi.imgcrawler.parser.PageParser;


/**
 * 아마도 앨범 게시판 정보를 추출할 때 사용할 객체. 쓰레드 세이프가 아니다.
 * 
 * @author hayarobi
 */
public class PDSBBSCrawler extends BBSCrawler {
	protected PageParser app;

	public PDSBBSCrawler() {
		super();
	}

	@Override
	protected ListParser createListParser() {
		return new PDSListParser();
	}

	@Override
	protected PageParser getPageParser(PageView pageView) {
		return new PDSPageParser(pageView);
	}
	
	
}
