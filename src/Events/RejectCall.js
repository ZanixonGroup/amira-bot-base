export default {
  name: "client",
  code: async(json) => {
    	for(const id of json) {
    		if(id.status == "offer") {
    			if(id.isGroup == false) {
    				await global.client.sendMessage(id.from, {
    					text: `⚠️︱Your call rejected automaticaly!`, 
							mentions: [id.from]
    				});
    				await global.client.rejectCall(id.id, id.from);
    			} else {
    				await global.client.rejectCall(id.id, id.from);
    			}
    		}
    	}
    }
}