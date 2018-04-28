$pic.change(function(event) {
	/* Act on the event */
	var url;
	
	var browser=navigator.appName;
	if(browser=="Microsoft Internet Explorer"){
		url=$(this).val();
	}
	else{
		url=window.URL.createObjectURL($(this).get(0).files[0]);
	}
	reboot();
	var $target=$("#target");
	var $previewImg=$(".jcrop-preview");
	$target.attr('src', url);
	$previewImg.attr('src', url);
	init();
	$("img").attr('src',url );
});
var reboot=function(){
	$cut.empty();
	var $target=$("<img id='target' class='col-md-12'></img>")
	$target.appendTo($cut);
	var $preview=$("<div id='preview-pane'><div class='preview-container'><img class='jcrop-preview' style='100%'></img></div></div>");
	$preview.appendTo($cut);

}