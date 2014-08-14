
define(['backbone'], function(Backbone) {
    "use strict";

    var GasPrice = Backbone.Model.extend({
        idAttribute: "price_id",
        defaults: {
            brand_id: null,
            brand_name: null,
            city: null,
            grade: null,
            lat: null,
            lon: null,
            price: null,
            price_id: null,
            state: null,
            station_id: null,
            station_name: null,
            street_address: null,
            updated_date: null,
            zipcode: null
        },
        parse: function(response, options){
            // 'price' is a string, convert to Number
            response.price = Number(response.price);
            return response;
        }
    });
    return GasPrice;
});
