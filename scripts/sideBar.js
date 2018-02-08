function closesSideBar(){
	document.getElementById('sidenav').style.width = '0px';
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