var init=function(){
	var jcrop_api,
	        boundx,
	        boundy;

	        // Grab some information about the preview pane
	        var $target=$("#target");
	       var  $preview = $('#preview-pane');
	        var $pcnt = $('#preview-pane .preview-container');
	        var $pimg = $('#preview-pane .preview-container img');

	        xsize = $pcnt.width(),
	        ysize = $pcnt.height();
	    
	    console.log('init',[xsize,ysize]);
	    $('#target').Jcrop({
	      onChange: updatePreview,
	      onSelect: updatePreview,
	      aspectRatio:5/3
	      // aspectRatio: xsize / ysize
	    },function(){
	      // Use the API to get the real image size
	      var bounds = this.getBounds();
	      if(bounds[0]<=610){
	      	boundx=bounds[0];
	      	boundy=bounds[1];
	      	// alert("Fff");
	      }
	      else{
		boundx =600 ;
		boundy = bounds[1]/(bounds[0]/600);

	      }
	      // Store the API in the jcrop_api variable
	      jcrop_api = this;

	      // Move the preview into the jcrop container for css positioning
	      $preview.appendTo(jcrop_api.ui.holder);
	    });

	    function updatePreview(c)
	    {
	      if (parseInt(c.w) > 0)
	      {
	        var rx = xsize / c.w;
	        var ry = ysize / c.h;
	       	 $x1.html(c.x.toFixed(3));
		$y1.html(c.y.toFixed(3));
		$x2.html(c.x2.toFixed(3));
		$y2.html(c.y2.toFixed(3));
		$w.html(c.w.toFixed(3));
		$h.html(c.h.toFixed(3));
	        $pimg.css({
	          width: Math.round(rx * boundx) + 'px',
	          height: Math.round(ry * boundy) + 'px',
	          marginLeft: '-' + Math.round(rx * c.x) + 'px',
	          marginTop: '-' + Math.round(ry * c.y) + 'px'
	        });	
	        // console.log($pimg.css("width")+$pimg.css("height")+$pimg.css("marginLeft")+$pimg.css("marginTop"));
	      }
	    };
}