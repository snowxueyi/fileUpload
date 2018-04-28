$submit.click(function(event) {
	if(!($title.val()&&$author.val()&&$content.val()&&$comment.val()&&$pic.val())){
		$textError.html("表单不完整")
				.removeClass('hidden');
		return;

	}
	$textError.addClass('hidden');
	/* Act on the event */
	var params={};
	params.title=$title.val();
	params.author=$author.val();
	params.content=$content.val();
	params.comment=$comment.val();
	params.img={};
	var img=params.img;
	var target=document.getElementById("target");
	img.data=getData(target);
	img.originalWidth=target.width;
	img.originalHeight=target.height;
	img.actualWidth=parseInt(target.style.width);
	img.actualHeight=parseInt(target.style.height);
	img.x1=parseFloat($x1.html());
	img.y1=parseFloat($y1.html());
	img.x2=parseFloat($x2.html());
	img.y2=parseFloat($y2.html());
	img.w=parseFloat($w.html());
	img.h=parseFloat($h.html());
	dataAjax=params;
	console.log(params);
});
var getData=function(img){
	var canvas=document.createElement("canvas");
	var context=canvas.getContext("2d");
	canvas.width=img.width;
	canvas.height=img.height;
	context.drawImage(img,0,0,img.width,img.height);
	return canvas.toDataURL();
}
var getOriginalSize=function(oldImg,str){
	var newImg=new Image();
	newImg.src=oldIm.src;
	return newImg[str];
}