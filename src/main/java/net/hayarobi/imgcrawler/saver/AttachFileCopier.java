package net.hayarobi.imgcrawler.saver;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.channels.FileChannel;
import java.util.HashMap;
import java.util.LinkedHashMap;

import net.hayarobi.imgcrawler.domain.AttachFileInfo;
import net.hayarobi.imgcrawler.domain.CrawlerConstants;
import net.hayarobi.imgcrawler.domain.SavingFile;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.file.CrawlerPathManager;
import net.hayarobi.imgcrawler.util.StringUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 첨부파일들 새 게시판 구조에 맞게 복사한다. 
 * 새 게시판은 파일명이 날짜 디렉토리에 저장되고 파일명 뿐 아니라 파일 크기도 들어가 있다.
 * 
 * 1회용 객체다. 하나의 인스턴스를 두 번 호출하지 말자.
 * @author hayarobi
 *
 */
public class AttachFileCopier {
	private static Logger log = LoggerFactory.getLogger(AttachFileCopier.class);
	
	/**
	 * 이전 게시판의 파일명과 새로 저장된 파일 정보의 매핑
	 */
	private LinkedHashMap<String, SavingFile> savingFileMap;

	private SavingViewInfo sv;
	private File sourceAttachDir;
	private File targetDir;
	private String contextPathprefix;
	private CrawlerPathManager pathManager;
	
	public AttachFileCopier(CrawlerPathManager pathManager, SavingViewInfo sv) {
		this.sv = sv;
		sourceAttachDir = pathManager.getCrawlAttachDirectory(sv.getOldBBS(), sv.getPv());
		contextPathprefix = pathManager.getSavingImgUrlPrefix()+"/"+pathManager.getSavingDirString(sv.getPv().getDatetime());
		targetDir = pathManager.getSavingAttachDirectory(sv);
	}
	
	public HashMap<String, SavingFile> copyAttachedFile() {
		int attachFileCnt = sv.getPv().getAttachFileList().size(); // 첨부파일 갯수
		savingFileMap = new LinkedHashMap<String, SavingFile>(attachFileCnt);
		// 첨부파일의 위치

		log.debug("[Attach File] : " + attachFileCnt + " ...");
		for (AttachFileInfo attachFileInfo : sv.getPv().getAttachFileList()) {
			// 첨부파일의 이름.
			String fileName = attachFileInfo.getFileName();
			File sourceFile = new File(sourceAttachDir, fileName);
			File targetFile = getTargetFile(fileName, sourceFile);
			SavingFile file = new SavingFile(targetFile.getName(), targetFile.length());
			file.setFileUrl(contextPathprefix+"/"+targetFile.getName());
			savingFileMap.put(fileName, file);

		}
		return savingFileMap;
	}

	private File getTargetFile(String fileName, File sourceFile) {
		String targetFileName = fileName;
		File targetFile = new File(targetDir, targetFileName);
		//  중복검사?
		while( targetFile.exists() ) {
			if( sourceFile.length() == CrawlerConstants.NO_IMAGE_FILE_SIZE ) {
				log.info(sourceFile.getPath()+": source file is noImageFile. skip copying");
				return targetFile;
			}
			if( targetFile.length() == CrawlerConstants.NO_IMAGE_FILE_SIZE ) {
				log.info(sourceFile.getPath()+": target file is noImageFile. force copying");
				break;
			}
			if(isSameFile(sourceFile, targetFile) )  {
				log.info(sourceFile.getPath()+": same size of target file is already exist. skip copying");
				// 동일한 파일로 간주. 해당 파일을 그대로 사용.
				return targetFile;
			} else {
				log.info(sourceFile.getPath()+": different size of target file is already exist. renaming target");				
				targetFileName = StringUtil.nextNumericFilename(targetFileName);
				targetFile = new File(targetDir, targetFileName);
			}
		}
		// 파일이 없으니 복사
		copyFile(sourceFile, targetFile);

		return targetFile;
	}

	private void copyFile(File sourceFile, File targetFile) {
		// 복사
		FileChannel fcin = null;
		FileChannel fcout = null;
		FileInputStream inputStream = null;
		FileOutputStream outputStream = null;
		try {			
			inputStream = new FileInputStream(sourceFile);
			outputStream = new FileOutputStream(targetFile);
			
			// 채녈 생성
			fcin = inputStream.getChannel();
			fcout = outputStream.getChannel();
			
			// 채널을 통한 스트림 전송
			long size = fcin.size();
			fcin.transferTo(0, size, fcout);
		} catch (FileNotFoundException e) {
			log.error(e.getMessage(), e);
			throw new RuntimeException(e);
		} catch (IOException e) {
			log.error(e.getMessage(), e);
			throw new RuntimeException(e);
		} finally {
			try {outputStream.close();} catch (IOException ignore) {}
			try {inputStream.close();} catch (IOException ignore) {}
		}
	}

	private boolean isSameFile(File sourceFile, File targetFile) {
		return sourceFile.length() == targetFile.length();
	}
}
