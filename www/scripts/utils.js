var KEY_SFDC_ACCESS_TOKEN = "accessToken";

function mapUrlHashes() {
	var objHash = {};
	if(!location.hash.length || location.hash === "#") {
		return objHash;
	}
	var arrHashes = (location.hash.substr(1)).split("&");
	for(var i=0; i<arrHashes.length; i++) {
		var arrHash = arrHashes[i].split("=");
		objHash[arrHash[0]] = arrHash[1];
	}
	return objHash;
}
