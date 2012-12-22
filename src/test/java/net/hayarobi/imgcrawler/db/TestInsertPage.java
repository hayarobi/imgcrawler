package net.hayarobi.imgcrawler.db;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingCommentInfo;
import net.hayarobi.imgcrawler.domain.SavingFile;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.file.PathManagerFactory;
import net.hayarobi.imgcrawler.loader.FilePageViewLoader;
import net.hayarobi.imgcrawler.saver.AttachFileCopier;
import net.hayarobi.imgcrawler.saver.BodyModifier;
import net.hayarobi.imgcrawler.test.DBIntegTest;
import net.hayarobi.imgcrawler.util.AttachImageFilenameUtil;
import net.hayarobi.imgcrawler.util.StringUtil;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.experimental.categories.Category;

@Category(DBIntegTest.class)
public class TestInsertPage {
	private static final int TEST_PAGEVIEWID = 100;
	private static Connection conn;
	private static final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static CrawlerPathManager pathmanager;
	
	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
		conn = ConnectionManager.connect();
		pathmanager = new PathManagerFactory(CrawlerConfig.getInstance()).createPathManager();
	}

	@AfterClass
	public static void destroy() {
		try {
			PreparedStatement st = conn.prepareStatement("DELETE FROM cafe_board_default WHERE id = ?");
			st.setLong(1, TEST_PAGEVIEWID);
			st.addBatch();
			st.setLong(1, TEST_PAGEVIEWID+1);
			st.addBatch();
			st.executeBatch();
			st.close();
			PreparedStatement st2 = conn.prepareStatement("DELETE FROM cafe_board_default_add WHERE mother_id = ?");
			st2.setLong(1, TEST_PAGEVIEWID);
			st2.addBatch();
			st2.setLong(1, TEST_PAGEVIEWID+1);
			st2.addBatch();
			st2.executeBatch();
			st2.close();
			
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
	public void testInsertPV() throws Exception {
		insertPV( "src/test/resources/crawled/pdsWimg.txt", TEST_PAGEVIEWID, 100, 1000);
		insertPV( "src/test/resources/crawled/31423376.txt", TEST_PAGEVIEWID+1, 101, 2000);
		
	}
	public void insertPV(String filePath, long newId, long threadId, long cmtId) throws Exception {
		BBSMetaInfo meta = new BBSMetaInfo(BBSType.pds, CrawlerConfig.getInstance().get(ConfigItemName.communityId), "1", "자료실");

		Reader reader =  new BufferedReader(new InputStreamReader(new FileInputStream(filePath),"UTF-8"));
		PageView pv = new FilePageViewLoader(reader).loadPageView();
		SavingViewInfo sv = new SavingViewInfo(meta, pv);
		sv.setNewBBSId("518");
		Date date = StringUtil.getDateFromViewDate(pv.getDatetime());
		sv.setDate(date);
		sv.setTimestamp(StringUtil.getUnixtimestampFromDate(date));
		sv.setId(newId);
		sv.setThreadId(threadId);
		
		/**** 첨부파일 작업 start ***************************************/
		int attachFileCnt = pv.getAttachFileList().size(); // 첨부파일 갯수
		if (attachFileCnt > 0) {
			AttachFileCopier copier = new AttachFileCopier(pathmanager, sv);
			sv.setSavingFileMap(copier.copyAttachedFile());
		}
		/**** 첨부파일 작업 end ***************************************/

		// 게시물 본문 수정
		sv.setModifiedBody(new BodyModifier(pv.getContentBody(), sv.getSavingFileMap()).modifiedBody(AttachImageFilenameUtil.get()));

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
		
		PageInfoInsertJob job = new PageInfoInsertJob(conn);
		job.addInsertPageInfo(sv);
		job.execBatch();
		
		conn.commit();
		// 인서트된 결과 확인
		Statement selectSt = conn.createStatement();
		 selectSt.execute("SELECT * FROM cafe_board_default");
		 ResultSet rs = selectSt.getResultSet();
		 while(rs.next()) {
			 ResultSetMetaData rsMetaData = rs.getMetaData();
			 int colCount = rsMetaData.getColumnCount();
			 for(int i=1; i<= colCount; i++) {
				 System.out.println(rsMetaData.getColumnName(i)+ " : "
						 + rs.getString(i) );
			 }			    
		 }
		 rs.close();
		selectSt.close();

	}


}
