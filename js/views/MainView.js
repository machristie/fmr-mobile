
define(['backbone', 'jquery', 'gmaps', 'views/PageView', 'models/CurrentPosition', 'text!templates/main.html'],
function(Backbone, $, gmaps, PageView, CurrentPosition, mainTemplate) {
    'use strict';

    var ENTER_KEY = 13;
    var MainView = PageView.extend({

        id: 'main-view',

        template:_.template(mainTemplate),

        events: {
            'keypress #destination': 'loadOnEnter'
        },

        initialize: function() {
            this.listenTo(CurrentPosition, 'change', this.positionChange);
        },

        render:function (eventName) {
            $(this.el).html(this.template());
            var myOptions = {
              zoom: 10,
              center: new gmaps.LatLng(-34.397, 150.644),
              mapTypeId: gmaps.MapTypeId.ROADMAP
            };
            var map = new gmaps.Map(this.$('#map-canvas').get(0), myOptions);
            this.enhance();
            return this;
        },

        loadOnEnter: function( event ){
            var destination = this.$("#destination");
            if (event.which !== ENTER_KEY || !destination.val().trim() === "" ) {
                return;
            }

            console.log("We're going to " + destination.val());
            // TODO: load directions
            // TODO: load gas prices
        },

        positionChange: function (event){
            console.log("CurrentPosition is " + CurrentPosition.get('coords').latitude + ", " + CurrentPosition.get('coords').longitude);
        }

    });

    return MainView;
});

