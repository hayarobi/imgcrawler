package net.hayarobi.imgcrawler.saver;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.StringReader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.impl.client.DefaultHttpClient;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;

/**
 * 파일을 저장하는 객체. 해당 디렉토리 아래에 파싱 결과를 텍스트파일로 만들고, 첨부파일은 attach/{게시물번호} 디렉토리에 첨부한다.
 * 
 * 파일 형식은 아래와 같다.
 * 
 * 제목:제목을 문자로 저장합니다. 작성자:별명 시각:2011년 3월 11일 16:10:15 본문: <div …> [[!!****!!]]
 * 코멘트: 나는새\2011-03-07 15:44:54\3월 19일 토요아마 가능한가요? 가능하면 저도 올려주세요. 그리고 4월 1일 아마
 * 신청합니다\ 고양이twin맘\2011/3/6 23:19\^^ 진심으로 고양이도 리현이와 은호 생일 많이 많이 축하했었어~~^^ 귀연
 * 넘들(이요)...ㅋㅋㅋ\ 첨부파일:
 * 
 * @author hayarobi
 * 
 */
public class FilePageSaver extends PageSaver {
	public static enum SingleLinePrefix {
		ITEMID("itemId"), THREAD_ID("threadId"), DEPTH("depth"), POSITION("position")
		, TITLE("제목"), WRITER("작성자"), DATE("작성시각"), HITCOUNT("조회");
		public static final String PREFIX_SEPERATOR = ":";
		private final String value;
		private final String prefix;

		private SingleLinePrefix(String value) {
			this.value = value;
			this.prefix = value+PREFIX_SEPERATOR;
		}

		public String getValue() {
			return value;
		}

		public String getPrefix() {
			return prefix;
		}

	}

	private static Log log = LogFactory.getLog(FilePageSaver.class);

	/**********************************************
	 * 여기서부터는 상수
	 **********************************************/
	private static String MAKE_LINE = "\r\n";
	private static String CONTENT_PREFIX = "본문:" + MAKE_LINE;
	public static String CONTENT_FINISHER = "[[!!****!!]]";
	private static String COMMENT_PREFIX = "코멘트:";
	private static String COMMENT_SEPERATOR = "\\";
	private static String ATTACHEFILE_PREFIX = "첨부파일:";

	private File parentPath;

	public FilePageSaver(DefaultHttpClient hc, File parentPath, boolean overwrite) {
		super(hc, overwrite);
		this.parentPath = parentPath;
	}

	public File getParentPath() {
		return parentPath;
	}

	public void setParentPath(File parentPath) {
		this.parentPath = parentPath;
	}

	@Override
	public boolean savePageInfo(PageView pv) {
		Writer fw = null;
		try {
			File saveFile = new File(parentPath, pv.getItemId() + ".txt");
			if (overwrite == false && saveFile.exists()) {
				log.info("Page info " + pv.getItemId() + " already exists. skip saving");
				return false;
			}
			fw = new OutputStreamWriter(new FileOutputStream(saveFile), "UTF-8");
			this.makeWholeText(fw, pv);
			return true;
		} catch (Exception e) {
			throw new RuntimeException("Error while save page itemId " + pv.getItemId() + ": cause " + e.getMessage(),
					e);
		} finally {
			try {
				if (fw != null)
					fw.close();
			} catch (IOException ignore) {
			}
		}

	}

	public void makeWholeText(Writer fw, PageView pv) throws IOException {
		fw.write(SingleLinePrefix.ITEMID.getPrefix()); // 게시글 번호
		fw.write(pv.getItemId());
		fw.write(MAKE_LINE);
		fw.write(SingleLinePrefix.THREAD_ID.getPrefix());
		fw.write(pv.getThreadId()); // 쓰레드 번호
		fw.write(MAKE_LINE);
		fw.write(SingleLinePrefix.DEPTH.getPrefix());
		fw.write(Integer.toString(pv.getDepth())); // 쓰레드 상의 위치
		fw.write(MAKE_LINE);
		fw.write(SingleLinePrefix.POSITION.getPrefix());
		fw.write(Integer.toString(pv.getStep())); // 쓰레드 상의 위치
		fw.write(MAKE_LINE);

		fw.write(SingleLinePrefix.TITLE.getPrefix());
		fw.write(pv.getSubject()); // 제목
		fw.write(MAKE_LINE);
		fw.write(SingleLinePrefix.WRITER.getPrefix()); // 작성자
		fw.write(pv.getWriter());
		fw.write(MAKE_LINE);
		fw.write(SingleLinePrefix.DATE.getPrefix()); // 작성일시
		fw.write(pv.getDatetime());
		fw.write(MAKE_LINE);
		fw.write(SingleLinePrefix.HITCOUNT.getPrefix()); // 조회수
		fw.write(pv.getHitCount());
		fw.write(MAKE_LINE);
		fw.write(CONTENT_PREFIX);
		fw.write(pv.getContentBody());
		fw.write(CONTENT_FINISHER);
		fw.write(MAKE_LINE);
		fw.write(COMMENT_PREFIX);
		List<Comment> cmtList = pv.getCommentlist();
		if (cmtList != null && cmtList.size() > 0) {
			fw.write(Integer.toString(cmtList.size()));
			fw.write(MAKE_LINE);
			for (Comment cmt : cmtList) {
				fw.write(cmt.getCommenter());
				fw.write(COMMENT_SEPERATOR);
				fw.write(cmt.getDatetime());
				fw.write(COMMENT_SEPERATOR);
				fw.write(cmt.getCommentBody());
				fw.write(COMMENT_SEPERATOR);
				fw.write(MAKE_LINE);
			}
		} else {
			fw.write("0");
			fw.write(MAKE_LINE);
		}
		fw.write(ATTACHEFILE_PREFIX);
		List<AttachFileInfo> afList = pv.getAttachFileList();
		if (afList != null && afList.size() > 0) {
			fw.write(Integer.toString(afList.size()));
			fw.write(MAKE_LINE);
			for (AttachFileInfo cmt : afList) {
				fw.write(cmt.getFileName());
				fw.write(MAKE_LINE);
			}
		} else {
			fw.write("0");
			fw.write(MAKE_LINE);
		}
	}

	@Override
	public boolean isSavedPage(String itemId) {
		File saveFile = new File(parentPath, itemId + ".txt");
		return saveFile.exists();
	}

	@Override
	public List<String> extractAttachFileList(String itemId) {
		File saveFile = new File(parentPath, itemId + ".txt");
		BufferedReader rd = null;
		try {
			rd = new BufferedReader(new FileReader(saveFile));
			String line = null;
			while ((line = rd.readLine()) != null) {
				if (line.startsWith(ATTACHEFILE_PREFIX)) {
					ArrayList<String> fileList = new ArrayList<String>();
					String fileName = null;
					while ((fileName = rd.readLine()) != null) {
						fileList.add(fileName);
					}
					rd.close();
					return fileList;
				}
			}
		} catch (Exception e) {
			throw new RuntimeException("error get attach file Info " + e.getMessage(), e);
		} finally {
			if (rd != null)
				try {
					rd.close();
				} catch (Exception ignore) {
				}
		}
		return null;
	}

}
