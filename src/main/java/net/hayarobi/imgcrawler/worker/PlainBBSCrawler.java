package net.hayarobi.imgcrawler.worker;

import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.parser.PageParser;
import net.hayarobi.imgcrawler.parser.PlainBBSListParser;
import net.hayarobi.imgcrawler.parser.PlainBBSPageParser;



public class PlainBBSCrawler extends BBSCrawler {
	protected PageParser app;

	public PlainBBSCrawler() {
		super();
	}


	@Override
	protected ListParser createListParser() {
		return new PlainBBSListParser();
	}

	@Override
	protected PageParser getPageParser(PageView pageView) {
		return new PlainBBSPageParser(pageView);
	}

}
