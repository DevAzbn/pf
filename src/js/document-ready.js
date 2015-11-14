var iface = {
	
	setActive:function(el, active){
		if(active) {
			el.addClass('active');
		} else {
			el.removeClass('active');
		}
	},
	
	addItemBlock:function(title, href, html) {
		var menu_i = $('<li/>',{
			class : 'menu-item animated wobble long2x',
			html : '<a class="nowrap " href="#' + href + '" >' + title + '</a>',
		});
		var block_i = $('<div/>',{
			id : href,
			class : 'item-block ',
			html : html,//'<a class="menu-btn not-md not-lg iconic ui-btn list" href="#menu" data-title="' + title + '" ></a><div class="allmargin" >' + html + '</div>',
		});
		
		$('.content').eq(0).find('#' + href + '.item-block').empty().remove();
		$('.menu .menu-list').eq(0).find('.menu-item a[href="#' + href + '"]').empty().remove();
		
		block_i.prependTo($('.content').eq(0));
		menu_i.prependTo($('.menu .menu-list').eq(0)).find('a').trigger('click');
		
		var size = $('.menu .menu-list').eq(0).find('.menu-item').size();
		if(size > 8) {
			var del_i = $('.menu .menu-list').eq(0).find('.menu-item').eq(-1);
			var href = del_i.attr('href');
			del_i.empty().remove();
			$('.content').eq(0).find(href + '.item-block').eq(0).empty().remove();
		}
		
	},
	
	loadItemBlock:function(href) {
		$.get(href, {}, function(data){
			var buf = $('<div/>',{
				class : 'ajax-buffer',
			});
			buf.html(data);
			var menu_i = buf.find('.menu .menu-list .menu-item a').eq(0);
			var block_i = buf.find('.content .item-block').eq(0);
			var title = menu_i.html();
			var href = block_i.attr('id');
			var html = block_i.html();
			buf.empty().remove();
			iface.addItemBlock(title, href, html);
		});
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
				$('.content').scrollTop(0);
				
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
	
	
	$(document.body)
		.on(
			'click',
			'.ajax-load',
			function(event){
				event.preventDefault();
				var btn = $(this);
				iface.loadItemBlock(btn.attr('href'));
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