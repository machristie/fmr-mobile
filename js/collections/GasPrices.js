
define(['backbone', 'models/GasPrice'], function(Backbone, GasPrice) {
    "use strict";

    var GasPrices = Backbone.Collection.extend({
        model: GasPrice,
        url: "/v2/get_cheapest_gas_prices",
        parse: function(response) {
            return response.gas_prices;
        },
        stats: function() {
            var stats = {};
            var gasPriceCount = 0;
            var gasPricesTotal = 0;
            var gasPriceMinimum = 99999999;
            var gasPriceMaximum = 0;

            this.forEach(function(gasPrice){
                var price = gasPrice.get('price');
                gasPriceCount++;
                gasPricesTotal += price;
                gasPriceMinimum = Math.min(gasPriceMinimum, price);
                gasPriceMaximum = Math.max(gasPriceMaximum, price);
            });

            stats.count = gasPriceCount;
            if (gasPriceCount > 0) {
                stats.minimum = gasPriceMinimum;
                stats.maximum = gasPriceMaximum;
                stats.average = gasPricesTotal / gasPriceCount;
            }

            return stats;
        }

    });
    return GasPrices;
});
