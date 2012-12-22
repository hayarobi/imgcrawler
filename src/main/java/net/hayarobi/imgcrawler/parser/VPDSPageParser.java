package net.hayarobi.imgcrawler.parser;

import net.hayarobi.imgcrawler.domain.PageView;

/**
 * 프리미엄자료실 페이지 게시물 내용 파서. 파일 다운로드 경로가 다른 자료실과 다르다.
 * @author hayarobi
 *
 */
public class VPDSPageParser extends PDSPageParser {

	public VPDSPageParser(PageView pageView) {
		super(pageView);
		ATTACHFILE_URL_PREFIX = "http://vdown.freechal.com/ComService/Activity/VPDS/CsMPDSDownload.asp?";
	}

}
