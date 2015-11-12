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
			html : '<a class="menu-btn not-md not-lg iconic ui-btn list" href="#menu" data-title="' + title + '" ></a><div class="allmargin" >' + html + '</div>',
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


	$('.arrow-slider').each(function(index){
		event.preventDefault();
		
		var block = $(this);
		var imgs = block.find('.img-block .item');
		var content = block.find('.text-content');
		var title_block = block.find('.title-block');
		var arrow_block = block.find('.arrow-block');
		var point_line = arrow_block.find('.point-line');
		//var counter = block.find('.info-block .counter');
		//var position = counter.find('.position');
		
		imgs.each(function(index){
			//$(this).attr('data-index', index+1);
			$('<a/>',{
				class : 'item',
				html : '<span class="point" ></span>',
				href : '#image-' + index,
			})
			.on('click.arrow-slider.point',function(event){
				console.log('click.arrow-slider.point');
				var i = $(this).index();
				point_line.find('.item').removeClass('active');
				imgs.fadeOut('fast').removeClass('active');
				$(this).addClass('active');
				imgs.eq(i).fadeIn('fast').addClass('active');
			})
			.appendTo(point_line);
		});
		/*
		imgs.eq(0).each(function(index){
			$(this).addClass('active');
			//counter.find('.position').html(index+1);
			//counter.find('.form').html(imgs.size());
		});
		*/
		arrow_block.on('click.arrow-slider.right', '.btn-arrow.right', function(event){
			var p = point_line.find('.item');
			var i = p.filter('.active').eq(0).index();
			var nxt = p.eq(i).next('.item');
			if(nxt.size()) {
				nxt.trigger('click');
			} else {
				p.eq(0).trigger('click');
			}
		});
		arrow_block.on('click.arrow-slider.left', '.btn-arrow.left', function(event){
			var p = point_line.find('.item');
			var i = p.filter('.active').eq(0).index();
			var nxt = p.eq(i).prev('.item');
			if(nxt.size()) {
				nxt.trigger('click');
			} else {
				p.eq(-1).trigger('click');
			}
		});
		
		if(block.hasClass('with-timer')) {
			block.data('fecss-timer', setInterval(function(){
				if(block.is(':hover')) {
					
				} else {
					arrow_block.find('.btn-arrow.right').trigger('click');
				}
			}, 3000))
		}
		
		if(point_line.find('.item.active').size()) {
			
		} else {
			point_line.find('.item').eq(0).trigger('click');
		}
		
	});
	
	
	$(document.body).on('click', '.can-close .close-btn', function(event){
		event.preventDefault();
		$(this).closest('.can-close').removeClass('active');
	});
	
	
	//console.log(hljs.listLanguages());
	
	/*
	hljs.configure({
		//useBR: true,
		//languages : ['apache', 'bash', 'coffeescript', 'cpp', 'cs', 'css', 'diff', 'http', 'ini', 'java', 'javascript', 'json', 'makefile', 'xml', 'markdown', 'nginx', 'objectivec', 'perl', 'php', 'python', 'ruby', 'sql'],
		languages : ['bash', 'css', 'http', 'javascript', 'json', 'php', 'sql'],
	});

	$('.code-editable').each(function(index, block) {
		hljs.highlightBlock(block);
	});
	*/
	
	$('.code-editable-block').each(function(index){
		var block = $(this);
		var name = block.find('.code-name').eq(0);
		var value = block.find('.code-value').eq(0);
		var status = block.find('.code-status').eq(0);
		
		$(document.body).on('click.code-editable', '.code-editable-block .code-btn.open', function(event){
			$.get(
				'/pagebuilder/code-editable/open',
				{
					name : name.val(),
				},
				function(data){
					value.text(data);
					status.text('opened');
					
					/*
					$('.code-editable').each(function(index, block) {
						hljs.highlightBlock(block);
					});
					*/
				}
			);
		});
		
		$(document.body).on('click.code-editable', '.code-editable-block .code-btn.save', function(event){
			$.post(
				'/pagebuilder/code-editable/save',
				{
					name : name.val(),
					value : value.text(),
				},
				function(data){
					status.text(data);
				}
			)
		});
		
		var hash = window.location.hash.substr(1);
		if(hash != '') {
			name.val(hash);
			block.find('.code-btn.open').trigger('click');
		}
		
	})

