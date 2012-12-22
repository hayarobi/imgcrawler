package net.hayarobi.imgcrawler.parser;

import java.net.URL;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import junit.framework.Assert;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.MasonTagTypes;
import net.htmlparser.jericho.PHPTagTypes;
import net.htmlparser.jericho.Segment;
import net.htmlparser.jericho.Source;

import org.junit.Ignore;
import org.junit.Test;
@Ignore
public class TestParser {
	@Test
	public void testParse() throws Exception {
		String listUrl = 
				"http://bbs.freechal.com/ComService/Activity/BBS/CsBBSContent.asp?GrpId=%s&ObjSeq=%s&PageNo=1&DocId=%s";
		String sorikidGroupId = "845246";
		String bbsId = "1"; // objSeq
		String docId = "133788808";
		PHPTagTypes.register();
		PHPTagTypes.PHP_SHORT.deregister(); // remove PHP short tags for this example otherwise they override processing instructions
		MasonTagTypes.register();
		String sourceUrlString = String.format(listUrl, sorikidGroupId,bbsId,docId);
		System.out.println(sourceUrlString);
		listUrl.getClass().getResource("/htmls/CsBBSContent_bbsview.html");
		Source source=new Source(listUrl.getClass().getResource("/htmls/CsBBSContent_bbsview.html"));
		
		Element titleView =getElement(source,"class", "view-title");
		String title = getElement(titleView,"class", "td_title").getTextExtractor().toString();
		String dateString= getElement(titleView,"class", "td_date").getTextExtractor().toString();
		
		titleView = getElement(source,"class", "view-info");
		String tokStr = extractWriterInfos(titleView);
		System.out.println(tokStr);

		String writerString = getElement(titleView, "id", "WriterCT").getTextExtractor().toString();
		String body = getElement(source, "id", "DocContent").toString();
		System.out.println(writerString);
		System.out.println(title);
		System.out.println(dateString);
		System.out.println(body);
		
		// 코멘트 영역
		
		
//		for (Element element : elementList) {
//			System.out.println("-------------------------------------------------------------------------------");
//			System.out.println(element.getDebugInfo());
//			if (element.getAttributes()!=null) System.out.println("XHTML StartTag:\n"+element.getStartTag().tidy(true));
//			System.out.println("Source text with content:\n"+element);
//		}
//		System.out.println(source.getCacheDebugInfo());

	}

	private String extractWriterInfos(Element titleView) throws Exception {
		Element writerElement = getElement(titleView, "id", "WriterCT").getFirstElement("span");
		String writerInfoStr = writerElement.getAttributeValue("onClick");
		Pattern pat = Pattern.compile("initMenu\\([^(]*\\)");
		Matcher matcher = pat.matcher(writerInfoStr);
		Assert.assertEquals(true, matcher.find());
		String tokStr =matcher.group().substring(matcher.group().indexOf("("));
		return tokStr;
	}
	
	private Element getElement(Segment source, String attrName, String value) throws Exception {
		Element viewList =source.getFirstElement(attrName, value, true);
		if(viewList==null )
			throw new RuntimeException("invalid html : missing "+attrName+"="+value);
		return viewList;

	}

}
