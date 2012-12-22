package net.hayarobi.imgcrawler.http;

import java.io.File;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.http.FileDownloader;
import net.hayarobi.imgcrawler.http.Loginer;

import org.apache.http.Header;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;

@Ignore
public class TestFileDownloader {

	@Test
	public void testHttpURI() throws Exception {
		String malformURI = "http://editor.freechal.com/GetFile.asp?mnf="
				+ "845246*GCOM02*18*133761073*211178661024361013_12%uC6D4%uAD50%7E1.JPG";

		// FIXME: avoid malaform download..
		try {
			URI uri = new URI(malformURI);
			Assert.fail();
		} catch (URISyntaxException e) {
			System.out.println("Normal flow");
		}
		
		URL uri = new URL(malformURI);
		
		File parent = new File("target/testDir");
		if( parent.exists() == false )
			parent.mkdir();
		else if (parent.isFile() ) {
			parent.delete();
			parent.mkdir();
		}
		
        DefaultHttpClient hc = new DefaultHttpClient();
        
        Assert.assertTrue(new Loginer().login(hc, "geesetower", "sang1976"));
        
        Header[] harr = new Header[1];
		harr[0] = new BasicHeader("Referer", 
		"http://community.freechal.com/ComService/Activity/Album/CsPhotoView.asp?GrpId=845246&ObjSeq=1&SeqNo=2185&PageNo=1");
		AttachFileInfo af = new AttachFileInfo("211178661024361013_12%25uC6D4%25uAD50%7E1.JPG", malformURI);
		Assert.assertEquals(true,FileDownloader.downloadImgFile(harr, parent, af)); 

	}
	
}
