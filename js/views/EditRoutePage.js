
define(['backbone', 'underscore', 'views/PageView', 'models/CurrentPosition', 'text!templates/editRoute.html'],
function(Backbone, _, PageView, CurrentPosition, editRouteTemplate) {
    'use strict';

    var ENTER_KEY = 13;
    var EditRoutePage = PageView.extend({

        id: 'edit-route-view',

        template:_.template(editRouteTemplate),

        events: {
            'click #submit': 'handleSubmit',
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
                this.$("#current-location").val("on");
            } else {
                this.$("#current-location").val("off");
            }
            this.updateForUseCurrentLocation();

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
            var useCurrentLocation = this.getUseCurrentLocation();
            var start = !useCurrentLocation ? this.$("#start").val().trim() : "";
            var destination = this.$("#destination").val().trim();
            // Check that required fields are supplied
            if (destination === "" || (!useCurrentLocation && start === "")) {
                alert("Please supply all required fields.");
                return false;
            }

            this.model.set({
                'useCurrentLocation': useCurrentLocation,
                'start': start,
                'destination': destination
            });
            this.trigger("routeEditSubmitted");
            return false;
        },

        handleUseCurrentLocationChange: function (event) {

            if (this.getUseCurrentLocation()) {
                this._oldStart = this.$("#start").val();
            }
            this.updateForUseCurrentLocation();
        },

        updateForUseCurrentLocation: function () {
            if (!this.getUseCurrentLocation()) {
                this.$("#start").val(this._oldStart).attr("disabled", false);
                this.$("label[for='start']").addClass("required");
            } else {
                this.$("#start").val("Use my location").attr("disabled", true);
                this.$("label[for='start']").removeClass("required");
            }
        },

        initializeWithCurrentPosition: function (pos) {

            // Can't get location so disable use current location toggle
            if (pos.get('coords') == null) {
                this.$("#current-location").val("off").attr("disabled", true);
                this.updateForUseCurrentLocation();
            }
        },

        getUseCurrentLocation: function() {

            return this.$("#current-location").val() === "on";
        }
    });

    return EditRoutePage;
});

