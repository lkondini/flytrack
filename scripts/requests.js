var $showMsg = $('#textarea');
var locationCoor ;
var pilot ;
var drone ;

// window.onload = function() {
// 	var d = new Date();
// 	var msgdate = d.toDateString();
// 	// document.getElementById('date_time').innerHTML = msgdate;
// }

function fetchNotifications(uid){
	$.ajax({
		type: 'GET',
		url: 'http://djapplication.pythonanywhere.com/get_notifications/'+uid+'',
		headers: {
			'HeaderToken' : window.localStorage.getItem('token'),
		},
		success: function(cars){
			var obj = JSON.parse(cars);
			console.log(obj);
			$.each(obj.data.messages, function(i,car){
				$showMsg.append('<div class="message"><p id="text">'+car.message+'</p></div>');
			});
			$('lds-roller').css('display','none');
		},
		error: function(error){
			console.log(error);
		}
	});
};



function sendNotifications(){
	var mess = $('textarea#reply').val();
	var pilotId = $('#pilotId').html();
	var droneId = $('#id').html();
	$.ajax({
		type:'POST',
		url: 'http://djapplication.pythonanywhere.com/send_notification',
		headers: {
			'HeaderToken' : window.localStorage.getItem('token'),
		},
		data: {'pilotid':  pilotId ,'message':mess, 'droneid': droneId },
		success: function(data){
			console.log(data);
			cleartextbox();
			$showMsg.append('<div class="message"><p id="text">'+mess+'</p></div>');

		},
		error: function(){
			console.log('errror in posting');
		}
	});
}

function validateUser(){
	var vl = $('#loginUsername').val();
	var pa = $('#loginPassword').val();
	$.ajax({
		type: 'POST',
		url: 'http://djapplication.pythonanywhere.com/validate_signin',
		data: {'email' : vl , 'password' : pa},
		crossDomain: true,
		success: function(data){
			var obj = JSON.parse(data);
			window.localStorage.setItem('token', obj.data.token);
			window.localStorage.setItem('userId', obj.data.UserDetails.id);
			window.location.href = "../dashboard/index.html";
		},
		error: function(error){
			console.log(error);
		}
	});
}

function registerUser(){
	var newUsername = $('#name').val();
	var newPassword = $('#password').val();
	var newEmail = $('#email').val();
	$.ajax({
		type: 'POST',
		url: 'http://djapplication.pythonanywhere.com/create_user',
		data: {'UserName' : newUsername ,'email': newEmail,'password' : newPassword},
		success: function(data){
			console.log("new Account created"+ data);
			window.location.href = "../dashboard/index.html";
		},
		error: function(error){
			console.log(error.responseText.message);
		}
	});
}

function userRequests(Id){
	var requestId = $('#requestid').html();
	var userId = localStorage.getItem('userId');
	var status = $('#'+Id+'').val();
	$.ajax({
		type: 'POST',
		headers: {
			'HeaderToken' : window.localStorage.getItem('token'),
		},
		url: 'http://djapplication.pythonanywhere.com/update_request',
		data: {'id': requestId,'UserId':userId,'Status':status},
		success: function(data){
			console.log(data);
		},
		error: function(error){
			console.log(error);
		}
	});
}

function getComplaints(pilotid){
	// var pilotId = $('#userId').html();
	$.ajax({
		type: 'GET',
		headers: {
			'HeaderToken' : window.localStorage.getItem('token'),
		},
		url: 'http://djapplication.pythonanywhere.com/get_all_complaints/'+pilotid+'',
		success: function(data){
			var obj = JSON.parse(data);
			var complaintArr = obj.data.complaints;
			if(complaintArr.length >= 1){
				getEachComplaint(complaintArr);	
			}
			else{
				var message = '<p id="complaintMess">'+obj.msg+'</p>'
				document.getElementById('complaints').innerHTML = message;
			}		},
		error: function(error){
			console.log(error);
		}
	});
}

function getrequests(){
	initSubscription();
	$.ajax({
		type: 'GET',
		headers: {
			'HeaderToken' : window.localStorage.getItem('token'),
		},
		url: 'http://djapplication.pythonanywhere.com/get_all_requests',
		success: function(data){
			var obj = JSON.parse(data);
			reqArr = obj.data;
			loadRequests(reqArr);

		},
		error: function(error){
			console.log(error);
		}
	});
}

function sendLocationDetails(coordinates,pilotId,droneId){
	// var pilotId = $('#userId').html();
	locationCoor = coordinates;
	pilot = pilotId;
	drone = droneId;
	
}

function sendLocationApi(){
	var numtoSendLocation = $('textarea#numbers').val();
	$.ajax({
		type: 'POST',
		headers: {
			'HeaderToken' : window.localStorage.getItem('token'),
		},
		url: 'http://djapplication.pythonanywhere.com/sendlocation',
		data: {'latlng': locationCoor,'pilotid':pilot,'droneid':drone,'phonenumbers':numtoSendLocation},
		success: function(data){
			var obj = JSON.parse(data);
			reqArr = obj.data;
			loadRequests(reqArr);

		},
		error: function(error){
			console.log(error);
		}
	});
}

window.requestsStore = {};

function getApprovedRequests() {
	$.ajax({
		type: 'GET',
		headers: {
			'HeaderToken' : window.localStorage.getItem('token'),
		},
		url: 'http://djapplication.pythonanywhere.com/get_all_approved_requests',
		success: function(data){
			var results = JSON.parse(data);
			if (results.status == 200) {
				_.each(results.data, function(result) {
					requestsStore[result.id] = result;
				});
			}

		},
		error: function(error){
			console.log(error);
		}
	});
}

function getRequestsById(pilotId) {
	return _.filter(requestsStore, request => request.pilotid == pilotId);
}
