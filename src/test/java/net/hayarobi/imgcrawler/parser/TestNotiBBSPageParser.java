package net.hayarobi.imgcrawler.parser;

import java.io.InputStream;

import net.hayarobi.imgcrawler.domain.PageView;

import org.junit.Assert;
import org.junit.Test;


// 공지사항은 댓글 및 첨부파일이 없음. 
public class TestNotiBBSPageParser {
	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		NotiBBSPageParser app = new NotiBBSPageParser(pv);
		InputStream is = pv.getClass().getResourceAsStream("/htmls/CsBBSContent_bbsview.html");
		app.setDataInputStream(is);
		app.parsePage();
		
		System.out.println(pv.getWriter());
		System.out.println(pv.getSubject());
		System.out.println(pv.getDatetime());
//		System.out.println(pv.getContentBody());
		Assert.assertEquals("기린", pv.getWriter());
		Assert.assertEquals("3월 아마 공지합니다. 어여 신청해 주세요~", pv.getSubject());
		Assert.assertEquals("2011-03-07 오전 10:01:20", pv.getDatetime());
		
		
	}

}
