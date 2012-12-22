package net.hayarobi.imgcrawler.parser;

import java.util.List;

import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.AlbumListParser;
import net.hayarobi.imgcrawler.parser.ListParser;

import org.junit.Assert;
import org.junit.Test;

public class TestAlbumListParser {
	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		
		// 첫번째 페이지 검사.
		ListParser parser = new AlbumListParser();
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/CsPhotoList_pageFirst.html"));
		Assert.assertTrue(parser.parseListPage());
		
		List<PageView> itemList = parser.getPvList();
		Assert.assertEquals(15, itemList.size());
		Assert.assertEquals("2185", itemList.get(0).getItemId());
		Assert.assertEquals("2170", itemList.get(14).getItemId());
	
		Assert.assertEquals(true, parser.isHasNextPage());
		
		// 중간 페이지 검사
		parser = new AlbumListParser();
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/CsPhotoList_page124.html"));
		Assert.assertTrue(parser.parseListPage());
		itemList = parser.getPvList();
		Assert.assertEquals(15, itemList.size());
		Assert.assertEquals("295", itemList.get(0).getItemId());
		Assert.assertEquals("281", itemList.get(14).getItemId());
		Assert.assertEquals(true, parser.isHasNextPage());

		// 마지막 페이지 항목 검사. 갯수는 네 개에 다음 페이지는 없는 것으로 나와야한다.
		parser = new AlbumListParser();
		parser.setInputStream(pv.getClass().getResourceAsStream("/htmls/CsPhotoList_pageLast.html"));
		Assert.assertTrue(parser.parseListPage());
		itemList = parser.getPvList();
		Assert.assertEquals(4, itemList.size());
		Assert.assertEquals("180", itemList.get(0).getItemId());
		Assert.assertEquals("109", itemList.get(3).getItemId());
		Assert.assertEquals(false, parser.isHasNextPage());

	}
}
