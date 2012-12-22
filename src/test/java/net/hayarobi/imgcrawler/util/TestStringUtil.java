package net.hayarobi.imgcrawler.util;

import java.util.Calendar;
import java.util.Date;

import org.junit.Assert;
import org.junit.Test;

public class TestStringUtil {

	@Test
	public void testGetViewTime() throws Exception {

		// 한국 시간 기준으로 파싱해야한다.
		// yyyy-MM-dd HH:mm:ss
		String testDate1 = "1970-01-01 오전 12:00:01";
		String testDate2 = "1970-01-01 오후 12:00:01";

		Calendar cal = Calendar.getInstance();
		// 서울 표준시로 1970년1월1일 0시 생성
		cal.setTimeInMillis(0);
		cal.set(1970, 0, 1, 0, 0, 1);
		Date date = cal.getTime();
		System.out.println(StringUtil.getUnixTimeStampFromViewDate(testDate1));
		System.out.println(new Date(StringUtil.getUnixTimeStampFromViewDate(testDate1) * 1000));
		System.out.println(StringUtil.getUnixTimeStampFromViewDate(testDate2));
		// 시간 비교
		Assert.assertEquals(date.getTime() / 1000, StringUtil.getUnixTimeStampFromViewDate(testDate1));
		Assert.assertEquals(StringUtil.getUnixTimeStampFromViewDate(testDate1) + 3600 * 12,
				StringUtil.getUnixTimeStampFromViewDate(testDate2));
	}

	@Test
	public void testGetCommentTime() throws Exception {

		// 한국 시간 기준으로 파싱해야한다.
		// yyyy-MM-dd HH:mm:ss
		String testDate1 = "1970-01-01 00:00:01";
		String testDate2 = "1970-01-01 12:00:01";
		String testDate3 = "2011-04-05 14:30:52";

		Calendar cal = Calendar.getInstance();
		// 서울 표준시로 1970년1월1일 0시 생성
		cal.setTimeInMillis(0);
		cal.set(1970, 0, 1, 0, 0, 1);
		Date date = cal.getTime();
		System.out.println(StringUtil.getUnixTimeStampFromCommentDate(testDate1));
		System.out.println(new Date(StringUtil.getUnixTimeStampFromCommentDate(testDate1) * 1000));
		System.out.println(StringUtil.getUnixTimeStampFromCommentDate(testDate2));
		// 시간 비교
		Assert.assertEquals(date.getTime() / 1000, StringUtil.getUnixTimeStampFromCommentDate(testDate1));
		Assert.assertEquals(StringUtil.getUnixTimeStampFromCommentDate(testDate1) + 3600 * 12,
				StringUtil.getUnixTimeStampFromCommentDate(testDate2));
		
		Date td = new Date(StringUtil.getUnixTimeStampFromCommentDate(testDate3)*1000);
		Assert.assertEquals("Tue Apr 05 14:30:52 KST 2011", td.toString());
	}
	
	@Test
	public void testExtractExtension() {
		Assert.assertEquals("", StringUtil.extractExtension(".afile"));
		Assert.assertEquals("", StringUtil.extractExtension("afile."));
		Assert.assertEquals("gif", StringUtil.extractExtension(".afile.gif"));
		Assert.assertEquals("jpg", StringUtil.extractExtension("picture.jpg"));
		
	}

}
