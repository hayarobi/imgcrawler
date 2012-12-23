package net.hayarobi.imgcrawler.util;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 일반 게시판의 게시물 안에 들어있는 첨부 이미지 파일 url확인 및 url에서 파일명을 추출하는 객체
 * 
 * @author hayarobi
 *
 */
public class AttachImageFilenameUtil {
	private static Logger log = LoggerFactory.getLogger(AttachImageFilenameUtil.class);

	private static AttachImageFilenameUtil instance;
	public static AttachImageFilenameUtil get() {
		if( instance == null)
			instance = new AttachImageFilenameUtil();
		return instance;
	}
	
	private static final String ATTACH_IMGURLPREFIX = "http://editor.freechal.com/GetFile.asp?";
	public boolean isAttachImage(String url) {
		if( url == null )
			return false;
		// 업로드 이미지가 아닌 경우 저장하지 않는다.
		if( url.startsWith(ATTACH_IMGURLPREFIX) == false )
			return false;
		return true;
	}

	public String extractFileNameFromAttachUrl(String url) {
		String fileName = extractImgFileName(url);
		try {
			fileName = URLDecoder.decode(fileName, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			log.error("Extracting filename from img src url "+url,e);
			throw new RuntimeException(e);
		} catch (IllegalArgumentException e) {
			log.error("Extracting filename from img src url "+url,e);
		}
		return fileName;
	}

	private static final String UCS2_ENCODING_PATTERN = "[%]u([0-9A-F]{4})";
	private static Pattern ucsNamePattern = Pattern.compile(UCS2_ENCODING_PATTERN);
	private static final int NOTFOUND_INDICATOR = -1;
	/**
	 * 프리챌 이미지 링크에서 이름 추출하기.
	 * @param url
	 * @return
	 */
	protected String extractImgFileName(String url) {
		int filenamePosition = 0;
		if ((filenamePosition = url.lastIndexOf("%3F")) != NOTFOUND_INDICATOR) {
			filenamePosition += 2;
		} else if ((filenamePosition = url.lastIndexOf("*")) != NOTFOUND_INDICATOR) {
			// do nothing
		} else {
			filenamePosition = 0;
		}
		String encodedName = url.substring(filenamePosition + 1);

		// %uXXXX 형식은 ucs2를 디코딩한다.
		Matcher m = ucsNamePattern.matcher(encodedName);
		StringBuffer sb = new StringBuffer(encodedName.length());
		while (m.find()) {
			String text = m.group(1);
			int codeval = Integer.parseInt(text, 16);
			char[] arr = Character.toChars(codeval);
			m.appendReplacement(sb, Character.toString(arr[0]));
		}
		m.appendTail(sb);
		// 나머지 부분에서는 urldecode를 한다.
		try {
			return URLDecoder.decode(sb.toString(), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return encodedName;
		}

	}
}
