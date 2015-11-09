
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
