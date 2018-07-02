const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "ble! "
const lotoArr = [];



client.on('ready', () => 
{
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('ble! help');
});

client.on('message', msg => 
{
	if(msg.content.startsWith(prefix))
	{
		var params = msg.content.split(' '); //gets all values into an array
		var command = params[1]; //second in array
		
		console.log("Command : " + command);
		
		if (command == 'ping') 
		{
			msg.reply('pongMOTHER FUCKER');
		}	
		if (command === 'api')
		{
			msg.reply('https://discord.js.org/');
		}
		if (command === 'add')
		{
			msg.reply('found add');
			msg.reply('param 3 = ' + params[2]);
		}
	}
});

client.login('NDYzNDM2OTcyNTMxMzg0MzIx.DhwaRg.Prg9mgzyZtv8qPBCYxwvpogQscE');