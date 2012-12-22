package net.hayarobi.imgcrawler.http;

import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

/**
 * @author hayarobi
 * 로그인 작업을 수행한다. login메써드를 호출하고 나면 httpclient객체에 로그인 세션을 남겨둔다. 
 * 그 다음부터는 그 httpclient객체에 요청을 계속 던지면 그 세션으로 접속을 한다.
 */
public class Loginer {
	public boolean login(DefaultHttpClient httpclient, String id,
			String password) {
		HttpGet httpget = new HttpGet("https://ses.freechal.com/signin/verify.asp");
		try {
			HttpResponse response = httpclient.execute(httpget);
			HttpEntity entity = response.getEntity();

			System.out.println("Login form get: " + response.getStatusLine());
			EntityUtils.consume(entity);

			System.out.println("Initial set of cookies:");
			List<Cookie> cookies = httpclient.getCookieStore().getCookies();
			if (cookies.isEmpty()) {
				System.out.println("None");
			} else {
				for (int i = 0; i < cookies.size(); i++) {
					System.out.println("- " + cookies.get(i).toString());
				}
			}

			HttpPost httpost = new HttpPost(
					"https://ses.freechal.com/signin/verify.asp");

			List<NameValuePair> nvps = new ArrayList<NameValuePair>();
			nvps.add(new BasicNameValuePair("LOGINURL",
					"http://home.freechal.com/sorikid/"));
			nvps.add(new BasicNameValuePair("OpenMsg", "false"));
			nvps.add(new BasicNameValuePair("Secret", "false"));
			nvps.add(new BasicNameValuePair("ViewHompy", "false"));
			nvps.add(new BasicNameValuePair("OrgRefer", ""));
			nvps.add(new BasicNameValuePair("loginLevel", "1"));
			nvps.add(new BasicNameValuePair("otp1", ""));
			nvps.add(new BasicNameValuePair("otp2", ""));
			nvps.add(new BasicNameValuePair("UserID", id));
			nvps.add(new BasicNameValuePair("Password", password));
			// nvps.add(new BasicNameValuePair("", ""));

			httpost.setEntity(new UrlEncodedFormEntity(nvps, "EUC-KR"));

			response = httpclient.execute(httpost);
			entity = response.getEntity();
			// FIXME: 로그인 성공 여부를 좀 더 정확히 알 방법은 없을까?
			int statusCode = response.getStatusLine().getStatusCode();
			// TODO 발급받은 쿠키 정보로 로그인 여부 확인하기.
			
			if (200 == statusCode || 302 == statusCode ) {
				EntityUtils.consume(entity);
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
