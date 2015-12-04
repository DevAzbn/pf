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
			html : '<a class="nowrap not-go" href="#' + href + '" >' + title + '</a>',
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
			'.menu .menu-list li a.not-go',
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
			var item_list = $('.menu .menu-list li a.not-go[href="' + window.location.hash + '"]');
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

$(".arrow-slider").each(function(i){event.preventDefault();var e=$(this),t=e.find(".img-block .item"),r=(e.find(".text-content"),e.find(".title-block"),e.find(".arrow-block")),n=r.find(".point-line");t.each(function(i){$("<a/>",{"class":"item",html:'<span class="point" ></span>',href:"#image-"+i}).on("click.arrow-slider.point",function(i){console.log("click.arrow-slider.point");var e=$(this).index();n.find(".item").removeClass("active"),t.fadeOut("fast").removeClass("active"),$(this).addClass("active"),t.eq(e).fadeIn("fast").addClass("active")}).appendTo(n)}),r.on("click.arrow-slider.right",".btn-arrow.right",function(i){var e=n.find(".item"),t=e.filter(".active").eq(0).index(),r=e.eq(t).next(".item");r.size()?r.trigger("click"):e.eq(0).trigger("click")}),r.on("click.arrow-slider.left",".btn-arrow.left",function(i){var e=n.find(".item"),t=e.filter(".active").eq(0).index(),r=e.eq(t).prev(".item");r.size()?r.trigger("click"):e.eq(-1).trigger("click")}),e.hasClass("with-timer")&&e.data("fecss-timer",setInterval(function(){e.is(":hover")||r.find(".btn-arrow.right").trigger("click")},3e3)),n.find(".item.active").size()||n.find(".item").eq(0).trigger("click")});
$(document.body).on("click",".can-close .close-btn",function(c){c.preventDefault(),$(this).closest(".can-close").removeClass("active")});
$(".code-editable-block").each(function(e){var o=$(this),t=o.find(".code-name").eq(0),d=o.find(".code-value").eq(0),c=o.find(".code-status").eq(0);$(document.body).on("click.code-editable",".code-editable-block .code-btn.open",function(e){$.get("/pagebuilder/code-editable/open",{name:t.val()},function(e){d.text(e),c.text("opened")})}),$(document.body).on("click.code-editable",".code-editable-block .code-btn.save",function(e){$.post("/pagebuilder/code-editable/save",{name:t.val(),value:d.text()},function(e){c.text(e)})});var n=window.location.hash.substr(1);""!=n&&(t.val(n),o.find(".code-btn.open").trigger("click"))});
$(function(){var e="noname-browser",r=navigator.userAgent.toLowerCase();-1!=r.indexOf("msie")&&(e="msie"),-1!=r.indexOf("konqueror")&&(e="konqueror"),-1!=r.indexOf("firefox")&&(e="firefox"),-1!=r.indexOf("safari")&&(e="safari"),-1!=r.indexOf("chrome")&&(e="chrome"),-1!=r.indexOf("chromium")&&(e="chromium"),-1!=r.indexOf("opera")&&(e="opera"),-1!=r.indexOf("yabrowser")&&(e="yabrowser"),$("body.fecss").eq(0).addClass(e)});
$(document.ready).on("click",".go-to-top",function(o){o.preventDefault(),$("body").jqfeScrollTo({diff:0,speed:777})});
$(".page-loader .close-loader").on("click",function(e){e.preventDefault(),$(".page-loader").removeClass("active")}),$(window).load(function(e){$(".page-loader").removeClass("active")});
$(".scrollto").on("click",function(e){e.preventDefault(),$($(this).attr("href")).eq(0).jqfeScrollTo({diff:0,speed:777})});


$(window).on('resize',function(event){
	
	
	$(function(){var w={xs:{min:0,max:768},sm:{min:767,max:992},md:{min:991,max:1200},lg:{min:1199,max:1e4}},d="window-width",i=$(window).outerWidth(!0),s=$("body.fecss").eq(0);i<w.xs.max&&(s.removeClass("window-width-sm").removeClass("window-width-md").removeClass("window-width-lg"),d="window-width-xs"),i>w.sm.min&&i<w.sm.max&&(s.removeClass("window-width-xs").removeClass("window-width-md").removeClass("window-width-lg"),d="window-width-sm"),i>w.md.min&&i<w.md.max&&(s.removeClass("window-width-xs").removeClass("window-width-sm").removeClass("window-width-lg"),d="window-width-md"),i>w.lg.min&&(s.removeClass("window-width-xs").removeClass("window-width-sm").removeClass("window-width-md"),d="window-width-lg"),$("body.fecss").eq(0).addClass(d)});

	
	
}).trigger('resize');


$(window).on('scroll',function(){

	
	$(function(){var a=$(document).scrollTop(),o=$(".go-to-top");o.hasClass("active")?200>a&&o.removeClass("active"):a>200&&o.addClass("active")});

	

}).trigger('scroll');


});