package net.hayarobi.imgcrawler.db;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Map.Entry;

import net.hayarobi.imgcrawler.config.CrawlerConfig;
import net.hayarobi.imgcrawler.config.CrawlerConfig.SavingDBConfig;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingCommentInfo;
import net.hayarobi.imgcrawler.domain.SavingFile;
import net.hayarobi.imgcrawler.domain.SavingFileString;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;

public class PageInfoInsertJob {
	private static final SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final String IP_Address = "192.168.0.1";
	private static final String COMMENT_INSER_SQL = 
		"INSERT INTO cafe_board_default "
		+"(id, code, sort, sub_sort, id1, name "
		+", subject, date, unixtime1"
		+", access, groupnum, stepnum, add_count "
		+", content, imgfile, filesize, ip, usetag, file_text ) "
		+" VALUES (?,'NEWCAFE123',?,0,?,? "
		+",?,?,?"
		+",?,?,?,?"
		+",?,?,?,?,?,'' )";
	private PreparedStatement st;
	private String writerId;
	private Connection conn;
	
	public PageInfoInsertJob(Connection conn) throws SQLException {
		this.conn = conn;
		st = conn.prepareStatement(COMMENT_INSER_SQL);
		writerId = CrawlerConfig.getInstance().get(SavingDBConfig.writerId);
	}
	public void addInsertPageInfo(SavingViewInfo sv) throws SQLException {
		PageView pv = sv.getPv();
		int i=1;
		st.setLong(i++, sv.getId());
		st.setString(i++, sv.getNewBBSId());
		st.setString(i++,writerId);
		st.setString(i++, pv.getWriter());
		st.setString(i++, pv.getSubject());
		st.setString(i++, formatter.format(sv.getDate()));
		st.setLong(i++, sv.getTimestamp());
		st.setString(i++, pv.getHitCount());
		st.setLong(i++, sv.getThreadId());
		st.setInt(i++, pv.getStep());
		st.setInt(i++, sv.getSavingCommentList().size());
		st.setString(i++, sv.getModifiedBody());
		// 첨부파일
		String fileNames="";
		String fileSizes="";
		if( null != sv.getSavingFileMap() && sv.getSavingFileMap().size() > 0 ) {
			for(Entry<String, SavingFile> ent : sv.getSavingFileMap().entrySet() ) {
				SavingFile sf = ent.getValue();
				fileNames += sf.getFilename();
				fileNames += '|';
				fileSizes += sf.getSize();
				fileSizes += '|';
			}
			fileNames = fileNames.substring(0, fileNames.length()-1);
			fileSizes = fileSizes.substring(0, fileSizes.length()-1);
		}
		
		st.setString(i++, fileNames);
		st.setString(i++,fileSizes);
		st.setString(i++, IP_Address);
		st.setString(i++, "y");
		st.addBatch();
		// 코멘트
		if (sv.getSavingCommentList() != null && sv.getSavingCommentList().size() > 0) {
			CommentInsertJob cjob = new CommentInsertJob(conn);
			for (SavingCommentInfo scmt : sv.getSavingCommentList()) {
				cjob.addInsertComment(sv, scmt);
			}
			cjob.execBatch();
		}
	}
	
	public int[] execBatch() throws SQLException {
		return st.executeBatch();
	}
}
