
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("complaintbtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function showComplaints(pilotid) {
    modal.style.display = "block";
    getComplaints(pilotid);
}

span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function loadRequests(pilots){
	$('#card-inner').html('');
	console.log('acr');
	for(var i=0;i<pilots.length;i++){
		newDiv = document.createElement('div');
		newDiv.id = 'inner';
		var html ='<table id="'+pilots[i].requestid+'">';

		$.each(pilots[i],function(key,value){
			if(key == 'requestdetails'){
				console.log(key);
				$.each(pilots[i][key],function(key,value){
			 		html += '<tr><td>'+ _.startCase(key)+'</td><td id='+key+'>'+value+'</td></tr>';
				})
			}
			else{
				html += '<tr><td>'+ _.startCase(key)+'</td><td id='+key+'>'+value+'</td></tr>';
			}
		
		});
		html+='</table>';
		html+= "<button id="+"'acceptbtn'"+" onclick="+'removeRequest(this.id)'+" value="+"'Accepted'"+">Accept</button><button id="+"'rejectbtn'"+" onclick="+'removeRequest(this.id)'+" value="+"'Rejected'"+">Reject</button><button id="+"'complaintbtn'"+" onclick="+'showComplaints('+pilots[i].pilotid+')'+" value="+"'Complaints'"+">Complaints</button>";
		newDiv.innerHTML += html
		document.getElementById('card-inner').append(newDiv);
	};
}


// if(pilots[i] == 'requestdetails'){
// 			$.each(pilots[i],function(key,value){
// 					html += '<tr><td>'+key+'</td><td id='+key+'>'+value+'</td></tr>';
// 				})
// 		}



function removeRequest(ele){
	console.log(ele);
	userRequests(ele);
	var idToRemove = ele;
	$('#'+idToRemove+'').parent().remove();
}

function getEachComplaint(complaints){
	console.log(complaints.length);
	for(var i=0;i<complaints.length;i++){
		newDiv = document.createElement('div');
		newDiv.id = 'complaintInner';
		var html ='<table>';
		// var jsonobj = JSON.parse(complaints[i].complaintobj);
		// console.log(complaints[i].complaintobj);
		$.each(complaints[i],function(key,value){
			console.log(complaints[i]);
			if(key == "requestobj" || key == "complaintobj"){
				html += '<tr><td>'+key+'</td></tr>';
				console.log(complaints[i][key])
				var jsonobj = JSON.parse(complaints[i][key]);

				$.each(jsonobj,function(key,value){
					html += '<tr><td>'+key+'</td><td id='+key+'>'+value+'</td></tr>';
				});
			}
			else{
				html += '<tr><td>'+key+'</td><td id='+key+'>'+value+'</td></tr>';
			}
			
		});
	html+='</table>';
	newDiv.innerHTML += html
	document.getElementById('complaints').append(newDiv);
	};
}







