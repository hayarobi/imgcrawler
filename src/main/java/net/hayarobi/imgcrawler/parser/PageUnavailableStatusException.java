package net.hayarobi.imgcrawler.parser;

/**
 * 프리챌에서 사용불가 메시지가 떴을 때 던지는 예외.
 * @author hayarobi
 *
 */
public class PageUnavailableStatusException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1577249866848967332L;

	public PageUnavailableStatusException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

}
