var jsforce = require("jsforce");
var deferred = require("deferred");

module.exports = {

	generateSfdcAccessToken: function() {

		var def = deferred();

		var conn = new jsforce.Connection({
			oauth2: {
				loginUrl: process.env.LOGIN_URL,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				redirectUri: process.env.BASE_URL
			},
			instanceUrl: process.env.INSTANCE_URL,
			refreshToken: process.env.REFRESH_TOKEN
		});

		conn.on("refresh", function(accessToken, connRes) {
			def.resolve(accessToken);
		});

		conn.identity( function(connErr, idenRes) {
			if(connErr) {
				def.reject(connErr.toString());
			}
		});	

		return def.promise;	
	}

}
