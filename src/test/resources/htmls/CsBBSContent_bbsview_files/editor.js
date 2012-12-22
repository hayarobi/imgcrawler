function loadmedia() {
	var arrMediaList = document.all.tags("object");
	var i;

	for (i=0; i<arrMediaList.length; i++) {
		if (arrMediaList[i].classid.toUpperCase() == "CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" && arrMediaList[i].rsr.length > 40) {
			arrMediaList[i].ShowStatusBar = "-1";
			if (arrMediaList[i].rau == "0") {
				arrMediaList[i].autostart = "0"
			} else {
				arrMediaList[i].autostart = "-1"
			}
			arrMediaList[i].filename = arrMediaList[i].rsr;
		}
	}
}

function EDT_ViewImage() {
	if (typeof(event) == "object" && event.srcElement.tagName == "IMG") {
		window.open(event.srcElement.src.replace("GetFile","ViewImage"), "", "directories=no,location=no,menubar=no,resizable=yes,status=no,toolbar=no,scrollbars=yes");
	}
}




function fittingImage(target_img)
{
	var newWidth;
	var newImg;

	if (location.hostname == "dev2talkbox.freechal.co.kr" || location.hostname == "sttalkbox.freechal.com" || location.hostname == "talkbox.freechal.com") {
		var maxWidth = 678;

		newImg = new Image();
		newImg.src = target_img.src;
		imgw = newImg.width;
		imgh = newImg.height;

		if (imgw > maxWidth) {
			target_img.width = maxWidth;
			alert
			target_img.height = imgh * (maxWidth/imgw);
		} else {
			if (imgw > 0) {
				target_img.width = imgw;
				target_img.height = imgh;
			}
		}
	}else if (location.hostname == "dev2pr.freechal.co.kr" || location.hostname == "stpr.freechal.com" || location.hostname == "hompy.freechal.com") {
		var maxWidth = 580;

		newImg = new Image();
		newImg.src = target_img.src;
		imgw = newImg.width;
		imgh = newImg.height;

		if (imgw > maxWidth) {
			target_img.width = maxWidth;
			alert
			target_img.height = imgh * (maxWidth/imgw);
		} else {
			if (imgw > 0) {
				target_img.width = imgw;
				target_img.height = imgh;
			}
		}
	}
	else if (location.hostname == "dev2q.freechal.co.kr" || location.hostname == "stq.freechal.com" || location.hostname == "q.freechal.com") {
		var maxWidth = 540;

		newImg = new Image();
		newImg.src = target_img.src;
		imgw = newImg.width;
		imgh = newImg.height;

		if (imgw > maxWidth) {
			target_img.width = maxWidth;
			alert
			target_img.height = imgh * (maxWidth/imgw);
		} else {
			if (imgw > 0) {
				target_img.width = imgw;
				target_img.height = imgh;
			}
		}	

	}
	else{
		return false;
	}
}