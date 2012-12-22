package net.hayarobi.imgcrawler.parser;

import net.hayarobi.imgcrawler.domain.PageView;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

public class PDSPageParser extends PageParser {
	
	public PDSPageParser(PageView pageView) {
		super(pageView);
	}

	protected void extractInfoArea(Source source) {
		Element titleView;
		titleView = ParserUtil.getElement(source,"class", "view-info");
		String writerString = ParserUtil.getElement(titleView, "class", "td_writer").getTextExtractor().toString();
		Element hitCountElement = ParserUtil.getElement(titleView,"id","td_hit");
		String hitCount = ParserUtil.getElement(hitCountElement, "class", "num").getTextExtractor().toString();
		pageView.setWriter(writerString);
		pageView.setHitCount(hitCount);
	}

}
