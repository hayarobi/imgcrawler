package net.hayarobi.imgcrawler.parser;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import net.hayarobi.imgcrawler.domain.PageView;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Source;

/**
 * 게시판 목록 페이지 html을 입력받아 게시물 번호를 추출한다.
 * @author hayarobi
 *
 */
public abstract class ListParser {

	protected Charset charset = null;
	
	protected InputStream inputStream;
	protected List<PageView> pvList;

	protected String lastThreadId;
	protected int currentStep;
	
	protected boolean hasNextPage = false;

	public ListParser() {
		super();
	}

	public void setCharset(Charset charset) {
		this.charset = charset;
	}

	public String getLastThreadId() {
		return lastThreadId;
	}

	public void setLastThreadId(String currentThreadId) {
		this.lastThreadId = currentThreadId;
	}

	public int getCurrentStep() {
		return currentStep;
	}

	public void setCurrentStep(int currentStep) {
		this.currentStep = currentStep;
	}

	public void setInputStream(InputStream is) {
		this.inputStream = is;
	}

	public boolean isHasNextPage() {
		return hasNextPage;
	}

	public List<PageView> getPvList() {
		return pvList;
	}

	public boolean parseListPage() throws Exception {
		Source source=null;
		if( charset == null )
			source=new Source(inputStream);
		else
			source = new Source(new InputStreamReader(inputStream, charset));
		checkPageError(source);
		
		Element listArea = getListTable(source);
		// 이름이 DocId인 checkBox에서 게시물 아이디를 추출한다.
		List<Element> eleList = getItemElementList(listArea);
		pvList = new ArrayList<PageView>();
		for(Element ele : eleList ) {
			// itemId추출
			String itemId = extractItemId(ele);
			if( isIgnoredItem(itemId) )
				continue;
			PageView pv = new PageView();
			pv.setItemId(itemId);
			int depthCount = extractViewDepth(ele);
			if(depthCount==0) {
				lastThreadId = itemId; 
				currentStep = 0;
			} else {
				currentStep++;
			}
			pv.setThreadId(lastThreadId);
			pv.setStep(currentStep);
			pv.setDepth(depthCount);
			pvList.add(pv);
		}
		// 다음 페이지가 있는지 조사하기.
		checkNextPage(source);
		
		return true;
	}
	
	protected boolean isIgnoredItem(String itemId) {
		return false;
	}

	protected List<Element> getItemElementList(Element listArea) {
		List<Element> eleList = listArea.getAllElements("tr");
		return eleList;
	}

	protected int extractViewDepth(Element ele) {
		List<Element> imgEles = ele.getAllElements("img");
		int depthCount = 0;
		for(Element imgEle : imgEles ) {
			String srcUrl = imgEle.getAttributeValue("src");
			if( srcUrl.endsWith("blank.gif") || srcUrl.endsWith("ico_re.gif") )
				depthCount++;
		}
		return depthCount;
	}

	protected String extractItemId(Element ele) {
		Element checkboxEle = ele.getFirstElement("name", "DocId", true);
		String itemId = checkboxEle.getAttributeValue("value");
		return itemId;
	}

	protected Element getListTable(Source source) {
		Element listDiv = ParserUtil.getElement(source,"id", "BoardTdList");
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

	protected void checkNextPage(Source source) throws Exception {
		Element pageArea = ParserUtil.getElement(source, "id", "Page");
		List<Element> imgsEles = pageArea.getAllElements("img");
		for(Element img : imgsEles ) {
			if( img.getAttributeValue("src").contains("pg_next.gif") ) {
				hasNextPage = true;
				break;
			}
		}
	}


}