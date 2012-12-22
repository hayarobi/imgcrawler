package net.hayarobi.imgcrawler.parser;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.AttachFileInfo.AttachType;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.util.AttachImageFilenameUtil;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

/**
 * 페이지를 파싱해서 {@link PageView}객체를 생성하는 클래스를 위한 공통 인터페이스. 
 * 구현에서는 재사용 가능하고, 쓰레드세이프를 보장해야한다.
 * @author hayarobi
 *
 */
public abstract class PageParser {
	private static Log log = LogFactory.getLog(PageParser.class);
	
	protected String ATTACHFILE_URL_PREFIX = "http://vdown.freechal.com/ComService/Activity/PDS/CsPDSDownload.asp?";
	protected InputStream viewHtmlStream;
	protected PageView pageView;

	public PageParser(PageView pageView) {
		super();
		this.pageView = pageView;
	}

	public void setDataInputStream(InputStream inputStream) {
		this.viewHtmlStream = inputStream;
	}

	public void setPageView(PageView pageView) {
		this.pageView = pageView;
	}

	public void parsePage() throws Exception 
	{
		Source source=new Source(viewHtmlStream);
		checkPageError(source);

		extractTitleArea(source);
		extractInfoArea(source);
		
		Element bodyContent = extractBodyContent(source);
		
		// 첨부파일, 첨부 이미지 정보 채우기
		parseAttachFiles(pageView, source, bodyContent);

		// 코멘트
		Element commentTable = source.getFirstElement("class", "CommentList", true);
		pageView.setCommentlist(extractCommentList(commentTable));
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
		String writerString = ParserUtil.getElement(titleView, "id", "WriterCT").getTextExtractor().toString();
		Element hitCountElement = ParserUtil.getElement(titleView,"id","td_hit");
		String hitCount = ParserUtil.getElement(hitCountElement, "class", "num").getTextExtractor().toString();
		pageView.setWriter(writerString);
		pageView.setHitCount(hitCount);
	}

	protected Element extractBodyContent(Source source) {
		Element bodyContent = ParserUtil.getElement(source, "id", "DocContent");
		String body = bodyContent.toString();
		pageView.setContentBody(body);
		return bodyContent;
	}
	
	/**
	 * 프리챌에서 페이지 로딩 에러가 났는지 확인
	 * @param source
	 */
	protected void checkPageError(Source source) {
		Element titleEle = source.getFirstElement("title");
		if( titleEle.getTextExtractor().toString().equals("잠시 사용하실 수 없습니다.") ) {
			throw new PageUnavailableStatusException("PageLoadError");
		}
	}
	
	protected List<Comment> extractCommentList(Element commentTable) {
		if (commentTable == null) {
			return new ArrayList<Comment>();
		}
		List<Element> comments = commentTable.getAllElements("tr");
		int cmtSize = comments.size();
		List<Comment> cmtList = new ArrayList<Comment>(cmtSize);
		for (int i = 0; i < comments.size(); i++) {
			Element el = comments.get(i);

			Element nicnameEl = el.getFirstElementByClass("nicname");
			Element cmtxtEl = el.getFirstElementByClass("cmtxt");
			Element datetimeEl = cmtxtEl.getFirstElementByClass("day");

			String commenter = nicnameEl.getTextExtractor().toString();// 댓글작성자
			String datetime = datetimeEl.getTextExtractor().toString();// 댓글작성시간.
			String commentBody = cmtxtEl.getTextExtractor().toString();// 댓글내용
			int dateindex = commentBody.lastIndexOf(datetime);
			if (dateindex > 0) {
				commentBody = commentBody.substring(0, dateindex).trim();
			}
			Comment cmt = new Comment();
			cmt.setCommenter(commenter);
			cmt.setDatetime(datetime);
			cmt.setCommentBody(commentBody);
			cmtList.add(cmt);
		}
		return cmtList;
	}

	protected void parseAttachFiles(PageView pv, Source source, Element bodyContent) {
		Element attachEle = source.getFirstElement("class", "attachments_file", false);
		// 첨부파일이 이미지이거나 엑셀파일 등일 경우 별도 다운로드가 없이 화면에 렌더링된 html로 뿌려질 수 있다.
		// 이런 경우 attachmets_file 부분이 없기도 하기 때문에 그 부분은 제외시킨다.
		List<AttachFileInfo> afList = new ArrayList<AttachFileInfo>();
		if (attachEle != null) {
			Element attachListEle = attachEle.getFirstElement("ul");
			List<Element> attList = attachListEle.getAllElements("li");
			for (Element imgTag : attList) {
				Element aTag = imgTag.getFirstElement("a");
				String url = aTag.getAttributeValue("href");
				// 업로드 파일이 아님에도 name태그를 잘못 넣어서 이미지가 되는 경우가 있다. 이걸찾아서 없애야한다.
				if (url.startsWith(ATTACHFILE_URL_PREFIX) == false)
					continue;
				// 파일명은 urldecode를 해야한다.
				String fileName = aTag.getTextExtractor().toString();
				AttachFileInfo af = new AttachFileInfo(fileName, url);
				afList.add(af);
			}
		}
		// 이미지 첨부 파일은 img중에서 찾아온다.
		final AttachImageFilenameUtil filenameUtil = AttachImageFilenameUtil.get();
		List<Element> imgLists = bodyContent.getAllElements("img");
		for (Element imgTag : imgLists) {			
			String url = imgTag.getAttributeValue("src");
			if( filenameUtil.isAttachImage(url) == false )
				continue;
			// 파일명은 urldecode를 해야한다.
			String fileName = filenameUtil.extractFileNameFromAttachUrl(url);
			AttachFileInfo af = new AttachFileInfo(fileName, url);
			af.setAttachType(AttachType.img);
			afList.add(af);
		}
		pv.setAttachFileList(afList);
	}

}