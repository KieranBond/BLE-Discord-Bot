const Discord = require('discord.js');
const ping = require('ping'); //will reqire NPM install:  "npm i ping"
const client = new Discord.Client();
const ConfigFile = require("./Config.json");
const TilleyTest = require("./scripts/tilleyTest");
const lottoCommands = require("./commands/lotto");

const prefix = "!ble ";


var allowedRoles = [];

client.on('ready', () => 
{
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(prefix + 'help');
});

client.on('message', msg => 
{
	if(msg.content.startsWith(prefix))
	{
		const channel = msg.channel;
		var params = msg.content.split(' '); //gets all values into an array. Including the command at 1 and prefix at 0..
		var command = params[1].toLowerCase(); //second in array
		
		console.log("Command : " + command);
		var userHasPermissions = false;
		
		//Checking if this user has one of the allowed role to use bots.
		if(allowedRoles.length > 0)
		{
			console.log('Only specific roles can use commands. ');
						
			for(var i = 0; i < allowedRoles.length; i++)
			{
				var current = allowedRoles[i];
				console.log('Checking for role: ' + current.name);
				if(msg.member.roles.has(current.id))
				{
					userHasPermissions = true;
				}
			}
			
			if(userHasPermissions === true)
			{
				console.log('This user is allowed.');				
			}
			else
			{
				console.log('This user doesnt have credentials required to use commands.');
			}

		}
		else
		{
			userHasPermissions = true;
		}
		
		if(userHasPermissions)
		{
			switch (command)
			{
				case 'help':
					var helpString = GetHelpString();
					console.log(helpString);
					channel.send(helpString);
					break;
					
				case 'ping':
					msg.reply('pong MOTHER FUCKER');
					break;
					
				case 'api':
					msg.reply('https://discord.js.org/');
					break;
					
				case 'lottoadd':
				
					var addTos = [];
					if(params[2] != undefined)//Just check there's atleast one
					{
						//Adds multiple.
						for(var i = 2; i < params.length; i++)//Go through params, make this a bit more dynamic.
						{
							addTos[i-2] = params[i];
						}
					}
					
					lottoCommands.add(addTos);
					
					break;
				
				case 'lottoclear':
	
					lottoCommands.clear();
					msg.react('👍');
					
					break;
					
				case 'lottoall':
	
					var lotList = lottoCommands.all();
					if(lotList != undefined)
					{
						channel.send("So far in the Lotto list: " + lottoCommands.all());	
					}
					else
					{
						channel.send('Lotto list is empty. Use LottoAdd command to add to list.');
					}
							
					break;
				
				case 'lottorand':
	
					var winner = lottoCommands.rand();
					if(winner != undefined)
					{
						msg.reply('and the winner is... \n' + winner + '!');
					}
					else
					{
						msg.reply("looks like there's no items in the lotto list! Maybe try using LottoAdd first.");
					}
					
					break;
					
				case 'lottowinner':
					
					msg.reply(lottoCommands.winner());
					
					break;
					
				case 'checkserver':
					var hosts = ['google.com', '46.251.234.220'];
					hosts.forEach(function(host){
						ping.sys.probe(host, function(isAlive){
							var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
							channel.send(msg);
							console.log(msg);
						});
					});
					break;
				
				case 'tilleytest':
					var test = TilleyTest.testing;		
					//run function from variable in TilleyTest;
					channel.send(TilleyTest.getKieran());
					//print string variable i tilley test
					channel.send(test);
					break;
					
				case 'kieranexperimental':
				
				var roles = [];
				for(var i = 2; i < params.length; i++)//Go through params, make this a bit more dynamic.
				{
					var thisRole = msg.guild.roles.find("name", params[i]);
					console.log('Adding role: ' + thisRole.name);
					allowedRoles.push(thisRole);
					roles[i-2] = thisRole;
				} 
				
				//allowedRoles.push(roles);
				
				break;
					
				default:
					console.log('no command found');
					msg.reply("There is no command: < " + command + " > check your shit");
			}
		}		
	}
});



//	---------------------------------

	client.login(ConfigFile.token);

//	----------------------------------



//						FUNCTIONS
//	-------------------------------------------------------
//	-------------------------------------------------------
//
function GetHelpString()
{
	return "\n\n*Commands*:\n" +
	"\t**__Assortment__**\n" +
	"\t• Ping: |\n\t\t\t\t\t•\n\t\t\t\t\t\t\t|\n" + 
	"\t• API: Cheeky link to the Node.js API.\n" +
	"\n\t**__Lotto__**\n" + 
	"\t• LottoAdd: Adds to the Lotto roll list.\n" + 
	"\t• LottoClear: Clears the Lotto roll list.\n" + 
	"\t• LottoAll: Displays everything in the Lotto roll list.\n" + 
	"\t• LottoRand: Chooses a random from the Lotto roll list.\n" + 
	"\t• LottoWinner: Who was the last to win?\n";
}
