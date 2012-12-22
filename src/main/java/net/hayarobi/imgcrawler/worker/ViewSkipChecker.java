package net.hayarobi.imgcrawler.worker;

import net.hayarobi.imgcrawler.saver.BBSStorageManager;

public abstract class ViewSkipChecker {
	protected BBSStorageManager viewSaveManager;
	
	public void setViewSaveManager(BBSStorageManager viewSaver) {
		this.viewSaveManager = viewSaver;
	}

	public abstract boolean canSkipPage(String itemId, int page);
}
