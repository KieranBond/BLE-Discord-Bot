module.exports = 
{
	sayToChannel: function(str)
	{
		msg.channel.send(str);
	},
	
	
	
	start: function(com)  
	{
		console.log("now using thief functions");
		switch(com)
		{
			case "test":
				console.log("im the test function");
				break;
			default:
				console.log("no command found in thief");
				this.sayToChannel(com + " > not found in thief game");
		}
	}
}