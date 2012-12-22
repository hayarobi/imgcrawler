package net.hayarobi.imgcrawler.loader;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import junit.framework.Assert;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;

import org.junit.Test;

public class TestPaveViewLoader {
	private static final String INPUTFILE_DIR = "src/test/resources/crawled/";

	@Test
	public void testLoadFile1() throws Exception {
		File file = new File(INPUTFILE_DIR + "cmtDepth1.txt");
		Reader rd = new InputStreamReader(new FileInputStream(file), "UTF-8");

		FilePageViewLoader loader = new FilePageViewLoader(rd);
		PageView pv = loader.loadPageView();

		Assert.assertEquals("133772322", pv.getItemId());
		Assert.assertEquals("133771309", pv.getThreadId());
		Assert.assertEquals(1, pv.getDepth());
		Assert.assertEquals(1, pv.getStep());
		Assert.assertEquals("은평시민신문에 실린 해보내기밤 글", pv.getSubject());
		Assert.assertEquals("달빛요정", pv.getWriter());
		Assert.assertEquals("2011-01-10 오후 2:45:53", pv.getDatetime());
		Assert.assertEquals("123", pv.getHitCount());
		
		Assert.assertTrue(pv.getContentBody().startsWith("<div id="));
		Assert.assertTrue(pv.getContentBody().endsWith("</div>"));
		
		Assert.assertEquals(2, pv.getCommentlist().size());
		Comment cmt = pv.getCommentlist().get(0);
		Assert.assertEquals("고양이twin맘", cmt.getCommenter());
		Assert.assertEquals("2011-01-10 16:40:57", cmt.getDatetime());
		Assert.assertEquals("즐거운 공연이였죠..그나저나~와우~~ 사진 받으셨네요..일부러 4세 사진으로? ㅋㅋ 잘나온게 사실..얼마 없었죠...^^;;",
				cmt.getCommentBody());
		Assert.assertEquals(0, pv.getAttachFileList().size());
	}
	
	@Test
	public void testLoadFile2() throws Exception {
		File file = new File(INPUTFILE_DIR + "cmtAttachDepth0.txt");
		Reader rd = new InputStreamReader(new FileInputStream(file), "UTF-8");

		FilePageViewLoader loader = new FilePageViewLoader(rd);
		PageView pv = loader.loadPageView();

		Assert.assertEquals("133497745", pv.getItemId());
		Assert.assertEquals("133497745", pv.getThreadId());
		Assert.assertEquals(0, pv.getDepth());
		Assert.assertEquals(0, pv.getStep());
		Assert.assertEquals("사진으로 전하는 보리네 소식...", pv.getSubject());
		Assert.assertEquals("소나무", pv.getWriter());
		Assert.assertEquals("2009-03-20 오후 6:18:24", pv.getDatetime());
		Assert.assertEquals("184", pv.getHitCount());
		
		Assert.assertTrue(pv.getContentBody().startsWith("<div id="));
		Assert.assertTrue(pv.getContentBody().endsWith("</div>"));
		
		Assert.assertEquals(11, pv.getCommentlist().size());
		Comment cmt = pv.getCommentlist().get(10);
		Assert.assertEquals("비행기", cmt.getCommenter());
		Assert.assertEquals("2009-03-23 22:29:36", cmt.getDatetime());
		Assert.assertEquals("소나무~ 커뮤니티에서 뵈니 또 다른 반가움이 있네요~ 보리의 손때가 묻은 책상... "
				+"지윤이가 무척 좋아합니다. 안방에다 갖다 놔서 제가 잘 자리가 없습니다...하하...보리, "
				+"보름달에게도 안부 꼭 전해주세요~ 잘 지내시고 담에 또 뵈요~",
				cmt.getCommentBody());
		Assert.assertEquals(9, pv.getAttachFileList().size());
		AttachFileInfo attach = pv.getAttachFileList().get(8);
		Assert.assertEquals("200701.jpg",attach.getFileName());

	}

}
