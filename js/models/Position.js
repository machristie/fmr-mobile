
define(['backbone'], function(Backbone) {
    var Position = Backbone.Model.extend({
        defaults: {
            "coords": null,
            "timestamp": 0
        }
    });
    return Position;
});
