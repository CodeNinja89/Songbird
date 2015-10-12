# Songbird
NodeJS Music player app.

Prases the default music directory for mp3 files and streams it. Uses waveform.js to make waveforms as in SoundCloud.
Can seek within song and basic features like play/pause and skip. Slight overhead as the page refreshes when a song changes, need to
fix that. Feel free to fork and commit changes and do stuff.

The main router is test.js that is routed to by index.js. Wanted to segregate front-end from backend so did not use a 
templating engine. Served a static html file... rest is jQuery/AJAX ftw!. Templating will take time to render while serving static html file does not cache
the result on the client side. Weighing both the drawbacks, I thought serving static HTML will be easier than templating. In other
words, I do not know (and don't want to know) how templating thing works in Node/ExpressJS.
