package net.hayarobi.imgcrawler.worker;


public class ListSkipCheckerFactory {
	public static ListSkipChecker getListSkipCheck(String reloadCondition) {
		if( Boolean.parseBoolean(reloadCondition) == true ) {
			return new ForceRefreshListSkipChecker();
		} else {
			return new NormalListSkipChecker();
		}
		
	}



	private static class NormalListSkipChecker extends ListSkipChecker {
		@Override
		public boolean canSkipList(int page) {
			if( bbsCrawler.loader.hasPage(page) == true )
				return true;
			return false;
		}

	}

	/**
	 * 무조건 다시 읽기.
	 * @author hayarobi
	 *
	 */
	private static class ForceRefreshListSkipChecker extends ListSkipChecker {

		@Override
		public boolean canSkipList(int page) {
			return false;
		}
	}
 
}
