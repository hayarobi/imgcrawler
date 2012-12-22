package net.hayarobi.imgcrawler.parser;

import java.io.InputStream;

import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.PlainBBSPageParser;

import org.junit.Assert;
import org.junit.Test;

public class TestPlainBBSPageParser {
	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		InputStream is = pv.getClass().getResourceAsStream("/htmls/CsBBSContent_bbsview.html");
		PageParser app = new PlainBBSPageParser(pv);
		app.setDataInputStream(is);
		app.parsePage();
		
		Assert.assertEquals("기린", pv.getWriter());
		Assert.assertEquals("3월 아마 공지합니다. 어여 신청해 주세요~", pv.getSubject());
		Assert.assertEquals("2011-03-07 오전 10:01:20", pv.getDatetime());
		Assert.assertEquals("62", pv.getHitCount());

		// 코멘트 영역
		Assert.assertEquals(6, pv.getCommentlist().size());
		Comment cmt = pv.getCommentlist().get(0);
		Assert.assertEquals("나비",cmt.getCommenter());
		Assert.assertEquals("2011-03-07 15:10:52", cmt.getDatetime());
		Assert.assertEquals("3월 19일 토요아마 신청해요~",cmt.getCommentBody());
		cmt = pv.getCommentlist().get(5);
		Assert.assertEquals("나는새",cmt.getCommenter());
		Assert.assertEquals("2011-03-10 12:36:10", cmt.getDatetime());
		Assert.assertEquals("4월 1일 아마 덩실방 신청합니다. 토요아마는 이미 사전 신청자가 있었군요.....",cmt.getCommentBody());
		
	}

	@Test
	public void testParsingEstBBS() throws Exception {
		PageView pv = new PageView();
		InputStream is = pv.getClass().getResourceAsStream("/htmls/CsEstimBBSContent.asp.html");
		PageParser app = new PlainBBSPageParser(pv);
		app.setDataInputStream(is);
		app.parsePage();
		
		Assert.assertEquals("사과", pv.getWriter());
		Assert.assertEquals("11월 정기 이사회 보고(11.2)", pv.getSubject());
		Assert.assertEquals("2010-11-04 오전 10:53:54", pv.getDatetime());
		Assert.assertEquals("121", pv.getHitCount());

		// 코멘트 영역
		Assert.assertEquals(7, pv.getCommentlist().size());
		Comment cmt = pv.getCommentlist().get(0);
		Assert.assertEquals("반짝별",cmt.getCommenter());
		Assert.assertEquals("2010-11-04 14:51:27", cmt.getDatetime());
		Assert.assertEquals("김장배추 공급이 금요일 이전은 어렵다하여 금, 토 김장합니다. 금요일 배추 다듬기, 양념준비, 절이기, 뒤집기 팀, 토요일 버무리기 팀.........그리고 보쌈과 막걸리 먹기 팀(터전 식구 누구나^^) 많이많이 놀러오세요",cmt.getCommentBody());
		cmt = pv.getCommentlist().get(6);
		Assert.assertEquals("달빛요정",cmt.getCommenter());
		Assert.assertEquals("2010-11-09 18:15:07", cmt.getDatetime());
		Assert.assertEquals("호호호 보니깐 다 알겠네요 요즘 댓글놀이 하다보니 가족끼리 너무 암말도 안하는구나 느끼는 1인입니다 홍보소위 일은 저한테도 좀 알려주셔요~",cmt.getCommentBody());
		
	}

}
