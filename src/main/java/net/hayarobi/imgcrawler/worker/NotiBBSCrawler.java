package net.hayarobi.imgcrawler.worker;

import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.parser.PageParser;
import net.hayarobi.imgcrawler.parser.PlainBBSListParser;
import net.hayarobi.imgcrawler.parser.PlainBBSPageParser;



public class NotiBBSCrawler extends BBSCrawler {
	protected PageParser app;

	public NotiBBSCrawler() {
		super();
	}


	@Override
	protected ListParser createListParser() {
		// TODO Auto-generated method stub
		return new PlainBBSListParser();
	}

	@Override
	protected PageParser getPageParser(PageView pageView) {
		return new PlainBBSPageParser(pageView);
	}

}
