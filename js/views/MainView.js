
define(['backbone', 'underscore', 'jquery', 'gmaps', 'views/PageView', 'views/RouteEditor', 'views/GasPriceInfoWindow', 'models/CurrentPosition', 'text!templates/main.html'],
function(Backbone, _, $, gmaps, PageView, RouteEditor, GasPriceInfoWindow, CurrentPosition, mainTemplate) {
    'use strict';

    var MARKER_RANK_COLORS = [
        'green',        // lowest
        'greenyellow',  // below average
        'yellow',       // slightly below average
        'grey'          // at or above average
    ];
    var MainView = PageView.extend({

        id: 'main-view',

        template:_.template(mainTemplate),

        initialize: function() {
            this.routeEditor = new RouteEditor({model: this.model});
            this.listenTo(this.model, 'change', this.routeChanged);
            this.listenTo(this.model.gasPrices, 'reset', this.gasPricesLoaded);
            this.directionsService = new gmaps.DirectionsService();
            this.directionsDisplay = new gmaps.DirectionsRenderer();
            this.infoWindowView = new GasPriceInfoWindow();
            this.infoWindow = new gmaps.InfoWindow({
                content: this.infoWindowView.el
            });
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
                // TODO: handle failure
                if (status == gmaps.DirectionsStatus.OK){
                    this.directionsDisplay.setDirections(result);
                    this.model.loadGasPrices(result);
                }
            }, this ) );
        },

        gasPricesLoaded: function(eventName) {

            var stats = this.model.gasPrices.stats();
            // TODO: we need to keep track of markers that are added and remove
            // the old markers when new gas prices are loaded
            this.model.gasPrices.forEach(function(gasPrice){

                var priceText = "$" + gasPrice.get('price').toFixed(2);
                var rank = this._gasPriceRank(gasPrice, stats);
                var color = MARKER_RANK_COLORS[rank];
                var marker = new gmaps.Marker({
                    position: new gmaps.LatLng(gasPrice.get('lat'), gasPrice.get('lon')),
                    map: this.map,
                    icon: '/marker?price=' + priceText + "&color=" + color,
                    title: priceText
                });
                gmaps.event.addListener(marker, "click", _.bind( function() {
                    this.infoWindowView.model = gasPrice;
                    this.infoWindowView.render();
                    this.infoWindow.open(this.map, marker);
                }, this ) );
            }, this);
        },

        _gasPriceRank: function(gasPrice, stats) {
            var rank = -1;
            var price = gasPrice.get('price');
            if (price >= stats.average) {
                rank = 3;
            } else {
                rank = Math.floor(3*(price - stats.minimum)/(stats.average - stats.minimum));
            }
            return rank;
        }
    });

    return MainView;
});

