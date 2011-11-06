xoAddJs("http://dev.jquery.com/view/trunk/plugins/autocomplete/jquery.autocomplete.js");
xoAddCss("http://dev.jquery.com/view/trunk/plugins/autocomplete/jquery.autocomplete.css");

//Allows dymanic adding of external js and css files
function xoAddJs(src){ document.writeln('<script src="'+src+'" type="text/javascript"></sc'+'ript>');}
function xoAddCss(src){document.writeln('<link rel="Stylesheet" type="text/css" href="'+src+'" />');}


$(document).ready(function () {
	
});


$.fn.extend({
	xoexpand: function(trigger,show,delay){
		var target = $(this);
		if(show==false){ target.hide(); }
		delay = delay || 500 //default value of 600 milliseconds
		trigger.css('cursor', 'pointer');
		trigger.click(function() {
			target.slideToggle(delay);
		});
	},
	xocomplete: function(keywords){
		$(this).autocomplete(keywords);
	},
	xobutton: function(onClick,onHover){
		var btn = $(this);
		btn.css('cursor', 'pointer');
		if(typeof onHover !="undefined"){
			btn.hover(function(){
				onHover(btn);
			});
		}
		btn.click(function(){
			onClick();
		});
	}
});

function xoajax(url, data, callback, image){
	if(typeof onHover !="undefined"){
		image.attr("src", "images/loading.gif");
		image.css("width","30px");
		image.css("height","30px");
	}
	$.ajax({
		type: "GET",
		url: url,
		data: data,
		success: function(response){
			if(typeof onHover !="undefined"){image.hide();}
			callback(response);}
	});
}



