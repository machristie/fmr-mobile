
define(['backbone', 'jquery', 'underscore'], function(Backbone, $, _) {
    "use strict";

    var CurrentPosition = Backbone.Model.extend({
        defaults: {
            "coords": null,
            "timestamp": 0
        },

        getPromise: function(options) {

            var options = _.extend({
                maximumAge: 600000,
                enableHighAccuracy: true,
                timeout: 10000
            }, options);

            var deferred = new $.Deferred();


            if (!("geolocation" in navigator)) {
                deferred.reject("Browser does not support geolocation");
            } else {
                navigator.geolocation.getCurrentPosition(
                    _.bind(function(pos){
                        this.set(pos);
                        deferred.resolve(this);
                    }, this),
                    function(err) {
                        deferred.reject("Failed to get position");
                    },
                    options
                );
            }

            return deferred.promise();
        }
    });

    return new CurrentPosition();
});
