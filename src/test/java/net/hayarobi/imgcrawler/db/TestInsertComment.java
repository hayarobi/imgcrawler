package net.hayarobi.imgcrawler.db;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingCommentInfo;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.loader.FilePageViewLoader;
import net.hayarobi.imgcrawler.test.DBIntegTest;
import net.hayarobi.imgcrawler.util.StringUtil;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(DBIntegTest.class)
public class TestInsertComment {
	private static final int TEST_PAGEVIEWID = 100;
	private static Connection conn;
	private static final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
		conn = ConnectionManager.connect();
	}

	@AfterClass
	public static void destroy() {
		try {
			PreparedStatement st = conn.prepareStatement("DELETE FROM cafe_board_default_add WHERE mother_id = ?");
			st.setLong(1, TEST_PAGEVIEWID);
			st.executeUpdate();
			st.close();
			conn.commit();
		} catch (SQLException ignore) {
		}
		try {
			conn.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	@Test
	public void testInsertComment() throws Exception {
		BBSMetaInfo meta = new BBSMetaInfo(BBSType.pds, CrawlerConfig.getInstance().get(ConfigItemName.communityId), "1", "자료실");

		final String filePath = "src/test/resources/crawled/pdsWimg.txt";
		Reader reader =  new BufferedReader(new InputStreamReader(new FileInputStream(filePath),"UTF-8"));
		PageView pv = new FilePageViewLoader(reader).loadPageView();
		SavingViewInfo sv = new SavingViewInfo(meta, pv);
		sv.setNewBBSId("518");
		sv.setId(TEST_PAGEVIEWID);
		sv.setThreadId(100);
		long cmtId = 200000;
		List<SavingCommentInfo> scList = new ArrayList<SavingCommentInfo>();
		for(Comment comment : pv.getCommentlist()) {
			SavingCommentInfo sc = new SavingCommentInfo();
			sc.setCommentid(cmtId++);
			sc.setViewId(sv.getId());
			sc.setDate(StringUtil.getDateFromCommentDate(comment.getDatetime()));
			sc.setTimestamp(StringUtil.getUnixtimestampFromDate(sc.getDate()));
			sc.setWriter(comment.getCommenter());
			sc.setBody(comment.getCommentBody());
			scList.add(sc);
		}
		sv.setSavingCommentList(scList);
		
		CommentInsertJob job = new CommentInsertJob(conn);
		// 테스트용 객체를 만들어서 코멘트 인서트 테스트
		for(SavingCommentInfo scmt: scList ) {
			job.addInsertComment(sv, scmt);
		}
		job.execBatch();
		
		conn.commit();
		// 인서트된 결과 확인
		Statement selectSt = conn.createStatement();
		 selectSt.execute("SELECT * FROM cafe_board_default_add order by id desc");
		 ResultSet rs = selectSt.getResultSet();
		 while(rs.next()) {
			 System.out.println(rs.getString("id") + " : " + rs.getString("name")
					 +" : "+formatter.format(rs.getTimestamp("date"))+ " : "+rs.getLong("unixtime1")+" : "
					 + rs.getString("content"));
		 }
		 rs.close();
		selectSt.close();

	}


}
