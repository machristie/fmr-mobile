
define(['backbone', 'underscore', 'views/PageView', 'models/CurrentPosition', 'text!templates/editRoute.html'],
function(Backbone, _, PageView, CurrentPosition, editRouteTemplate) {
    'use strict';

    var ENTER_KEY = 13;
    var EditRoutePage = PageView.extend({

        id: 'edit-route-view',

        template:_.template(editRouteTemplate),

        events: {
            'click input[type=submit]': 'handleSubmit',
            'keypress #destination': 'handleSubmitOnEnter'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.routeChanged);
        },

        render:function (eventName) {
            this.$el.html(this.template(this.model.attributes));
            this.enhance();
            return this;
        },

        routeChanged: function (event) {
        },

        handleSubmitOnEnter: function(event) {
            if (event.which !== ENTER_KEY) {
                return;
            }
            this.handleSubmit(event);
        },

        handleSubmit: function (event) {
            var start = this.$("#start");
            var destination = this.$("#destination");
            this.model.set({
                'useCurrentLocation': false,
                'start': start.val().trim(),
                'destination': destination.val().trim()
            });
            this.trigger("routeEditSubmitted");
        }
    });

    return EditRoutePage;
});

