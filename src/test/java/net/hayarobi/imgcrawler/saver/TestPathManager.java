package net.hayarobi.imgcrawler.saver;

import java.io.File;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.file.PathManagerFactory;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

public class TestPathManager {
	private static final String TEST_PVITEM_ID = "110111";

	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");		
	}
	
	@Test
	public void testPathManager() {
		CrawlerPathManager pm = new PathManagerFactory(CrawlerConfig.getInstance()).createPathManager();
		
		Assert.assertEquals("outs", pm.getCrawlDirectory().getName());
		Assert.assertEquals("attaches", pm.getSavingDirectory().getName());
		
		BBSMetaInfo meta = new BBSMetaInfo(BBSType.bbs, CrawlerConfig.getInstance().get(ConfigItemName.communityId), "4", "같이읽는날적이");
		PageView pv = new PageView(TEST_PVITEM_ID, 0);
		pv.setDatetime("2011-03-07 오전 10:01:20");
		File bbsDir = new File("src/test/resources/crawled/outs",meta.getBBSDirName());
		Assert.assertEquals(bbsDir, pm.getCrawlBBSDirectory(meta));
		File pvDir = new File(bbsDir,pv.getItemId());
		Assert.assertEquals(pvDir, pm.getCrawlAttachDirectory(meta, pv));
		
		SavingViewInfo sv = new SavingViewFactory().savingviewFromPageView(meta, pv);
		File savingAttachDir = new File(pm.getSavingDirectory(),"2011/03/07");
		Assert.assertEquals(savingAttachDir, pm.getSavingAttachDirectory(sv));
	}
}
