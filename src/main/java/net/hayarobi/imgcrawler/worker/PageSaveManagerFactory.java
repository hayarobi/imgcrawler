package net.hayarobi.imgcrawler.worker;

import java.sql.Savepoint;
import java.util.List;

import net.hayarobi.imgcrawler.config.CrawlerConfig.ReloadContentType;
import net.hayarobi.imgcrawler.http.FileDownloader;


public class PageSaveManagerFactory {
//	public static pagesave getListSkipCheck(String reloadCondition) {
//		ReloadContentType type = null;
//		try {
//			type = ReloadContentType.valueOf(reloadCondition);
//		} catch(Exception e ) {
//			type = ReloadContentType.none;
//		}
//		
//		switch( type ) {
//		case attachExist :
//			return new AttachCheckViewSkipChecker();
//		case all :
//			return new ForceViewListSkipChecker();
//		case none :
//		default :
//			return new NormalViewSkipChecker();
//		}
//	}



 
}
