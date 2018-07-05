//const cheerio = require('cheerio')
//const request = require('request')
//const jsdom = require('jsdom')
//const { JSDOM } = jsdom;


	
	
//not working :(
	
module.exports = 
{
	donationLink: "https://www.paypal.com/pools/c/804qrdjfjR",
	currentDonation: 50.00, //should initialise this when bot starts
	checkDonation: 0.00, //check this periodically
	
	
	pageHTML: "", //html will be accessable once function below is run
	//function to get HTML of paypal page - using this method becase paypall will not return JSON
	/*
	getHTML: function ()
	{
		request(this.donationLink, function (error, response, html) {
		  if (!error && response.statusCode == 200) {
			this.pageHTML = html;
			console.log("HTML loaded into variable");
			//console.log(html);
		  }
		});
	},
	*/
	
	//function 
	getValue: function()
	{
		
		
		
		
		 
		// the file I will be loading
		uri = 'https://www.paypal.com/pools/c/804qrdjfjR',
		 
		// the options that I will be giving to jsdom
		options = {
			runScripts: 'dangerously',
			resources: "usable"
		};
		 
		// load from an external file
		JSDOM.fromURL(uri, options).then(dom => {
		  console.log(dom.serialize());
		});


		/*

		request(this.donationLink, function (error, response, html) {
		  if (!error && response.statusCode == 200) {
			console.log("HTML loaded into variable");
			//const dom = new JSDOM(`<!DOCTYPE html><p>testing getter</p>`);
			const dom = new JSDOM(html, { 
				resources: "usable", 
				runScripts: "dangerously"  
				});
			
			//console.log(dom.window.document.querySelector( 'html' ).outerHTML);
			//console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
			dom.window.test();
			
			//console.log(html);
		  }
		});
		*/
		
		


		
		/*
		var $ = cheerio.load(this.pageHTML);
		$('span').each(function(i, element)
		{
			var a = $(this);
			//console.log(a.innerHTML());
			console.log(a.text());
		});
		*/
	}
	
	
	
	
	//.campaign__chip-container-right___4i4ZJ > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2)
	
	
}


