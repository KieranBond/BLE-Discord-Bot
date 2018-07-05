var lottoArr = [];
var lastWinner;

//Min is inclusive, max exclusive
function getRandomInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = 
{	
	add : function(data)
	{
		for(var i = 0; i < data.length; i++)
		{
			lottoArr.push(data[i]);
		}
		
		console.log(lottoArr);
	},
	
	clear : function()
	{
		lottoArr = [];
		console.log('Cleared Lotto Array');
	},
	
	all : function()
	{
		var allString = "";
		var i;
		for (i = 0; i < lottoArr.length; i++)
		{
			allString += '`' + lottoArr[i] + "`, ";
		}
		allString = allString.substring(0, allString.length - 2);
        
		if(allString.length > 0) 
		{
			return allString;
		}
	},
	
	rand : function()
	{
		if(lottoArr.length > 0)
		{
			var rand = getRandomInt(0, lottoArr.length); 			
			return lottoArr[rand];
			console.log(rand + lottoArr[rand]);
			lastWinner = lottoArr[rand];
		}
	},
	
	winner : function()
	{
		if(lastWinner != undefined)
		{
			return "last winner was: `" + lastWinner + "`";
		}
		else
		{
			if(lottoArr.length > 0)
			{
				return "no winners yet! \nBut the list isn't empty.. Why not give it a spin with LottoRand?";
			}
			else
			{
				return "no winners yet!";
			}
		}
	}
}