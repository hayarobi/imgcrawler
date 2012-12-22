package net.hayarobi.imgcrawler.parser;



/**
 * @author hayarobi
 * 앨범 게시판 목록을 파싱해 게시물 번호와 다음 페이지 정보 등을 알아낸다.
 * 1회성 객체로 한번만 파싱하는 데 쓰이고, 다른 페이지를 파싱할 경우 새 객체를 만들어 사용하자.
 */
public class PlainBBSListParser extends ListParser {
	public PlainBBSListParser() {
		super();
	}
}
