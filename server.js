var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var rooms = {};
var users = [];
var usersConnected = [];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
	var uid = null; // https://stackoverflow.com/questions/28930559/handle-browser-refresh-socket-io
	//upon client connection log the connection and send them the current rooms
	console.log('Socket: ' + socket.id + ' has connected');
	socket.emit('update-rooms', rooms);
	socket.emit('update-users', users);

	socket.on('disconnect', () => {
		console.log("disconnect triggered");
		usersConnected.splice(usersConnected.indexOf(uid), 1); //socket always is removed from connected

    	setTimeout(function () {//only remove from users array if disconnect lasts for 10 seconds
      		if ( usersConnected.indexOf(uid) < 0 ) {
        		console.log('Socket: ' + socket.id + ' has disconnected');
        		var index = users.indexOf(uid);
        		users.splice(index, 1);
				io.emit('update-users', users);
      		}
    	}, 10000);
	});

	socket.on('new-user', (un) => {
		// TODO: handle when user enters an already taken username
		if(uid){
			var index = users.indexOf(uid);
			users.splice(index, 1);
			index = usersConnected.indexOf(uid);
			usersConnected.splice(index, 1);
		}
		if(usersConnected.indexOf(un) < 0){ //reconnect always
			usersConnected.push(un);
		}
		if(users.indexOf(un) < 0){ //new user only if the person isnt reconnecting
			users.push(un);
			io.emit('update-users', users);
		}
		uid = un;
	});

	socket.on('create-room', (roomName) => {
		if(roomName in rooms){
			console.log("roomName already exists");
		}else{
			rooms[roomName] = 1;
			io.emit('update-rooms', rooms);
		}
	});

	socket.on('room-join', (roomName) => {
		rooms[roomName] += 1;
		io.emit('update-rooms', rooms);
	})
});

server.listen(3000, () => {
	console.log('listening on port *:3000');
});
