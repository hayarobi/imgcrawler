package net.hayarobi.imgcrawler.http;

import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.junit.Assert;
import org.junit.Test;

public class LoginerTest {
	
	private static final String PASSWORD = "hayapass";
	private static final String USERID = "hayarobipark";

	@Test
	public void showEnv() {
		Map<String, String> envMap = System.getenv();
		System.out.println("--- env variables");
		for(java.util.Map.Entry<String, String> ent : envMap.entrySet() ) {
			System.out.println(ent.getKey() + "=" +ent.getValue());
		}
		
		System.out.println("--- properties ");
		for(Entry<Object, Object> ent : System.getProperties().entrySet() ) {
			System.out.println(ent.getKey().toString() + "=" +ent.getValue().toString());
		}
	}
	@Test
	public void testLogin() {		
		DefaultHttpClient hc = crateHttpClient();
		loginCommunity(hc);
		System.out.println("--- 잘못된 패스워드:");
		Assert.assertFalse(new Loginer().login(hc, USERID, "Wrog Pass"));
		
		System.out.println("--- 정상 패스워드:");
		Assert.assertTrue(new Loginer().login(hc, USERID, PASSWORD));

	}
	
	protected static void loginCommunity(DefaultHttpClient hc) {
	}

	protected static DefaultHttpClient crateHttpClient() {
		DefaultHttpClient hc = new DefaultHttpClient();
		HttpParams httpParams = hc.getParams();
		HttpConnectionParams.setConnectionTimeout(httpParams, 10000);
		HttpConnectionParams.setSoTimeout(httpParams, 10000);
		return hc;
	}

}
