
define(['backbone', 'jquery', 'gmaps', 'views/PageView', 'views/RouteEditor', 'models/CurrentRoute', 'models/CurrentPosition', 'text!templates/main.html'],
function(Backbone, $, gmaps, PageView, RouteEditor, CurrentRoute, CurrentPosition, mainTemplate) {
    'use strict';

    var MainView = PageView.extend({

        id: 'main-view',

        template:_.template(mainTemplate),

        initialize: function() {
            this.routeEditor = new RouteEditor({model: CurrentRoute});
            this.listenTo(this.routeEditor, 'submit', this.currentRouteSubmitted);
            this.directionsService = new gmaps.DirectionsService();
            this.directionsDisplay = new gmaps.DirectionsRenderer();
        },

        render:function (eventName) {
            this.$el.html(this.template());
            this.$('div[data-role="header"]').append(this.routeEditor.render().el);
            var myOptions = {
              zoom: 10,
              center: new gmaps.LatLng(-34.397, 150.644),
              mapTypeId: gmaps.MapTypeId.ROADMAP
            };
            var map = new gmaps.Map(this.$('#map-canvas').get(0), myOptions);
            this.directionsDisplay.setMap(map);
            this.enhance();
            return this;
        },

        currentRouteSubmitted: function (event) {
            console.log("Route submitted: ", CurrentRoute.attributes);
            var directionsRequest = {};
            if (CurrentRoute.get('useCurrentLocation')) {
                directionsRequest.origin = new gmaps.LatLng(
                        CurrentPosition.get('coords').latitude,
                        CurrentPosition.get('coords').longitude);
            } else {
                directionsRequest.origin = CurrentRoute.get('start');
            }
            directionsRequest.destination = CurrentRoute.get('destination');
            directionsRequest.travelMode = gmaps.TravelMode.DRIVING;
            directionsRequest.unitSystem = gmaps.UnitSystem.IMPERIAL;

            var self = this;
            this.directionsService.route(directionsRequest, function(result, status){
                console.log(result, status);
                // TODO: handle failure
                if (status == gmaps.DirectionsStatus.OK){
                    self.directionsDisplay.setDirections(result);
                }
            });
        }

    });

    return MainView;
});

