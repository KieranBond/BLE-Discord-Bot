const cheerio = require('cheerio')
const request = require('request')
const $ = cheerio.load('<h2 class="title">Hello world</h2>')
	
	
module.exports = 
{
	donationLink: "https://www.paypal.com/pools/c/804qrdjfjR",
	currentDonation: 50.00, //should initialise this when bot starts
	checkDonation: 0.00, //check this periodically
	
	
	pageHTML: "", //html will be accessable once function below is run
	//function to get HTML of paypal page - using this method becase paypall will not return JSON
	getHTML: function ()
	{
		request(this.donationLink, function (error, response, html) {
		  if (!error && response.statusCode == 200) {
			this.pageHTML = html;
			console.log(this.pageHTML);
		  }
		});
	},
	
	//function 
	getValue: function()
	{
		this.getHTML();
		//var $ = cheerio.load(pageHTML);
	}
	
	
	
	
}


