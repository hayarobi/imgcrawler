package net.hayarobi.imgcrawler.saver;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Properties;

import org.apache.http.client.HttpClient;

import net.hayarobi.imgcrawler.cache.ListCacheLoader;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.CrawlerConstants;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.http.FileDownloader;
import net.hayarobi.imgcrawler.parser.ListParser;

public class BBSFileStorageManager implements BBSStorageManager {
	private ListCacheLoader listLoader = null;

	private BBSMetaInfo meta;

	private File listCacheFile;

	private File pagePath;
	
	private CrawlerPathManager pathManager;
	
	public BBSFileStorageManager(HttpClient hc, BBSMetaInfo meta, CrawlerPathManager pathManager) {
		super();
		this.meta = meta;
		this.pathManager = pathManager;
		
		pagePath = new File(pathManager.getCrawlDirectory(),meta.getBBSDirName());
		if (pagePath.exists() == false)
			pagePath.mkdirs();
		initListCache();
	}

	public void setListLoader(ListCacheLoader listLoader) {
		this.listLoader = listLoader;
	}

	@Override
	public File getPagePath() {
		return pagePath;
	}

	@Override
	public ListCacheLoader getLoader() {
		return listLoader;
	}

	@Override
	public PageSaver getViewPageSaver(PageView pv) {
		FilePageSaver saver = new FilePageSaver(null, pagePath, true);	// TODO Auto-generated method stub
		return saver;
	}

	@Override
	public FileDownloader getAttachSaver(PageView pv) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isSavedList(int page) {
		return listLoader.hasPage(page);
	}

	@Override
	public boolean isSavedView(String itemId) {
		// TODO: 다른 곳에 있는 것을 찾아오자.
		File saveFile = new File(pagePath, itemId + ".txt");
		if (saveFile.exists()) {
			return true;
		}
		// 
		return false;
	}

	@Override
	public boolean isAttachRegistered(String itemId) {
		// 첨부파일 등록된 페이지 파일이 존재하는지 여부 반환 
		return false;
	}

	@Override
	public void saveListInfo(int page, ListParser listParser) {
		listLoader.addListInfo(page, listParser.getPvList(), listParser.isHasNextPage());
		FileWriter out =  null;
		try {
		    out = new FileWriter(listCacheFile, true);
		    out.write(listLoader.getPageString(page));
		    out.write("\n");
		} catch(IOException e) {
			// 그냥 넘어간다.
		} finally {
			if( out != null)
				try { out.close(); } catch (IOException ignore) {}			
		}

	}
	protected void initListCache() {
		try {
			listCacheFile = new File(pathManager.getCrawlDirectory() + meta.getBBSDirName()
					+ CrawlerConstants.CACHE_FILE_SUFFIX);
			FileReader in = new FileReader(listCacheFile);
			Properties properties = new Properties();
			properties.load(in);
			in.close();
			
			listLoader = new ListCacheLoader(properties);
		} catch (IOException e) {
			// 에러나면 캐시 없음.
			listLoader = new ListCacheLoader();
		}
	}

}
