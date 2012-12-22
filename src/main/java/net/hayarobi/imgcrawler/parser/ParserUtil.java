package net.hayarobi.imgcrawler.parser;

import java.util.List;

import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.Segment;

public class ParserUtil {

	public static Element getElement(Segment source, String attrName, String value) {
		Element viewList =source.getFirstElement(attrName, value, true);
		if(viewList==null )
			throw new RuntimeException("invalid html : missing "+attrName+"="+value);
		return viewList;
	
	}

	public static List<Element> getAllElements(Segment source, String attrName, String value) {
		List<Element> viewList =source.getAllElements(attrName, value, true);
		if(viewList==null  )
			throw new RuntimeException("invalid html : missing "+attrName+"="+value);
		return viewList;
	
	}

}
