package net.hayarobi.imgcrawler.config;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map.Entry;
import java.util.Properties;

/**
 * @author hayarobi
 *
 */
public class CrawlerConfig {
	private static final String CONFIG_PROPERTIES = "config.properties";

	public static enum ConfigItemName {
		userid, password, communityId, reloadListCache, reloadContent, reloadAttach
		, crawlOutput, savingOutput // 일단 임시로 하드코딩 값이 들어감.
		, configDir // configDir만은 설정파일이 아닌 곳에서 가져온다.
	};
	
	public static enum SavingDBConfig {
		DBUrl, DBusername, DBpassword
		,idOffset,groupNumOffset,commentIdOffset 
		,code,writerId, imgUrlPrefix
	}
	
	public static enum ReloadContentType {
		none, attachExist, all
	}

	volatile private static CrawlerConfig instance;

	public static CrawlerConfig getInstance() {
		if (instance == null)
			throw new RuntimeException("config is not initialized");
		return instance;
	}

	public static void initWithDefaultDirectory() {
		initWithConfigDirectory("config");
	}
	synchronized public static void initWithConfigDirectory(String configDirectory) {
		if (instance != null)
			return;
		if (configDirectory == null)
			configDirectory = "config";
		File configFile = getConfigFile(configDirectory);
		// TODO: 초기화를 하자
		Reader rd;
		try {
			rd = new InputStreamReader(new FileInputStream(configFile), "UTF-8");
			Properties configFileProps = new Properties();
			configFileProps.load(rd);
			configFileProps.put(ConfigItemName.configDir.name(), configDirectory);
			instance = new CrawlerConfig();
			
			for (Entry<Object, Object>entry : configFileProps.entrySet()) {
				String name = entry.getKey().toString();
				String value = entry.getValue().toString().trim();
				instance.props.put(name, value);				
			}
			
			for(ConfigItemName requiredName : ConfigItemName.values() ) {
				if (instance.props.containsKey(requiredName.name()) != true)
					throw new RuntimeException("required property " + requiredName.name() + " is missisng");
			}

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch (FileNotFoundException e) {
			throw new RuntimeException("Cannot find config file" + configFile.getAbsolutePath());
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	protected static File getConfigFile(String configDirectory) {
		File baseDir = new File(configDirectory);
		if (baseDir.isDirectory() == false)
			throw new RuntimeException("Invalid config directory " + configDirectory);
		File configFile = new File(baseDir, CONFIG_PROPERTIES);
		return configFile;
	}

	private HashMap<String, String> props;

	private CrawlerConfig() {
		props = new HashMap<String, String>();
	}

	public String get(ConfigItemName name) {
		return get(name.name());
	}
	
	public String get(SavingDBConfig name) {
		return get(name.name());
	}

	public String get(String name) {
		return props.get(name);
	}
}
