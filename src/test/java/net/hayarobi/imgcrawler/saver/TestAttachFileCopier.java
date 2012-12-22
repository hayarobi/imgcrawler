package net.hayarobi.imgcrawler.saver;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.junit.Assert;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.AttachFileInfo.AttachType;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingFile;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.file.PathManagerFactory;

import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

@Ignore("독립환경의 테스트가 불가능한 상황이라 당분간 무시한다. ")
public class TestAttachFileCopier {
	static CrawlerConfig conf;
	static CrawlerPathManager pathManager;

	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
		conf = CrawlerConfig.getInstance();
		pathManager = new PathManagerFactory(conf).createPathManager();
		
		// 타겟 디렉토리를 지운다.
	}
	@Test
	public void testCopy() {
		String[] files = new String[] {
				"1241_11DSC01276.JPG",
				"1241_11DSC01277.JPG",
				"1241_11DSC01272.JPG",
				"1241_11DSC01270.JPG"};
		BBSMetaInfo meta = new BBSMetaInfo(BBSType.pic, conf.get(ConfigItemName.communityId), "1", "album");
		PageView pv = new PageView("1241", 0);
		pv.setDatetime("2008-09-16 오후 4:47:13");
		List<AttachFileInfo> attachFileList = new ArrayList<AttachFileInfo>();
		for(String fileName : files) {
			AttachFileInfo af = new AttachFileInfo(fileName,"dummy");
			af.setAttachType(AttachType.img);
			attachFileList.add(af);
		}
		pv.setAttachFileList(attachFileList);
		SavingViewInfo sv = new SavingViewInfo(meta, pv);
		
		AttachFileCopier  cp = new AttachFileCopier(pathManager, sv);
		HashMap<String, SavingFile> rMap = cp.copyAttachedFile();
		for(SavingFile file: rMap.values()) {
			System.out.println(file.getFileUrl()+" : "+file.getFilename()+ " : " + file.getSize());
		}
		Assert.assertEquals(4, rMap.size());
		SavingFile sf = rMap.get("1241_11DSC01276.JPG");
		Assert.assertNotNull(sf);
		Assert.assertEquals("1241_11DSC01276_1.JPG", sf.getFilename());
		Assert.assertEquals(55760L, sf.getSize());

		
	}
}
