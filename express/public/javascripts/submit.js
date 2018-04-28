$submit.click(function(event) {
	if(!($title.val()&&$author.val()&&$content.val()&&$comment.val()&&$pic.val())){
		$textError.html("表单不完整")
				.removeClass('hidden');
		return;

	}
	var x1=parseFloat($x1.html());
	var y1=parseFloat($y1.html());
	var x2=parseFloat($x2.html());
	var y2=parseFloat($y2.html());
	var w=parseFloat($w.html());
	var h=parseFloat($h.html());
	$textError.addClass('hidden');
	/* Act on the event */
	var params={};
	params.title=$title.val();
	params.author=$author.val();
	params.content=$content.val();
	params.comment=$comment.val();
	params.img={};
	var img=params.img;
	var target=$("div.jcrop-holder img.col-md-12").get(0);
	// var target=document.getElementById("target");
	console.log(target);
	img.data=getData(target,x1,y1,w,h);
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
	$.post('/pic',params, function(data, textStatus, xhr) {
		/*optional stuff to do after success */
		alert(data);
	});
	console.log(params);
});
var getData=function(img,x1,y1,w,h){
	var newImg=new Image();
	newImg.src=img.src;
	var a=newImg.width/600;
	var canvas=document.createElement("canvas");
	var context=canvas.getContext("2d");
	canvas.width=w*a;
	canvas.height=h*a;
	// canvas.width=img.width;
	// canvas.height=img.height;
	console.log(canvas.width,canvas.height);
	context.drawImage(img,x1*a,y1*a,w*a,h*a,0,0,w*a,h*a);
	// context.drawImage(img,0,0,img.width,img.height);	
	// context.drawImage(img,parseFloat($x1.html()),parseFloat($y1.html()),parseFloat($w.html()),parseFloat($h.html()),0,0,parseFloat($w.html()),parseFloat($h.html()));
	return canvas.toDataURL();
}
var getOriginalSize=function(oldImg,str){
	var newImg=new Image();
	newImg.src=oldIm.src;
	return newImg[str];
}