const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = "ble! "
const lottoArr = [];
var lastWinner;


client.on('ready', () => 
{
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('ble! help');
});

client.on('message', msg => 
{
	if(msg.content.startsWith(prefix))
	{
		const channel = msg.channel;
		
		var params = msg.content.split(' '); //gets all values into an array. Including the command at 1 and prefix at 0..
		var command = params[1].toLowerCase(); //second in array
		
		console.log("Command : " + command);
		if(command == 'help')
		{
			var helpString = GetHelpString();
			console.log(helpString);
			channel.send(helpString);
		}
		else if (command == 'ping') 
		{
			msg.reply('pong MOTHER FUCKER');
		}	
		else if (command === 'api')
		{
			msg.reply('https://discord.js.org/');
		}
		else if (command === 'lottoadd')
		{
			var addTos = [];
			
			if(params[2] != undefined)//Just check there's atleast one
			{
				//Adds multiple.
				for(var i = 2; i < params.length; i++)//Go through params, make this a bit more dynamic.
				{
					msg.reply('adding: ' + params[i]);
					lottoArr.push(params[i]);
				}
			}
		
			console.log('lottoArr = ' + lottoArr); //debug list
		}
		else if (command === 'lottoclear')
		{
			lottoArr = [];//Essentially wipes the array by creating a new one.
			
			msg.reply('list is now cleared');
			console.log('list has been cleared');
		}
		else if (command === 'lottoall')
		{
			var allString = "";
			var i;
			for (i = 0; i < lottoArr.length; i++)
			{
				allString += lottoArr[i] + ", ";
			}
			allString = allString.substring(0, allString.length - 2);
			
			if(allString.length > 0) 
			{
				channel.send(allString);
			}
			else
			{
				channel.send('Lotto list is empty. Use LottoAdd command to add to list.');
			}
		}
		else if (command === 'lottorand')
		{
			if(lottoArr.length > 0)
			{
				var rand = getRandomInt(0, lottoArr.length); 
				msg.reply("and the winner is: ");
				channel.send(lottoArr[rand]);
				console.log(rand + lottoArr[rand]);
				lastWinner = lottoArr[rand];
			}
			else
			{
				msg.reply('no lucky draw today. Lotto list is empty!');
			}
		}
		else if(command === 'lottowinner')
		{
			if(lastWinner != undefined)
			{
				msg.reply("last winner was: `" + lastWinner + "`")
			}
			else
			{
				msg.reply('no winners yet!');
				
				if(lottoArr.length > 0)
				{
					msg.reply("but the list isn't empty.. Why not give it a spin with LottoRand?");
				}
			}
		}
	}
});



//	---------------------------------

	client.login('NDYzNDM2OTcyNTMxMzg0MzIx.DhwaRg.Prg9mgzyZtv8qPBCYxwvpogQscE');

//	----------------------------------



//						FUNCTIONS
//	-------------------------------------------------------
//	-------------------------------------------------------
//
function GetHelpString()
{
	return "\n\n*Commands*:\n" +
	"\t**__Assortment__**\n" +
	"\t• Ping: Pong.\n" + 
	"\t• API: Cheeky link to the Node.js API.\n" +
	"\n\t**__Lotto__**\n" + 
	"\t• LottoAdd: Adds to the Lotto roll list.\n" + 
	"\t• LottoClear: Clears the Lotto roll list.\n" + 
	"\t• LottoAll: Displays everything in the Lotto roll list.\n" + 
	"\t• LottoRand: Chooses a random from the Lotto roll list.\n" + 
	"\t• LottoWinner: Who was the last to win?\n";
}

//Min is inclusive, max exclusive
function getRandomInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}