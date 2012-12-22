package net.hayarobi.imgcrawler.http;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.AttachFileInfo.AttachType;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

public class FileDownloader {
	private static Log log = LogFactory.getLog(FileDownloader.class);
	
	/**
	 * 파일을 다운로드한다. parentPath는 반드시 존재하는 디렉토리여야한다. 
	 * @param hc
	 * @param headerArr
	 * @param parentPath
	 * @param attchFileInfo
	 * @return true 파일 다운르드
	 * @return false 파일이 이미 존재함
	 * @throws Exception 파일 다운로드 실패. 
	 */
	public static boolean downloadFile(DefaultHttpClient hc, Header[] headerArr, File parentPath, AttachFileInfo attchFileInfo) throws Exception {
		final byte[] buffer = new byte[512*1024];
		File filePath = new File(parentPath, attchFileInfo.getFileName());
		if( filePath.exists() && filePath.length() != 1642L ) {
			log.debug("file "+attchFileInfo.getFileName()+" already exist. skip download");
			return false;
		}
		if( attchFileInfo.getAttachType().equals(AttachType.img) )
			return downloadImgFile(headerArr, parentPath, attchFileInfo);
		
		try {

			URI url = new URI(attchFileInfo.getUrl());
			HttpGet httpget = new HttpGet(url);
			httpget.setHeaders(headerArr);
			
			HttpResponse response = hc.execute(httpget);

			// 성공인지 실패인지 여부를 확인.
			int code = response.getStatusLine().getStatusCode();
			if (code != 200) {
				response.getEntity().getContent().close();
				log.warn("Downloading file "+attchFileInfo.getFileName()+" failed. HTTP error:"+code+" ;url="+attchFileInfo.getUrl());
				throw new Exception("HTTP ERROR : "+code);
			}
			HttpEntity entity = response.getEntity();
			if( entity.getContentLength() == 0 ) {
				response.getEntity().getContent().close();
				log.warn("Downloading file "+attchFileInfo.getFileName()+" failed. Empty content ;url="+attchFileInfo.getUrl());
				throw new Exception("Empty Content");
			}
			InputStream is = null;
			BufferedInputStream bis = null;
			FileOutputStream out = null;
			try {
				is = entity.getContent();
				bis = new BufferedInputStream(is);
				out = new FileOutputStream(new File(parentPath, attchFileInfo.getFileName()));
				int read = -1;
				while ((read = bis.read(buffer)) > 0) {
					out.write(buffer, 0, read);
				}
			}
			finally {
				try {
				if( is != null ) 
					is.close();
				} catch(Exception ignore) {}
				try {
				if (bis != null) {
					bis.close();
				}
				} catch(Exception ignore) {}
				try {
				if (out != null) {
					out.close();
				}
				} catch(Exception ignore) {}
			}
			return true;
		}
		finally {
		}
	}
	
	public static boolean downloadImgFile(Header[] headerArr, File parentPath, AttachFileInfo info) throws Exception {
		final byte[] buffer = new byte[512*1024];
		HttpURLConnection conn = null;
		File filePath = new File(parentPath, info.getFileName());
		if( filePath.exists() && filePath.length() > 1000L ) {
			log.debug("file "+info.getFileName()+" already exist. skip download");
			return false;
		}
		try {

			URL url = new URL(info.getUrl());
			conn = (HttpURLConnection) (url).openConnection();
			

			// 성공인지 실패인지 여부를 확인.
			int code = conn.getResponseCode();
			if (code != 200) {
				conn.getInputStream().close();
				log.warn("Downloading file "+info.getFileName()+" failed. HTTP error:"+code+" ;url="+info.getUrl());
				throw new Exception("HTTP ERROR : "+code);
			}
			InputStream is = null;
			BufferedInputStream bis = null;
			FileOutputStream out = null;
			try {
				bis = new BufferedInputStream(conn.getInputStream());
				out = new FileOutputStream(new File(parentPath, info.getFileName()));
				int read = -1;
				while ((read = bis.read(buffer)) > 0) {
					out.write(buffer, 0, read);
				}
			}
			finally {
				try {
				if( is != null ) 
					is.close();
				} catch(Exception ignore) {}
				try {
				if (bis != null) {
					bis.close();
				}
				} catch(Exception ignore) {}
				try {
				if (out != null) {
					out.close();
				}
				} catch(Exception ignore) {}
			}
			return true;
		}
		finally {
			if (conn != null)
				try {conn.disconnect();	} catch (Throwable ignore) {}
		}
	}
	
	public static boolean isExistFile(File parentPath, String fileName) {
		File filePath = new File(parentPath, fileName);
		return filePath.exists();
	}
}
