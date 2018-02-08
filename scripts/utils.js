window.onload = function() {
	initSubscription();
};

function currentDatetime(id){
	var d = new Date();
	document.getElementById(id).innerHTML = d.toDateString();
}