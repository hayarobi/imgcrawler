package net.hayarobi.imgcrawler.util;

import org.junit.Assert;
import org.junit.Test;

public class TestAttachImageFilenameUtil {
	@Test
	public void testFileNameParsing() throws Exception {
		final String[] urls = new String[] {
				"http://editor.freechal.com/GetFile.asp?mnf=845246*GCOM02*18*133753493*21125360344606609_%25BC%25F6%25C0%25B0.jpg"
				,"http://editor.freechal.com/GetFile.asp?mnf=845246*GCOM02*18*133761073*211178661024361013_12%uC6D4%uAD50%7E1.JPG"
				,"http://editor.freechal.com/GetFile.asp?mnf=845246%3FGCOM02%3F18%3F133578861%3FPororo1.jpg"
				,"http://editor.freechal.com/GetFile.asp?mnf=845246%3FGCOM02%3F18%3F133526932%3F%uC544%uB77C%uBE44%uCE74_%uC6D0%uB450.jpg"
		};
		final String[] targetNames = new String[] {"21125360344606609_%BC%F6%C0%B0.jpg",
				"211178661024361013_12월교~1.JPG","Pororo1.jpg","아라비카_원두.jpg"};
		
		for(int i=0; i<urls.length; i++ ) {
			String url = urls[i];
			String fileName = AttachImageFilenameUtil.get().extractImgFileName(url);
			System.out.print(fileName);
			System.out.println(" <= "+url);
			Assert.assertEquals(targetNames[i], fileName);
		}
		// 코멘트 영역
	}
}
