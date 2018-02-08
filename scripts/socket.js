
var droneData = {};

function initSubscription(){
	var pubnub = new PubNub({
	subscribeKey : 'sub-c-51faed4e-0380-11e8-91aa-36923a88c219'
	});

	pubnub.subscribe({
		channels : ['send_drone_updates', 'update_notification', 'update_request']
	});

	pubnub.addListener({
		message : function(data){
			if (data.message.id || data.message.drone_id) {
				droneData[data.message.id] = data.message;
				droneData[data.message.id].updatedAt = new Date();
			} else {
				console.log(data.message);
			}
		}
	});
}
