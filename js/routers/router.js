
define(['backbone', 'jquery', 'views/MainView', 'models/CurrentPosition'],
        function(Backbone, $, MainView, CurrentPosition) {
            "use strict";
    var AppRouter = Backbone.Router.extend({

        routes:{
            "":"main"
        },

        pages: {
            main: new MainView()
        },

        initialize:function () {
            // Handle back button throughout the application
            $(document).on('click', '.back', function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
            this.watchID = null;
        },

        main:function () {
            // TODO: Do we want to stop watching after a while to conserve battery?
            this.watchCurrentLocation(true);
            this.changePage(this.pages.main);
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
                        console.log("got position", new Date());
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
        }

    });

    return AppRouter;
});
