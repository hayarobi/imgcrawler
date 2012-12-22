package net.hayarobi.imgcrawler.saver;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import junit.framework.Assert;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingFile;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.file.PathManagerFactory;
import net.hayarobi.imgcrawler.loader.FilePageViewLoader;
import net.hayarobi.imgcrawler.parser.PDSPageParser;
import net.hayarobi.imgcrawler.parser.PageParser;
import net.hayarobi.imgcrawler.util.AttachImageFilenameUtil;

import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

public class TestBodyModifier {
	static CrawlerConfig conf;
	static CrawlerPathManager pathManager;
	private static final String INPUTFILE_DIR = "src/test/resources/crawled/";

	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
		conf = CrawlerConfig.getInstance();
		pathManager = new PathManagerFactory(conf).createPathManager();
		
		// 타겟 디렉토리를 지운다.
	}
	
	@Ignore
	@Test
	public void testLoadFile1() throws Exception {
		File file = new File(INPUTFILE_DIR + "pdsWimg.txt");
		Reader rd = new InputStreamReader(new FileInputStream(file), "UTF-8");

		FilePageViewLoader loader = new FilePageViewLoader(rd);
		PageView pv = loader.loadPageView();

		Map<String, SavingFile> sfMap = new HashMap<String, SavingFile>();
		int i = 0;
		for( AttachFileInfo af : pv.getAttachFileList() ) {
			
			SavingFile sf=new SavingFile("test_"+af.getFileName(), i*100);
			sf.setFileUrl(pathManager.getSavingImgUrlPrefix()+"/"+pathManager.getSavingDirString(pv.getDatetime())+"/"+sf.getFilename());
			i++;
			sfMap.put(af.getFileName(), sf);
		}

		BodyModifier bm = new BodyModifier(pv.getContentBody(), sfMap);
		String newBody = bm.modifiedBody(AttachImageFilenameUtil.get());
		System.out.println(pv.getContentBody());
		System.out.println("=========================================");
		System.out.println(newBody);
		System.out.println("=========================================");
		Assert.assertEquals(pv.getContentBody(), newBody);

	}

	@Ignore("자동화된 검사가 없다. ")
	@Test
	public void testBodyModify() throws Exception {
		PageView pv = new PageView();
		PageParser app = new PDSPageParser(pv);
		InputStream is = pv.getClass().getResourceAsStream("/htmls/CsPDSContent_withImage.html");
		app.setDataInputStream(is);
		app.parsePage();
		
		Map<String, SavingFile> sfMap = new HashMap<String, SavingFile>();
		int i = 0;
		for( AttachFileInfo af : pv.getAttachFileList() ) {
			
			SavingFile sf=new SavingFile("test_"+af.getFileName(), i*100);
			sf.setFileUrl(pathManager.getSavingImgUrlPrefix()+"/"+pathManager.getSavingDirString(pv.getDatetime())+"/"+sf.getFilename());
			i++;
			sfMap.put(af.getFileName(), sf);
		}

		BodyModifier bm = new BodyModifier(pv.getContentBody(), sfMap);
		String newBody = bm.modifiedBody(AttachImageFilenameUtil.get());
		System.out.println(pv.getContentBody());
		System.out.println("=========================================");
		System.out.println(newBody);
		System.out.println("=========================================");
		Assert.assertEquals(pv.getContentBody(), newBody);
	}
	
	
}
