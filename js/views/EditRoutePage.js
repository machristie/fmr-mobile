
define(['backbone', 'underscore', 'views/PageView', 'models/CurrentPosition', 'text!templates/editRoute.html'],
function(Backbone, _, PageView, CurrentPosition, editRouteTemplate) {
    'use strict';

    var ENTER_KEY = 13;
    var EditRoutePage = PageView.extend({

        id: 'edit-route-view',

        template:_.template(editRouteTemplate),

        events: {
            'click input[type=submit]': 'handleSubmit',
            'keypress #destination': 'handleSubmitOnEnter',
            'change #current-location': 'handleUseCurrentLocationChange'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.routeChanged);
            // Cache the old 'start' value for restoring when use current
            // location is toggled
            this._oldStart = this.model.get('start');
        },

        render:function (eventName) {
            this.$el.html(this.template(this.model.attributes));
            this.enhance();
            return this;
        },

        show: function (event, ui) {

            var start = this.model.get('start');

            // Initialize _oldStart again
            this._oldStart = start;

            // Set the initial state of the form
            this.$('start').val(start);
            this.$('destination').val(this.model.get('destination'));
            if (start == null || start.trim() === "") {
                // This will trigger a change event on #current-location, which
                // is handled by handleUseCurrentLocationChange
                this.$("#current-location").val("on").flipswitch("refresh");
            } else {
                this.$("#current-location").val("off").flipswitch("refresh");
            }

            // Verify we can make use of the "current location" option
            if (CurrentPosition.get('coords')) {
                this.initializeWithCurrentPosition(CurrentPosition);
            } else {
                CurrentPosition.getPromise()
                    .always(_.bind(function(){
                        this.initializeWithCurrentPosition(CurrentPosition);
                    }, this));
            }
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
            var useMyLocation = this.$("#current-location").val();
            var start = (useMyLocation === "off") ? this.$("#start").val().trim() : "";
            var destination = this.$("#destination").val().trim();
            this.model.set({
                'useCurrentLocation': useMyLocation === "on",
                'start': start,
                'destination': destination
            });
            this.trigger("routeEditSubmitted");
        },

        handleUseCurrentLocationChange: function (event) {

            if (this.$("#current-location").val() === "off") {
                this.$("#start").val(this._oldStart).textinput("enable");
            } else {
                this._oldStart = this.$("#start").val();
                this.$("#start").val("Use my location").textinput("disable");
            }
        },

        initializeWithCurrentPosition: function (pos) {

            // Can't get location so disable use current location toggle
            if (pos.get('coords') == null) {
                // Also will trigger change and call handleUseCurrentLocationChange
                this.$("#current-location").val("off").flipswitch("disable").flipswitch("refresh");
            }

        }
    });

    return EditRoutePage;
});

