var jsforce = require("jsforce");

var utils = require("./utils");

module.exports = function(app) {

	var oauth2 = new jsforce.OAuth2({
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		redirectUri: process.env.BASE_URL + '/oauth2/callback'
	});

	app.get('/oauth2/auth', function(req, res) {
		res.redirect(oauth2.getAuthorizationUrl());
	});

	app.get('/oauth2/callback', function(req, res) {
	  var conn = new jsforce.Connection({ oauth2 : oauth2 });
	  var code = req.param('code');
	  conn.authorize(code, function(err, userInfo) {
	    if (err) { return console.error(err); }
	    // Now you can get the access token, refresh token, and instance URL information.
	    // Save them to establish connection next time.
	    console.log("Access Token: " + conn.accessToken);
	    console.log("Refresh Token: " + conn.refreshToken);
	    console.log("Instance URL: " + conn.instanceUrl);
	    console.log("User ID: " + userInfo.id);
	    console.log("Org ID: " + userInfo.organizationId);
	    // ...
	  });
	});

	app.get("/", function(req, res) {

		var def = utils.generateSfdcAccessToken();
		def.then( function(accessToken) {
			res.redirect("redirect.html#accessToken=" + accessToken);
		}, function(err) {
			console.error("[/] Could not generate access token: ", err);

			// Should redirect to an error page (same as the one used by redirect.html)
			res.status(400).send(err);
		});
		
	});
};
