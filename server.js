var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var rooms = {};

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
	//upon client connection log the connection and send them the current rooms
	console.log('Socket: ' + socket.id + ' has connected');
	socket.emit('update-rooms', rooms);

	socket.on('disconnect', () => {
		console.log('Socket: ' + socket.id + ' has disconnected');
	});

	socket.on('create-room', (roomName) => {
		if(roomName in rooms){
			console.log("roomName already exists");
		}else{
			rooms[roomName] = 1;
			io.emit('update-rooms', rooms);
		}
	})
});

server.listen(3000, () => {
	console.log('listening on port *:3000');
});
