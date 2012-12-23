package net.hayarobi.imgcrawler.http;

import static net.hayarobi.imgcrawler.util.CrawlerUtil.utf8;

import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import net.htmlparser.jericho.Source;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author hayarobi
 * 로그인 작업을 수행한다. login메써드를 호출하고 나면 httpclient객체에 로그인 세션을 남겨둔다. 
 * 그 다음부터는 그 httpclient객체에 요청을 계속 던지면 그 세션으로 접속을 한다.
 */
public class Loginer {
	private final Logger log = LoggerFactory.getLogger(Loginer.class);
	
	public boolean login(DefaultHttpClient httpclient, String id,
			String password) {
		HttpGet httpget = new HttpGet("https://ses.freechal.com/signin/verify.asp");
		try {
			HttpResponse response = httpclient.execute(httpget);
			HttpEntity entity = response.getEntity();

			log.info("Login form get: " + response.getStatusLine());
			EntityUtils.consume(entity);

			log.info("Initial set of cookies:");
			List<Cookie> cookies = httpclient.getCookieStore().getCookies();
			if (cookies.isEmpty()) {
				log.info("None");
			} else {
				for (int i = 0; i < cookies.size(); i++) {
					log.info("- " + cookies.get(i).toString());
				}
			}

			HttpPost httpost = new HttpPost(
					"http://www.gongdong.or.kr/index.php?code=login");

			List<NameValuePair> nvps = new ArrayList<NameValuePair>();
			nvps.add(new BasicNameValuePair("mode",
					"login"));
			nvps.add(new BasicNameValuePair("gopage", "http://cafe.gongdong.or.kr/cafe.php?code=sorinaneun"));

			nvps.add(new BasicNameValuePair("id", id));
			nvps.add(new BasicNameValuePair("user_cook", ""));
			nvps.add(new BasicNameValuePair("pwd", password));

			// nvps.add(new BasicNameValuePair("", ""));

			httpost.setEntity(new UrlEncodedFormEntity(nvps, "UTF-8"));

			response = httpclient.execute(httpost);
			if( log.isDebugEnabled() ) {
				log.debug("Response Header : \n{}",Arrays.toString(response.getAllHeaders()));
			}
			entity = response.getEntity();
			// FIXME: 로그인 성공 여부를 좀 더 정확히 알 방법은 없을까?
			int statusCode = response.getStatusLine().getStatusCode();
			// TODO 발급받은 쿠키 정보로 로그인 여부 확인하기.

			if (200 == statusCode || 302 == statusCode ) {
				// TODO: body를 확인해서 봐야한다.
				Source source = new Source(new InputStreamReader(entity.getContent(), utf8));
				
				if( log.isDebugEnabled() )
					log.debug("{}", source.toString());
				EntityUtils.consume(entity);
				if( source.toString().contains("window.alert(") == true )
					return false;
				return true;
			}
			EntityUtils.consume(entity);
			return false;
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
//			httpclient.getConnectionManager().re
		}

	}
}
