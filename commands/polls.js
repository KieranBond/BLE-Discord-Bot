//var polls = [];
var servers = [];

function Server(serverID, polls)
{
	this.serverID = serverID;
	this.polls = polls;
}

function Poll(name, items)
{
	this.pollName = name;
	this.items = items;
}

function PollItem(name)
{
	this.name = name;
	this.votes = 0;
}

function vote(serverID, pollName, itemName)
{
	var pollItem = getPollItem(serverID, pollName, itemName);
	if(pollItem == undefined) return;
	
	pollItem.votes += 1;
	console.log(pollItem.name + ' has ' + pollItem.votes + ' votes.');
	return true;
}

function getServer(serverID)
{
	for(var i = 0; i < servers.length; i++)
	{
		if(servers[i].serverID == serverID)
		{
			return servers[i];
		}
	}
}

function getPoll(serverID, pollName)
{
	var server = getServer(serverID);
	if(server == undefined) return;

	var polls = server.polls;

	for(var i = 0; i < polls.length; i++)
	{
		if(polls[i].pollName == pollName)
		{
			return polls[i];
		}
	}
}

function getPollItem(serverID, pollName, optionName)
{
	var server = getServer(serverID);
	if(server == undefined) return;

	var polls = server.polls;

	for(var i = 0; i < polls.length; i++)
	{
		if(polls[i].pollName == pollName)
		{
			var poll = polls[i];
			for(var n = 0; n < poll.items.length; n++)
			{
				if(poll.items[n].name == optionName)
				{
					return poll.items[n];
				}
			}
		}
	}
}

module.exports = 
{	
	Construct : function(serverIDs)
	{
		serverIDs.forEach(element => 
		{
			var polls = [];
			var activeServer = new Server(element, polls);
			console.log("Adding guild: " + element);
			servers.push(activeServer);
		});
	},

	addPoll : function(serverID, pollName)
	{
		var server = getServer(serverID);
		if(server == undefined) 
		{
			console.log("server is undefined?\n\t" + server + "\n\t" + server.serverID + "\n\t" + server.polls);
			return;
		}

		var items = [];
		var newPoll = new Poll(pollName, items);
		server.polls.push(newPoll);
		console.log(server.polls);
		return true;
	},
	
	addPollOption : function(serverID, pollName, optionName)
	{
		var item = new PollItem(optionName);
		var poll = getPoll(serverID, pollName);

		if(poll == undefined) return;

		poll.items.push(item);
		console.log(poll.items);
		return true;

	},

	clearPoll : function(serverID, pollName)
	{
		var server = getServer(serverID);
		if(server == undefined) return;

		var polls = server.polls;

		var cleared = false;
		for(var i = 0; i < polls.length; i++)
		{
			if(polls[i].pollName == pollName)
			{
				cleared = true;
				polls = polls.splice(i, 1);
			}
		}

		return cleared;
	},

	votePoll : function(serverID, pollName, optionName)
	{
		return vote(serverID, pollName, optionName);
	},
	
	results : function(serverID, pollName)
	{
		var poll = getPoll(serverID, pollName);
		if(poll == undefined) return;

		var results = "Results:\n";

		(poll.items).forEach(element => 
		{
			results += "\n\t`" + element.name + "`: " + element.votes;
		});

		return results;
	},

	getOptions : function(serverID, pollName)
	{
		var poll = getPoll(serverID, pollName);
		if(poll == undefined) return;

		var options = "Options for " + pollName + ":\n";

		(poll.items).forEach(element => 
		{
			options += "\n\t`" + element.name + "`";
		});

		return options;
	}
}