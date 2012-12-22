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
import net.hayarobi.imgcrawler.parser.PDSListParser;
import net.hayarobi.imgcrawler.parser.PlainBBSListParser;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestPDSListParser {
	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
	}

	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		BBSMetaInfo meta = new BBSMetaInfo(BBSType.pds, CrawlerConfig.getInstance().get(ConfigItemName.communityId), "1", "자료실");

		
		// 첫번째 페이지 검사.
		ListParser parser = new PDSListParser(); 
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/CsPDSList.asp.html"));
		Assert.assertTrue(parser.parseListPage());
		
		List<PageView> itemList = parser.getPvList();
		Assert.assertEquals(15, itemList.size());
		Assert.assertEquals("31444523", itemList.get(0).getItemId());
		Assert.assertEquals("31218227", itemList.get(14).getItemId());
	
		Assert.assertEquals(true, parser.isHasNextPage());
		
		// 프리미엄 자료실 페이지 검사
		parser = new PDSListParser();
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/VPDSList1.html"));
		Assert.assertTrue(parser.parseListPage());
		itemList = parser.getPvList();
		Assert.assertEquals(15, itemList.size());
		Assert.assertEquals("65486", itemList.get(0).getItemId());
		Assert.assertEquals("59238", itemList.get(14).getItemId());
		Assert.assertEquals(true, parser.isHasNextPage());

		// 프리미엄 자료실 페이지 2 검사. 갯수는 네 개에 다음 페이지는 없는 것으로 나와야한다.
		parser = new PDSListParser();
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/VPDSList4.html"));
		Assert.assertTrue(parser.parseListPage());
		itemList = parser.getPvList();
		Assert.assertEquals(4, itemList.size());
		Assert.assertEquals("56152", itemList.get(0).getItemId());
		Assert.assertEquals("55410", itemList.get(3).getItemId());
		Assert.assertEquals(false, parser.isHasNextPage());

	}
}
