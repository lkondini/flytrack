
var droneData = {};

function initSubscription(){
	var pubnub = new PubNub({
	subscribeKey : 'sub-c-51faed4e-0380-11e8-91aa-36923a88c219'
	});

	pubnub.subscribe({
		channels : ['send_drone_updates']
	});

	pubnub.addListener({
		message : function(data){
			droneData[data.message.drone_id] = data.message;
			droneData[data.message.drone_id].updatedAt = new Date();
		}
	});
}
