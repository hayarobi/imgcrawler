package net.hayarobi.imgcrawler.config;

import static net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName.*;

import org.junit.Assert;
import org.junit.Test;

public class TestCrawlerConfig {
	@Test
	public void testConfig() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
		CrawlerConfig conf = CrawlerConfig.getInstance();
		
		Assert.assertEquals("userid", conf.get(userid));
		Assert.assertEquals("password", conf.get(password));
		Assert.assertEquals("sorinaneun", conf.get(communityId));
		Assert.assertEquals("false", conf.get(reloadListCache));
		Assert.assertEquals("attachExist", conf.get(reloadContent));
		Assert.assertEquals("none", conf.get(reloadAttach));
		
		Assert.assertEquals("502", conf.get(bbsId));
	}
}
