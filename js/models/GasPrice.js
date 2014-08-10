
define(['backbone'], function(Backbone) {
    var GasPrice = Backbone.Model.extend({
        idAttribute: "price_id",
        defaults: {
            brand_id: null,
            brand_name: null,
            city: null,
            grade: null,
            lat: null,
            lon: null,
            // TODO: price is type String
            price: null,
            price_id: null,
            state: null,
            station_id: null,
            station_name: null,
            street_address: null,
            updated_date: null,
            zipcode: null
        }
    });
    return GasPrice;
});
