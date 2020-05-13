var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var rooms = {};

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
	console.log('Socket: ' + socket.id + ' has connected');
	socket.emit('all-rooms', rooms);

	socket.on('disconnect', () => {
		console.log('Socket: ' + socket.id + ' has disconnected');
	});

	socket.on('create-room', (roomName) => {
		console.log(roomName + ' has been created');
		if(roomName in rooms){
			console.log("roomName already exists");
		}else{
			rooms[roomName] = 1;
			console.log(rooms);
			io.emit('all-rooms', rooms);
		}
	})
});

server.listen(3000, () => {
	console.log('listening on port *:3000');
});
