/*
 * 
 * 
 * mysql db와의 연결을 관리한다.
 * 1.mysql db와 연결 객체를 생성하여 반환한다.
 * 2.연결 객체를 닫는다. 
 * 
 */


package net.hayarobi.imgcrawler.db;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.SavingDBConfig;




public class ConnectionManager {

	
	
	private static Connection conn ; 
	public static Connection connect(){
		CrawlerConfig conf = CrawlerConfig.getInstance();
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn =
				DriverManager.getConnection(conf.get(SavingDBConfig.DBUrl),
						conf.get(SavingDBConfig.DBusername), conf.get(SavingDBConfig.DBpassword));
			conn.setAutoCommit(false);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return conn;
	
	}
}
