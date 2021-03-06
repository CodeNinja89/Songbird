function getSong(wavesurfer) {
	$(".controls").hide();
	$.get("/shuffle", function(data) {
		var html = "Now playing <b>" + data.songs.title + "</b> by <b>" +
					data.songs.artist + "</b> from <b>" + data.songs.album + "</b>";
		$("#tags").html(html);
		wavesurfer.load("/play?song=" + data.songs.path);
		wavesurfer.on('ready', function() {
			$("#loader").fadeOut();
			$(".controls").fadeIn();
			wavesurfer.play();
		});
	});
}

$(document).ready(function () {
	// play with waveforms
	var wavesurfer = Object.create(WaveSurfer);
	wavesurfer.init({
		container: document.querySelector('#waveform'),
		waveColor: 'grey',
		progressColor: 'black',
		minPxPerSec: 60,
		hideScrollbar: true
	});
	$("#shuffle").click(function() {
		getSong(wavesurfer);
	});
	$("#pause").click(function() {
		wavesurfer.playPause();
	});
	wavesurfer.on('finish', function() {
		getSong(wavesurfer);
	});
	getSong(wavesurfer);
});
