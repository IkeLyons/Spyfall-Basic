$(document).ready(function(){
    $("#username-modal").modal('show');
});

$(document).on('click', '.room-list ul li', function(){
	var text = $(event.target.querySelector('p:first-child')).text();
	socket.emit('room-join', text);
});

$(document).on('click', '#create-room-submit', function(){
	var name = document.getElementById("room-name-input").value;
	socket.emit("create-room", name);
	return name;
});

$(document).on('click', '#login-submit', function(){
	var username = document.getElementById("un-text-input").value;
	socket.emit("new-user", username);
	$("#username-modal").modal('hide');
	return username;
});


var socket = io();

/*	When the server emits update-rooms the client needs to take the roomdata and
	turn it into DOM elements then display these DOM elements. */
socket.on("update-rooms", (roomData) => {
	var ul = document.createElement('ul');
	for(var name of Object.keys(roomData)){
		var li = document.createElement('li');
		var p1 = document.createElement('p');
		var p2 = document.createElement('p');
		var nameText = document.createTextNode(name);
		var playerCount = document.createTextNode(roomData[name]);
		// structure is ul > li > p , p
		p1.appendChild(nameText)
		p2.appendChild(playerCount);
		li.appendChild(p1);
		li.appendChild(p2);
		ul.appendChild(li);
	}
	var htmltext = "<div class='room-list'>" + ul.outerHTML + "</div>";
	document.getElementById("rooms").innerHTML = htmltext;
})

socket.on('update-users', (users) => {
	var ul = document.createElement('ul');
	for(var name of Object.keys(users)){
		var li = document.createElement('li');
		var p = document.createElement('p');
		var text = document.createTextNode(users[name]);
		p.appendChild(text);
		li.appendChild(p);
		ul.appendChild(li);
	}
	var htmltext = "<div class='user-list'>" + ul.outerHTML + "</div>";
	document.getElementById('user-list').innerHTML = htmltext;
})
