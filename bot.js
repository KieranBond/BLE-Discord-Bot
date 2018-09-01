const Discord = require('discord.js');
const ping = require('ping'); //will reqire NPM install:  "npm i ping"
const client = new Discord.Client();
const ConfigFile = require("./Config.json");
const TilleyTest = require("./scripts/tilleyTest");
const lottoCommands = require("./commands/lotto");
const pollCommands = require("./commands/polls");
const roleCommands = require("./commands/roleAssigner");
const donation = require("./scripts/donationTracker");
const thief = require("./scripts/thief");

const prefix = "!ble ";
const theifPre = "!thief";

const repoLink = "https://github.com/KieranBond/BLE-Discord-Bot";

var allowedRoles = [];


client.on('ready', () => 
{
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setActivity(prefix + 'help');

	var guilds = Array.from(client.guilds.values());
	var ids = [];
	guilds.forEach(element => 
	{
		ids.push(element);
	});
	//Setup each command set needing it.
	console.log("Joined guilds with ids: " + ids);
	pollCommands.Construct(ids);
});

client.on('message', msg =>
{
	//Checks if it starts with our prefix, or if it's been authored by a bot. Breaks out if either.
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const channel = msg.channel;
	var params = msg.content.split(' '); //gets all values into an array. Including the command at 1 and prefix at 0..
	var command = params[1].toLowerCase(); //second in array

	console.log("Command : " + command);
	var userHasPermissions = false;

	//Checking if this user has one of the allowed role to use bots.
	if (allowedRoles.length > 0) 
	{
		console.log('Only specific roles can use commands. ');

		for (var i = 0; i < allowedRoles.length; i++) 
		{
			var current = allowedRoles[i];
			console.log('Checking for role: ' + current.name);
			if (msg.member.roles.has(current.id)) 
			{
				userHasPermissions = true;
			}
		}

		if (userHasPermissions === true)
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

	if (userHasPermissions) 
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

			case 'repo':
			var embed = GetRepositoryEmbed(client);
			msg.channel.send(embed);
			break;

			case 'github':
			var embed = GetRepositoryEmbed(client);
			msg.channel.send(embed);
			break;

			case 'lottoadd':

				var addTos = [];
				if (params[2] != undefined)//Just check there's atleast one
				{
					//Adds multiple.
					for (var i = 2; i < params.length; i++)//Go through params, make this a bit more dynamic.
					{
						addTos[i - 2] = params[i];
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
				if (lotList != undefined)
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
				if (winner != undefined)
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
				hosts.forEach(function (host)
				{
					ping.sys.probe(host, function (isAlive)
					{
						var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
						channel.send(msg);
						console.log(msg);
					});
				});
				break;

			case 'addpoll':

				if (params[2] != undefined)
				{
					if(pollCommands.addPoll(msg.guild, params[2]) != undefined)
					{
						msg.reply("successfully added new poll: `" + params[2] + "`");
					}
					else
					{
						msg.reply("unfortunately that command didn't work.. please consult !ble help");
					}
				}
				else
				{
					msg.reply("please give the poll a name.");
				}

				break;

			case 'addpolloption':

				var nameArr = params.splice(3);
				var name = '';
				nameArr.forEach(element => 
				{
					name += element + " ";
				});

				if (params[2] != undefined && params[3] != undefined)
				{
					if(pollCommands.addPollOption(msg.guild, params[2], name) != undefined)
					{
						msg.reply("successfully added new poll option `" + params[3] + "` to `" + params[2] + "` poll.");
					}
					else
					{
						msg.reply("unfortunately that command didn't work.. please consult !ble help");
					}
				}
				else
				{
					msg.reply("arguments for AddPollOption are; Poll name, and Poll option name");
				}

				break;

			case 'votepoll':

				if (params[2] != undefined && params[3] != undefined)
				{
					if(pollCommands.votePoll(msg.guild, params[2], params[3]) != undefined)
					{
						msg.reply("vote added.");
					}
					else
					{
						msg.reply("unfortunately that command didn't work.. please consult !ble help");
					}
				}
				else
				{
					msg.reply("arguments for votepoll are; Poll name and Poll option name. Make sure these exist!");
				}

				break;

			case 'polloptions':

				if (params[2] != undefined)
				{
					var options = pollCommands.getOptions(msg.guild, params[2]);
					if(options != undefined)
					{
						msg.reply("\n" + options);
					}
					else
					{
						msg.reply("unfortunately that command didn't work.. please consult !ble help");
					}
				}

				break;

			case 'pollresults':

				if (params[2] != undefined)
				{
					var results = pollCommands.results(msg.guild, params[2]);
					if(results != undefined)
					{
						msg.reply("\n" + results);
					}
					else
					{
						msg.reply("unfortunately that command didn't work.. please consult !ble help");
					}
					
				}

				break;

			case 'pollclear':

				if (params[2] != undefined)
				{					
					var result = pollCommands.clearPoll(msg.guild, params[2]);
					if(result == undefined || result instanceof Error)
					{
						msg.reply("unfortunately that command didn't work.. please consult !ble help");
					}
					else
					{
						result == true ? result = "been" : result = "not been";
						msg.reply(" poll `" + params[2] + "` has " + result + " cleared.");
					}
				}

				break;

			case 'tilleytest':
				var test = TilleyTest.testing;
				//run function from variable in TilleyTest;
				channel.send(TilleyTest.getKieran());
				//print string variable i tilley test
				channel.send(test);
				break;

			case 'kieranexperimental':

				roleCommands.addRole(msg.guild, msg.member, params[2]);

				//var roles = guild.roles;// Dict< roleID, roleName >

				// for (var i = 2; i < params.length; i++)//Go through params, make this a bit more dynamic.
				// {
				// 	var thisRole = msg.guild.roles.find("name", params[i]);
				// 	console.log('Adding role: ' + thisRole.name);
				// 	allowedRoles.push(thisRole);
				// 	roles[i - 2] = thisRole;
				// }

				//allowedRoles.push(roles);

				break;

			case 'thief':
				thief.start(command)
				break;

			default:
				console.log('no command found');
				msg.reply("There is no command: < " + command + " > check your shit");
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
		"\t• Github | Repo : A link to our Github Repo for this bot.\n" +
		"\n\t**__Lotto__**\n" +
		"\t• LottoAdd: Adds to the Lotto roll list.\n" +
		"\t• LottoClear: Clears the Lotto roll list.\n" +
		"\t• LottoAll: Displays everything in the Lotto roll list.\n" +
		"\t• LottoRand: Chooses a random from the Lotto roll list.\n" +
		"\t• LottoWinner: Who was the last to win?\n" +
		"\n\t**__Polls__**\n" +
		"\t• AddPoll: Adds a new poll with the name given. It's now referenced by this name.\n\t\tArgs: [1] Poll name\n" +
		"\t• AddPollOption: Adds a new option to the given poll. \n\t\tArgs: [1] Poll name, read above. [2] Option name.\n" +
		"\t• VotePoll: Vote for your poll! \n\t\tArgs: [1] Poll name [2] Option name you want to vote for.\n" +
		"\t• PollOptions: Get all available options for this poll. \n\t\tArgs: [1] Poll name\n" +
		"\t• PollResults: Get the results so far for your poll. \n\t\tArgs: [1] Poll name\n" +
		"\t• PollClear: Clear this poll of all results and options.\n\t\tArgs: [1] Poll name\n";
}

function GetRepositoryEmbed(client)
{
	const embed = new Discord.RichEmbed();
	embed.setAuthor(client.user.username, client.user.displayAvatarURL);
	embed.setTitle("BLE+ Discord bot - Github Repository");
	embed.setURL(repoLink);
	embed.setTimestamp(new Date());

	return embed;
}
