// create a deferred object, that will be resolved when the google api has been
// loaded
//
window.google_api_deferred = jQuery.Deferred();
// hardcoded context so this can be passed directly to google url
function google_api_loadedCB() {
	google_api_deferred.resolve();
}

// load the script
jQuery("<script id='gscript'></script>")
	.attr("src", "https://apis.google.com/js/client.js?onload=google_api_loadedCB")
	.appendTo("head");
