package net.hayarobi.imgcrawler.test;
import java.util.Map;
import java.util.Map.Entry;


public class Envs {
	public static void main(String[] args ) {
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
}
