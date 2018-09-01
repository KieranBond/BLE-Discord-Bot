module.exports = 
{	
	addRole : function(guild, user, requestedRole)
	{
		console.log(user.nickname + " has requested: " + requestedRole);
		
		//Get guild roles.
		var guildRoles = guild.roles;

		//Check if the guild contains the role first.
		if(guild.roles.find("name", requestedRole))
		{
			var req = guild.roles.find("name", requestedRole);
			user.addRole(req);
			console.log(user.nickname + " successfully given role: " + requestedRole);
		}
		else if(guild.roles.find("id", requestedRole))
		{
			var req = guild.roles.find("id", requestedRole);
			user.addRole(req)
			.then
			(
				console.log(user.nickname + " successfully given role: " + requestedRole)
			)
			.catch
			(
				console.log(error)
			);

		}
		else
		{
			console.log("Could not find role: " + requestedRole);
		}

	},
	
	removeRole : function(guild, user, requestedRole)
	{
		console.log(user.name + " has requested to remove: " + requestedRole);
		
		//Get guild roles.
		var guildRoles = guild.roles;
		
		if(user.roles.find("name", requestedRole))
		{
			user.roles.delete("name", requestedRole);
			console.log(user.name + " removed role: " + requestedRole);
		}
		else if(user.roles.find("id", requestedRole))
		{
			user.roles.delete("id", requestedRole);
			console.log(user.name + " removed  role: " + requestedRole);
		}
	}
}