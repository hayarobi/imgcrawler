package net.hayarobi.imgcrawler.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 앨범 게시판의 이미지 url에서 파일명을 추출하는 객체.
 * @author hayarobi
 *
 */
public class AlbumImageFilenameUtil extends AttachImageFilenameUtil {
	private static Logger log = LoggerFactory.getLogger(AlbumImageFilenameUtil.class);

	private static AlbumImageFilenameUtil instance = new AlbumImageFilenameUtil();
	public static AlbumImageFilenameUtil get() {
		return instance;
	}
	
	private static final String ATTACH_IMGURLPREFIX = "http://album.freechal.com/ComService/Activity/Album/GetImage.asp";
	public boolean isAttachImage(String url) {
		if( url == null )
			return false;
		// 업로드 이미지가 아닌 경우 저장하지 않는다.
		if( url.startsWith(ATTACH_IMGURLPREFIX) == false )
			return false;
		return true;
	}

	public String extractFileNameFromAttachUrl(String url) {
		String fileName;
		try {
			fileName = URLDecoder.decode(url.substring(url.lastIndexOf("=") + 1), "EUC-KR");
		} catch (UnsupportedEncodingException e) {
			log.error("Extracting filename from img src url "+url,e);
			// EUC-KR을 지원하지 못 한 것이 더 이상한 상황이다.
			throw new RuntimeException(e);
		} catch (IllegalArgumentException e) {
			log.error("Extracting filename from img src url "+url,e);
			throw new RuntimeException(e);
		}
		return fileName;
	}
}
