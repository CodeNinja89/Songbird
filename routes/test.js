var fs = require('fs');
var metadata = require('audio-metadata');
var location = "D:\\users\\F55604b\\Music";
var playlist = new Array();

exports.init = function(req, res) {
	res.sendFile('try3.html', {root: 'public'}); // must specify root (if not already in the present directory) directory where static files are stored.
	
	fs.readdir(location, function(err, items) {
		for(var i = 0; i < items.length; i++) {
			if(items[i].match(/\.mp3+$/i)) { // regex bingo!
				//console.log(items[i]);
				var buffer = fs.readFileSync(location + '\\' + items[i]);
				var tags = metadata.id3v2(buffer); // id3v2 bingo!
				
				var artist = tags.TPE2 || "unknown";
				var title = tags.title || "unknown";
				var album = tags.album || "unknown";
				// console.log(tags);
				playlist.push({artist: artist, title: title, album: album,
								path: items[i]});
			}
		}
	});
	// console.log(playlist.length);
};

exports.shuffle = function(req, res) {
	var index = Math.floor(Math.random() * (playlist.length));
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ songs: playlist[index] }));
};

exports.play = function(req, res) {
	var song = req.param("song");
	song = location + "\\" + song;
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
