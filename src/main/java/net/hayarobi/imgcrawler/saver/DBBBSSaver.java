package net.hayarobi.imgcrawler.saver;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.io.InputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.MalformedURLException;
import java.net.URLConnection;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import net.hayarobi.imgcrawler.db.DBSequenceGenerator;
import net.hayarobi.imgcrawler.db.PageInfoInsertJob;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;
import net.hayarobi.imgcrawler.domain.Comment;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingCommentInfo;
import net.hayarobi.imgcrawler.domain.SavingFile;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.loader.FilePageViewLoader;
import net.hayarobi.imgcrawler.util.AlbumImageFilenameUtil;
import net.hayarobi.imgcrawler.util.AttachImageFilenameUtil;
import net.hayarobi.imgcrawler.util.StringUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 게시판을 저장하는 클래스.
 * 
 * @author hayarobi
 *
 */
public class DBBBSSaver {
	private static Logger log =  LoggerFactory.getLogger(DBBBSSaver.class); 
	
	private String newBBSId;
	
	private DBSequenceGenerator sequenceGenerator;
	private SavingViewFactory savingViewFactory;
	
	private Connection conn;
	private List<BBSMetaInfo> metaList;
	
	private List<SavingViewInfo> saveViewList;
	private HashMap<String,Long> oldNewThreadIdMapping;
	private CrawlerPathManager pathManager = null;
	private File basePath;
	private static FileFilter filter = new FileFilter() {
		
		@Override
		public boolean accept(File pathname) {
			if( pathname.isDirectory() == true )
				return false;
			if( pathname.getName().endsWith(".txt") == false )
				return false;
			return true;
		}
	};

	public DBBBSSaver(DBSequenceGenerator savingDBManager, SavingViewFactory savingViewFactory, Connection conn, String newBBSId, List<BBSMetaInfo> metaList, CrawlerPathManager pathManager) {
		super();
		this.sequenceGenerator = savingDBManager;
		this.savingViewFactory = savingViewFactory;
		this.conn = conn;
		this.newBBSId = newBBSId;
		this.metaList = metaList;
		this.pathManager = pathManager;
		basePath = pathManager.getCrawlDirectory();
	}
	
	public void setNewBBSId(String newBBSId) {
		this.newBBSId = newBBSId;
	}

	public void saveBBS() throws SQLException {
		oldNewThreadIdMapping = new HashMap<String, Long>(metaList.size() << 9);
		saveViewList = new ArrayList<SavingViewInfo>(metaList.size() << 9);

		if (log.isDebugEnabled() == true) {
			log.debug("loading " + metaList.size() + " bbs files ");
		}
		loadBBSItemList();
		sortItemList();
		
		PageInfoInsertJob job = new PageInfoInsertJob(conn);

		for (Iterator<SavingViewInfo> it =saveViewList.iterator() ; it .hasNext() ; ) {
			SavingViewInfo viewInfo  = it.next();
			PageView pv = viewInfo.getPv();
			if (log.isDebugEnabled() == true) {
				log.debug("loading item " + viewInfo.getOldBBS().getBBSDirName() + ":" + pv.getItemId());
			}

			SavingViewInfo sv = setNewItemId(viewInfo);

			List<SavingCommentInfo>  scList = new ArrayList<SavingCommentInfo>();
			// 코멘트 저장하기
			for (Comment comment : pv.getCommentlist()) {
				scList.add(makeSavingComment(sv.getId(), comment));
			}
			sv.setSavingCommentList(scList);
			
			/**** 첨부파일 작업 start ***************************************/
			int attachFileCnt = pv.getAttachFileList().size(); // 첨부파일 갯수
			if (attachFileCnt > 0) {
				AttachFileCopier copier = new AttachFileCopier(pathManager, sv);
				sv.setSavingFileMap(copier.copyAttachedFile());
			}
			/**** 첨부파일 작업 end ***************************************/

			// 게시물 본문 수정
			// FIXME: if문 대신에 다른 방법을 찾아보자. (팩터리 메써드를 이용하면 될 것 같다)
			AttachImageFilenameUtil filenameUtil=null;
			if( BBSType.pic.equals(sv.getOldBBS().getBBSType()) ) {
				filenameUtil = AlbumImageFilenameUtil.get();				
			} else {
				filenameUtil = AttachImageFilenameUtil.get();
			}

			sv.setModifiedBody(new BodyModifier(pv.getContentBody(), sv.getSavingFileMap()).modifiedBody(filenameUtil));
			
			if (log.isDebugEnabled() == true) {
				logDebugSavingItem(sv);
			}
			// DB에 저장하기
			job.addInsertPageInfo(sv);
			// TODO:
		}
		job.execBatch();


	}

