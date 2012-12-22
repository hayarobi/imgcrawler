package net.hayarobi.imgcrawler.config;

import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.config.CrawlerConfig.SavingDBConfig;

import org.junit.Assert;
import org.junit.Test;

public class TestCrawlerConfig {
	@Test
	public void testConfig() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
		CrawlerConfig conf = CrawlerConfig.getInstance();
		Assert.assertEquals("userid", conf.get(ConfigItemName.userid));
		Assert.assertEquals("passwd", conf.get(ConfigItemName.password));
		Assert.assertEquals("123456", conf.get(ConfigItemName.communityId));
		Assert.assertEquals("false", conf.get(ConfigItemName.reloadListCache));
		Assert.assertEquals("attachExist", conf.get(ConfigItemName.reloadContent));
		Assert.assertEquals("none", conf.get(ConfigItemName.reloadAttach));
		
		Assert.assertEquals("kelly7513", conf.get(SavingDBConfig.writerId));
	}
}
