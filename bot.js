const Discord = require('discord.js');
const client = new Discord.Client();

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
	}
	if (msg.content === 'ping') 
	{
		msg.reply('pongMOTHER FUCKER');
	}
});

client.login('NDYzNDM2OTcyNTMxMzg0MzIx.DhwaRg.Prg9mgzyZtv8qPBCYxwvpogQscE');