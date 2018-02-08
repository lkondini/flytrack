// pilots = [
// 	{
// 		// pilotName : 'laks',
// 		requestid : '1',
// 		userId : '104',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	},

// 	{
// 		// pilotName : 'lchank',
// 		requestid : '2',
// 		userId : '2',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	},

// 	{
// 		// pilotName : 'laks',
// 		requestid : '3',
// 		userId : '3',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	},

// 	{
// 		// pilotName : 'laks',
// 		requestid : '3',
// 		userId : '3',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	},
// 	{
// 		// pilotName : 'laks',
// 		requestid : '4',
// 		userId : '4',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	},

// 	{
// 		// pilotName : 'laks',
// 		requestid : '5',
// 		userId : '5',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	},
// 	{
// 		// pilotName : 'laks',
// 		requestid : '6',
// 		userId : '6',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	},
// 	{
// 		// pilotName : 'laks',
// 		requestid : '7',
// 		userId : '7',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	},

// 	{
// 		// pilotName : 'laks',
// 		requestid : '8',
// 		userId : '8',
// 		contact : '4438439848',
// 		address : '2 3rd , nastreet , 223 rd lalout , namalore-76',
// 		maxheight : '230mts'
// 		// city : 'bangalore'
// 	}
// ]

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
// var btn = document.getElementById("complaintbtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function showComplaints(pilotid) {
    modal.style.display = "block";
    getComplaints(pilotid);
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// function getrequestId(btnid){
// 	var re ="";
// 	var reqid = $('#'+btnid+'').parent().children().attr('id');
// 	// var arrkey = $('#'+reqid+' '+'td')[1].id;
// 	// if(arrkey == 'requestid'){
// 	// 	var valu = $('#'+arrkey+'').text();
// 	// }
// 	// console.log(valu);
// 	$('#'+reqid+' '+'td').each(function(){
//     	var id = $(this).attr("id");
//     	if(id === 'requestid'){
//     		re = $(id).val();
//     		console.log(re);
//     		getComplaints(re);
//     	}
//     });
// }


function loadRequests(pilots){
	$('#card-inner').html('');
	console.log('acr');
	for(var i=0;i<pilots.length;i++){
		newDiv = document.createElement('div');
		newDiv.id = 'inner';
		var html ='<table id="'+pilots[i].requestid+'">';
		$.each(pilots[i],function(key,value){
			html += '<tr><td>'+key+'</td><td id='+key+'>'+value+'</td></tr>';
			});
		html+='</table>';
		html+= "<button id="+"'acceptbtn'"+" onclick="+'removeRequest(this.id)'+" value="+"'Accepted'"+">Accept</button><button id="+"'rejectbtn'"+" onclick="+'removeRequest(this.id)'+" value="+"'Rejected'"+">Reject</button><button id="+"'complaintbtn'"+" onclick="+'showComplaints('+pilots[i].pilotid+')'+" value="+"'Complaints'"+">Complaints</button>";
		newDiv.innerHTML += html
		document.getElementById('card-inner').append(newDiv);
	};
}

function removeRequest(ele){
	console.log(ele);
	userRequests(ele);
	var idToRemove = ele;
	$('#'+idToRemove+'').parent().remove();
}

function getEachComplaint(complaints){
	for(var i=0;i<complaints.length;i++){
		newDiv = document.createElement('div');
		newDiv.id = 'complaintInner';
		var html ='<table>';
		// var jsonobj = JSON.parse(complaints[i].complaintobj);
		// console.log(complaints[i].complaintobj);
		$.each(complaints[i],function(key,value){
			console.log(complaints[i]);
			html += '<tr><td>'+key+'</td><td id='+key+'>'+value+'</td></tr>';
			});
		html+='</table>';
		newDiv.innerHTML += html
		document.getElementById('complaints').append(newDiv);
	};
}







