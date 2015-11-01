var fs = require('fs');
var metadata = require('audio-metadata');
var location = "/Users/ninja/Music/iTunes/iTunes\ Media/Music/";
var recursive = require('recursive-readdir');
var playlist = new Array();

exports.init = function(req, res) {
	res.sendFile('try3.html', {root: 'public'}); // must specify root (if not already in the present directory) directory where static files are stored.

	recursive(location, function(err, files) {
		// console.log(files);
		for(var i = 0; i < files.length; i++) {

			if(files[i].match(/\.mp3+$/i)) { // regex bingo!
				// console.log("hello");
				var buffer = fs.readFileSync(files[i]);
				var tags = metadata.id3v2(buffer); // id3v2 bingo!

				var artist = tags.TPE2 || "unknown";
				var title = tags.title || "unknown";
				var album = tags.album || "unknown";
				// console.log(tags);
				playlist.push({artist: artist, title: title, album: album,
								path: files[i]});
			}
		}
	});
	// console.log(playlist);
};

exports.shuffle = function(req, res) {
	var index = Math.floor(Math.random() * (playlist.length));
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ songs: playlist[index] }));
};

exports.play = function(req, res) {
	var song = req.param("song");
	song.replace(/(\s)/, "\\ "); // escape spaces!
	// console.log(song);
	var stat = fs.statSync(song);
	// console.log(stat.size);
	res.writeHead(200, {
		'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(song);
    readStream.pipe(res);
};
