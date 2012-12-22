package net.hayarobi.imgcrawler.saver;

import java.util.List;
import java.util.Map;

import net.hayarobi.imgcrawler.domain.SavingFile;
import net.hayarobi.imgcrawler.util.AttachImageFilenameUtil;
import net.htmlparser.jericho.Attribute;
import net.htmlparser.jericho.Element;
import net.htmlparser.jericho.OutputDocument;
import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.StartTag;

public class BodyModifier {
	private final String oldBody;
	private String body;
	private Map<String, SavingFile> attachMap;
	public BodyModifier(String oldBody, Map<String, SavingFile> attachMap) {
		super();
		this.oldBody = oldBody;
		this.attachMap = attachMap;
	}
	
	public String modifiedBody(AttachImageFilenameUtil filenameUtil) {
		Source source=new Source(oldBody);
		OutputDocument outDoc = new OutputDocument(source);
		// TODO: 맨 앞뒤 div태그를 벗겨내자.
		Element outerDiv = source.getFirstElement();
		StartTag tag = outerDiv.getStartTag();
		outDoc.remove(outerDiv.getStartTag());
		outDoc.remove(outerDiv.getEndTag());
		List<Element> imgLists = source.getAllElements("img");
		for (Element imgTag : imgLists) {
			Attribute srcAttr = imgTag.getAttributes().get("src");
			if( srcAttr == null )
				continue;
			String url = srcAttr.getValue();
			if( filenameUtil.isAttachImage(url) == false )
				continue;
			// 파일명은 urldecode를 해야한다.
			String fileName = filenameUtil.extractFileNameFromAttachUrl(url);
			SavingFile sf = attachMap.get(fileName);
			if( sf == null )
				continue;
			outDoc.replace(srcAttr, "src=\""+sf.getFileUrl()+"\"");
			
		}

		body = outDoc.toString();
		
		return body;
	}
}
