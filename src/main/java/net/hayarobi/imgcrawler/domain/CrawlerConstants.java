package net.hayarobi.imgcrawler.domain;


public abstract class CrawlerConstants {

	public static final String CACHE_FILE_SUFFIX = "_listcache.txt";
	public static final int PAGE_RELOAD_TERM = 5000;
	// 프리챌의 첨부파일 중에 없는 이미지는 no image라는 공통 이미지를 사용한다. 그 크기가 아래와 같다.
	public static final long NO_IMAGE_FILE_SIZE = 1654;

}
