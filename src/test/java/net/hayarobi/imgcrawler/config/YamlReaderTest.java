package net.hayarobi.imgcrawler.config;

import static net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName.communityId;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

import net.hayarobi.imgcrawler.config.CrawlerConfig.ConfigItemName;

import org.junit.Ignore;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yaml.snakeyaml.Yaml;

public class YamlReaderTest {
	public static final String configFile = "config.yaml";
	private static final Logger log = LoggerFactory.getLogger(YamlReaderTest.class);
	
	@Test
	public void makeFile() {
		Map<String, String> confMap = new HashMap<String, String>();
		
		confMap.put(communityId.name(),"sorinaneun");
		confMap.put("bbsId", "502");
		Yaml yaml = new Yaml();
		String result = yaml.dump(confMap);
		
		log.info("result :\n{}",result);
	}

//	@Ignore
	@Test
	public void testReadYaml() throws UnsupportedEncodingException, FileNotFoundException {
		InputStream is = this.getClass().getClassLoader().getResourceAsStream(configFile);
		Reader rd = new InputStreamReader(is, "UTF-8");
		Yaml yaml = new Yaml();
		Object conf = yaml.load(rd);

		log.info("Class {}",conf.getClass());
		log.info("Conf:\n{}",conf);
		
	}
}
