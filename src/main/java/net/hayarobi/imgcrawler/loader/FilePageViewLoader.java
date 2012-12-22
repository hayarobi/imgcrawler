package net.hayarobi.imgcrawler.loader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.saver.FilePageSaver;
import net.hayarobi.imgcrawler.saver.FilePageSaver.SingleLinePrefix;

/**
 * pageview 저장 파일을 읽어 {@link PageView} 객체를 만든다.
 * @author hayarobi
 *
 */
public class FilePageViewLoader extends PageViewLoader {
	private static HashMap<String, Method> prefixMap = null;
	static {
		prefixMap = new HashMap<String, Method>();
	}
	private Reader rd;
	private PageView loadedPv;
	public FilePageViewLoader(Reader rd) {
		super();
		this.rd = rd;
	}

	
	public PageView loadPageView() {
		BufferedReader reader = new BufferedReader(rd);
		loadedPv = new PageView();
		try {
			// FIXME: 무척이나 순서에 의존적이다 순서바뀌면 엉망이 된다. 
			loadedPv.setItemId(extractStringValue(reader));
			loadedPv.setThreadId(extractStringValue(reader));
			loadedPv.setDepth(extractIntValue(reader));
			loadedPv.setStep(extractIntValue(reader));
			loadedPv.setSubject(extractStringValue(reader));
			loadedPv.setWriter(extractStringValue(reader));
			loadedPv.setDatetime(extractDatetimeString(reader));
			loadedPv.setHitCount(extractStringValue(reader));
			loadedPv.setContentBody(extractContent(reader));
			// 코멘트
			loadedPv.setCommentlist(extractComments(reader));
			// 첨부파일
			loadedPv.setAttachFileList(extractAttachFiles(reader));

			
		} catch (IOException e) {
			throw new RuntimeException(e);
		} finally {
			try { reader.close(); } catch (IOException ignore) {}
		}
		return loadedPv;
	}
	
	private static String extractStringValue(BufferedReader reader) throws IOException {
		String line = reader.readLine();
		String[] pls = line.split(FilePageSaver.SingleLinePrefix.PREFIX_SEPERATOR);
		return pls[1].trim();
	}
	private static String extractDatetimeString(BufferedReader reader) throws IOException {
		String line = reader.readLine();
		int seperatorPosition = line.indexOf(':');
		return line.substring(seperatorPosition+1).trim();
	}

	private static int extractIntValue(BufferedReader reader) throws IOException {
		String strVal = extractStringValue(reader);
		return Integer.valueOf(strVal);
	}
	
	private String extractContent(BufferedReader reader) throws IOException {
		// 첫 라인은 본문 지시자.
		reader.readLine();
		StringBuffer buf = new StringBuffer();
		String line = null;
		while( (line=reader.readLine()) != null ) {
			if( line.endsWith(FilePageSaver.CONTENT_FINISHER) ) {
				buf.append(line.substring(0, line.indexOf(FilePageSaver.CONTENT_FINISHER)));
				break;
			} else {
				buf.append(line);
				buf.append('\n');
			}
		}
		return buf.toString();
	}

	private List<Comment> extractComments(BufferedReader reader) throws IOException {
		// 첫 라인에서 코멘트 갯수 추출.
		int cmtCount = extractIntValue(reader);
		
		ArrayList<Comment> comments = new ArrayList<Comment>(cmtCount);
		for(int i=0; i<cmtCount; i++ ) {
			String line=reader.readLine();
			String[] tokens =  line.split("\\\\");
			Comment cmt = new Comment();
			cmt.setCommenter(tokens[0]);
			cmt.setDatetime(tokens[1]);
			cmt.setCommentBody(tokens[2]);
			comments.add(cmt);
		}
		return comments;
	}

	private List<AttachFileInfo> extractAttachFiles(BufferedReader reader) throws IOException {
		// 첫 라인에서 첨부파일 갯수 추출.
		int attachCount = extractIntValue(reader);
		
		ArrayList<AttachFileInfo> files = new ArrayList<AttachFileInfo>(attachCount);
		for(int i=0; i<attachCount; i++ ) {
			String line=reader.readLine();
			// url은 파일에 저장을 하지 않기 때문에 알 수가 없다!
			AttachFileInfo file = new AttachFileInfo(line,line);
			files.add(file);
		}
		return files;
	}

}
