
define(['backbone', 'jquery', 'views/MainView', 'views/EditRoutePage', 'models/Route', 'models/CurrentPosition'],
        function(Backbone, $, MainView, EditRoutePage, Route, CurrentPosition) {
            "use strict";
    var AppRouter = Backbone.Router.extend({

        routes:{
            "":"edit",
            "map":"main",
            "edit":"edit"
        },

        currentRoute: new Route(),

        // Cache and reuse pages
        pages: {},

        initialize:function () {
            // Handle back button throughout the application
            $(document).on('click', '.back', function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
            this.watchID = null;
            this.pages = {
                main: new MainView({model: this.currentRoute}),
                editRoute: new EditRoutePage({model: this.currentRoute})
            };
            this.listenTo(this.pages.editRoute, "routeEditSubmitted", this.routeEditSubmitted);
        },

        main:function () {
            // TODO: Do we want to stop watching after a while to conserve battery?
            this.watchCurrentLocation(true);
            this.changePage(this.pages.main);
        },

        edit: function() {
            this.watchCurrentLocation(true);
            this.changePage(this.pages.editRoute);
        },

        changePage:function (page) {
            // Render and add page to DOM once
            if ($('#'+page.id).length === 0) {
                $('body').append(page.render().$el);
            }
            if (this.firstPage) {
                // We turned off $.mobile.autoInitializePage, but now that we've
                // added our first page to the DOM, we can now call initializePage.
                $.mobile.initializePage();
                this.firstPage = false;
            }
            $( ":mobile-pagecontainer" ).pagecontainer( "change", page.$el,
                    { changeHash: false });
        },

        watchCurrentLocation: function (watch) {
            if (!("geolocation" in navigator)) {
                return;
            }

            // Already watching
            if (watch && this.watchID) {
                return;
            }

            // Need to stop watching
            if (!watch && this.watchID) {

                navigator.geolocation.clearWatch(this.watchID);
                this.watchID=null;
                return;
            }

            if (watch) {
                this.watchID = navigator.geolocation.watchPosition(
                    function(pos){
                        console.log("got position", pos, new Date());
                        CurrentPosition.set('coords', pos.coords);
                        CurrentPosition.set('timestamp', pos.timestamp);
                    },
                    function(err) {
                        console.log("Failed to get position", err);
                    },
                    {
                        maximumAge: 500000,
                        enableHighAccuracy: true,
                        timeout: 10000
                    }
                );
            }
        },

        routeEditSubmitted: function(event) {
            this.navigate("map", {trigger: true});
        }

    });

    return AppRouter;
});
