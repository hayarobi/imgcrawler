package net.hayarobi.imgcrawler.parser;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.AttachFileInfo.AttachType;
import net.hayarobi.imgcrawler.util.AlbumImageFilenameUtil;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * @author hayarobi 앨범 게시판의 개별 앨범 페이지의 정보를 추출한다. 기본 정보와 첨부된 사진 정보를 담는다.인자로 넘어온
 *         PageView객체에 정보를 주입한다. 쓰레드세이프 객체다.
 */
public class AlbumPageParser extends PageParser {
	public AlbumPageParser(PageView pageView) {
		super(pageView);
	}
	
	protected void extractTitleArea(Source source) {
		Element titleView =ParserUtil.getElement(source,"class", "view-title");
		String title = ParserUtil.getElement(titleView,"class", "td_title").getTextExtractor().toString();
		String dateString= ParserUtil.getElement(titleView,"class", "td_date").getTextExtractor().toString();
		pageView.setSubject(title);
		pageView.setDatetime(dateString);
	}

	protected void extractInfoArea(Source source) {
		Element titleView;
		titleView = ParserUtil.getElement(source,"class", "view-info");
		String writerString = ParserUtil.getElement(titleView, "class", "td_writer").getTextExtractor().toString();
		Element hitCountElement = ParserUtil.getElement(titleView,"id","td_hit");
		String hitCount = ParserUtil.getElement(hitCountElement, "class", "num").getTextExtractor().toString();
		pageView.setWriter(writerString);
		pageView.setHitCount(hitCount);
	}

	protected Element extractBodyContent(Source source) {
		Element bodyContent = ParserUtil.getElement(source, "id", "view-content");
		String body = bodyContent.toString();
		pageView.setContentBody(body);
		
		return bodyContent;
	}

	protected void parseAttachFiles(PageView pv, Source source, Element bodyContent) {
		final AlbumImageFilenameUtil filenameUtil = AlbumImageFilenameUtil.get();
		// 첨부 이미지 찾아내기
		List<Element> imgLists = bodyContent.getAllElements("name", "fc_comm_photo", false);
		List<AttachFileInfo> afList = new ArrayList<AttachFileInfo>(imgLists.size());
		for (Element imgTag : imgLists) {
			String url = imgTag.getAttributeValue("src");
			// 업로드 이미지가 아님에도 name태그를 잘못 넣어서 이미지가 되는 경우가 있다. 이걸찾아서 없애야한다.
			if( filenameUtil.isAttachImage(url) == false ) {
				continue;
			}
			// 파일명은 urldecode를 해야한다.
			String fileName = filenameUtil.extractFileNameFromAttachUrl(url);
			AttachFileInfo af = new AttachFileInfo(fileName, url);
			afList.add(af);
		}
		pageView.setAttachFileList(afList);
	}

}
