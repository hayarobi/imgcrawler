package net.hayarobi.imgcrawler.util;

import java.util.Locale;
import java.util.Date;
import java.util.SimpleTimeZone;
import java.util.TimeZone;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.regex.Pattern;

public class StringUtil {

	// public static final Locale KOREA = Locale.KOREA;

	private static String VIEW_DATE_PATTERN = "yyyy-MM-dd a hh:mm:ss z";
	private static SimpleDateFormat viewDateFormatter = new SimpleDateFormat(VIEW_DATE_PATTERN);

	private static String COMMENT_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss z";
	private static String COMMENT_DATE_PATTERN2 = "yyyy/MM/dd HH:mm z";
	private static SimpleDateFormat commentDateFormatter = new SimpleDateFormat(COMMENT_DATE_PATTERN);
	private static SimpleDateFormat commentDateFormatter2 = new SimpleDateFormat(COMMENT_DATE_PATTERN2);

	// url 패턴을 새로운 url 패턴으로 바꾼다.
	public static String replaceNewUrl(String sub) {

		String newUrl = new String();
		return newUrl;
	}

	// 입력받은 스트링 시간을 utf 시간으로 반환한다.
	public static long getUnixTimeStampFromViewDate(String sub) {
		try {
			return getUnixTimeStampFromDateString(viewDateFormatter, sub);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
	}

	public static Date getDateFromViewDate(String sub) {
		try {
			return getDateFromDateString(viewDateFormatter, sub);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
	}

	public static long getUnixTimeStampFromCommentDate(String sub) {
		try {
			return getUnixTimeStampFromDateString(commentDateFormatter, sub);
		} catch (ParseException e) {
			try {
				return getUnixTimeStampFromDateString(commentDateFormatter2, sub);
			} catch (ParseException e1) {
				throw new RuntimeException(e1);
			}
		}
	}

	public static Date getDateFromCommentDate(String sub) {
		try {
			return getDateFromDateString(commentDateFormatter, sub);
		} catch (ParseException e) {
			try {
				return getDateFromDateString(commentDateFormatter2, sub);
			} catch (ParseException e1) {
				throw new RuntimeException(e1);
			}
		}
	}

	public static long getUnixTimeStampFromDateString(SimpleDateFormat format, String sub) throws ParseException {
		Date date = getDateFromDateString(format, sub);
		return getUnixtimestampFromDate(date);
	}

	public static Date getDateFromDateString(SimpleDateFormat format, String sub) throws ParseException {
		return format.parse(sub + " KST");
	}

	public static long getUnixtimestampFromDate(Date date) {
		return date.getTime()/1000;
	}
	
	private static String fileNumberPatternString = "_[0-9]+$";
	private static Pattern fileNumberPattern = Pattern.compile(fileNumberPatternString);

	/**
	 * 다음 숫자로 구성된 파일명 생성 예를 들어 aFile.txt 라면 aFile_1.txt , aFile_1.txt라면
	 * aFile_2.txt, aFile_9.txt는 aFile_10.txt를 반환한다.
	 * 
	 * @param filename
	 * @return
	 */
	public static String nextNumericFilename(String fileName) {
		int extPoint = fileName.lastIndexOf('.');
		String nameBody = null;
		String extention = null;
		if (extPoint == -1) {
			nameBody = fileName;
			extention = "";
		} else {
			nameBody = fileName.substring(0, extPoint);
			extention = fileName.substring(extPoint, fileName.length());
		}

		// TODO: 숫자 추출해서 1더한 숫자를 넣는다.
		nameBody = nameBody + "_1";
		return nameBody + extention;
	}
	
	/**
	 * 2011/02/05 혹은 2011-02-05 같은 문자열에서 디렉토리 경로 추출
	 * @param datetimeStr
	 * @return
	 */
	public static String makeSavingDirString(String datetimeStr) {
		String ymd = datetimeStr;
		String y = ymd.substring(0, 4);
		String m = ymd.substring(5, 7);
		String d = ymd.substring(8, 10);
		// 복사할 볼더를 폴더를 만든다.
		String fileDir = y + "/" + m + "/" + d;
		return fileDir;
	}

	public static String extractExtension(String fileName) {
		int index = fileName.lastIndexOf('.');
		if( index > 0 ) {
			return fileName.substring(index+1);
		}
		return "";
	}
}
