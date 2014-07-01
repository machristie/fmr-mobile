
define(['backbone', 'jquery', 'gmaps', 'views/PageView', 'text!templates/main.html'], function(Backbone, $, gmaps, PageView, mainTemplate) {
    var MainView = PageView.extend({

        id: 'main-view',

        template:_.template(mainTemplate),

        render:function (eventName) {
            $(this.el).html(this.template());
            var myOptions = {
              zoom: 10,
              center: new gmaps.LatLng(-34.397, 150.644),
              mapTypeId: gmaps.MapTypeId.ROADMAP
            };
            var map = new gmaps.Map(this.$el.find('#map-canvas').get(0), myOptions);
            this.enhance();
            return this;
        }
    });

    return MainView;
});

