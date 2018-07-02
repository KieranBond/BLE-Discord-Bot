const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "ble!"

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
	}
});

client.login('NDYzNDM2OTcyNTMxMzg0MzIx.DhwaRg.Prg9mgzyZtv8qPBCYxwvpogQscE');