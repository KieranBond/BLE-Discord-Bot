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
		if (command === 'lotoadd')
		{
			msg.reply('found add');
			msg.reply('param 3 = ' + params[2]);
		
			if (params[2] != undefined) {  //checks para exists
				lotoArr.push(params[2])    //push new param to list
			} 
			console.log('lotoArr = ' + lotoArr); //debug list
		}
		if (command === 'lotoclear')
		{
			msg.reply('list is now cleared');
			console.log('list has been cleared');
		}
		if (command === 'lotoall')
		{
			var i;
			for (i = 0; i < lotoArr.length; i++){
				msg.reply(lotoArr[i]);
			}
		}
		if (command === 'lotorand')
		{
			var rand = Math.floor(Math.random() * lotoArr.length); 
			msg.reply("And the winner is!");
			msg.reply(lotoArr[rand]);
		}
	}
});

client.login('NDYzNDM2OTcyNTMxMzg0MzIx.DhwaRg.Prg9mgzyZtv8qPBCYxwvpogQscE');