const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "ble! "
const lotoArr = [];



client.on('ready', () => 
{
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => 
{
	if(msg.content.startsWith(prefix))
	{
		var command = msg.content.slice(prefix.length, msg.content.length);
		console.log("Command : " + command);
		
		if (command == 'ping') 
		{
			msg.reply('pongMOTHER FUCKER');
		}	
		if (command === 'api')
		{
			msg.reply('https://discord.js.org/')
		}
		if (command === 'add')
		{
			//testing
		}
	}
});

client.login('NDYzNDM2OTcyNTMxMzg0MzIx.DhwaRg.Prg9mgzyZtv8qPBCYxwvpogQscE');