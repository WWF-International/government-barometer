// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "//assets.wwf.org.uk/custom/js/lib",
    "paths": {
      "app": "../barometer",
      "d3":"d3.min"
    },
    "shim": {
       // "jquery.alpha": ["jquery"],
       // "jquery.beta": ["jquery"]
    //   d3: {
    //   	exports: 'd3'
    //   }
    } // not actually using the shim at the moment because there's nothing yet that needs to access anything global
});

define('gapi', ['async!https://apis.google.com/js/client.js!onload'],
    function(){
        console.log('gapi loaded');
        return gapi.client;
    }
);



// Load the main app module to start the app
// requirejs(["app/main"]);