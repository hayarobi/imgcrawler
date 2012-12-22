package net.hayarobi.imgcrawler.worker;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.SocketTimeoutException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import net.hayarobi.imgcrawler.cache.ListCacheLoader;
import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;
import net.hayarobi.imgcrawler.domain.CrawlerConstants;
import net.hayarobi.imgcrawler.domain.FailedAttachFile;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.http.FileDownloader;
import net.hayarobi.imgcrawler.parser.AlbumPageParser;
import net.hayarobi.imgcrawler.parser.ListParser;
import net.hayarobi.imgcrawler.parser.PageParser;
import net.hayarobi.imgcrawler.parser.PageUnavailableStatusException;
import net.hayarobi.imgcrawler.saver.BBSStorageManager;
import net.hayarobi.imgcrawler.saver.FilePageSaver;
import net.hayarobi.imgcrawler.saver.PageSaver;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;

public abstract class BBSCrawler {
	private static final int VIEW_PAGE_RETRY_COUNT = 10;
	private static final int LIST_PAGE_RETRY_COUNT = 20;
	private static Log log = LogFactory.getLog(BBSCrawler.class);
	protected DefaultHttpClient hc;
	
	protected BBSMetaInfo meta;
	protected int startingPage = 1;
	protected ViewSkipChecker skipChecker;
	protected BBSStorageManager storageManager;
	protected File pagePath;
	protected File attachPath;
	protected ListCacheLoader loader;
	
	// 현재 리스트 진행상황 
	protected String currentThreadId;
	protected int currentStep=0;
	
	public void setStorageManager(BBSStorageManager storageManager) {
		this.storageManager = storageManager;
	}

	public void setStartingPage(int startingPage) {
		this.startingPage = startingPage;
	}

	public void setHc(DefaultHttpClient hc) {
		this.hc = hc;
	}

	public void setMeta(BBSMetaInfo meta) {
		this.meta = meta;
	}

	public DefaultHttpClient getHc() {
		return hc;
	}

	public BBSMetaInfo getMeta() {
		return meta;
	}

	public int getStartingPage() {
		return startingPage;
	}
	
	public void setSkipChecker(ViewSkipChecker skipChecker) {
		this.skipChecker = skipChecker;
	}

	protected abstract ListParser createListParser();
	protected abstract PageParser getPageParser(PageView pageView);

