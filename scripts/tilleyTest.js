
//use local function to avaiod params being duplicated
var module.exports = 
{
	testing: "hello world",
	getTilley: function()
	{
		channel.send("world, im a function");
	}
}
	
	
var person = 
{
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
        return this.firstName + " " + this.lastName;
    }
};