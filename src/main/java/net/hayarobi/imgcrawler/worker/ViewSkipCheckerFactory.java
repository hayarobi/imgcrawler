package net.hayarobi.imgcrawler.worker;

import java.sql.Savepoint;
import java.util.List;

import net.hayarobi.imgcrawler.config.CrawlerConfig.ReloadContentType;
import net.hayarobi.imgcrawler.http.FileDownloader;


public class ViewSkipCheckerFactory {
	public static ViewSkipChecker getListSkipChecker(String reloadCondition) {
		ReloadContentType type = null;
		try {
			type = ReloadContentType.valueOf(reloadCondition);
		} catch(Exception e ) {
			type = ReloadContentType.none;
		}
		
		switch( type ) {
		case attachExist :
			return new AttachCheckViewSkipChecker();
		case all :
			return new ForceViewListSkipChecker();
		case none :
		default :
			return new NormalViewSkipChecker();
		}
	}



	/**
	 * 페이지 정보가 있으면 페이지 파싱은 넘어감.
	 * @author hayarobi
	 *
	 */
	private static class NormalViewSkipChecker extends ViewSkipChecker {

		@Override
		public boolean canSkipPage(String itemId, int page) {
			// 이미 파일(혹은 레코드가) 존재하면 스킵
			// 페이지 파일이 있는지 검사.
			if (viewSaveManager.isSavedView(itemId) == false)
				return false;
			return true;
		}

	}


	/**
	 * 페이지가 있더라도 첨부파일이 하나라도 있으면 다시 로드함.
	 * @author hayarobi
	 *
	 */
	private static class AttachCheckViewSkipChecker extends ViewSkipChecker {

		@Override
		public boolean canSkipPage(String itemId, int page) {
			// 페이지 파일이 있는지 검사.
			if (viewSaveManager.isSavedView(itemId) == false)
				return false;
			// 페이지 파일에서 첨부파일이 하나라도 존재하면 false
			if (viewSaveManager.isAttachRegistered(itemId) == false)
				return false;
			return true;
		}

	}
	/**
	 * 무조건 다시 읽기.
	 * @author hayarobi
	 *
	 */
	private static class ForceViewListSkipChecker extends ViewSkipChecker {

		@Override
		public boolean canSkipPage(String itemId, int page) {
			return false;
		}
	}
 
}
