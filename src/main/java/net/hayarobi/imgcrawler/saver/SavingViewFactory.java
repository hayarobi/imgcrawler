package net.hayarobi.imgcrawler.saver;

import net.hayarobi.imgcrawler.db.DBSequenceGenerator;
import net.hayarobi.imgcrawler.domain.BBSMetaInfo;
import net.hayarobi.imgcrawler.domain.PageView;
import net.hayarobi.imgcrawler.domain.SavingViewInfo;
import net.hayarobi.imgcrawler.util.StringUtil;

public class SavingViewFactory {
	public SavingViewInfo savingviewFromPageView(BBSMetaInfo meta, PageView pv) {
		// pv에서 SavingViewInfo를 만들자.
		SavingViewInfo sv = new SavingViewInfo(meta, pv);
		sv.setDate(StringUtil.getDateFromViewDate(pv.getDatetime()));
		sv.setTimestamp(StringUtil.getUnixTimeStampFromViewDate(pv.getDatetime()));
		return sv;
	}
	
	public SavingViewInfo buildSavingView(SavingViewInfo sv, DBSequenceGenerator sg) {
		SavingViewBuilder builder = new SavingViewBuilder(sv, sg);
		// FIXME: 메써드 명, 기타 순서 등등 
		builder.build1();
		builder.build2();
		return sv;
	}
}