/*
start .fecss document-ready
*/
	
	$(
		function() {
			var res = 'noname-browser';
			var userAgent = navigator.userAgent.toLowerCase();
			if (userAgent.indexOf('msie') != -1) res = 'msie';
			if (userAgent.indexOf('konqueror') != -1) res = 'konqueror';
			if (userAgent.indexOf('firefox') != -1) res = 'firefox';
			if (userAgent.indexOf('safari') != -1) res = 'safari';
			if (userAgent.indexOf('chrome') != -1) res = 'chrome';
			if (userAgent.indexOf('chromium') != -1) res = 'chromium';
			if (userAgent.indexOf('opera') != -1) res = 'opera';
			if (userAgent.indexOf('yabrowser') != -1) res = 'yabrowser';
			
			$('body.fecss').eq(0).addClass(res);
		}
	);

/*
end .fecss document-ready
*/


/*
start .got-to-top document-ready
*/

$(document.ready).on('click', '.go-to-top', function(event){
	event.preventDefault();
	$('body').jqfeScrollTo({diff:0,speed:777});
});

/*
end .got-to-top document-ready
*/


	$('.page-loader .close-loader').on('click',function(event){
		event.preventDefault();
		$('.page-loader').removeClass('active');
	});
	$(window).load(function(event){
		$('.page-loader').removeClass('active');
	});


/*
start .scrollto document-ready
*/

$('.scrollto').on('click', function(event){
	event.preventDefault();
	$($(this).attr('href')).eq(0).jqfeScrollTo({diff:0,speed:777});
});

/*
end .scrollto document-ready
*/



$(window).on('resize',function(event){
	
	
	
/*
start .fecss window-resize
*/

	$(
		function() {
			var size = {
				xs : {
					min : 0,
					max : 768,
				},
				sm : {
					min : 767,
					max : 992,
				},
				md : {
					min : 991,
					max : 1200,
				},
				lg : {
					min : 1199,
					max : 10000,
				},
			};
			var cl = 'window-width';
			var w = $(window).outerWidth(true);
			var body = $('body.fecss').eq(0);
			if(w < size.xs.max) {
				body.removeClass('window-width-sm').removeClass('window-width-md').removeClass('window-width-lg');
				cl = 'window-width-xs';
			}
			if(w > size.sm.min && w < size.sm.max) {
				body.removeClass('window-width-xs').removeClass('window-width-md').removeClass('window-width-lg');
				cl = 'window-width-sm';
			}
			if(w > size.md.min && w < size.md.max) {
				body.removeClass('window-width-xs').removeClass('window-width-sm').removeClass('window-width-lg');
				cl = 'window-width-md';
			}
			if(w > size.lg.min) {
				body.removeClass('window-width-xs').removeClass('window-width-sm').removeClass('window-width-md');
				cl = 'window-width-lg';
			}
			$('body.fecss').eq(0).addClass(cl);
		}
	);

/*
end .fecss window-resize
*/


	
	
}).trigger('resize');


$(window).on('scroll',function(){

	
	
/*
start .go-to-top window-scroll
*/

$(
	function() {
		
		var pos = $(document).scrollTop();
		
		var gototop = $('.go-to-top');
		if(gototop.hasClass('active')) {
			if(pos < 200) {
				gototop.removeClass('active');
			}
		} else {
			if(pos > 200) {
				gototop.addClass('active');
			}
		}
		
	}
);

/*
end .go-to-top window-scroll
*/


/*
start .scrollto window-scroll
*/



/*
end .scrollto window-scroll
*/

	

}).trigger('scroll');


});