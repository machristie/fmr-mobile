
define(['backbone', 'underscore', 'text!templates/gasPriceInfoWindow.html'],
function(Backbone, _, template) {
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
        },

        render:function (eventName) {
            var templateData = _.extend({}, this.model.attributes);
            templateData.gradeText = GAS_GRADE_TEXT[this.model.get('grade')];
            // TODO: calculate "Updated less than ..." text
            // TODO: thinking about not displaying N/A when gas price isn't known
            this.$el.html(this.template(templateData));
            return this;
        }

    });

    return GasPriceInfoWindow;
});

