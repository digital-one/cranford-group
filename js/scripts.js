var isTouchDevice = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isTouchDevice.Android() || isTouchDevice.BlackBerry() || isTouchDevice.iOS() || isTouchDevice.Opera() || isTouchDevice.Windows());
    }
};

// The plugin code
(function($){
    $.fn.parallax = function(options){
        var $$ = $(this);
        offset = $$.offset();
        var defaults = {
            "start": 0,
            "stop": offset.top + $$.height(),
            "coeff": 0.95
        };
        var opts = $.extend(defaults, options);
        return this.each(function(){
            $(window).bind('scroll', function() {
                windowTop = $(window).scrollTop();
                if((windowTop >= opts.start) && (windowTop <= opts.stop)) {
                    newCoord = windowTop * opts.coeff;
                    $$.css({
                        "background-position": "0 "+ newCoord + "px"
                    });
                }
            });
        });
    };
})(jQuery);


$(function(){

var _header_height,
	_window_height,
	_window_width,
	_mask_height,
	_center,
	_offset,
	_intro_height,
	_bottom,
	_top,
	_start_scroll,
	_current_curve_width,
	_current_curve_height,
	_req_curve_width,
	_req_blue_curve_width,
	_curve_pct_scale,
	_blue_curve_pct_scale,
	_curve_width,
	_curve_height,
	_blue_curve_width,
	_blue_curve_height,
	_curve_top,
	_curve_bottom,
	_curve_red_top,
	_curve_blue_top,
	_curve_red_pct_scale,
	_curve_red_height,
	_red_curve =  $('.curve.red');
	_blue_curve = $('.curve.blue'),
	_parallax_offset = 0,
	_parallax_offset_blue = 0,
	_window_scroll = $(window).scrollTop(),
	_parallax_move = -(_window_scroll/2),
	_parallax_move_blue = -(_window_scroll/1.2);


$('.arrow').on('click',function(e){
	e.preventDefault();
	var _animationSpeed = 500,
		_target = $(this).attr('href');
		//_target = '0';
	 $.scrollTo( _target, _animationSpeed, {
          easing: 'easeInOutExpo',
          offset: 0
        });
})



refresh_vars = function(){

	_header_height = $('#header').height(),
	_window_height = $(window).height() - _header_height,
	_window_width = $(window).width(),
	_mask_height = _window_height*3,
	_center = _mask_height/2,
	_offset = (_window_height/100)*10,
	_intro_height = $('#intro').outerHeight(),
	_top= (_window_height/100)*15,
	_bottom = (_window_height/100)*25,
	_start_scroll = _window_height + _header_height,
	_scroll_offset = _start_scroll/3,
	_curve_red_pct_scale = (_window_width/382) * 100;
	_curve_red_height = (592/100)* _curve_red_pct_scale,
	_curve_red_top = (_window_height*2) - _curve_red_height,
	_curve_blue_top = _window_height*2 +_offset,
	_current_curve_width = $('.curve.red').width(),
	_current_curve_height = $('.curve.red').height(),
	_current_blue_curve_width = $('.curve.blue').width(),
	_current_blue_curve_height= $('.curve.blue').height(),
	_req_curve_width = (_window_width/100)*105,
	_req_blue_curve_width = (_window_width/100)*105,
	_curve_pct_scale = (_req_curve_width/_current_curve_width)*100,
	_blue_curve_pct_scale = (_req_blue_curve_width/_current_blue_curve_width)*100,
	_curve_width = (_current_curve_width/100)*_curve_pct_scale,
	_curve_height = (_current_curve_height/100)*(_curve_pct_scale),
	_blue_curve_width = (_current_blue_curve_width/100)*_blue_curve_pct_scale,
	_blue_curve_height = (_current_blue_curve_height/100)*_blue_curve_pct_scale,
	_curve_top = -200,
	_curve_bottom = _window_height,
	_current_red_curve_pos = 0,
	_parallax_red_curve_pos = 0,
	_window_scroll = $(window).scrollTop(),
	_parallax_move = -(_window_scroll/2),
	_parallax_move_blue = -(_window_scroll/1.2),
	_parallax_offset = 0;
}

parallax_curve = function(){
_window_scroll = $(window).scrollTop(); //get the scroll position
_parallax_move = -(_window_scroll/2); //set the default parallax scroll position
_parallax_move_blue = -(_window_scroll/1.2);
_next_move = (_parallax_move + _parallax_offset); //set the next positon with offset
_next_move_blue = (_parallax_move_blue + _parallax_offset_blue);
_red_curve.css({
   'background-position' : '0 '+ _next_move +"px"//,
  });
_blue_curve.css({
   'background-position' : '0 '+ _next_move_blue +"px"//,
  });
}

parallax = function(){

if(!isTouchDevice.any()){
     parallax_curve();
  }
 

}

refresh_layout = function(){
	refresh_vars();
$('#mask').css({
	height: _mask_height+'px'
})
$('#intro').css({
	top: _center - (_intro_height/2)
})
$('#solutions').css({
	top: _top+'px'
})
$('#executive').css({
	left:0,
	bottom: _bottom+'px'
})
$('.curve.red').css({
	'background-position': '0  '+_curve_red_top+'px'
})

$('.curve.blue').css({
	'background-position': '0 '+ _curve_blue_top+'px'
})
}


stop_parallax = function(){
	$(window).off('scroll',parallax());
}
start_parallax  = function(){
	console.log('start parallax');
	$(window).on('scroll',function(){
		parallax()
	});
}
move_to_center = function(){
	stop_parallax();
	$("html,body").animate({
     	scrollTop: _start_scroll
     }, 200,function(){
     	refresh_vars();
	_req_pos = _curve_red_top;
	_req_blue_pos = _curve_blue_top;
	_parallax_offset = (_req_pos - 	_parallax_move);
	_parallax_offset_blue = (_req_blue_pos - _parallax_move_blue);
	//console.log('parallax offset='+_parallax_offset);
	//console.log('with offset='+ (_parallax_move + _parallax_offset));
	//console.log('current_pos='+_req_pos);
	//console.log('next_parrallax='+_parallax_move);
_red_curve.css({
   'background-position' : '0 '+ _req_pos +"px"//,
  });
_blue_curve.css({
   'background-position' : '0 '+ _req_blue_pos +"px"//,
  });
start_parallax();
     	$('#main').animate({
     		'opacity':1
     	},500);
     });
}

//start_parallax();

$(window).on('load',function(){
		refresh_layout();
		move_to_center();
})
$(window).on('resize',function(){
		refresh_layout();
		delay = setTimeout(function(){
			move_to_center();
		},500)
})
//$(window).trigger('resize');
//refresh_vars();
//refresh_layout();

 	
});



