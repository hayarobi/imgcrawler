package net.hayarobi.imgcrawler.cache;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.SortedMap;
import java.util.StringTokenizer;
import java.util.TreeMap;

import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.parser.ListParser;

/**
 * 페이지 리스트 정보를 파일로부터 로드하고 임시로 보관하는 클래스.
 * 
 * @author hayarobi
 *
 */
public class ListCacheLoader {
	private static final String DELIMITER_ITEMINFO = "/";
	private static final String DELIMITER_ITEM = ",";
	private static final String DELIMITER_ITEM_NEXTINDICATOR = ";";
	private SortedMap<Integer, ListParser> listMap = new TreeMap<Integer, ListParser>();;
	private String currentThreadId = "";
	private int currentStep=0;
	
	public ListCacheLoader() {
		super();
	}

	public ListCacheLoader(Properties props) {
		super();
		loadCache(props);
	}

	public String getCurrentThreadId() {
		return currentThreadId;
	}

	public int getCurrentStep() {
		return currentStep;
	}

	public void loadCache(Properties props) {
		listMap.clear();
		// 키를 숫자 순서대로 정렬해서 사용해야한다.
		SortedMap<Integer, String> sortedPageMap = new TreeMap<Integer, String>();
		for(Entry<Object, Object> entry: props.entrySet() ) {
			sortedPageMap.put(Integer.parseInt(entry.getKey().toString()), entry.getValue().toString());
		}
		for(Integer key : sortedPageMap.keySet() ) {
			int pagenum = key;
			String listStr  = sortedPageMap.get(key); 
			StringTokenizer tok = new StringTokenizer(listStr, DELIMITER_ITEM_NEXTINDICATOR);
			String ItemStr = tok.nextToken();
			String hasNextStr = tok.nextToken();
			boolean hasNext =  hasNextStr.equals("1");
			List<PageView> itemIdList = extractItemList(ItemStr);
			listMap.put(pagenum, new StaticListParser(itemIdList, hasNext));
		}

	}
	
	public List<PageView> getItemList(int pageNum) {
		ListParser parser = listMap.get(pageNum);
		if( parser != null )
			return parser.getPvList();
		return null;
	}

	protected List<PageView> extractItemList(String ItemStr) {
		StringTokenizer tok;
		tok = new StringTokenizer(ItemStr,DELIMITER_ITEM);
		List<PageView> pvList = new ArrayList<PageView>();
		while(tok.hasMoreTokens()) {
			String[] itemInf = tok.nextToken().split("["+DELIMITER_ITEMINFO+"]");
			PageView pv = new PageView();
			pv.setItemId(itemInf[0]);
			int step = Integer.parseInt(itemInf[1]);
			pv.setDepth(step);
			if( step == 0 ) {
				currentThreadId = itemInf[0];
				currentStep = 0;
			} else {
				currentStep++;
			}
			
			pv.setThreadId(currentThreadId);
			pv.setStep(currentStep);
			pvList.add(pv);
		}
		return pvList;
	}
	
	public void addListInfo(int pageNum, List<PageView> itemIdList, boolean hasNext) {
		listMap.put(pageNum, new StaticListParser(itemIdList, hasNext));
	}
	
	public int size() {
		return listMap.size();
	}
	
	public boolean hasPage(int pageNum) {
		return listMap.containsKey(pageNum);
	}

	public boolean isHasNextPage(int pageNum) {
		ListParser parser = listMap.get(pageNum);
		if( parser != null )
			return parser.isHasNextPage();
		return false;
	}

	public ListParser getListParser(int pageNum) {
		return listMap.get(pageNum);
	}
	
	public String getPageString(int pageNum ) {
		ListParser parser = listMap.get(pageNum);
		if( parser == null )
			throw new RuntimeException("invalid page "+pageNum);
		return buildPageString(pageNum, parser.getPvList(), parser.isHasNextPage());

	}
	
	/**
	 * 파일로 저장할 페이지 문자열 생성.
	 * @param pagenum
	 * @param idList
	 * @param hasNext
	 * @return
	 */
	public static String buildPageString(int pagenum, List<PageView> idList, boolean hasNext ) {
		StringBuffer buf = new StringBuffer(256); 
		buf.append(pagenum);
		buf.append(":");
		int cnt = idList.size();;
		for(int i=0; i<cnt; i++) {
			if( i>0)
				buf.append(DELIMITER_ITEM);
			PageView pv = idList.get(i);
			buf.append(pv.getItemId());
			buf.append(DELIMITER_ITEMINFO);
			buf.append(pv.getDepth());
		}
		buf.append(DELIMITER_ITEM_NEXTINDICATOR);
		buf.append(hasNext?"1":"0");
		return buf.toString();
	}
	static class StaticListParser extends ListParser {

		protected StaticListParser(List<PageView> itemIdList, boolean hasNext) {
			super();
			this.pvList = itemIdList;
			this.hasNextPage = hasNext;
			PageView lastPage = pvList.get(pvList.size()-1);
			this.lastThreadId = lastPage.getThreadId();
			this.currentStep =  lastPage.getStep();
		}

		@Override
		public boolean parseListPage() throws Exception {
			// TODO do nothing
			return false;
		}

		
	}
}