	public void crawl() {
		int skipcnt = 0;
		int page = startingPage;
		ListParser listParser = null;
		loader = storageManager.getLoader();
		pagePath = storageManager.getPagePath();
		if (pagePath.exists() == false)
			pagePath.mkdirs();

		List<FailedAttachFile> failedAttachList = new ArrayList<FailedAttachFile>();
		try {
			while (true) {
				// HTTP client를 이용해 list html을 가져온다.
				// list Parser를 이용해 리스트 목록을 받아온다.
				listParser = loadListInfo(page);

				// loop.
				for (PageView pv : listParser.getPvList() ) {
					attachPath = new File(pagePath, pv.getItemId());
					// 파싱이 필요할지 검사.
					// 페이지가 존재하면 파싱 없이 넘어감
					if (skipChecker.canSkipPage(pv.getItemId(), page) == true) {
						skipcnt++;
						continue;
					}
	
					// 각 항목마다 페이지 파서로 파싱한다.
					try {
						pv = fillPageViewFields(pv, page);
					} catch (Exception e) {
						log.warn("loading page itemId:"+pv.getItemId()+" page "+page+" finally failed. error "+e.getMessage());
						continue;
					}
					storageManager.getViewPageSaver(pv).savePageInfo(pv);
					downloadAttachedFile(failedAttachList, pv);
				}
				// 다음 페이지가 존재하면 다음 페이지 파싱, 없으면 끝냄.
				if (listParser.isHasNextPage() == false)
					break;
				// 마지막 파싱한 페이지의 threadID를 저장한다. 다음 리스트에서는 이 것읏 가지고 댓글의 경우 아이디를 받는다.
				this.currentThreadId = listParser.getLastThreadId();
				this.currentStep = listParser.getCurrentStep();
				page++;
			}
			log.info("totally " + skipcnt + "page  is skipped");
			retryFailedDownloadFiles(failedAttachList);
			log.info("Lastly " + failedAttachList.size() + "files is failed to download");
			if( failedAttachList.size() > 0 ) {
				for(FailedAttachFile faf : failedAttachList ) {
					log.info("\t"+faf.getFilePath()+"/"+faf.getFileName()+" ; "+faf.getUrl());
				}
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected void retryFailedDownloadFiles(List<FailedAttachFile> failedAttachList) {
		int retrycnt = 0;
		while (retrycnt < 5 && failedAttachList.size() > 0) {
			System.out.println("retrying " + failedAttachList.size() + " failed downfiles after 5 seconds");
			try {Thread.sleep(20000);} catch (Exception e) {}
			
			for (Iterator<FailedAttachFile> it = failedAttachList.iterator(); it.hasNext();) {
				FailedAttachFile faf = it.next();
				try {
					FileDownloader.downloadFile(hc, faf.getHarr(), faf.getFilePath(), faf);
					// 다운로드 성공하면 목록에서 삭제
					it.remove();
				} catch (Exception e) {
					// 실패하면 목록에 여전히 남겨 둠.
				}
			}
			retrycnt++;
		}
	}

	protected void downloadAttachedFile(List<FailedAttachFile> failedAttachList, PageView pv) {
		// pv를 바탕으로 내용 저장 첨부파일 다운로드
		Header[] harr = new Header[] {
				new BasicHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"),
				new BasicHeader("Accept-Language", "ko-kr,ko;q=0.8,en-us;q=0.5,en;q=0.3"),
				new BasicHeader("Accept-Encoding", "gzip,deflate"),
				new BasicHeader("Accept-Charset", "EUC-KR,utf-8;q=0.7,*;q=0.7"),
				new BasicHeader("Referer", pv.getPageUri()) };

		if (pv.getAttachFileList() != null && pv.getAttachFileList().size() > 0) {
			if (attachPath.exists() == false)
				attachPath.mkdirs();

			for (AttachFileInfo af : pv.getAttachFileList()) {
				try {
					FileDownloader.downloadFile(hc, harr, attachPath, af);
				} catch (Exception e) {
					log.warn("Failed to Download " + af.getFileName() + " :"+e.getMessage(),e);
					failedAttachList
							.add(new FailedAttachFile(af.getFileName(), af.getUrl(), harr, attachPath));
					// TODO: 로그를 남기고 다음 파일 진행함.
				}
			}
		}
	}

	protected ListParser loadListInfo(int page) throws Exception {
		ListParser listParser = null;
		if( loader.hasPage(page)) {
			log.debug("page "+page+" is already cached. use that cache info");
			listParser = loader.getListParser(page);
			return listParser;
		}

		int retrycnt=0;
		listParser = createListParser();
		while(true) {
			try {
				listParser.setInputStream(getListHtml(page));
				listParser.setLastThreadId(currentThreadId);
				listParser.setCurrentStep(currentStep);
				listParser.parseListPage();
				break;
			} catch(PageUnavailableStatusException e) {
				if( retrycnt++ >= LIST_PAGE_RETRY_COUNT ) {
					throw e;
				}
				log.info("list "+page+" unavailable. wait 5 seconds and retry "+retrycnt);
				try { Thread.sleep(5000); } catch(InterruptedException ignore) {}
			}catch (RuntimeException e) {
				if( retrycnt++ >= VIEW_PAGE_RETRY_COUNT ) {
					throw e;
				}
				log.info("Error while parsing list "+page+", error "+e.getMessage());
				try { Thread.sleep(5000); } catch(InterruptedException ignore) {}
			}
	
		}
		// loader에도 저장하고 파일에도 추가한다.
		storageManager.saveListInfo(page, listParser);
		return listParser;
	}
	
	protected PageView fillPageViewFields(PageView pv, int page) throws Exception {
		String itemId = pv.getItemId();
		pv.setPageUri(meta.getViewUrl(itemId, page));
		int retrycnt=0;
		while(true) {
			try {
				InputStream is = getPageHtml(itemId, page);
				PageParser pp = getPageParser(pv);
				pp.setDataInputStream(is);
				pp.parsePage();
				break;
			} catch(PageUnavailableStatusException e) {
				if( retrycnt++ >= VIEW_PAGE_RETRY_COUNT ) {
					throw e;
				}
				log.info("page view "+itemId+" unavailable. wait 5 seconds and retry "+retrycnt);
				try { Thread.sleep(5000); } catch(InterruptedException ignore) {}
			} catch (SocketTimeoutException e) {
				if( retrycnt++ >= VIEW_PAGE_RETRY_COUNT ) {
					throw e;
				}
				log.info("page view "+itemId+"loading timeout itemId:"+itemId+" page "+page+", error "+e.getMessage());
				try { Thread.sleep(5000); } catch(InterruptedException ignore) {}
			}catch (RuntimeException e) {
				if( retrycnt++ >= VIEW_PAGE_RETRY_COUNT ) {
					throw e;
				}
				log.info("parsing error itemId:"+itemId+" page "+page+", error "+e.getMessage());
				try { Thread.sleep(5000); } catch(InterruptedException ignore) {}
			}
		}
		return pv;
	}

	protected InputStream getListHtml(int pageNum) throws Exception {
		HttpGet httpget = new HttpGet(meta.getListUrl(pageNum));
		HttpResponse response = null;
		int retrycnt = 5;
		while (true) {
			try {
				response = hc.execute(httpget);
				break;
			} catch (SocketTimeoutException e) {
				// timeout 걸리면 5회까지는 재시도.
				if (++retrycnt >= 5)
					throw e;
				log.debug("Socket timeout retrying "+retrycnt+"th attempt after 5 second");
				try { Thread.sleep(CrawlerConstants.PAGE_RELOAD_TERM); } catch (Exception ignore) {}
			}
		}
		HttpEntity entity = response.getEntity();
		if (response.getStatusLine().getStatusCode() != 200) {
			try { response.getEntity().getContent().close(); } catch (IOException ignore) {}
			throw new RuntimeException("page can't loaded : " + response.getStatusLine().toString());
		}
	
		InputStream is = entity.getContent();
		return is;
	}

	protected InputStream getPageHtml(String itemId, int pageNum) throws Exception {
		HttpGet httpget = new HttpGet(meta.getViewUrl(itemId, pageNum));
		HttpResponse response = null;
		int retrycnt = 5;
		while (true) {
			try {
				response = hc.execute(httpget);
				break;
			} catch (SocketTimeoutException e) {
				// timeout 걸리면 5회까지는 재시도.
				if (++retrycnt >= 5)
					throw e;
				try { Thread.sleep(CrawlerConstants.PAGE_RELOAD_TERM); } catch (Exception ignore) {}
			}
		}
		HttpEntity entity = response.getEntity();
		if (response.getStatusLine().getStatusCode() != 200) {
			try { response.getEntity().getContent().close(); } catch (IOException ignore) {}
			throw new RuntimeException("page can't loaded : " + response.getStatusLine().toString());
		}
	
		InputStream is = entity.getContent();
		return is;
	}


}
