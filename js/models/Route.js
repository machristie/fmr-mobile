
define(['backbone'], function(Backbone) {
    var Route = Backbone.Model.extend({
        defaults: {
            'useCurrentLocation': true,
            'destination': null,
            'start': null
        }
    });
    return Route;
});
