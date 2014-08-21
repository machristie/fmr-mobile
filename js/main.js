console.log("In main.js");

require.config({
    paths: {
        'jquery': '../bower_components/jquery/jquery',
        'underscore': '../bower_components/underscore/underscore',
        'backbone': '../bower_components/backbone/backbone',
        'jquery-mobile': '../bower_components/jquery-mobile-bower/js/jquery.mobile-1.4.2',
        'text': '../bower_components/requirejs-text/text',
        'promise': '../bower_components/requirejs-promise/requirejs-promise'
    },
    shim: {

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },

        // Load config first
        'jquery-mobile' : ['jqm-config']
    }
});


// Resolve the Google Maps loader's promise and alias to 'gmaps'
define('gmaps', ['promise!libs/gmaps-loader'], function(gmaps) {
  return gmaps;
});

require(['backbone', 'jquery', 'routers/router'], function(Backbone, $, Router) {

    $(document).ready(function () {
        console.log('document ready');
        var router = new Router();
        Backbone.history.start();
    });
});
