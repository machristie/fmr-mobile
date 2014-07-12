
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
            this.listenTo(CurrentPosition, 'change', this.positionChange);
            this.listenTo(this.model, 'change', this.render);
        },

        render:function (eventName) {
            console.log("RouteEditor.render", this.model);
            this.$el.html(this.template(this.model.attributes));
            this.$el.trigger( "create" );
            return this;
        },

        toggleUseCurrentLocation: function( event ){

            console.log("toggleUseCurrentLocation", event);
            this.model.set('useCurrentLocation', !this.model.get('useCurrentLocation'));
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
            if (this.model.get('useCurrentLocation')) {
                this.model.set({
                    'start': null,
                    'destination': destination.val().trim()
                });
            } else {
                this.model.set({
                    'start': start.val().trim(),
                    'destination': destination.val().trim()
                });
            }
            this.trigger("submit");
        },

        positionChange: function (event){
            console.log("CurrentPosition is " + CurrentPosition.get('coords').latitude + ", " + CurrentPosition.get('coords').longitude);
        }

    });

    return RouteEditor;
});

