package net.hayarobi.imgcrawler.saver;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import net.hayarobi.imgcrawler.cache.ListCacheLoader;
import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;
import net.hayarobi.imgcrawler.domain.CrawlerConstants;
import net.hayarobi.imgcrawler.domain.PageView;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

@Ignore
public class TestListCacheSaver {
	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
	}
	
	@Ignore
	@Test
	public void testLoadPage() throws IOException {
		BBSMetaInfo meta = new BBSMetaInfo(BBSType.bbs, CrawlerConfig.getInstance().get(ConfigItemName.communityId), "4", "같이읽는날적이");
		File cachefile = new File("src/test/resources/" + meta.getBBSDirName()+CrawlerConstants.CACHE_FILE_SUFFIX);
		BufferedReader rd = new BufferedReader(new FileReader(cachefile) );
		Properties properties = new Properties();
		properties.load(rd);
		Assert.assertEquals(20, properties.size());
		List<PageView> p2List = new ArrayList<PageView>();
		p2List.add(new PageView("888",0));
		p2List.add(new PageView("887",0));
		p2List.add(new PageView("876",0));
		p2List.add(new PageView("832",0));
		p2List.add(new PageView("811",0));

		ListCacheLoader loader = new ListCacheLoader(properties);
		Assert.assertTrue(loader.hasPage(1));
		Assert.assertTrue(loader.isHasNextPage(1));
		List<PageView> itemIdList = loader.getListParser(2).getPvList();
		Assert.assertEquals(p2List, itemIdList);
		Assert.assertTrue(loader.hasPage(3));
		Assert.assertFalse(loader.isHasNextPage(3));
		Assert.assertFalse(loader.hasPage(4));
		
		loader.getPageString(3);
	}
	
	@Test
	public void testSavePage() throws IOException {
		BBSMetaInfo meta = new BBSMetaInfo(BBSType.bbs, CrawlerConfig.getInstance().get(ConfigItemName.communityId), "4", "같이읽는날적이");
		File cachefile = new File("outs/" + meta.getBBSDirName()+CrawlerConstants.CACHE_FILE_SUFFIX);
		File newFile  =  new File("outs/test_" + meta.getBBSDirName()+CrawlerConstants.CACHE_FILE_SUFFIX);
	    FileReader in = new FileReader(cachefile);
	    FileWriter out = new FileWriter(newFile, false);
	    int c;
	    while ((c = in.read()) != -1)
	      out.write(c);
	    in.close();
	    out.close();
	    
	    in =  new FileReader(newFile);
	    Properties properties = new Properties();
		properties.load(in);
		in.close();
		
		ListCacheLoader loader = new ListCacheLoader(properties);
		Assert.assertEquals(20, loader.size());
		List<PageView> list = new ArrayList<PageView>();
		list.add(new PageView("55",0));
		list.add(new PageView("54",0));
		list.add(new PageView("53",1));
		list.add(new PageView("52",2));
		list.add(new PageView("51",0));
		loader.addListInfo(4, list, true);
		
		Assert.assertEquals("4:55/0,54/0,53/1,52/2,51/0;1", loader.getPageString(4));
	    out = new FileWriter(newFile, true);
	    out.write(loader.getPageString(4));
	    out.write("\n");
	    out.close();
	    
	    in =  new FileReader(newFile);
	    properties = new Properties();
		properties.load(in);
		in.close();
		
		ListCacheLoader  l2 = new ListCacheLoader(properties);
		Assert.assertEquals(20, l2.size());
		

	    
	}
}
