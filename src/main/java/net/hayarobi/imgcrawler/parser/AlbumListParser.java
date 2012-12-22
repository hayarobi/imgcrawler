package net.hayarobi.imgcrawler.parser;

import java.util.ArrayList;
import java.util.List;

import net.hayarobi.imgcrawler.domain.PageView;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;


/**
 * @author hayarobi
 * 앨범 게시판 목록을 파싱해 게시물 번호와 다음 페이지 정보 등을 알아낸다.
 * 1회성 객체로 한번만 파싱하는 데 쓰이고, 다른 페이지를 파싱할 경우 새 객체를 만들어 사용하자.
 */
public class AlbumListParser extends ListParser {
	public AlbumListParser() {
		super();
	}

	protected List<Element> getItemElementList(Element listArea) {
		List<Element> eleList = listArea.getAllElements("class","img-txt",true);
		return eleList;
	}
	protected int extractViewDepth(Element ele) {
		// 사진 게시판은 모두 depth가 0
		return 0;
	}

	protected String extractItemId(Element ele) {
		Element checkboxEle = ele.getFirstElement("name", "SeqNo", true);
		String itemId = checkboxEle.getAttributeValue("value");
		return itemId;
	}

	protected Element getListTable(Source source) {
		Element listDiv = ParserUtil.getElement(source,"id", "AlbumTdList");
		List<Element> tableList = listDiv.getAllElements("table");
		Element listTable = null;
		for(Element ele : tableList ) {
			if( "notice-list".equals(ele.getAttributeValue("class")) == false ) {
					listTable = ele;
					break;
			}			
		}
		if( listTable == null)
			throw new RuntimeException("cannot find list area");
				
		return listTable;
	}
}
