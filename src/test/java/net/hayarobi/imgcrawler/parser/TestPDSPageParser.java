package net.hayarobi.imgcrawler.parser;

import java.io.InputStream;
import java.util.List;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.PDSPageParser;
import net.hayarobi.imgcrawler.parser.PageParser;
import net.hayarobi.imgcrawler.parser.PlainBBSPageParser;
import net.hayarobi.imgcrawler.worker.PDSBBSCrawler;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

@Ignore("파싱 모듈 바꾸기 전까지는 일단 무")
public class TestPDSPageParser {
	@Test
	public void testParse() throws Exception {
		PageView pv = new PageView();
		PageParser app = new PDSPageParser(pv);
		InputStream is = pv.getClass().getResourceAsStream("/htmls/CsPDSContent_multipdsmulticmt.html");
		app.setDataInputStream(is);
		app.parsePage();
		
		Assert.assertEquals("나무", pv.getWriter());
		Assert.assertEquals("소리나는 주소록 2010년 3월 버전", pv.getSubject());
		Assert.assertEquals("2010-03-30 오후 1:47:45", pv.getDatetime());
		
		// 첨부이미지
		List<AttachFileInfo> afList = pv.getAttachFileList();
		Assert.assertEquals(2, afList.size());
		Assert.assertEquals("http://vdown.freechal.com/ComService/Activity/PDS/CsPDSDownload.asp?GrpId=845246&ObjSeq=1&SeqNo=319&DocId=31264166&FileSize=49664&FileName=re%5F%BC%D2%B8%AE%B3%AA%B4%C2%5F%BE%EE%B8%B0%C0%CC%C1%FD%5F%C1%D6%BC%D2%B7%CF%28v10%5F04%29%2Ehwp", afList.get(0).getUrl());
		Assert.assertEquals("re_소리나는_어린이집_주소록(v10_04).hwp", afList.get(0).getFileName());
		Assert.assertEquals("re_소리나는_어린이집_주소록(v10_04).pdf", afList.get(1).getFileName());
		
		// 이미지 파일이 저장된 페이지 파싱 검사
		pv = new PageView();
		app = new PDSPageParser(pv);
		is = pv.getClass().getResourceAsStream("/htmls/CsPDSContent_withImage.html");
		app.setDataInputStream(is);
		app.parsePage();
		
		Assert.assertEquals("딸기", pv.getWriter());
		Assert.assertEquals("8월소식지", pv.getSubject());
		Assert.assertEquals("2007-08-23 오후 2:04:36", pv.getDatetime());
		
		// 첨부이미지
		afList = pv.getAttachFileList();
		Assert.assertEquals(25, afList.size());
		Assert.assertEquals("http://editor.freechal.com/GetFile.asp?mnf=845246%3FGCOM03%3F4%3F30289559%3F%uB369%uC2E47-1.jpg", afList.get(0).getUrl());
		// 코멘트 영역
		Assert.assertEquals(4, pv.getCommentlist().size());
		Comment cmt = pv.getCommentlist().get(0);
		Assert.assertEquals("딸기",cmt.getCommenter());
		Assert.assertEquals("ㅋㅋㅋ 파일이 커서 안올라갑니다. 줄여서 차후에 올리겠습니다.",cmt.getCommentBody());
		
	}

	
	@Ignore
	@Test
	public void testParsePremiumPDS () throws Exception {
		PageView pv = new PageView();
		PageParser app = new VPDSPageParser(pv);
		InputStream is = pv.getClass().getResourceAsStream("/htmls/VPDSView1.html");
		app.setDataInputStream(is);
		app.parsePage();
		
		Assert.assertEquals("하운아빠", pv.getWriter());
		Assert.assertEquals("맛보기... 2009년 터전의 친구들..", pv.getSubject());
		Assert.assertEquals("2009-11-23 오전 11:11:30", pv.getDatetime());
		Assert.assertEquals("50", pv.getHitCount());
		
		// 첨부파일
		List<AttachFileInfo> afList = pv.getAttachFileList();
		Assert.assertEquals(1, afList.size());
		Assert.assertEquals("http://vdown.freechal.com/ComService/Activity/VPDS/CsMPDSDownload.asp?GrpId=845246&ObjSeq=1&SeqNo=39&DocId=59346&FileSize=19135424&FileName=%BC%D2%B8%AE%B3%AA%B4%C2+2009%B5%BF%BF%B5%BB%F3%2Ewmv", afList.get(0).getUrl());
		Assert.assertEquals("소리나는 2009동영상.wmv", afList.get(0).getFileName());

		// 코멘트 영역
		Assert.assertEquals(4, pv.getCommentlist().size());
		Comment cmt = pv.getCommentlist().get(0);
		Assert.assertEquals("삐삐",cmt.getCommenter());
		Assert.assertEquals("벌써 '해보내기밤' 준비 하셨네요^^ 너무 수고가 많으세요~~ 아이들이 많이 좋아할거에요!! 하운아빠~~고마워요!!",cmt.getCommentBody());
		
		// 두 번째 파일
		
		is = pv.getClass().getResourceAsStream("/htmls/VPDS59299.html");
		app.setDataInputStream(is);
		app.parsePage();
		
		Assert.assertEquals("다람쥐", pv.getWriter());
		Assert.assertEquals("통통방 단체사진이요~", pv.getSubject());
		Assert.assertEquals("2009-11-19 오후 10:55:49", pv.getDatetime());
		Assert.assertEquals("22", pv.getHitCount());
		
		afList = pv.getAttachFileList();
		Assert.assertEquals(5, afList.size());
		Assert.assertEquals("http://vdown.freechal.com/ComService/Activity/VPDS/CsMPDSDownload.asp?GrpId=845246&ObjSeq=1&SeqNo=35&DocId=59299&FileName=/DSC09467%2EJPG", afList.get(0).getUrl());
		Assert.assertEquals("DSC09467.JPG", afList.get(0).getFileName());
		Assert.assertEquals("사진 122.jpg", afList.get(2).getFileName());
		Assert.assertEquals("사진 124.jpg", afList.get(4).getFileName());

		// 코멘트 영역
		Assert.assertEquals(4, pv.getCommentlist().size());
		cmt = pv.getCommentlist().get(0);
		Assert.assertEquals("삐삐",cmt.getCommenter());
		Assert.assertEquals("벌써 '해보내기밤' 준비 하셨네요^^ 너무 수고가 많으세요~~ 아이들이 많이 좋아할거에요!! 하운아빠~~고마워요!!",cmt.getCommentBody());

	}

}
