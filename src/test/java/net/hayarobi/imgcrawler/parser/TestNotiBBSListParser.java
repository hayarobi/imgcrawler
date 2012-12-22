package net.hayarobi.imgcrawler.parser;

import java.util.List;

import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.parser.PlainBBSListParser;
import org.junit.Assert;
import org.junit.Test;

public class TestNotiBBSListParser {
	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		//BBSMetaInfo meta =  new BBSMetaInfo(BBSType.bbs, CrawlerConstants.COMUNITY_ID, "18", "조합원·아마활동방");
		
		// 첫번째 페이지 검사.
		ListParser parser = new NotiBBSListParser(); 
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/CsNoticeList.asp.html"));
		Assert.assertTrue(parser.parseListPage());
		
		List<PageView> itemList = parser.getPvList();
		Assert.assertEquals(15, itemList.size());
		Assert.assertEquals("5971219", itemList.get(0).getItemId());
		Assert.assertEquals("5954670", itemList.get(14).getItemId());
	
		Assert.assertEquals(true, parser.isHasNextPage());
		
	}
}
