package net.hayarobi.imgcrawler.domain;

import java.util.Map;

public class SavingFileString {
	private static final SavingFileString emptyString = new SavingFileString("", "");
	public static SavingFileString emptyFiles() {
		return emptyString;
	}
	
	public static SavingFileString createSavingFileString(Map<String, SavingFile> savingFileMap) {
		int fileCount = savingFileMap.size();
		if( fileCount == 0 )
			return emptyFiles();
		
		// 첨부파일
		StringBuffer fileNames= new StringBuffer(fileCount*64);
		StringBuffer fileSizes = new StringBuffer(fileCount*64);
			for(SavingFile sf : savingFileMap.values() ) {
				fileNames.append(sf.getFilename());
				fileNames.append('|');
				fileSizes.append(sf.getSize());
				fileSizes.append('|');
			}
			fileNames.deleteCharAt(fileNames.length()-1);
			fileSizes.deleteCharAt(fileSizes.length()-1);

		return new SavingFileString(fileNames.toString(), fileSizes.toString());
	}
	
	private final String fileNames;
	private final String fileSizes;
	public SavingFileString(String fileNames, String fileSizes) {
		super();
		this.fileNames = fileNames;
		this.fileSizes = fileSizes;
	}
	public String getFileNames() {
		return fileNames;
	}
	public String getFileSizes() {
		return fileSizes;
	}
	
}
