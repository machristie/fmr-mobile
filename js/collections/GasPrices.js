
define(['backbone', 'models/GasPrice'], function(Backbone, GasPrice) {
    var GasPrices = Backbone.Collection.extend({
        model: GasPrice,
        url: "/v2/get_cheapest_gas_prices",
        parse: function(response) {
            return response.gas_prices;
        }
    });
    return GasPrices;
});
