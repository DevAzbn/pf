
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
