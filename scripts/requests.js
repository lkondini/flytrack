var $showMsg = $('#textarea');

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
				$showMsg.append('<div class="message"><p id="text">'+car.message+'<span class="date_time">23</span></p></div>');
			});
			$('lds-roller').css('display','none');
		},
		error: function(error){
			console.log(error);
		}
	});
};



function sendNotifications(){
	var mess = $('textarea').val();
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
			$showMsg.append('<div class="message"><p id="text">'+mess+'<span class="date_time">23/11/2017</span></p></div>');
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
	var userId = $('#userId').html();
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
			getEachComplaint(complaintArr);		},
		error: function(error){
			console.log(error);
		}
	});
}

function getrequests(){
	// var pilotId = $('#userId').html();
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
