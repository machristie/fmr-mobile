
var gmapsLoadedDeferred = null;

// Using https://github.com/jokeyrhyme/requirejs-promise
// Also inspired by https://gist.github.com/MattSurabian/7868115
define(['jquery', 'config'], function($, config) {

  gmapsLoadedDeferred = $.Deferred();
  window.gmapsLoaded = function() {
    gmapsLoadedDeferred.resolve(google.maps);
  }
  var gmapsUrl = 'http://maps.googleapis.com/maps/api/js?key='
      + config['gmaps-api-key'] + '&sensor=true&callback=gmapsLoaded';
  require([gmapsUrl],function(){},function(err) {
    gmapsLoadedDeferred.reject();
    });
  return gmapsLoadedDeferred.promise();
});
