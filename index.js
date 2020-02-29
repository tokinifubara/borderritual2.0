const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();

const http = require("http");
const server = http.Server(app);
app.use(express.static('public'));

server.listen(PORT, function() {
	console.log(`Borderritual2.0 is running at port ${PORT} on your localhost`);
	console.log(`Open http://localhost:${PORT}/ in your browser`);
	console.log("To stop the server, press Control+C");
});
