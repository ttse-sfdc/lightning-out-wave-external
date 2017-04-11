var express = require("express");

var app = express();
app.use(express.static("www"));
app.set("port", process.env.PORT || 3123);
require("./routes")(app);

app.listen(app.get("port"), function() {
	console.log("-------");
	console.log("Listening on port " + app.get("port"));
	console.log("-------");
});