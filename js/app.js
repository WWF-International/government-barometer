// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app"
    },
    "shim": {
       // "jquery.alpha": ["jquery"],
       // "jquery.beta": ["jquery"]
       d3: {
       	exports: 'd3'
       }
    }
});

define('gapi', ['async!https://apis.google.com/js/client.js!onload'],
    function(){
        console.log('gapi loaded');
        return gapi.client;
    }
);



// Load the main app module to start the app
requirejs(["app/main"]);