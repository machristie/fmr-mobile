
define(['backbone', 'collections/GasPrices'], function(Backbone, GasPrices) {
    var Route = Backbone.Model.extend({
        // TODO: deprecate useCurrentLocation
        defaults: {
            'useCurrentLocation': true,
            'destination': null,
            'start': null
        },
        initialize: function(attributes, options) {
            this.gasPrices = new GasPrices();
        },
        loadGasPrices: function(directionsResult) {

            console.log("In loadGasPrices");
            this.gasPrices.fetch({
                reset: true,
                type: 'POST',
                data: {
                    "route": directionsResult.routes[0].overview_polyline,
                    "gas_grade": "R",
                    "radius": "1609.344",
                    "max_age": "24"
                },
                success: function(collection, response, options) {
                    console.log("gas price data", response);
                    console.log("gas price data", collection);
                },
                error: function(collection, response, options) {
                    console.log("failed to load gas prices", response);
                }
            });
        }
    });
    return Route;
});
