package net.hayarobi.imgcrawler.file;

import java.io.File;

import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.util.StringUtil;

class CrawlerPathManagerImpl implements CrawlerPathManager {
	private File crawlOutputPath;
	private File savingOutputPath;
	private String imgUrlPrefix;
	
	public CrawlerPathManagerImpl(File crawlOutputPath, File savingOutputPath, String imgUrlPrefix) {
		super();
		this.crawlOutputPath = crawlOutputPath;
		this.savingOutputPath = savingOutputPath;
		this.imgUrlPrefix = imgUrlPrefix;
	}

	@Override
	public File getCrawlDirectory() {
		return crawlOutputPath;
	}

	@Override
	public File getCrawlBBSDirectory(BBSMetaInfo meta) {
		return new File(crawlOutputPath,meta.getBBSDirName());
	}

	@Override
	public File getCrawlAttachDirectory(BBSMetaInfo meta, PageView pv) {
		return new File(crawlOutputPath, meta.getBBSDirName()+"/"+pv.getItemId());
	}

	@Override
	public File getSavingDirectory() {
		return savingOutputPath;
	}

	@Override
	public File getSavingAttachDirectory(SavingViewInfo sv) {
		return getSavingAttachDirectory(sv.getPv());
	}

	public File getSavingAttachDirectory(PageView pv) {
		File targetDir = new File(savingOutputPath, getSavingDirString(pv.getDatetime()));
		if (!targetDir.exists()) {
			targetDir.mkdirs();
		}
		return targetDir;
	}

	@Override
	public String getSavingDirString(String datetimeStr) {
		return StringUtil.makeSavingDirString(datetimeStr);
	}

	@Override
	public String getSavingImgUrlPrefix() {
		return imgUrlPrefix;
	}
}
