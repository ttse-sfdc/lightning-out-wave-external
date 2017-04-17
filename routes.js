var jsforce = require("jsforce");

module.exports = function(app) {

	var oauth2 = new jsforce.OAuth2({
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		redirectUri: 'https://login.salesforce.com/services/oauth2/success'
	});

	app.get('/oauth2/auth', function(req, res) {
		res.redirect(oauth2.getAuthorizationUrl());
	});

	app.get('/auth/callback', function(req, res) {
		var conn = new jsforce.Connection({oauth2: oauth2});
		var code = req.param('code');
		conn.authorize(code, function(err, userInfo) {
			if (err) {
				return console.error(err);
			}
			req.session.accessToken = conn.accessToken;
			req.session.instanceUrl = conn.instanceUrl;
			req.session.refreshToken = conn.refreshToken;
			console.log(conn.refreshToken);
			
			URL = "URL which I'm using for oauth"
			res.redirect('/dfty/case');
		});
	});

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