

function closesSideBar(){
	// $('#sidenav').css('width','0px');
	document.getElementById('sidenav').style.width = '0px';
}

function closesSidelocBar(){
	document.getElementById('sidenavLoc').style.width = '0px';
}

function opensendLocation(coordinates,pilotid,droneid){
	document.getElementById('sidenavLoc').style.width = '300px';
	// console.log(coordinates,pilotid,droneid);
	var numtoSendLocation = $('textarea#numbers').val();
	sendLocationDetails(coordinates,pilotid,droneid,numtoSendLocation)

	// console.log(coordinates);
	// $('lds-roller').css('display','block');
}

function opensSideBar(droneId) {
	document.getElementById('sidenav').style.width = '300px';
	$('lds-roller').css('display','block');
	showMessages(droneId);
}

var previousId;

function showMessages(id){
	$('lds-roller').css('display','none');
	if(previousId !== id){
		previousId = id;
		$('#textarea').html('');
		fetchNotifications(previousId);
		/*const node = document.createElement('div');
		node.innerHTML = messagewithDate;
		node.setAttribute('class', 'message');*/ 
	}
}

function cleartextbox(){
	$('textarea').val('');
}


