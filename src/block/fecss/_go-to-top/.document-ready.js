
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
