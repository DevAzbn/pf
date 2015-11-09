
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