	private void sortItemList() {
		Collections.sort(saveViewList, new Comparator<SavingViewInfo>() {
			@Override
			public int compare(SavingViewInfo o1, SavingViewInfo o2) {
				long diff = o1.getTimestamp() - o2.getTimestamp();
				if (diff > 0)
					return 1;
				else if (diff < 0)
					return -1;
				else
					return 0;
			}
		});
		saveViewList = new ArrayList<SavingViewInfo>(saveViewList);
	}

	private void loadBBSItemList() {
		for (BBSMetaInfo meta : metaList) {
			if (log.isDebugEnabled() == true) {
				log.debug("loading " + metaList.size() + " bbs files ");
			}
			// bbs 디렉토리 확인
			File bbsDir = new File(basePath, meta.getBBSDirName());
			File[] viewFiles = bbsDir.listFiles(filter);
			for (File viewFile : viewFiles) {
				if (log.isDebugEnabled() == true) {
					log.debug("loading item " + meta.getBBSDirName() + ":" + viewFile.getName());
				}
				PageView pv = loadPageView(viewFile);
				SavingViewInfo sv = savingViewFactory.savingviewFromPageView(meta, pv);
				sv.setNewBBSId(newBBSId);
				saveViewList.add(sv);
			}
		}
	}
	private SavingCommentInfo makeSavingComment(long viewId, Comment comment) {
		SavingCommentInfo sc = new SavingCommentInfo();
		sc.setCommentid(sequenceGenerator.nextCommentOffset());
		sc.setViewId(viewId);
		sc.setDate(StringUtil.getDateFromCommentDate(comment.getDatetime()));
		sc.setTimestamp(StringUtil.getUnixtimestampFromDate(sc.getDate()));
		sc.setWriter(comment.getCommenter());
		sc.setBody(comment.getCommentBody());
		log.debug("Saving comment of viewId "+viewId+" to cmtId "+sc.getCommentid());
		return sc;
	}

	private SavingViewInfo setNewItemId(SavingViewInfo sv) {
		// pv에서 SavingViewInfo를 만들자.
		PageView pv = sv.getPv();
		long newId = sequenceGenerator.nextIdOffset();
		sv.setId(newId);
		if( pv.getDepth() == 0 ) {
			long newThreadId = sequenceGenerator.nextThreadOffset();
			sv.setThreadId(newThreadId);
			oldNewThreadIdMapping.put(pv.getThreadId(), newThreadId);
		} else {
			Long newThreadId = oldNewThreadIdMapping.get(pv.getThreadId());
			if( newThreadId ==  null)
				throw new RuntimeException("Can't find parent View threadId "+pv.getThreadId());
			sv.setThreadId(newThreadId);
		}
		return sv;
	}

	private void logDebugSavingItem(SavingViewInfo sv) {
		PageView pv = sv.getPv();
		if (pv.getDepth() == 0)
			log.debug("Saving Item " + sv.getId() + "(" + sv.getThreadId() + ") from " + pv.getItemId()
					+ "(" + pv.getThreadId() + ")");
		else
			log.debug("Saving Reply " + sv.getId() + "(" + sv.getThreadId() + ") from " + pv.getItemId()
					+ "(" + pv.getThreadId() + ")");
	}
	
	private PageView loadPageView(File viewFile) {
		Reader reader;
		try {
			reader = new InputStreamReader(new FileInputStream(viewFile),"UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		} catch (FileNotFoundException e) {
			throw new RuntimeException(e);
		}
		return new FilePageViewLoader(reader).loadPageView();
	}
}
