package net.hayarobi.imgcrawler.worker;

import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.parser.PageParser;
import net.hayarobi.imgcrawler.parser.PlainBBSListParser;
import net.hayarobi.imgcrawler.parser.PlainBBSPageParser;
import net.hayarobi.imgcrawler.parser.SoriAlbumListParser;
import net.hayarobi.imgcrawler.parser.SoriAlbumPageParser;

public class SoriAlbumBBSCrawler extends BBSCrawler {
	@Override
	protected ListParser createListParser() {
		return new SoriAlbumListParser();
	}

	@Override
	protected PageParser getPageParser(PageView pageView) {
		return new SoriAlbumPageParser(pageView);
	}
}
