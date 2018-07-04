
//use local function to avaiod params being duplicated
//use module.exports to make variables & methods accessable 
module.exports = 
{
	testing: "hello world",
	res: function()
	{
		var result = 1
		return result++;
	},
	
	getTilley: function()
	{
		channel.send("world, im a function"); //cant use functions unless discord.js is sent????
	}
}
	
	
//the below will not work due to not being in module.exports
var person = 
{
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
        return this.firstName + " " + this.lastName;
    }
};