var jsforce = require("jsforce");

module.exports = function(app) {
	app.get("/", function(req, res) {

		// Put this into a Utils module...
		var conn = new jsforce.Connection({
			oauth2: {
				loginUrl: "https://login.salesforce.com",
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				redirectUri: process.env.BASE_URL
			},
			instanceUrl: process.env.INSTANCE_URL,
			refreshToken: process.env.REFRESH_TOKEN
		});

		conn.on("refresh", function(accessToken, connRes) {
			console.log("Access Token: " + accessToken);
			res.redirect("lightningOutTest.html#accessToken=" + accessToken);
		});

		conn.identity( function(connErr, idenRes) {
			if(connErr) {
				res.status(400).send(connErr);
			}
		});
		
	});
};