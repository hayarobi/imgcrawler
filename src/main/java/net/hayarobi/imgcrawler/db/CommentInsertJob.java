package net.hayarobi.imgcrawler.db;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.SavingDBConfig;
import net.hayarobi.imgcrawler.domain.SavingCommentInfo;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;

public class CommentInsertJob {
	private static final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final String IP_Address = "192.168.0.1";
	private static final String COMMENT_INSER_SQL = 
		"INSERT INTO cafe_board_default_add "
		+"(id, code, sort, sub_sort, id1, name "
		+", subject, date, unixtime1, content, ip, mother_id ) "
		+" VALUES (?,'NEWCAFE123',?,0,?,? "
		+",null,?,?,?,?,? )";
	private PreparedStatement st;
	private String writerId;
	public CommentInsertJob(Connection conn) throws SQLException {
		st = conn.prepareStatement(COMMENT_INSER_SQL);
		writerId = CrawlerConfig.getInstance().get(SavingDBConfig.writerId);
	}
	public void addInsertComment(SavingViewInfo sv, SavingCommentInfo cmt) throws SQLException {
		int i=1;
		st.setLong(i++, cmt.getCommentid());
		st.setString(i++, sv.getNewBBSId());
		st.setString(i++,writerId);
		st.setString(i++, cmt.getWriter());
		st.setString(i++, formatter.format(cmt.getDate()));
		st.setLong(i++, cmt.getTimestamp());
		st.setString(i++, cmt.getBody());
		st.setString(i++, IP_Address);
		st.setLong(i++, sv.getId());
		st.addBatch();
	}
	
	public int[] execBatch() throws SQLException {
		return st.executeBatch();
	}
}
