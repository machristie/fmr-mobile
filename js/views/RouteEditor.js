
define(['backbone', 'models/CurrentPosition', 'text!templates/routeEditor.html'],
function(Backbone, CurrentPosition, routeEditorTemplate) {
    'use strict';

    var ENTER_KEY = 13;
    var RouteEditor = Backbone.View.extend({

        id: 'route-editor',

        template:_.template(routeEditorTemplate),

        events: {
            'keypress #destination': 'submitOnEnter',
            'click #submit-route-btn': 'handleSubmitClick',
            'change #use-current-location-checkbox': 'toggleUseCurrentLocation'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render:function (eventName) {
            console.log("RouteEditor.render", this.model);
            this.$el.html(this.template(this.model.attributes));
            this.toggleUseCurrentLocation();
            this.$el.trigger( "create" );
            return this;
        },

        toggleUseCurrentLocation: function( event ){

            var showStartInput = !this.getUseCurrentLocationChecked();
            this.$('#start-input').toggle(showStartInput);
        },

        submitOnEnter: function( event ){

            var start = this.$("#start");
            var destination = this.$("#destination");
            // TODO: check start if not useCurrentLocation
            if (event.which !== ENTER_KEY || !destination.val().trim() === "" ) {
                return;
            }

            this.doSubmit(start, destination);
        },

        handleSubmitClick: function( event ){

            var start = this.$("#start");
            var destination = this.$("#destination");
            this.doSubmit(start, destination);
        },

        doSubmit: function(start, destination){
            var useCurrentLocation = this.getUseCurrentLocationChecked();
            if (useCurrentLocation) {
                this.model.set({
                    'useCurrentLocation': useCurrentLocation,
                    'start': null,
                    'destination': destination.val().trim()
                });
            } else {
                this.model.set({
                    'useCurrentLocation': useCurrentLocation,
                    'start': start.val().trim(),
                    'destination': destination.val().trim()
                });
            }
            console.log("Set route to ", this.model.attributes);
        },

        getUseCurrentLocationChecked: function() {
            return this.$('#use-current-location-checkbox:checked').length === 1;
        }

    });

    return RouteEditor;
});

