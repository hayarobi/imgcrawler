package net.hayarobi.imgcrawler;

import java.io.File;
import java.util.List;

import net.hayarobi.imgcrawler.config.BBSListLoader;
import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.http.Loginer;
import net.hayarobi.imgcrawler.saver.BBSFileStorageManager;
import net.hayarobi.imgcrawler.saver.BBSStorageManager;
import net.hayarobi.imgcrawler.saver.FilePageSaver;
import net.hayarobi.imgcrawler.worker.BBSCrawler;
import net.hayarobi.imgcrawler.worker.ViewSkipChecker;
import net.hayarobi.imgcrawler.worker.ViewSkipCheckerFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;

/**
 * @author hayarobi
 * 
 */
public class Main {
	private static final int BBS_RETRY_CNT = 100;
	private static Log log = LogFactory.getLog("Main.class");
	private static CrawlerPathManager pathManager;

	public static void main(String[] args) {
		// 1. 설정 파일을 읽어들이고
		CrawlerConfig.initWithDefaultDirectory();
		// 2. 로그인을 한다.
		DefaultHttpClient hc = crateHttpClient();
		loginCommunity(hc);
		// 3. 크롤링을 한다.
		try {
			List<BBSMetaInfo> metalist = loadBBSMetaInfos();
			for (BBSMetaInfo meta : metalist) {
				log.info("Crawling "+meta.getBBSDirName()+" "+meta.getBbsName());
				int retrycnt = 0;
				while(true) {
				try {
				crawlBBS(hc, meta);
				break;
				} catch(RuntimeException e) {
					if( retrycnt++ > 20 ) 
						throw e;
					log.error("Error crawling BBS "+meta.getBbsName()+"("+meta.getBBSDirName()+") "+e+"\ntry to retry after 100 seconds "+retrycnt+"th attempt");
					try { Thread.sleep(100000); } catch (InterruptedException ignore) {}
				}
				}
			}
		} finally { 
			// 4. 마무리 작업
			hc.getConnectionManager().shutdown();
		}
	}

	protected static void crawlBBS(DefaultHttpClient hc, BBSMetaInfo meta) {
		int retrycnt = 0;
		while (retrycnt < BBS_RETRY_CNT)
			try {
				BBSStorageManager storageManager = new BBSFileStorageManager(hc,meta, pathManager);
				BBSCrawler crawler = meta.getCrawler();
				crawler.setHc(hc);
				crawler.setStorageManager(storageManager);
				ViewSkipChecker skipChecker=ViewSkipCheckerFactory.getListSkipChecker("none");
				skipChecker.setViewSaveManager(storageManager);
				crawler.setSkipChecker(skipChecker);
				crawler.setStartingPage(1);
				
				crawler.crawl();
				
				break;
			} catch (NullPointerException e) {
				throw e;
			} catch (RuntimeException e) {
				if (e.getMessage().endsWith("HTTP/1.1 500 Server Error") == false)
					throw e;
				else {
					log.warn(e);
				}
				System.out.println("retry crawling bbs type " + meta.getBBSDirName());
				retrycnt++;
				try {
					Thread.sleep(10000);
				} catch (Exception ignore) {
				}
			}
	}

	protected static List<BBSMetaInfo> loadBBSMetaInfos() {
		CrawlerConfig config = CrawlerConfig.getInstance();
		BBSListLoader bbsListLoader = new BBSListLoader(new File(config.get(ConfigItemName.configDir)), 
				config.get(ConfigItemName.communityId));
		return bbsListLoader.loadBBSList();
	}

	protected static void loginCommunity(DefaultHttpClient hc) {
		new Loginer().login(hc, CrawlerConfig.getInstance().get(ConfigItemName.userid)
				, CrawlerConfig.getInstance().get(ConfigItemName.password));
	}

	protected static DefaultHttpClient crateHttpClient() {
		DefaultHttpClient hc = new DefaultHttpClient();
		HttpParams httpParams = hc.getParams();
		HttpConnectionParams.setConnectionTimeout(httpParams, 10000);
		HttpConnectionParams.setSoTimeout(httpParams, 10000);
		return hc;
	}
}
