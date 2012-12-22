package net.hayarobi.imgcrawler.util;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import net.hayarobi.imgcrawler.cache.ListCacheLoader;
import net.hayarobi.imgcrawler.config.BBSListLoader;
import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.config.CrawlerConfig.SavingDBConfig;
import net.hayarobi.imgcrawler.db.ConnectionManager;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.file.PathManagerFactory;
import net.hayarobi.imgcrawler.http.Loginer;
import net.hayarobi.imgcrawler.loader.FilePageViewLoader;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.saver.BBSFileStorageManager;
import net.hayarobi.imgcrawler.saver.BBSStorageManager;
import net.hayarobi.imgcrawler.worker.BBSCrawler;
import net.hayarobi.imgcrawler.worker.ViewSkipChecker;
import net.hayarobi.imgcrawler.worker.ViewSkipCheckerFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;

/**
 * crawler가 가져온 데이터의 값 무결성을 확인한다. (threadid와 step값 검사)
 * @author hayarobi
 * 
 */
public class SavedDataChecker {
	private static Log log = LogFactory.getLog("Main.class");

	public static void main(String[] args) {
		// 1. 설정 파일을 읽어들이고
		CrawlerConfig.initWithDefaultDirectory();
		// 1-1. DB접속 초기화
		// TODO:
		// 2. DB접속하고
		List<BBSMetaInfo> metalist = loadBBSMetaInfos();
		SavedDataChecker saver = new SavedDataChecker(metalist);
		saver.check();
	}
	
	private CrawlerConfig conf;
	private List<BBSMetaInfo> metalist;
	private CrawlerPathManager  pathManager;
	
	private long currentIdOffset;
	private long currentThreadOffset;
	private long currentCommentOffset;
	

	SavedDataChecker(List<BBSMetaInfo> metalist) {
		super();
		this.metalist = metalist;
		
		conf = CrawlerConfig.getInstance();
		this.pathManager = new PathManagerFactory(conf).createPathManager();
		this.basePath = pathManager.getCrawlDirectory();
	}
	
	void check() {
		try {
			// 2. 데이터 파일을 읽어서
			for (BBSMetaInfo meta : metalist) {
				log.info("checking "+meta.getBBSDirName()+" "+meta.getBbsName());
				checkBBS(meta);
			}
		} finally { 
		}
	}
	
	private static FileFilter filter = new FileFilter() {
		
		@Override
		public boolean accept(File pathname) {
			if( pathname.isDirectory() == true )
				return false;
			if( pathname.getName().endsWith(".txt") == false )
				return false;
			return true;
		}
	};
	private File basePath;
	private void checkBBS(BBSMetaInfo meta) {
		
		BBSStorageManager storageManager = new BBSFileStorageManager(null,meta, pathManager);
		ListCacheLoader loader = storageManager.getLoader();
		// bbs 디렉토리 확인
		File bbsDir = new File(basePath, meta.getBBSDirName());
		for( int pageNum = 1 ; true ; pageNum++ ) {
			if( loader.hasPage(pageNum) == false )
				break;
			if( log.isDebugEnabled() == true ) {
				log.info("checking Page "+pageNum);
			}
			List<PageView> pvList = loader.getItemList(pageNum);
			for(PageView pv : pvList ) {
				if( log.isDebugEnabled() == true ) {
					log.info("checking item "+pv.getItemId()+"("+pv.getThreadId()+"/"+pv.getDepth()+"/"+pv.getStep()+")");
				}
				PageView filePv = loadPageView(bbsDir,pv.getItemId());
				
				if( pv.getThreadId().equals(filePv.getThreadId()) == false 
						|| pv.getDepth() != filePv.getDepth() 
						|| pv.getStep() != filePv.getStep() ) {
					log.warn("different item "+pv.getItemId()+": expected "
							+pv.getThreadId()+"/"+pv.getDepth()+"/"+pv.getStep()
							+ ", actual "+filePv.getThreadId()+"/"+filePv.getDepth()+"/"+filePv.getStep());
				}
			}

		}

	}

	private PageView loadPageView(File dir, String itemId) {
		Reader reader;
		try {
			reader = new InputStreamReader(new FileInputStream(new File(dir, itemId+".txt")),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
		return new FilePageViewLoader(reader).loadPageView();
	}


	private static List<BBSMetaInfo> loadBBSMetaInfos() {
		CrawlerConfig config = CrawlerConfig.getInstance();
		BBSListLoader bbsListLoader = new BBSListLoader(new File(config.get(ConfigItemName.configDir)), 
				config.get(ConfigItemName.communityId));
		return bbsListLoader.loadBBSList();
	}

	private static Map<String, List<BBSMetaInfo>> arrangeBBSMapping() {
		List<BBSMetaInfo> metalist = loadBBSMetaInfos();
		HashMap<String, List<BBSMetaInfo>> mappingMap = new HashMap<String, List<BBSMetaInfo>>(metalist.size());
		for( BBSMetaInfo meta : metalist ) {
			if( meta.hasPortingParameter() == false)
				continue;
			String newBBSId= meta.getPortingParameter();
			if( mappingMap.containsKey(newBBSId) == false ) {
				mappingMap.put(newBBSId, new ArrayList<BBSMetaInfo>());
			}
			mappingMap.get(newBBSId).add(meta);
		}
		return mappingMap;
	}
}
