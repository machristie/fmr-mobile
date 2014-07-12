
define(['backbone', 'jquery', 'gmaps', 'views/PageView', 'views/RouteEditor', 'models/CurrentRoute', 'models/CurrentPosition', 'text!templates/main.html'],
function(Backbone, $, gmaps, PageView, RouteEditor, CurrentRoute, CurrentPosition, mainTemplate) {
    'use strict';

    var MainView = PageView.extend({

        id: 'main-view',

        template:_.template(mainTemplate),

        initialize: function() {
            this.listenTo(CurrentPosition, 'change', this.positionChange);
            this.routeEditor = new RouteEditor({model: CurrentRoute});
            this.listenTo(this.routeEditor, 'submit', this.currentRouteSubmitted);
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
            this.enhance();
            return this;
        },

        positionChange: function (event){
            console.log("CurrentPosition is " + CurrentPosition.get('coords').latitude + ", " + CurrentPosition.get('coords').longitude);
        },

        currentRouteSubmitted: function (event) {
            console.log("Route submitted: ", CurrentRoute.attributes);
        }

    });

    return MainView;
});

