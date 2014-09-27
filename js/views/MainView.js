
define(['backbone', 'underscore', 'jquery', 'gmaps', 'views/PageView', 'views/RouteEditor', 'views/GasPriceInfoWindow', 'models/CurrentPosition', 'text!templates/main.html'],
function(Backbone, _, $, gmaps, PageView, RouteEditor, GasPriceInfoWindow, CurrentPosition, mainTemplate) {
    'use strict';

    var MARKER_RANK_COLORS = [
        'green',        // lowest
        'greenyellow',  // below average
        'yellow',       // slightly below average
        'grey'          // at or above average
    ];

    var RANK_CLASS_MAPPING = [
        'lowest-prices',
        'below-average-prices',
        'slightly-below-average-prices',
        'above-average-prices'
    ];
    var MainView = PageView.extend({

        id: 'main-view',

        template:_.template(mainTemplate),

        initialize: function() {
            this.routeEditor = new RouteEditor({model: this.model});
            this.listenTo(this.model.gasPrices, 'reset', this.gasPricesLoaded);
            this.directionsService = new gmaps.DirectionsService();
            this.directionsDisplay = new gmaps.DirectionsRenderer();
            this.infoWindowView = new GasPriceInfoWindow();

            this.gasPriceMarkers = [];
        },

        render:function (eventName) {
            this.$el.html(this.template());
            this.$('div[data-role="header"]').append(this.routeEditor.render().el);
            this.initializeMap();
            this.enhance();
            return this;
        },

        show: function (event, ui) {
            // Resize the map to fill available width http://stackoverflow.com/a/11308528
            gmaps.event.trigger(this.map, 'resize');

            // Don't try to draw or move the map until page is shown
            // ASSUMPTION: this page isn't shown/routed to unless there is a
            // Route defined (with at least a destination)
            if (!this.model.get('start')) {
                CurrentPosition.getPromise()
                    .done(_.bind(this.loadDirectionsAndGasPrices, this))
                    .fail(function(){
                        // TODO: handle with dialog and switch view to editor
                        alert("Failed to get current location.");
                    });
            } else {
                this.loadDirectionsAndGasPrices();
            }
        },

        initializeMap: function () {
            var myOptions = {
              zoom: 10,
              center: new gmaps.LatLng(-34.397, 150.644),
              mapTypeId: gmaps.MapTypeId.ROADMAP,
              scaleControl: true
            };
            this.map = new gmaps.Map(this.$('#map-canvas').get(0), myOptions);
            this.directionsDisplay.setMap(this.map);
        },

        loadDirectionsAndGasPrices: function () {
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

            this.removeGasPriceMarkers();

            var stats = this.model.gasPrices.stats();
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
                    this.infoWindowView.className = RANK_CLASS_MAPPING[rank];
                    this.infoWindowView.open(gasPrice, this.map, marker);
                }, this ) );

                // Keep track of added markers so we can remove them later
                this.gasPriceMarkers.push(marker);
            }, this);
        },

        removeGasPriceMarkers: function() {

            _.each(this.gasPriceMarkers, function(marker){

                marker.setMap(null);
                gmaps.event.clearInstanceListeners(marker);
            });

            this.gasPriceMarkers = [];
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

