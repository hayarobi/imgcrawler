package net.hayarobi.imgcrawler.parser;

import java.io.InputStream;
import java.util.List;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class SoriAlbumPageParserTest {
	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
	}

	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		InputStream is = pv.getClass().getResourceAsStream("/htmls/soriAlbumView.html");

		PageParser app = new SoriAlbumPageParser(pv);
		app.setDataInputStream(is);
		app.parsePage();
		
		System.out.println(pv.getWriter());
		System.out.println(pv.getSubject());
		System.out.println(pv.getDatetime());
//		System.out.println(pv.getContentBody());
		
		// 첨부이미지
		List<AttachFileInfo> afList = pv.getAttachFileList();
		Assert.assertEquals(6, afList.size());
		Assert.assertEquals("http://album.freechal.com/ComService/Activity/Album/GetImage.asp?grpid=845246&objseq=1&file=2185%5F%BB%E7%C1%F8+001%2Ejpg", afList.get(0).getUrl());
		Assert.assertEquals("2185_사진 001.jpg", afList.get(0).getFileName());
		Assert.assertEquals("2185_사진 022.jpg", afList.get(5).getFileName());
		

		// 코멘트 영역
		Assert.assertEquals(1, pv.getCommentlist().size());
		Comment cmt = pv.getCommentlist().get(0);
		Assert.assertEquals("고양이twin맘",cmt.getCommenter());
		Assert.assertEquals("2011/3/6 23:19", cmt.getDatetime());
	}

}
