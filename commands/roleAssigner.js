module.exports = 
{	
	addRole : function(guild, user, requestedRole)
	{
		console.log(user.nickname + " has requested role: " + requestedRole);
		
		if(user.roles.find("name", requestedRole) || user.roles.find("id", requestedRole))
		{
			console.log("success");
			return (user.nickname + " already has role: `" + requestedRole + "`");
		}

		//Get guild roles.
		var guildRoles = guild.roles;

		//Check if the guild contains the role first.
		if(guild.roles.find("name", requestedRole))
		{
			user.addRole( guild.roles.find("name", requestedRole) );

			console.log("success");
			return(user.nickname + " successfully given role: `" + requestedRole + "`");
		}
		else if(guild.roles.find("id", requestedRole))
		{
			user.addRole( guild.roles.find("id", requestedRole) );

			console.log("success");
			return(user.nickname + " successfully given role: `" + requestedRole+"`");
		}
		else
		{
			return("Could not find role: `" + requestedRole+"`");
		}

	},
	
	removeRole : function(guild, user, requestedRole)
	{
		console.log(user.nickname + " has requested to remove role: " + requestedRole);
		
		//Get guild roles.
		var guildRoles = guild.roles;
		
		if(user.roles.find("name", requestedRole))
		{
			user.removeRole( guild.roles.find("name", requestedRole) );
			console.log(user.nickname + " removed role: " + requestedRole);
			return(user.nickname + " successfully removed role: `" + requestedRole + "`");
		}
		else if(user.roles.find("id", requestedRole))
		{
			user.removeRole( guild.roles.find("id", requestedRole) );
			console.log(user.nickname + " removed  role: " + requestedRole);
			return (user.nickname + " successfully removed role: `" + requestedRole + "`");
		}
	}
}