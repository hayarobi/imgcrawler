package net.hayarobi.imgcrawler.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import net.hayarobi.imgcrawler.saver.FilePageSaver.SingleLinePrefix;

import org.junit.Ignore;
import org.junit.Test;

@Ignore
public class TestReplacer {
	@Ignore
	@Test
	public void replaceText() throws Exception {
		File dir = new File("outs/VPDS");
		File outDir = new File("outs/vpds1");
		File[] files = dir.listFiles();
		for(File file : files ) {
			File outfile = new File(outDir, file.getName());
			BufferedReader rd = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
			BufferedWriter wt = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outfile), "UTF-8"));
			String  line = null;
			boolean inited = false;
			while( (line=rd.readLine()) != null ) {
				if( inited == true) {
					wt.append('\n');
				} else {
					inited = true;					
				}
				for( SingleLinePrefix prefix:  SingleLinePrefix.values() ) {
					if( line.startsWith(prefix.getValue()) == true ) {
						line = line.replaceFirst(prefix.getValue(), prefix.getPrefix());
						break;
					}
				}
				wt.append(line);
			}
			rd.close();
			wt.close();
		}
		
	}
}
