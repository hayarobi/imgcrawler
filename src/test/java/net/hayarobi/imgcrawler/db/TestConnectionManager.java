package net.hayarobi.imgcrawler.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.test.DBIntegTest;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.experimental.categories.Category;

import static org.junit.Assert.*;

@Category(DBIntegTest.class)
public class TestConnectionManager {
	private static final int TEST_ROWID = 100;
	@BeforeClass
	public static void init() {
		CrawlerConfig.initWithConfigDirectory("src/test/resources");
	}
	
	private Connection conn;
	@Before
	public void setUp() {
		conn = ConnectionManager.connect();
	}
	
	@After
	public void tearDown() {
		try {
		PreparedStatement st = conn.prepareStatement("DELETE FROM testTB ");
//		st.setLong(1, TEST_ROWID);
		st.executeUpdate();
		st.close();
		} catch (SQLException ignore) {
		} 
		try {
			conn.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	
	@Test
	public void testInsert() throws SQLException {
		PreparedStatement st = conn.prepareStatement("INSERT INTO testTB values (?, ?) ");
		st.setLong(1, TEST_ROWID);
		st.setString(2, "value");
		st.executeUpdate();
		st.close();
		
		conn.commit();
		
		Statement selectSt = conn.createStatement();
		 selectSt.execute("SELECT * FROM testTB");
		 ResultSet rs = selectSt.getResultSet();
		 while(rs.next()) {
			 System.out.println(rs.getString("id") + " : " + rs.getString("strVal"));
		 }
		 rs.close();
		selectSt.close();
		
		st = conn.prepareStatement("DELETE FROM testTB WHERE id = ?");
		st.setLong(1, TEST_ROWID);
		st.executeUpdate();
		assertEquals(1, st.getUpdateCount());
		st.close();
	}
}
