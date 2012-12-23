package net.hayarobi.imgcrawler.parser;

import static net.hayarobi.imgcrawler.util.CrawlerUtil.utf8;

import java.util.HashSet;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;


/**
 * @author hayarobi
 * 앨범 게시판 목록을 파싱해 게시물 번호와 다음 페이지 정보 등을 알아낸다.
 * 1회성 객체로 한번만 파싱하는 데 쓰이고, 다른 페이지를 파싱할 경우 새 객체를 만들어 사용하자.
 */
public class SoriAlbumListParser extends ListParser {
	private int startNumber = 0;
	private int endNumber = Integer.MAX_VALUE;
	private int currentNumber;
	private CrawlerConfig conf = null;
	
	HashSet<Integer> itemNumberSet = new HashSet<Integer>();
	public SoriAlbumListParser() {
		super();
		setCharset(utf8);
		conf = CrawlerConfig.getInstance();
		startNumber = Integer.parseInt(conf.get(ConfigItemName.crawlStartNumber));
		String endNumbStr = conf.get(ConfigItemName.crawlEndNumber);
		if( endNumbStr!= null && endNumbStr.isEmpty() == false )
			endNumber = Integer.parseInt(endNumbStr);
	}
	
	static Pattern linkPat = Pattern.compile(".+mode=view"); 

	protected List<Element> getItemElementList(Element listArea) {
		List<Element> eleList = listArea.getAllElements("href",linkPat);
		// TODO: 중복제거 필요.
		return eleList;
	}
	protected int extractViewDepth(Element ele) {
		// 사진 게시판은 모두 depth가 0
		return 0;
	}

	static Pattern pat = Pattern.compile("&number=([0-9]+)"); 
	protected String extractItemId(Element ele) {
		String href = ele.getAttributeValue("href");
		Matcher mat = pat.matcher(href);
		if( !mat.find() ) {
			throw new RuntimeException("Can't find item number from url "+href);
		}
		String numString = mat.group();
		String[] arr = numString.split("=");
		return arr[1];
	}

	
	@Override
	protected boolean isIgnoredItem(String itemId) {
		currentNumber = Integer.parseInt(itemId);
		if( currentNumber >= startNumber && currentNumber <= endNumber ) {
			if(itemNumberSet.contains(currentNumber) == false ) {
				itemNumberSet.add(currentNumber);
				return false;
			}
		}
		return true;
	}

	protected Element getListTable(Source source) {
		Element listDiv = ParserUtil.getElement(source,"id", "board-content");
	
		return listDiv;
	}
	
	protected void checkNextPage(Source source) throws Exception {
		if( currentNumber < startNumber ) {
			hasNextPage = false;
			return;
		} 
		hasNextPage = true;
//		Element pageArea = ParserUtil.getElement(source, "height", "30");
//		List<Element> imgsEles = pageArea.get;
//		for(Element img : imgsEles ) {
//			if( img.getAttributeValue("src").contains("pg_next.gif") ) {
//				hasNextPage = true;
//				break;
//			}
//		}
	}

}
