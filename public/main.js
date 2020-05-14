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

/* This is called when the room creation submit button is submitted */
function validation(){
	var name = document.getElementById("room-name-input").value;
	socket.emit("create-room", name);
	return name;
}
