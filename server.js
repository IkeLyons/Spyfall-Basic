var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
	console.log('Socket: ' + socket.id + ' has connected');

	socket.on('disconnect', () => {
		console.log('Socket: ' + socket.id + ' has disconnected');
	});

	socket.on('create-room', (roomName) => {
		console.log(roomName + ' has been created');
	})
});

server.listen(3000, () => {
	console.log('listening on port *:3000');
});
