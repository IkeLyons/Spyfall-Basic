var socket = io();

socket.on("all-rooms", (roomData) => {
	var ul = document.createElement('ul');
	for(var name of Object.keys(roomData)){
		console.log(name)
		var li = document.createElement('li');
		var text = document.createTextNode(name);
		li.appendChild(text);
		ul.appendChild(li);
	}
	var htmltext = "<div class='room-list'>" + ul.outerHTML + "</div>";
	document.getElementById("rooms").innerHTML = htmltext;
})

function validation(){
	var name = document.getElementById("room-name-input").value;
	socket.emit("create-room", name);
	return name;
}
