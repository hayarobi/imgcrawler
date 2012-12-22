package net.hayarobi.imgcrawler.file;

import java.io.File;
import java.io.IOException;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.config.CrawlerConfig.SavingDBConfig;

public class PathManagerFactory {
	private CrawlerConfig conf;
	
	public PathManagerFactory(CrawlerConfig conf) {
		super();
		this.conf = conf;
	}

	public CrawlerPathManager createPathManager() {
		try {
			File file;
			file = directoryOf(ConfigItemName.crawlOutput);
			File file2 = directoryOf(ConfigItemName.savingOutput);
			String imgUrlPrefix = conf.get(SavingDBConfig.imgUrlPrefix);
			CrawlerPathManager pm = new CrawlerPathManagerImpl(file, file2, imgUrlPrefix);
			return pm;
		} catch (IOException e) {
			throw new RuntimeException("error while creating path Manager:"+e.getMessage(), e);
		}
	}

	private File directoryOf(ConfigItemName confItem) throws IOException {
		String outPath = conf.get(confItem);
		File file = new File(outPath);
		if( file.exists() == false )
			file.mkdirs();
		if( file.isDirectory() == false) {
			throw new RuntimeException("Invalid "+confItem.name()+" Directory: "+file.getCanonicalPath()+" is not a directory");
		}
		return file;
	}
}
