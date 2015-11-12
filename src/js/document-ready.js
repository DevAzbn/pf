var iface = {
	
	setActive:function(el, active){
		if(active) {
			el.addClass('active');
		} else {
			el.removeClass('active');
		}
	},
	
}

$(document).ready(function() {

	$(document.body)
		.on(
			'click',
			'.menu .menu-list li a',
			function(event){
				event.preventDefault();
				var btn = $(this);
				var href = btn.attr('href');
				iface.setActive($('.menu .menu-list li'), false);
				iface.setActive($('.content .item-block'), false);
				iface.setActive(btn.parent(), true);
				iface.setActive($(href), true);
				
				//$('.content').addClass('xs-active');
				$('.menu').removeClass('mobile-active');
				
				$('.dyn-text-container .item .title a.title-link.active').trigger('click');
			}
		);
	
	
	$(
		function(){
			var item_list = $('.menu .menu-list li a[href="' + window.location.hash + '"]');
			var size = item_list.size();
			if(size) {
				item_list.eq(0).trigger('click');
			} else {
				$('.menu .menu-list li a').eq(0).trigger('click');
			}
			//$('.menu').addClass('mobile-active');
		}
	);
	
	
	$(document.body)
		.on(
			'click',
			'.item-block .menu-btn',
			function(event){
				event.preventDefault();
				var btn = $(this);
				//$('.content').removeClass('xs-active');
				$('.menu').addClass('mobile-active');
			}
		);
	
	
	$(document.body)
		.on(
			'click',
			'.item .title .main_info .close-btn',
			function(event){
				event.preventDefault();
				var btn = $(this);
				btn.parent().parent().find('a.title-link').eq(0).trigger('click');
			}
		);
	
	$(document.body)
		.on(
			'click',
			'.dyn-text-container .item .title a.title-link',
			function(event){
				event.preventDefault();
				var btn = $(this);
				if(btn.hasClass('active')) {
					$('.dyn-text-container .item').removeClass('passive');
					$('.dyn-text-container .item .preview').removeClass('nowrap');
					btn.parent().parent().removeClass('passive');
					$('.item-block .menu-btn').removeClass('passive');
					btn.removeClass('active');
				} else {
					$('.dyn-text-container .item').addClass('passive');
					btn.parent().parent().find('.preview').addClass('nowrap');
					btn.parent().parent().removeClass('passive');
					$('.item-block .menu-btn').addClass('passive');
					btn.addClass('active');
				}
			}
		);

[snp tpl="src/_/concat.document-ready.js" ]


$(window).on('resize',function(event){
	
	
	[snp tpl="src/_/concat.window-resize.js" ]
	
	
}).trigger('resize');


$(window).on('scroll',function(){

	
	[snp tpl="src/_/concat.window-scroll.js" ]
	

}).trigger('scroll');


});