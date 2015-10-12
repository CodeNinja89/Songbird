$(document).ready(function () {
	$.get("/test/list", function(data) {
		$.each(data.songs, function(i, item) {
			alert(data.songs[i].path);
		});
	});
	var currentPosition = 0;
	var slideWidth = 1000;
	var slides = $('.slide');
	var numberOfSlides = slides.length;
	var slideShowInterval;
	var speed = 5000;
	slideShowInterval = setInterval(changePosition, speed);
	slides.wrapAll('<div id="slidesHolder"></div>')
	slides.css({ 'float' : 'left' });
	$('#slidesHolder').css('width', slideWidth * numberOfSlides);
	function changePosition() {
		if(currentPosition == numberOfSlides - 1) {
			currentPosition = 0;
		} else {
			currentPosition++;
		}
		moveSlide();
	}
	function moveSlide() {
		$('#slidesHolder').animate({'marginLeft' : slideWidth*(-currentPosition)});
	}
});
