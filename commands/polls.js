var lottoArr = [];
var lastWinner;

var polls = [];

function Poll(name, items)
{
	this.pollName = name;
	this.items = items;// []
}

function PollItem(name)
{
	this.name = name;
	this.votes = 0;
}

function vote(pollName, itemName)
{
	var pollItem = getPollItem(pollName, itemName);
	pollItem.votes += 1;
	console.log(pollItem.name + ' has ' + pollItem.votes + ' votes.');

}

function getPoll(pollName)
{
	for(var i = 0; i < polls.length; i++)
	{
		if(polls[i].pollName == pollName)
		{
			return polls[i];
		}
	}
}

function getPollItem(pollName, optionName)
{
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
	addPoll : function(pollName)
	{
		var pollArray = [];
		var newPoll = new Poll(pollName, pollArray);
		polls.push(newPoll);
		console.log(polls);
	},
	
	addPollOption : function(pollName, optionName)
	{
		var item = new PollItem(optionName);
		var poll = getPoll(pollName);
		poll.items.push(item);
		console.log(poll.items);
	},

	clearAll : function()
	{
		polls = [];
		console.log('Cleared Polls Array');
	},

	clearPoll : function(pollName)
	{
		for(var i = 0; i < polls.length; i++)
		{
			if(polls[i].pollName == pollName)
			{
				polls = polls.splice(i, 1);
			}
		}
	},

	votePoll : function(pollName, optionName)
	{
		vote(pollName, optionName);

		var pollItem = getPollItem(pollName, optionName);
		console.log(pollItem.votes);
	},
	
	results : function(pollName)
	{
		var poll = getPoll(pollName);
		var results = "Results:";

		(poll.items).forEach(element => 
		{
			results += "\n\t" + element.name + ": " + element.votes;
		});

		return results;
	}
}