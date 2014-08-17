
define(['backbone', 'underscore', 'gmaps', 'text!templates/gasPriceInfoWindow.html'],
function(Backbone, _, gmaps, template) {
    'use strict';

    var GAS_GRADE_TEXT = {
        'R': "Regular",
        'M': "Mid-grade",
        'P': "Premium",
        'D': "Diesel",
        'E': "E-85"
    };

    var GasPriceInfoWindow = Backbone.View.extend({

        id: 'gas-price-info-window',

        template: _.template(template),

        initialize: function() {
            this.infoWindow = new gmaps.InfoWindow({
                content: this.el
            });
        },

        render:function (eventName) {
            var templateData = _.extend({}, this.model.attributes);
            templateData.gradeText = GAS_GRADE_TEXT[this.model.get('grade')];
            templateData.updatedLessThanText = this._formatUpdatedLessThanText(this.model.get('updated_date'));
            this.$el.attr('class', this.className);
            this.$el.html(this.template(templateData));
            return this;
        },

        open: function(model, map, marker) {
            this.model = model;
            this.render();
            this.infoWindow.open(map, marker);
        },

        _formatUpdatedLessThanText: function(updatedDate) {
            var now = new Date();
            var hoursAgo = Math.ceil((now.getTime() - updatedDate.getTime()) / 3600000);
            var s = hoursAgo > 1 ? "s" : "";
            return "less than " + hoursAgo + " hour" + s + " ago";
        }
    });

    return GasPriceInfoWindow;
});

