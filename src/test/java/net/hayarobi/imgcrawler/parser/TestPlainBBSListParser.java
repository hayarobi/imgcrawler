package net.hayarobi.imgcrawler.parser;

import java.util.List;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;
import net.hayarobi.imgcrawler.domain.CrawlerConstants;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.AlbumListParser;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.parser.PlainBBSListParser;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestPlainBBSListParser {
	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
	}

	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		BBSMetaInfo meta =  new BBSMetaInfo(BBSType.bbs, CrawlerConfig.getInstance().get(ConfigItemName.communityId), "18", "조합원·아마활동방");
		
		// 첫번째 페이지 검사.
		ListParser parser = new PlainBBSListParser(); 
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/CsBBSList.asp.html"));
		Assert.assertTrue(parser.parseListPage());
		
		List<PageView> itemList = parser.getPvList();
		Assert.assertEquals(15, itemList.size());
		Assert.assertEquals("133787438", itemList.get(0).getItemId());
		Assert.assertEquals("133774062", itemList.get(14).getItemId());
	
		Assert.assertEquals(true, parser.isHasNextPage());
		
		// estbbs 페이지 검사
		parser = new PlainBBSListParser();
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/CsEstimBBSList.asp.html"));
		Assert.assertTrue(parser.parseListPage());
		itemList = parser.getPvList();
		Assert.assertEquals(15, itemList.size());
		Assert.assertEquals("6647508", itemList.get(0).getItemId());
		Assert.assertEquals("6640067", itemList.get(14).getItemId());
		Assert.assertEquals(true, parser.isHasNextPage());

		// 마지막 페이지 항목 검사. 갯수는 네 개에 다음 페이지는 없는 것으로 나와야한다.
		parser = new PlainBBSListParser();
		parser.setLastThreadId("76523000");
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/PlainBBSList_withDeepReply.html"));
		Assert.assertTrue(parser.parseListPage());
		itemList = parser.getPvList();
		Assert.assertEquals(15, itemList.size());
		PageView item = itemList.get(0);
		Assert.assertEquals("76523084", item.getItemId());
		Assert.assertEquals("76523000", item.getThreadId());
		Assert.assertEquals(2, item.getDepth());
		item = itemList.get(1);
		Assert.assertEquals("76539653", item.getItemId());
		Assert.assertEquals("76523000", item.getThreadId());
		Assert.assertEquals(2, item.getDepth());
		item = itemList.get(14);
		Assert.assertEquals("76536918", item.getItemId());
		Assert.assertEquals("75999095", item.getThreadId());
		Assert.assertEquals(1, item.getDepth());

		Assert.assertEquals(true, parser.isHasNextPage());

	}
}
