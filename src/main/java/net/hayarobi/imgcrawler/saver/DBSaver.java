package net.hayarobi.imgcrawler.saver;

import java.io.File;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import net.hayarobi.imgcrawler.config.BBSListLoader;
import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.config.CrawlerConfig.SavingDBConfig;
import net.hayarobi.imgcrawler.db.ConnectionManager;
import net.hayarobi.imgcrawler.db.DBSequenceGenerator;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.file.PathManagerFactory;
import net.hayarobi.imgcrawler.http.Loginer;
import net.hayarobi.imgcrawler.worker.BBSCrawler;
import net.hayarobi.imgcrawler.worker.ViewSkipChecker;
import net.hayarobi.imgcrawler.worker.ViewSkipCheckerFactory;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;

/**
 * crawler가 가져온 데이터를 바탕으로 값을 DB에 저장한다.
 * @author hayarobi
 * 
 */
public class DBSaver {
	private static Log log = LogFactory.getLog("Main.class");

	public static void main(String[] args) {
		// 1. 설정 파일을 읽어들이고
		CrawlerConfig.initWithDefaultDirectory();
		// 1-1. DB접속 초기화
		// TODO:
		// 2. DB접속하고
		Connection conn = ConnectionManager.connect();
		Map<String, List<BBSMetaInfo>> map = arrangeBBSMapping();
		DBSaver saver = new DBSaver(conn, map);
		saver.save();
	}
	
	private CrawlerConfig conf;
	private Connection conn ;
	private Map<String, List<BBSMetaInfo>> map;
	
	private DBSequenceGenerator sequenceGen;
	private CrawlerPathManager pathManager;

	DBSaver(Connection conn, Map<String, List<BBSMetaInfo>> map) {
		super();
		this.conn = conn;
		this.map = map;

		conf = CrawlerConfig.getInstance();
		this.sequenceGen = new DBSequenceGenerator(Long.parseLong(conf.get(SavingDBConfig.idOffset)), Long.parseLong(conf
				.get(SavingDBConfig.groupNumOffset)), Long.parseLong(conf.get(SavingDBConfig.commentIdOffset)));
		this.pathManager = new PathManagerFactory(conf).createPathManager();
	}

	void save() {
		try {
			// 2. 데이터 파일을 읽어서
			// 3. DB에 저장한다.
			for (Entry<String,List<BBSMetaInfo>> metaEntry : map.entrySet() ) {
				String metaNames = getMetaNames(metaEntry);
				log.info("saving datas to new BBS "+metaEntry.getKey()+":"+metaNames);
				saveBBS(metaEntry.getKey(), metaEntry.getValue());
			}
			conn.commit();
		} catch (SQLException e) {
			log.error(e.getMessage(), e);
			try {
				conn.rollback();
			} catch (SQLException ignore) {}
		} finally { 
			// 4. 마무리 작업
			try {
				conn.close();
			} catch (SQLException ignore) {}
		}
	}
	
	private String getMetaNames(Entry<String, List<BBSMetaInfo>> metaEntry) {
		String metaNames = "";
		for( BBSMetaInfo meta : metaEntry.getValue() ) {
			metaNames += meta.getBbsName()+"("+meta.getBBSDirName()+"), ";					
		}
		metaNames = metaNames.substring(0, metaNames.length()-2);
		return metaNames;
	}

	private void saveBBS(String newBBSId, List<BBSMetaInfo> metaList) {
		// 각 메타 정보별로 저장
		DBBBSSaver bbsSaver = new DBBBSSaver(sequenceGen, new SavingViewFactory(), conn, newBBSId, metaList, pathManager);
		bbsSaver.setNewBBSId(newBBSId);
		try {
			bbsSaver.saveBBS();
		} catch (SQLException e) {
			throw new RuntimeException("DB Save error:"+e.getMessage(), e);
		}
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
