package net.hayarobi.imgcrawler.config;

import java.io.File;
import java.util.List;

import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;

import org.junit.Assert;
import org.junit.Test;

public class TestBBSListLoader {
	private static final String TEST_COMMUNITYID = "1111";

	@Test
	public void testLoad() {
		BBSListLoader loader = new BBSListLoader(new File("src/test/resources"),TEST_COMMUNITYID);
		List<BBSMetaInfo> bbsMetaList = loader.loadBBSList();
		Assert.assertEquals(5, bbsMetaList.size());
		BBSMetaInfo meta = bbsMetaList.get(0);
		Assert.assertEquals(BBSType.noti.name()+"1", meta.getBBSDirName());
		Assert.assertEquals("1", meta.getObjSeq());

		meta = bbsMetaList.get(4);
		Assert.assertEquals(BBSType.bbs.name()+"18", meta.getBBSDirName());
		Assert.assertEquals("18", meta.getObjSeq());
		Assert.assertEquals("조합원·아마활동방", meta.getBbsName());
		Assert.assertEquals("503", meta.getPortingParameter() );
	}
}
