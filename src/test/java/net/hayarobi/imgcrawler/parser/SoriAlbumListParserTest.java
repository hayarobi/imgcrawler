package net.hayarobi.imgcrawler.parser;

import java.util.List;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.AlbumListParser;
import net.hayarobi.imgcrawler.parser.ListParser;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class SoriAlbumListParserTest {
	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
	}
	
	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		
		// 첫번째 페이지 검사.
		ListParser parser = new SoriAlbumListParser();
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/soriAlbumList.html"));
		Assert.assertTrue(parser.parseListPage());
		
		List<PageView> itemList = parser.getPvList();
		Assert.assertEquals(20, itemList.size());
		Assert.assertEquals("1042527", itemList.get(0).getItemId());
		Assert.assertEquals("1036921", itemList.get(19).getItemId());
	
		Assert.assertEquals(true, parser.isHasNextPage());
		
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/soriAlbumList_midPage.html"));
		Assert.assertTrue(parser.parseListPage());
		
		itemList = parser.getPvList();
		Assert.assertEquals(4, itemList.size());
		Assert.assertEquals("960934", itemList.get(0).getItemId());
		Assert.assertEquals("942707", itemList.get(3).getItemId());
	
		Assert.assertEquals(false, parser.isHasNextPage());

	}
}
