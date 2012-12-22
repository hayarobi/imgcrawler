package net.hayarobi.imgcrawler.config;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.BBSType;

/**
 * bbsList.txt파일에서 bbs정보를 읽어온다.
 * 
 * @author hayarobi
 * 
 */
public class BBSListLoader {
	public static final String BBS_LIST_FILENAME = "bbsList.txt";

	private BufferedReader reader;
	private List<BBSMetaInfo> metalist;

	private File bbsListFile;
	private String communityId;


	public BBSListLoader(File parentDir, String communityId) {
		super();
		this.bbsListFile = new File(parentDir, BBS_LIST_FILENAME);
		this.communityId = communityId;
	}

	public List<BBSMetaInfo> loadBBSList() {
		parseList();
		return metalist;
	}

	private void loadListFile() {
		// 1. check existance
		if (bbsListFile.isFile() == false)
			throw new RuntimeException("Invalid list file " + bbsListFile.getName());
		// 2. load file
		try {
			reader = new BufferedReader(new InputStreamReader(new FileInputStream(bbsListFile), "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("Invalid text encoding ");
		} catch (FileNotFoundException e) {
			throw new RuntimeException("list file " + bbsListFile.getName() + " does not exist");
		}
	}
	
	private void parseList() {
		String line =  null;
		metalist = new ArrayList<BBSMetaInfo>(); 
		loadListFile();
		try {
			while( null != (line=reader.readLine()) ) {
				if(  isComment(line) ||  isWhileSpace(line) )
					continue;
				if( isFinisher(line) )
					break;
				parseLine(line);
			}
		} catch (IOException e) {
			throw new RuntimeException("Failed to read file " + bbsListFile.getName() + ":" + e.getMessage(),e);
		} finally {
			try { reader.close(); } catch (IOException ignore) {}
		}
	}

	protected boolean isComment(String line) {
		return line.startsWith("#");
	}
	
	protected boolean isWhileSpace(String line) {
		return line.trim().length() == 0;
	}
	
	protected boolean isFinisher(String line) {
		return line.startsWith("////");
	}

	private void parseLine(String line) {
		StringTokenizer tok = new StringTokenizer(line,":");
		if( tok.countTokens() < 3 )
			throw new RuntimeException("Failed to parse line " +line);
		String typeStr = tok.nextToken();
		BBSType type = BBSType.valueOf(typeStr);
		String objSeq = tok.nextToken();
		String bbsName = tok.nextToken();
		BBSMetaInfo meta = new BBSMetaInfo(type, communityId, objSeq, bbsName);
		// 추가 정보가 존재하는지 여부
		if( tok.hasMoreTokens() ) {
			meta.setPortingParameter(tok.nextToken());
		}
		metalist.add(meta);
	}

}
