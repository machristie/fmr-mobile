
define(['backbone', 'jquery', 'gmaps', 'views/PageView', 'views/RouteEditor', 'models/CurrentPosition', 'text!templates/main.html'],
function(Backbone, $, gmaps, PageView, RouteEditor, CurrentPosition, mainTemplate) {
    'use strict';

    var MainView = PageView.extend({

        id: 'main-view',

        template:_.template(mainTemplate),

        initialize: function() {
            this.routeEditor = new RouteEditor({model: this.model});
            this.listenTo(this.model, 'change', this.routeChanged);
            this.listenTo(this.model.gasPrices, 'reset', this.gasPricesLoaded);
            this.directionsService = new gmaps.DirectionsService();
            this.directionsDisplay = new gmaps.DirectionsRenderer();
        },

        render:function (eventName) {
            this.$el.html(this.template());
            this.$('div[data-role="header"]').append(this.routeEditor.render().el);
            var myOptions = {
              zoom: 10,
              center: new gmaps.LatLng(-34.397, 150.644),
              mapTypeId: gmaps.MapTypeId.ROADMAP,
              scaleControl: true
            };
            this.map = new gmaps.Map(this.$('#map-canvas').get(0), myOptions);
            this.directionsDisplay.setMap(this.map);
            this.enhance();
            return this;
        },

        routeChanged: function (event) {
            var directionsRequest = {};
            if (this.model.get('useCurrentLocation')) {
                directionsRequest.origin = new gmaps.LatLng(
                        CurrentPosition.get('coords').latitude,
                        CurrentPosition.get('coords').longitude);
            } else {
                directionsRequest.origin = this.model.get('start');
            }
            directionsRequest.destination = this.model.get('destination');
            directionsRequest.travelMode = gmaps.TravelMode.DRIVING;
            directionsRequest.unitSystem = gmaps.UnitSystem.IMPERIAL;

            this.directionsService.route(directionsRequest, _.bind( function(result, status){
                console.log(result, status);
                // TODO: handle failure
                if (status == gmaps.DirectionsStatus.OK){
                    this.directionsDisplay.setDirections(result);
                    console.log("calling loadGasPrices now...");
                    this.model.loadGasPrices(result);
                }
            }, this ) );
        },

        gasPricesLoaded: function(eventName) {

            // TODO: we need to keep track of markers that are added and remove
            // the old markers when new gas prices are loaded
            this.model.gasPrices.forEach(function(gasPrice){
                var marker = new google.maps.Marker({
                    position: new gmaps.LatLng(gasPrice.get('lat'), gasPrice.get('lon')),
                    map: this.map,
                    title: gasPrice.get('price')
                });
            }, this);
        }
    });

    return MainView;
});

