
function SendContent(formnm) {

  var MyComPop;
  MyComPop = window.open("" , "MyComPop","left=" + (window.screen.availWidth/2 - 220) + ",top=" + (window.screen.availHeight/2 - 170) + ",directories=no, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no,width=440,height=340");
  formnm.target = "MyComPop";
  formnm.submit();

}

function SendContent2(formnm,docid) {

  var MyDocContent;
  var MyComPop;

  MyDocContent = getElement("DocContent"+docid);

  formnm.Content.value = MyDocContent.innerHTML;

  MyComPop = window.open("" , "MyComPop","left=" + (window.screen.availWidth/2 - 220) + ",top=" + (window.screen.availHeight/2 - 170) + ",directories=no, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no,width=440,height=340");
  formnm.target = "MyComPop";
  formnm.submit();

}

function SendContent3(formnm) {

  var MyComPop;
  MyComPop = window.open("" , "MyComPop","left=" + (window.screen.availWidth/2 - 220) + ",top=" + (window.screen.availHeight/2 - 170) + ",directories=no, location=no, menubar=no, resizable=no, scrollbars=no, status=no, titlebar=no, toolbar=no,width=485,height=455");
  formnm.target = "MyComPop";
  formnm.submit();

}

function getElement(id, d) {
	if (!d) d = document;

	if (d.getElementById) {
		return d.getElementById(id);
	}
	if (d.layers && d.layers[id]) {
		return d.layers[id];
	}
	if (d.all && d.all[id]) {
		return d.all[id];
	}
}
