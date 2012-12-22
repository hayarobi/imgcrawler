/*
 * ====================================================================
 *
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * ====================================================================
 *
 * This software consists of voluntary contributions made by many
 * individuals on behalf of the Apache Software Foundation.  For more
 * information on the Apache Software Foundation, please see
 * <http://www.apache.org/>.
 *
 */

package net.hayarobi.imgcrawler.http;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

import junit.framework.Assert;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.cookie.Cookie;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HTTP;
import org.apache.http.util.EntityUtils;
import org.junit.Ignore;
import org.junit.Test;

/**
 * A example that demonstrates how HttpClient APIs can be used to perform
 * form-based logon.
 */
@Ignore
public class TestFreeChalFormLogin {

	@Test
    public void testLogin() throws Exception {

        DefaultHttpClient httpclient = new DefaultHttpClient();
        try {
            HttpGet httpget = new HttpGet("https://ses.freechal.com/");

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

            HttpPost httpost = new HttpPost("https://ses.freechal.com/signin/verify.asp");

            List <NameValuePair> nvps = new ArrayList <NameValuePair>();
            nvps.add(new BasicNameValuePair("LOGINURL", "http://home.freechal.com/sorikid/"));
            nvps.add(new BasicNameValuePair("OpenMsg", "false"));
            nvps.add(new BasicNameValuePair("Secret", "false"));
            nvps.add(new BasicNameValuePair("ViewHompy", "false"));
            nvps.add(new BasicNameValuePair("OrgRefer", ""));
            nvps.add(new BasicNameValuePair("loginLevel", "1"));
            nvps.add(new BasicNameValuePair("otp1", ""));
            nvps.add(new BasicNameValuePair("otp2", ""));
            nvps.add(new BasicNameValuePair("UserID", "geesetower"));
            nvps.add(new BasicNameValuePair("Password", "aaa"));
//            nvps.add(new BasicNameValuePair("", ""));

            httpost.setEntity(new UrlEncodedFormEntity(nvps, "EUC-KR"));

            response = httpclient.execute(httpost);
            Assert.assertEquals(200, response.getStatusLine().getStatusCode());
            entity = response.getEntity();

            System.out.println("Login form POST: " + response.getStatusLine());
            EntityUtils.consume(entity);

            System.out.println("Post logon cookies:");
            cookies = httpclient.getCookieStore().getCookies();
            
            
            if (cookies.isEmpty()) {
                System.out.println("None");
            } else {
                for (int i = 0; i < cookies.size(); i++) {
                    System.out.println("- " + cookies.get(i).toString());
                }
            }
            System.out.println("=======================================");
            httpget = new HttpGet("http://bbs.freechal.com/ComService/Activity/BBS/CsBBSList.asp?GrpId=845246&ObjSeq=18");
            response = httpclient.execute(httpget);
            entity = response.getEntity();
//            Header encoding = entity.getContentEncoding();
//            System.out.println("encoding = "+encoding.getValue());
//            EntityUtils.consume(entity);
            InputStream is = entity.getContent();
            Reader rd = new BufferedReader(new InputStreamReader(is, "EUC-KR"));
            char[] buf = new char[65536];
            int readn = 0;
            while( (readn = rd.read(buf, 0, buf.length)) > 0 ) {
            	System.out.println(String.valueOf(buf, 0, readn));
            }

          } finally {
            // When HttpClient instance is no longer needed,
            // shut down the connection manager to ensure
            // immediate deallocation of all system resources
            httpclient.getConnectionManager().shutdown();
        }
    }
}
